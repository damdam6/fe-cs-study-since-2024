# JavaScript 실행 컨텍스트와 클로저
## 실행 컨텍스트(Execution Context)
### 1. 실행 컨텍스트란?
자바스크립트 코드가 실행될 때, 코드의 실행 환경(변수, 함수, 객체 등이 저장되는 공간)을 말한다. 쉽게 말해 현재 실행 중인 코드의 상태를 담고 있는 환경이라고 생각하면 된다. 

#### 🔹 실행 컨텍스트가 만들어지는 과정
자바스크립트 엔진은 코드를 실행할 때 다음 3단계를 거쳐 실행 컨텍스트를 만든다.

**1️⃣ 생성 단계(Create Phase)**
- 코드가 실행되기 전에 먼저 변수와 함수 선언을 등록한다. (`호이스팅`)
- 이때, 변수는 undefined로 초기화되고, 함수 선언문은 메모리에 미리 올라간다.

**2️⃣ 실행 단계(Execution Phase)**
- 코드가 한 줄씩 실행되며 변수에 값이 할당되고 함수가 호출된다.

**3️⃣ 소멸 단계(Garbage Collection)**
- 더 이상 필요하지 않는 실행 컨텍스트는 제거된다.

<br>

### 2. 호이스팅(Hoisting)이란?
자바스크립트에서는 변수와 함수 선언이 코드 실행 전에 메모리에 먼저 저장된다.
```js
console.log(name); // undefined
var name = "Alice";
console.log(name); // Alice
```
이 코드를 자세히 살펴보자. `console.log(name);` 을 실행하기 전에 변수 `name`이 미리 메모리에 등록되었기 때문에 오류가 발생하지 않는다. 하지만 `var` 키워드는 초기값을 undefined로 설정하기 때문에 첫번째 실행문인 `console.log(name);`에서는 undefined가 출력된다.

#### 🔹 호이스팅의 특징
- **var** 키워드: 선언만 끌어올려지고 undefined로 초기화
- **let, const** 키워드 : 호이스팅은 되지만, 선언 전에 접근하면 오류가 발생 (Temporal Dead Zone, TDZ)
```js
console.log(age); // ReferenceError: Cannot access 'age' before initialization
let age = 25;
```

<br>

### 3. 실행 컨텍스트와 스코프 체인(Scope Chain)
#### 🔹 스코프(Scope)와 스코프 체인(Scope Chain)
**스코프**는 변수가 유효한 범위를 의미하고, **스코프 체인**은 변수를 찾을 때 현재 스코프에서 먼저 찾고, 없으면 상위 스코프에서 찾는 과정을 의미한다.

#### 🔹스코프의 종류와 특징
| 종류                      | 특징                                 |
|-------------------------|------------------------------------|
| 전역 스코프 (Global Scope)   | 코드 어디서든 접근 가능                      |
| 함수 스코프 (Function Scope) | 함수 내부에서만 접근 가능                     |
| 블록 스코프 (Block Scope) | 중괄호 `{}` 내부에서만 유효 (**let, const**) |

```js
function outer() {
  let outerVar = "밖";
  
  function inner() {
    let innerVar = "안";
    console.log(outerVar); // '밖' (외부 변수 접근 가능)
  }

  console.log(innerVar); // ❌ 오류 발생 (내부 변수 접근 불가)
  inner();
}
outer();
```
---
##### ✅ 참고: var, let, const 차이점
| | var | let | const | 
|--|--|--|--|
|스코프| 함수 스코프 | 블록 스코프 | 블록 스코프 |
|호이스팅|undefined 초기화| TDZ로 인해 사용 전 접근 불가 |TDZ로 인해 사용 전 접근 불가|
| 재할당| 가능 | 가능 | 불가능 |
|재선언|가능|불가능|불가능|
---

<br>

## 클로저(Closure)
클로저란, 함수가 생성될 당시의 외부 변수를 기억하고, 나중에 그 함수를 호출할 때도 해당 변수에 접근할 수 있는 개념이다.
```js
function outerFunction(outerValue) {
  return function innerFunction(innerValue) {
    console.log(`외부 값: ${outerValue}, 내부 값: ${innerValue}`);
  };
}

const closureExample = outerFunction("Hello");
closureExample("World"); 
// 출력: 외부 값: Hello, 내부 값: World
```
> `innerFunction`은 `outerFunction`이 실행된 후에도 `outerValue`를 기억하고 있다.    
>  이처럼 **외부 함수의 변수를 내부 함수가 기억하는 현상**을 **클로저**라고 한다.

### 클로저 활용 예제
#### 1️⃣ 정보 은닉 (Private Variable)
```js
function counter() {
  let count = 0;

  return {
    increase: function () {
      count++;
      console.log(count);
    },
    decrease: function () {
      count--;
      console.log(count);
    }
  };
}

const myCounter = counter();
myCounter.increase(); // 1
myCounter.increase(); // 2
myCounter.decrease(); // 1
```
> `count` 변수는 `counter()` 함수 내부에서만 접근할 수 있고, 외부에서는 직접 변경할 수 없다.

#### 2️⃣ 반복문에서 비동기 처리
```js
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// 출력: 3, 3, 3
```
이 코드에서 setTimeout 내부의 `console.log(i)`는 비동기 코드이기 때문에 1초 후 실행되는데, `var` 는 함수 스코프이므로 for 루프가 끝난 후 i 값은 3이 된다. 따라서 setTimeout 이 실행될 때는 모든 함수가 i = 3을 참조하게 된다.

위와 같은 문제를 해결하기 위해서 클로저를 사용할 수 있다. 세 가지 방식을 적용하여 클로저를 사용해보자.

**💡let, 블록 스코프 사용하기**
```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 출력: 0, 1, 2
```
let은 블록 스코프라서 **for 루프가 돌 때마다 새로운 i 변수가 생성**된다. 각, setTimeout 콜백이  자신만의 i 값을 기억하므로 원하는 결과가 나오게 된다.

**💡즉시 실행 함수(IIFE) 사용하기**
```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
// 출력: 0, 1, 2
```
`(function(j){...})(i);` 는 즉시 실행 함수이고, 이 함수의 매개변수 j에 현재 i 값을 복사하여 전달한다. setTimeout은 이 클로저 내부의 j값을 기억하고 있기 때문에 예상대로 동작한다.

**💡bind를 사용한 클로저**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(
    function (j) {
      console.log(j);
    }.bind(null, i),
    1000
  );
}
// 출력: 0, 1, 2
```
`.bind(null, i)`를 사용하면 현재 i 값을 매개변수로 고정한 새로운 함수가 생성된다. 여기서 setTimeout이 실행될 때 이 바인딩된 값이 유지된다.


