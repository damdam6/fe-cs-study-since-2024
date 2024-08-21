## Promise 심화

\*\*해당 글(https://ko.javascript.info/async) 을 참고하여 작성하였습니다.

### ✅ INDEX

[Promise 클래스의 정적 메서드](#promise-클래스의-정적-메서드)

[콜백 받는 함수를 Promise화 하기](#콜백-받는-함수를-promise화-하기)

[마이크로태스크](#마이크로태스크)

[async 와 await](#async-와-await)

## Promise 클래스의 정적 메서드

<aside>

    ✅ 정적 메서드 vs. 인스턴스 메서드

    정적 메서드는 클래스 내부에서 static 키워드를 사용하여 만든다.

    정적 메서드는 클래스 본체만이 호출 가능하며, 인스턴스 메서드는 인스턴스로 호출한다.

    e.g. Promise.all() / new Promise().then()

    +) Promise 인스턴스 메서드에는 then(), catch(), finally() 가 있다.

    정적 메서드는 각 인스턴스마다 복제할 필요가 없는 데이터 만들 때 유용하며, 주로 객체를 생성하거나 복제하는 기능과 같은 유틸리티 기능에 사용된다.

</aside>

### Promise.all

- 요소 전체가 프라미스인 배열을 받고 새로운 프라미스를 반환한다.
- 배열 안 프라미스의 결괏값을 담은 배열이 새로운 프라미스의 result 가 된다.
- 각 프라미스는 <span style='background-color: #fff5b1'>병렬로 처리</span> 된다.

  - 즉, 각 프라미스가 처리될 때 blocking 처리하지 않는다.
  - cf. async 함수에서 await를 사용시 프라미스 작업이 끝날 때 까지 blocking 된다.

- 예제
  ```jsx
  Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
  ]).then(alert); // 1, 2, 3이 반환됨
  ```
  - 이 때 인자 순서와 결괏값의 배열 순서는 동일하다.
  - 전달되는 프라미스 중 하나라도 거부되면, `Promise.all` 전체가 거부되며 에러 핸들링이 실행된다.
  - 이 때 거부 에러가 `Promise.all` 전체의 결괏값이 된다. 에러 발생 전 이행되었더라도 무시된다.

### Promise.allSettled

- 모든 프라미스가 처리될 때까지 기다린다.
- 하나라도 거절되면 전체가 거절되는 `Promise.all` 과 달리 성공 여부 상관 없이 각 프라미스 수행 후 얻는 결괏값을 배열에 저장한다.
- 반환되는 배열에 들어가는 요소

  - 응답이 성공할 경우 : `{status:"fulfilled", value:result}`
  - 에러가 발생한 경우 : `{status:"rejected", reason:error}`

- 예제

  ```jsx
  let urls = [
    "https://api.github.com/users/iliakan",
    "https://api.github.com/users/Violet-Bora-Lee",
    "https://no-such-url",
  ];

  Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
    // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
  ```

  - results 의 예상값 (\*)
    ```jsx
      [
    	  {status: 'fulfilled', value: ...응답...},
    	  {status: 'fulfilled', value: ...응답...},
    	  {status: 'rejected', reason: ...에러 객체...}
    	]
    ```

### Promise.race

- Promise.all 과 비슷하지만, 각 프라미스 중 가장 먼저 처리되는 프라미스의 결과를 반환한다.
- race(경주) 처럼 우승자가 결과값이 된다. 다른 프라미스들은 무시된다.

### Promise.resolve

- 호환성을 위해 함수가 프라미스를 반환하도록 해야 할 때 사용한다.
- `let promise = new Promise(resolve => resolve(value));` 코드와 동일한 일을 수행한다.

- 예제

  ```jsx
  let cache = new Map();

  // loadCached 의 반환값의 형태를 Promise 로 통일
  // 언제나 loadCached(url).then() 쓸 수 있게 하려고

  function loadCached(url) {
    if (cache.has(url)) {
      return Promise.resolve(cache.get(url)); // (*)
    }

    return fetch(url)
      .then((response) => response.text())
      .then((text) => {
        cache.set(url, text);
        return text;
      });
  }
  ```

### Promise.reject

- 결괏값이 `error`인 거부 상태 프라미스를 생성한다.
- `let promise = new Promise((resolve, reject) => reject(error));` 코드와 동일한 일을 수행한다.

<aside>

    ✅ 참고사항

    Promise.resolve 와 Promise.reject 는 async / await 에 대체되어 잘 사용하지 않는다.

</aside>

## 콜백 받는 함수를 Promise화 하기

### 프라미스화(promisification)

- 콜백을 받는 함수를 프라미스를 반환하는 함수로 바꾸는 것
- 왜 바꾸는가? 콜백보다 프라미스가 더 편리하기 때문에

- 예제 1 :: 단순 프라미스화

  - 콜백을 받는 함수

  ```jsx
  function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () =>
      callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  }

  // 사용법:
  // loadScript('path/script.js', (err, script) => {...})
  ```

  - 프라미스화

  ```jsx
  let loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  };

  // 사용법:
  // loadScriptPromise('path/script.js').then(...)
  ```

- 예제 2 :: 프라미스화 헬퍼 함수 사용

  ```jsx
  function promisify(f) {
    return function (...args) {
      // 래퍼 함수를 반환함
      return new Promise((resolve, reject) => {
        function callback(err, result) {
          // f에 사용할 커스텀 콜백
          if (err) reject(err);
          else resolve(result);
        }

        args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다.

        f.call(this, ...args); // 기존 함수를 호출합니다.
      });
    };
  }

  // 사용법:
  // let loadScriptPromise = promisify(loadScript);
  // loadScriptPromise(...).then(...);
  ```

### 참고 및 주의점

- [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) 와 같이 프라미스화 헬퍼 함수를 제공하는 모듈도 있다.
- Node.js에선 내장 함수 `util.promisify`를 사용해 프라미스화 가능

- 프라미스화는 콜백을 완전히 대체하지 못한다.
  - 프라미스는 하나의 결괏값만 가질 수 있는 반면, 콜백은 여러 번 호출할 수 있기 때문
  - 콜백을 여러 번 호출하는 함수는 프라미스화 x →두 번째 호출부터는 무시된다.

## 마이크로태스크

### 마이크로태스크 큐

- 프라미스 작업 등을 처리하기 위한 내부 큐
- 마이크로태스크 큐는 먼저 들어온 작업을 먼저 실행한다. (FIFO)
- 실행할 게 아무것도 없을 때만 마이크로태스크 큐에 있는 작업이 실행되기 시작한다.

### 마이크로태스크 큐와 태스크 큐

태스크 큐보다 마이크로태스크 큐가 더 우선순위가 높다.

![image.gif]()

- 예제

  ```jsx
  let promise = Promise.resolve();

  promise.then(() => alert("프라미스 성공!")); // 실행 순서 2

  alert("코드 종료"); // 실행 순서 1
  ```

  - 마이크로태스크 큐에 then 핸들러가 저장됨
  - 스크립트 실행이 완전히 끝나고 나서 큐에서 작업을 꺼내 실행한다.

### 처리되지 못한 거부

- 마이크로태스크 큐 끝에서 프라미스 에러가 처리되지 못할 때 발생합니다.
- 마이크로태스크 큐를 비운 후에 `unhandledrejection` 이벤트를 트리거 합니다.

- 예제
  ```jsx
  let promise = Promise.reject(new Error("프라미스 실패!"));
  // catch 핸들러가 없는 경우
  // 아래 코드가 트리거 됨
  window.addEventListener("unhandledrejection", (event) => alert(event.reason));
  ```

## async 와 await

### async 함수

- 명시적으로 프라미스 반환하지 않아도 `Promise.resolve(값)` 으로 자동으로 감싸져서 반환된다.
- 예제

  ```jsx
  async function f() {
    return 1;
  }

  f().then(alert); // 1
  ```

+) 클래스 메서드로도 async 함수를 선언할 수 있다.

```jsx
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(alert); // 1
```

### await 키워드

- 프라미스가 처리될 때까지 기다리게 한다.
- 기다리는 동안엔 엔진이 다른 일을 할 수 있기 때문에 CPU 리소스가 낭비되지 않는다.
- 예제

  ```jsx
  async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000);
    });

    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    alert(result); // "완료!"
  }

  f();
  ```

### 에러 핸들링

- 프라미스가 정상적으로 이행되면 await 는 프라미스 객체의 result에 저장된 값을 반환합니다.
- 반면 프라미스가 거부되면 마치 throw문을 작성한 것처럼 에러가 던져집니다.
- 예제

  ```jsx
  async function f() {
    await Promise.reject(new Error("에러 발생!"));
  }

  // 위 코드와 아래 코드는 동일하게 작동합니다.

  async function f() {
    throw new Error("에러 발생!");
  }
  ```

- 위처럼 await 가 던진 에러는 try-catch 를 사용해 잡을 수 있습니다.
- 예제

  ```jsx
  async function f() {
    try {
      let response = await fetch("http://유효하지-않은-주소");
    } catch (err) {
      alert(err); // TypeError: failed to fetch
    }
  }

  f();
  ```

### 프라미스 체이닝과의 차이점

- async / await 의 경우, 더 직관적이고 동기 코드처럼 사용할 수 있어서 주로 사용된다.
- 하지만 await 키워드는 최상위 레벨 코드, 즉 async 함수 바깥에 있는 경우에는 사용이 불가능함
  - 이 때는 익명 함수로 감싸서 async 를 사용하거나, Promise 체이닝을 사용할 수 있다.

### 👀 참고자료

https://seo-tory.tistory.com/47
https://mugglim.tistory.com/12
