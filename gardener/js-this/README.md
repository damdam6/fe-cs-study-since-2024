# This

정의 : 클래스로 생성한 인스턴스 객체 (JS에서는 어디서든 사용 가능함)

사용 : JS에서 This 는 실행 컨텍스트가 생성될 때 함께 결정된다. 이 때, 실행 컨텍스트는 함수를 호출할 때 생성되므로, **This는 함수를 호출할 때 결정된다.** 라고 할 수 있다.

## 1. 전역 공간에서의 this
 전역 공간에서의 this는 전역 객체를 가리킨다. (전역 컨텍스트를 생성하는 주체가 바로 전역 객체이기 때문)

++ 런타임 환경에 따라 다른 이름과 정보를 가진 전역 객체
+ window : 브라우저 환경에서 전역객체
+ global : Node.js 환경에서 전역객체

```javascript
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```

## 2. 메서드로서 호출할 때, 그 메서드 내부에서의 this
+ 함수 : 독립적인 기능을 수행
+ 메서드 : 자신을 호출한 대상 객체에 관한 동작을 수행 / 객체의 메서드로서 호출한 경우에만 메서드로 동작함

1) 함수로서 동작하는 경우
```js
function sayHello() {
    console.log(this.name);
}

const person = {
    name: 'Alice',
    greet: sayHello
};

// 1. 함수로서 호출
sayHello(); // undefined 출력 (전역 객체의 name을 참조하려 하지만, 기본적으로 정의되지 않음)
```

먼저 위 구문을 이해하기 전에 객체의 프로퍼티가 무엇인지 이해를 하고 가야한다.

객체의 프로퍼티 : 객체 내에서 특정 값을 가지는 변수나 함수이다. JS에서 객체는 키(Key) 와 값(Value) 의 쌍으로 구성된 데이터 구조이며 이 키-값 쌍을 "프로퍼티" 라고 부른다.

이러한 상황에서  person 객체는 Alice와 sayHello() 라는 값을 가지는 프로퍼티를 보유하고 있다. 다시

위 구문에서 sayHello()를 호출할 때, 이는 함수로서 호출하는 방식이다. 하지만 위 예제에서 sayHello()를 직접 호출하게 된다면 이의 this 는 window 객체를 가리키고 있다. 그렇기에 'window.name'이 정의되고 있지 않다면, this.name은 undefined를 출력하게 된다.

그렇다면 대체 Alice는 어떻게 호출할 수 있는데?

2) 메서드로서 동작하는 경우
```js
const person = {
    name: 'Alice',
    greet: function() {
        console.log(this.name);
    }
};

// 2. 메서드로서 호출
person.greet(); // 'Alice' 출력
```
바로 위와 같이 person 객체안에 greet의 값(Value)로써 function() 프로퍼티를 가지도록 하고 메서드로서 호출하는 방식으로 불러올 수 있다.

this.name => person.name을 불러오게 된다.

정리하면 어떤 함수를 호출할 때, 그 함수 이름 (프로퍼티명) 앞에 객체가 명시돼 있는 경우는 메서드로 호출한 것이고, 그렇지 않은 모든 경우에서는 함수로 호출한 것이다.

이렇게 함수 내부에서 this가 전역 객체를 바라보는 문제를 보완하기 위해서, this를 바인딩하지 않는 화살표 함수가 ES6에서 새로 도입되게 된다.

3) 생성자 함수 내부에서의 this

생성자 : 구체적인 인스턴스를 만들기 위한 일종의 틀
```js
var Cat = function (name, age) {
    this.bark = '야옹';
    this.name = name;
    this.age = age;
};

var choco = new Cat('초코', 7);
var nabi = new Cat('나비', 5);
console.log(choco, nabi);

/* 결과
Cat {bark: '야옹', name: '초코', age: 7}
Cat {bark: '야옹', name: '나비', age: 5} 
* */
```

## 3. 정리

1. 전역공간에서의 this는 전역객체 (브라우저에서는 window, Node.js에서는 global)를 참조한다.
2. 어떤 함수를 메서드로서 호출한 경우, this는 메서드 호출 주체 (메서드명 앞의 객체)를 참조한다.
3. 어떤 함수를 함수로서 호출한 경우 this는 전역객체를 참조한다. 메서드의 내부함수에서도 같습니다.
4. 생성자 함수에서의 this는 생성될 인스턴스를 참조합니다.