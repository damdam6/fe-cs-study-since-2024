# 1. 실행 컨텍스트

 실행 컨텍스트 : 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
 
동일한 환경에 있는 코드들을 실행할 때, 필요한 환경 정보들을 모아 컨텍스틀를 구성하고 이를 **콜스택** 에 쌓아 올립니다.

실행 컨텍스트는 **전역 공간이 생성될 때, 함수가 호출될 때** 생성됩니다.

# 2. 실행 컨텍스트와 콜 스택

```js
// -------------------------- 전역 컨텍스트 영역
var a = 1;
function outer() {
    function inner() {
        console.log(a); //undefined
        var a = 3;
    }
    inner();
    console.log(a); // 1
}
outer();
console.log(a); //1
```

<img alt="스택" src="https://velog.velcdn.com/images%2Fvlfflq2004%2Fpost%2F204301f9-d26c-4292-b5b5-ca32bd545f4e%2F%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.png" />

사실 이 예시에서 일단 알아놓기만 하면 되는 개념은, 바로 아래 사진의 콜스택이다.
전역 컨텍스트가 먼저 담기고, 함수의 호출 순서대로 스택에 차례대로 담긴다.

위와 같이 어떤 실행 컨텍스트가 활성화될 때, js 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장한다. 이 객체에 담기는 정보들에 대해서 알아보자.

++ 추가로 코드를 찬찬히 살펴보면 

```js
 function inner() {
    console.log(a); //undefined
    var a = 3;
}
```
inner 함수에서 var a = 3; 으로 선언했지만 (지역 변수이다.) , 아래 console.log() 들에서는 전역 컨텍스트 부분에서 설정한 전역 변수 var a = 1; 에 따라 다 1로 출력되는 것을 볼 수 있다.

그렇다면 inner 함수 안에서의 출력은 왜 1이 아니라 undefined 되는가? 그것은 js의 특징 중 하나인 호이스팅 때문이다. 아래 코드를 자세히 풀어본다면

```js
function inner() {
    var a; // 호이스팅에 의해 변수 선언이 맨 위로 이동
    console.log(a); // undefined
    a = 3;
}
```
이렇게 지역 변수 a가 호이스팅 된 모습을 파악할 수 있다. 이후 a = 사용되지 않는다. (콜 스택에서 빠져나갔기 때문 / 지역변수라서 외부 함수에 간섭을 할 수 없음.)

# 3. 활성화된 컨텍스트의 수집 정보
### 1) VariableEnvironment
실행 컨텍스트를 생성할 때, 이곳에 정보를 먼저 담은 다음, 이를 그대로 복사해서 LexicalEnvironment을 만들고 이 후에는 LexicalEnvironment을 주로 사용하게 된다.
### 2) LexicalEnvironment
 1. EnvironmentRecord : 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됨. - 매개변수의 이름, 함수 선언, 변수명 들이 담김

    ++ **호이스팅**
 
    <img alt="호이스팅" src="https://blog.kakaocdn.net/dn/cHGMtA/btrnHSSLXpE/e36ENsH2LMW7ZFt4PMTyAk/img.png"/>
    (사진 상에서는 위와 같이 나타났지만, 이해를 돕기 위해 오른쪽 사진으로 수정한 것!)
    
    호이스팅은 식별자들을 최상단으로 끌어올리는 것

    식별자만 끌어올린다, 대신에 할당 과정은 그대로 놔둔다.

    **편의상 끌어올린다는 가상의 개념이지, 실제로 끌어올리는 것은 아님**
    
    이 호이스팅의 과정들을 통해 자바스크립트 엔진은, 코드 실행 전에도 변수명들을 모두 알고 있게 됨.
    

++ **함수 선언문과 함수 표현식**
```js
1. 함수 선언문
function a () {}
: 내부 코드까지 전체를 호이스팅함

2. 함수 표현식
var b = function () {}
b(); 실행 OK!

할당의 과정은 그대로 두고 선언부만 호이스팅한다.
화살표 함수 또한 함수 표현식의 방식!
```
호이스팅에 의해서 두 함수의 결과가 달라진다.

함수 선언문으로 작성된 부분은, 실행위치보다 아래에 있어도 원활하게 실행된다. 하지만 함수 표현식으로 작성된 함수는 에러를 출력함.

따라서 상대적으로 함수 표현식을 사용하는 것이 안전함.


 2. 스코프, 스코프 체인, outerEnvironmentReference
    
    스코프 : 식별자에 대한 유효범위 / JS는 전역, 함수, 블록 스코프가 존재하며 생성된다.
    
    스코프 체인 : 이러한 식별자의 유효범위를 안에서부터 바깥으로 차례로 검색해 나가는 것.

```js
var globalVar = "I am a global variable"; // 전역 변수

function outerFunction() {
    var outerVar = "I am in outer function"; // 지역 변수 (outerFunction의 스코프)

    function innerFunction() {
        var innerVar = "I am in inner function"; // 지역 변수 (innerFunction의 스코프)
        
        console.log(innerVar); // "I am in inner function" (innerFunction 스코프에 존재)
        console.log(outerVar); // "I am in outer function" (스코프 체인에 따라 outerFunction 스코프에서 검색)
        console.log(globalVar); // "I am a global variable" (스코프 체인에 따라 전역 스코프에서 검색)
    }

    innerFunction();
}

outerFunction();
console.log(globalVar); // "I am a global variable" (전역 스코프에서 검색)
```
OuterEnvironmentReference : 이를 가능케 하는 것 / LexicalEnvironment 의 두 번째 수집 자료

복잡하지만 조금만 더 짚고 마무리 하자. 한 줄 요약으로 스코프 체인을 따라 상위 스코프의 정보를 찾을 수 있게 되는 것이다.

outerFunction이 생성될 때, 자바스크립트 엔진은 이 함수의 OuterEnvironmentReference로 전역 스코프를 기억한다. 그래서 outerFunction 안에서 전역 변수를 참조할 수 있음.

위와 동일하게 innerFunction이 생성될 때는, OuterEnvironmentReference로 outerFunction의 스코프를 기억한다. 그래서 innerFunction 안에서 outerFunction의 변수를 참조할 수 있음.

++ 전역변수 : 전역 스코프에서 선언한 변수들.

  지역변수 : 함수 내부에서 선언한 변수들.
# 4. 마치며 정리
너무 복잡해서 머리 터질 뻔 했다... JS 엔진의 실행과정과 같은 느낌이라 그런가..
다음 시간에는 this를 알아본다.