# 프로토타입

자바스크립트는 프로토타입 기반 언어이다. 어떠한 객체를 원형(prototype) 으로 삼고 이를 복제(참조) 함으로써 상속과 비슷한 효과를 얻는다.

## 1. 프로토타입 개념의 이해
<img alt="ㅎㅅㅎ" height="300px" width="300px" src="https://miro.medium.com/v2/resize:fit:1200/1*uZYj9v5TzGCX7NTfjjD_TA.png">

```js
var instance = new Constructor();
```
1. 어떤 생성자 함수(Constructor)를 new 연산자와 함께 호출한다.
2. Constructor에서 정의된 내용을 바탕으로 새로운 Instance가 생성된다.
3. 이때 instance에는 __proto__라는 프로퍼티가 자동으로 부여된다.
4. 이 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

++prototype? __proto__? 프로퍼티?

prototype은 객체이다. 이를 참조하는 __proto__ 역시 객체. prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장한다. 그러면 인스턴스에서도 숨겨진 프로퍼티인 __proto__를 통해 이 메서드들에 접근할 수 있게 된다.

```javascript
// Person.prototype

var Person = function(name) {
    this._name = name;
};

Person.prototype.getName=   function() {
    return this._name;
};
```
이 때 Person의 인스턴스는 __proto__ 프로퍼티를 통해 getName을 호출할 수 있다.

```javascript
var gardener =  new Person('Gardener');
Gardener.__proto__.getName(); // undefined
Person.prototype === gardener.__proto__ // true
```
왜냐면 instance의 __proto__가 Constructor의 prototype 프로퍼티를 참조하므로 결국 둘은 같은 객체를 바라보기 때문이다.

하지만 메소드 호출 결과로 Gardener라는 값이 나오거나, 에러가 호출되지 않고 왜 undefined가 출력되었을까? 

1. 어떤 변수를 실행해 undefined가 나왔다는 것은 이 변수가 '호출할 수 있는 함수'에 해당한다는 것을 의미한다.
2. 만약 실행할 수 없는, 즉 함수가 아닌 다른 데이터 타입이었다면 TypeError가 발생했을 것이다.
3. 값이 에러가 아닌 undefined가 나왔으니 getName이 실제로 실행됐음을 알 수 있고, getName이 함수라는 것이 입증되었다.

그렇다면 왜 undefined라는 값을 반환하게 되었을까?

1. this에 바인딩된 대상이 잘못 지정되어 있기 때문에!
2. 어떤 함수를 '메서드로서' 호출할 때에는 메서드면 바로 앞의 객체가 this가 된다.
3. gardener.__proto__.getName() 에서 getName 함수 내부에서의 this는 gardener가 아니라 gardener.__ proto __ 라는 객체가 되는 것
4. 이 객체 내부에는 name 프로퍼티가 없음.
5. 찾고자 하는 식별자가 정의돼 있지 않을 때는 Error 대신 undefined 를 반환하는 JS!
6. 만약 우리가 의도하는 값을 반환하기 위해서는 아래와 같이 name 프로퍼티를 만든다.

```javascript
var gardener = new Person('Gardener');
gardener.__proto__._name = 'Gardener__proto__';
gardener.__proto__.getName(); // Gardener__proto__
```

우리가 지금까지 __proto__를 쓰지 않고도 코드를 작성할 수 있었던 이유는, 자바스크립트가 객체의 프로토타입 체인을 자동으로 탐색하기 때문입니다. 따라서 우리가 gardener.getName()을 호출하면, 자바스크립트는 내부적으로 gardener.__proto__를 통해 getName을 찾아 실행합니다. 그래서 __proto__를 명시적으로 쓰지 않아도 메서드 호출이 가능합니다.
```javascript
gardener.__proto__.getName();
-> gardener.getName();
```

## 2. 크롬 개발자 도구에서도 확인해보기.

```js
var Constructor = function(name) {
    this.name = name;
};
Constructor.prototype.method1 = function() {};
Constructor.prototype.property1 = 'Constructor Prototype Property';

var instance = new Constructor('Instance');
console.dir(Constructor); // Constructor의 디렉터리 구조를 출력
console.dir(instance); // instance의 디렉터리 구조를 출력
```
를 개발자 도구에서 실행하면 아래와 같은 정보가 나온다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdfj0vI%2Fbtr8LgHMoso%2FNWzkuLcbRyEnKQCRxRc2Ak%2Fimg.png">

위 출력결과를 통해, instance의 __proto__ 가 객체의 prototype을 참조하기 때문에 같은 정보를 가지고 있는 것을 알 수 있다.

```js
var arr =[1,2];
console.dir(arr);
console.dir(Array);
```
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlBT6b%2Fbtr8LhtbeE6%2FllbsejsqbPF7Rw2A2TMRJ1%2Fimg.png">

인덱스, length, 무엇보다 __proto__ 가 옅은 색상으로 표기되어있는 것을 알 수 있다. 이 안에는 우리가 사용하는 많은 메서드들이 모두 들어있는 것을 볼 수 있다.

<img src="https://blog.kakaocdn.net/dn/xFqMv/btqR1ERDRY9/MyOD5Y958k34d7BIaKt4x0/img.png">

위 출력 결과를 그림으로 구체화하면 위와 같다.

1. Array를 new 연산자와 함께 호출해서 인스턴스를 생성하든, 배열 리터럴을 생성하든 instance인 [1,2] 가 만들어진다.
2. 이 인스턴스의 __proto__는 Array.prototype을 참조한다.
3. __proto__가 생략 가능하도록 설계되어 있기 때문에 인스턴스가 push, pop, forEach 등의 메서드를 마치 자신의 것처럼 호출할 수 있다.
4. ++ Array의 프로토타입 내부에 있지 않은 form, isArray 등의 메서드들은 인스턴스가 직접 호출할 수 없다. 이들은 Array 생성자 함수에서 직접 접근해야 실행이 가능하다.

```js
var arr = [1,2];
arr.forEach(function () {}); 
Array.isArray(arr); // returns true
arr.isArray(); // TypeError : arr.isArray is not a function
```

## 정리

1. 자바스크립트는 함수에 자동으로 객체인 prototype 프로퍼티를 생성한다.
2. 해당 함수를 생성자 함수로서 사용할 경우, 즉 new 연산자와 함께 함수를 호출할 경우
3. 그로부터 생성된 인스턴스에는 숨겨진 프로퍼티인 __proto__가 자동으로 생성된다.
4. 이 프로퍼티는 생성자 함수의 prototype을 참조한다.
5. 이 __proto__ 는 생략 가능하도록 구현되어 있다.

-> **생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.**