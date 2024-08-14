## Promise 의 활용

\*\*해당 글(https://ko.javascript.info/promise-basics) 을 참고하여 작성하였습니다.

## ✅ INDEX

[Promise 객체](#promise-객체)

[Promise 객체 활용하기](#promise-객체-활용하기)

[프라미스 체이닝](#프라미스-체이닝)

[catch로 에러 핸들링](#catch-로-에러-핸들링)

## Promise 객체

> 당신은 앨범이 출시되면 팬들이 자동으로 소식을 받아볼 수 있도록 해 부하를 덜 겁니다. 구독 리스트( → <span style='background-color: #fff5b1'>Promise 객체</span>) 를 하나 만들어 팬들에게 전달해 이메일 주소를 적게 하고, 앨범이 준비되면 리스트에 있는 팬들에게 메일을 보내 앨범 관련 소식을 바로 받아볼 수 있게( → <span style='background-color: #fff5b1'>resolve</span>) 하는 식으로 말이죠. 이렇게 하면 녹음 스튜디오에 화재가 발생해서 출시 예정인 앨범이 취소되는 불상사( → <span style='background-color: #fff5b1'>reject</span>) 가 발생해도 관련 소식을 팬들에게 전달 할 수 있습니다.

### 생성하기

```jsx
let promise = new Promise(function (resolve, reject) {
  // executor (제작 코드, '가수')
});
```

- executor 란?
  - 실행 함수
  - `new Promise` 실행 시 자동으로 실행된다.
  - 인수인 resolve 와 reject 는 개발자가 임의 변경할 수 없는 자바스크립트 자체 제공 콜백이며, executor 는 처리 성공 여부에 따라 둘 중 하나를 호출한다.(필수)

### Promise 객체의 프로퍼티

- `state` → pending, fulfilled, rejected 값을 가진다
- `result` → undefined, (resolve 호출 시) value, (reject 호출 시) error 값을 가진다.
- 이들은 직접 접근하지 못하며, then, catch, finally 메서드로만 접근 가능하다. 아래 [Promise 객체 활용하기](#promise-객체-활용하기)에 다시 등장할 예정!

![image.png](/bloblog/promise/image/image.png)

### 예제

```jsx
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("완료"), 1000);
});
```

→ 실행 함수 실행 1초 후, `resolve(”완료”)` 가 호출된다. 이 때 state 는 fulfilled, result 는 “완료” 로 변하게 된다.

### 기타 주의점

- 실행함수는 resolve 나 reject 중 하나만 호출한다. 후에 호출된 것은 무시한다.
- resolve 와 reject는 인수를 1개 이하로만 받는다. 그 외 인수는 무시한다.
- 한 번 변경된 상태는 더 이상 변하지 않는다.

## Promise 객체 활용하기

Promise 객체에 원하는 만큼 아래 메서드들을 호출할 수 있습니다.

### then 메서드

첫 번째 인수로 받는 함수는 결과를, 두 번째 인수로 받는 함수는 에러를 받는다.

```jsx
promise.then(
  function(result),
  function(error)
);
```

### catch 메서드

- 에러가 발생한 경우만 다루고 싶을 때 사용
- then 메서드에 첫 번째 인수를 null 로 전달한 것과 완전히 동일하다.

### finally 메서드

- 실행 결과에 상관없이, Promise 처리 시 항상 실행된다.
- 결과 처리보다는 결과 전달 역할에 치중되어있다.
- then 메서드에 두 개의 인수를 같은 함수로 채워 전달한 것과 **유사하다.**

  > **차이점?**
  >
  > finally 는 성공 / 실패 모두 같은 함수가 실행되기 때문에, 성공 여부를 알 수 없다.
  >
  > finally 에서 끝나지 않고, 다음 핸들러 (then, catch) 로 결과와 에러를 전달한다.

## 프라미스 체이닝

then 핸들러의 체인을 통해 result 가 전달된다는 점을 활용한 방법이며, 순서대로 처리되어야 하는 경우 유용하다.

### 실행 방식

> 최초의 Promise 이행 → then 핸들러 1 → Promise 반환 → then 핸들러 2 → Promise 반환 → then 핸들러 3 → …

- `Promise.then` 호출 시 Promise를 반환한다는 것이 포인트!
- 반환된 Promise 에 다시 핸들러를 달아준다 = 체이닝

### 예제

```jsx
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 함수를 이용하여 다시 동일 작업 수행
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...
```

- 위 예시는 `showAvatar()` 이후에 작업이 있지만, 없더라도 비동기 동작은 항상 Promise 를 반환하게 하는 것이 좋다. → 체인 확장에 유리함
- then 외에도 모든 핸들러가 Promise 객체를 반환할 수 있다.

## catch 로 에러 핸들링

### 예제 1 :: 단순 then - catch

```jsx
fetch("https://no-such-server.blabla") // 존재하지 않는 주소
  .then((response) => response.json())
  .catch((err) => alert(err));
```

- 위의 경우, catch 는 then 핸들러에서 발생한 모든 에러를 잡는다.

### 예제 2 :: catch 에서 에러 분석 + 다시 던지기

```jsx
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // 에러 처리 가능한 에러
    } else {
      alert("처리할 수 없는 에러");
      throw error; // 에러 다시 던지기
    }
  })
  .then(function () {
    /* 여기는 실행되지 않습니다. */
  })
  .catch((error) => {
    // (**)
    alert(`알 수 없는 에러가 발생함: ${error}`);
  });
```

- 실행 결과에 따라, 가장 가까운 then 이나 catch 핸들러로 넘어가서 실행이 이어진다.
