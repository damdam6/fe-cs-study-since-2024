# 일급객체와 javascript

### 일급 객체란?

<aside>
💡 A first class object is an entity that can be dynamically created, destroyed, passed to a function, returned as a value, and have all the rights as other variables in the programming language have.

</aside>

- 일급 객체의 조건
    1. All items can be the actual parameters of functions
        
        함수의 매개변수가 될 수 있다.
        
    2. All items can be returned as results of functions
        
        함수의 결과로 반환될 수 있다.
        
    3. All items can be the subject of assignment statements
        
        할당문의 대상이 될 수 있다. (변수 등에 할당할 수  있다.)
        
    4. All items can be tested for equality
        
        서로 같은지 비교할 수 있다.
        

### 일급 객체와 일급 함수

- 일급 함수 (first-class function)
    - 특정한 언어가 함수를 일급 객체로서 지원하는가 여부에 대한 확인을 위해 사용되는 용어다.
    - 일반적으로 ‘일급 함수’라는 용어를 독립적으로 사용하는 경우는 드물다.
    - ‘일급 함수를 지원한다’는 개념으로서 사용한다.
    - 일급 함수를 지원하면, 함수를 값으로서 취급한다는 개념이다.

- 고차 함수 (higher-order function)
    - 수학적 의미에서의 함수에서 자주 사용된다.
    - 다른 함수에 작용하는 함수로, 하나 이상의 함수를 인수로 받거나 함수를 반환할 수 있는 것을 의미한다.
    - 일급 함수와 고차 함수는 밀접하게 연관되어 있으나 서로 다르다.

- 자바스크립트의 함수는 일급 객체이다.  = 자바스크립트는 일급 함수를 지원한다.
    
    ```jsx
    // f: function that takes a number and returns a number
    // deltaX: small positive number
    // returns a function that is an approximate derivative of f
    
    function makeDerivative( f, deltaX )
    {
        var deriv = function(x) { 
           return ( f(x + deltaX) - f(x) )/ deltaX;
        }
        return deriv;
    }
    
    var cos = makeDerivative( Math.sin, 0.000001);
    
    // cos(0)     ~> 1
    // cos(pi/2)  ~>
    ```
    

### 자바스크립트의 함수

- 자바스크립트의 함수는 모두 Function 객체의 인스턴스다.
    - `Function.prototype` 에 정의된 property를 갖는다.

- function의 property
    - `Function.prototype.arguments`
    - `Function.prototype.caller`
    - `Function.prototype.constructor`
    
    - `displayName`
    
    - `length`
    - `name`
    - `prototype`

- 함수 생성자와 함수 선언의 차이점
    - 함수 생성자
        
        ```jsx
        const add = new Function('a', 'b', 'return a + b');
        console.log(add(2, 3)); // 5
        ```
        
    - 함수 선언
        
        ```jsx
        function add(a, b) {
            return a + b;
        }
        console.log(add(2, 3)); // 5
        ```
        
    
    ⇒ 함수 생성자로 생성된 함수는 함수 선언과 달리 생성 컨텍스트에 대한 클로저를 만들지 않는다. 항상 전역 스코프에서 생성된다. 따라서 실행 시, 이 함수들은 자신의 로컬변수와 전역변수에만 접근 가능하고, Function 생성자가 생성된 스코프의 변수에는 접근이 불가능하다.
    
    - 예시
        
        ```jsx
        // Create a global property with `var`
        var x = 10;
        
        function createFunction1() {
          const x = 20;
          return new Function("return x;"); // this `x` refers to global `x`
        }
        
        function createFunction2() {
          const x = 20;
          function f() {
            return x; // this `x` refers to the local `x` above
          }
          return f;
        }
        
        const f1 = createFunction1();
        console.log(f1()); // 10
        const f2 = createFunction2();
        console.log(f2()); // 20
        ```
        
        - `f1()` 은 Node.js 환경에서 에러가 발생한다. / 브라우저 환경에서는 오류가 발생하지 않는다.
            - 브라우저에서는 `var x = 10` 이 전역 객체 (`window` )의 속성이 되므로 10을 반환하며 에러가 발생하지 않는다.
            - Node.js에서는 `var x = 10` 이 모듈 스코프 내에서만 유효하기 때문에, 전역 변수에서 `x`를 찾을 수 없어 에러가 발생한다.
        

---

https://stackoverflow.com/questions/245192/what-are-first-class-objects

https://stackoverflow.com/questions/4912116/closure-vs-anonymous-function-difference

https://stackoverflow.com/questions/10141124/any-difference-between-first-class-function-and-high-order-function

https://stackoverflow.com/questions/51784263/how-do-javascript-functions-have-properties-in-them

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions