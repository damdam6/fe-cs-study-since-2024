# JavaScript 실행 컨텍스트와 클로저
## 실행 컨텍스트(Execution Context)
### 1. 실행 컨텍스트란?
자바스크립트 코드가 실행될 때, 코드의 실행 환경(변수, 함수, 객체 등이 저장되는 공간)을 말한다. 쉽게 말해 현재 실행 중인 코드의 상태를 담고 있는 환경이라고 생각하면 된다.

#### 🔹 소스코드 타입 4가지
ECMAScript 에서 소스코드는 4가지 타입으로 구분되며, 각 타입에 따라 실행 컨텍스트를 생성하게 된다.

| 소스코드 타입            | 설명                                                    |
|--------------------|-------------------------------------------------------|
| 전역 코드 `global code` | - 전역에 존재하는 소스코드 <br> - 전역에 정의된 함수, 클래스 등의 내부 코드는 포함x  |
| 함수 코드 `function code` | - 함수 내부에 존재하는 소스코드 <br> - 함수 내부에 중첩된 함수, 클래스 등 내부 코드 포함x |
| eval 코드 `eval code` | - 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드              |
| 모듈 코드 `module code`| - 모듈 내부에 존재하는 소스코드 <br> - 모듈 내부의 함수, 클래스 등의 내부 코드는 포함x|

자바스크립트 엔진은 실행 컨텍스트가 생성되기 전에 각 코드에 대한 평가를 실행한다. 평가가 완료되면 실행 컨텍스트가 생성된다.

**1️⃣ 전역 코드**
- 전역 변수를 관리하기 위해 최상위 스코프인 전역 스코프를 생성
- 아래와 같은 목적으로 전역 객체와의 연결을 위한 평가 실행
  - var 키워드로 선언된 전역 변수를 전역 객체의 프로퍼티로 바인딩 및 참조
  - 함수 선언문으로 정의된 전역 함수 전역 객체의 메서드로 바인딩 및 참조
- 평가가 완료되면 전역 실행 컨텍스트 생성


**2️⃣ 함수 코드**
- 지역 스코프를 생성하고 지역 변수, 매개변수, arguments 객체를 관리
- 생성된 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결하기 위한 평가 실행
- 평가가 완료되면 함수 실행 컨텍스트 생성


**3️⃣ eval 코드**
- eval 코드는 `strict mode`에서 자신만의 독자적인 스코프 생성 및 평가 실행
- 평가가 완료되면 eval 실행 컨텍스트 생성


**4️⃣ 모듈 코드**
- 모듈별로 독립적인 모듈 스코프 생성 및 평가 실행
- 평가가 완료되면 모듈 실행 컨텍스트 생성


#### 🔹 소스코드의 평가와 실행
자바스크립트 엔진은 소스코드를 **소스코드의 평가**, **소스코드의 실행** 2개의 과정으로 나누어 처리한다.

**✅ 소스코드 평과 과정**
- 실행 컨텍스트 생성
- 변수, 함수 등 선언문 우선 실행 
- 생성된 변수/함수 식별자를 실행 컨텍스트가 관리하는 스코프인 **렉시컬 환경의 환경 레코드**에 키로 등록

**✅ 소스코드 실행 과정**
- 선언문을 제외한 소스코드 순차적 실행 `런타임 시작`
- 실행 컨텍스트가 관리하는 스코프에서 실행에 필요한 정보(변수/함수의 참조) 검색 및 취득
- 변수 값의 변경 등 소스코드의 실행 결과를 실행 컨텍스트가 관리하는 스코프에 등록

![img](https://github.com/dolmeengii/fe-cs-study/blob/60436d4415229d72418699f5ef62c559f0c5d7a4/dolmeengii/JavaScript%20%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%20%26%20%ED%81%B4%EB%A1%9C%EC%A0%80/images/%EC%86%8C%EC%8A%A4%EC%BD%94%EB%93%9C%20%ED%8F%89%EA%B0%80%20%EB%B0%8F%20%EC%8B%A4%ED%96%89.png)


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

### 3. 스코프 체인(Scope Chain)
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

#### 🔹 렉시컬 환경이란?
렉시컬 환경 `Lexical Environment`은 식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트이다. 렉시컬 환경은 스코프와 식별자를 관리한다.

![img](https://github.com/dolmeengii/fe-cs-study/blob/60436d4415229d72418699f5ef62c559f0c5d7a4/dolmeengii/JavaScript%20%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%20%26%20%ED%81%B4%EB%A1%9C%EC%A0%80/images/lexical.png)

렉시컬 환경은 키와 값을 갖는 객체 형태의 스코프를 생성하여 식별자를 키로 등록하고 식별자에 바인딩된 값을 관리한다.

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


