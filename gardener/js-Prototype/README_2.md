# Prototype Chain

저번 시간에는 Prototype Chain에 대해서 알아보았다. 이번 시간에는 Prototype Chain 에 대해서 알아본다.

prototype 객체를 참조하는 __proto__를 생략하면 인스턴스는 prototype에 정의된 프로퍼티나 메서드를 마치 자신의 것처럼 사용할 수 있다. 그런데 만약 인스턴스가 동일한 이름의 프로퍼티 또는 메서드를 가지고 있는 상황이라면 어떨까?

## 1. Method Override

```js
var Person = function(name) {
    this.name = name;
};
Person.prototype.getName = function() {
    return this.name;
};

var gardener = new Person('은수');
gardener.getName = function() {
    return '바보' + this.name;
};
console.log(gardener.getName()); // 바보 은수
```
JS 엔진이 getName 이라는 메서드를 찾는 방식
1. 가장 가까운 대상인 자신의 프로퍼티를 검색
2. 없다면 그 다음으로 가까운 대상인 __proto__를 검색하는 순서로 진행
3. 위의 예시에서 확인할 수 있듯이, __proto__에 있는 메서드는 자신에게 있는 메서드보다 검색 순서에서 밀려 호출되지 않음

위 구문에서 gardener.__proto __.getName이 아닌 gardener 객체에 있는 getName 메서드가 호출됐다. 여기서 일어난 현상을 **메서드 오버라이드**라고 한다.

매서드 위에 메서드를 덮어씌웠다는 표현이다. 원본을 제거하고 다른 대상으로 교체하는 것이 아니라 원본이 그대로 있는 상태에서 다른 대상을 그 위에 얹는 이미지를 떠올리면 정확하다.

교체하는 형태라면 원본에는 접근할 수 없는 형태가 되겠지만 얹는 형태를 상상한다면 원본이 아래에서 유지되고 있으니 원본에 접근할 수 있는 방법도 있다.

## 2. Prototype Chain

어떤 데이터의 __proto__프로퍼티 내부에서 다시 __proto__프로퍼티가 연쇄적으로 이어진 것을 **Prototype Chain**이라고 하고, 이 체인을 따라가며 검색하는 것을 **Prototype Chaining**이라고 합니다.

프로토타입 체이닝은 위에서 소개한 메서드 오버라이드와 동일한 맥락이다.

1. 어떤 메서드를 호출
2. JS 엔진은 데이터 자신의 프로퍼티를 검색
3. 원하는 메서드가 있으면 그 메서드를 실행
4. 만약 없으면 __proto__를 검색
5. 3-4 반복.

어떤 생성자 함수이든, prototype은 반드시 객체이기 때문에 **Object.prototype이 언제나 프로토타입 체인의 최상단에 존재하게 된다.** 그렇기 때문에 해당 객체에서만 사용할 메서드는 다른 여느 데이터 타입처럼 프로토타입 객체 안에 정의할 수가 없다. 객체에서만 사용할 메서드를 Object.prototype 내부에 정의한다면 다른 데이터 타입도 해당 메서드를 사용할 수 있게 되기 때문이다.

위와 같은 이유 때문에 toString, hasOwnProperty, isPropertyOf 과 같은 범용적인 메서드들이 Object.prototype에 구현되어있다. 모든 변수가 마치 자신의 메서드인 것처럼 호출할 수 있다.

## 3. 총정리

어떤 생성자 함수를 new 연산자와 함께 호출하면 Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성된다.

이 인스턴스에는 __proto__라는, Constructor의 prototype 프로퍼티를 참조하는 프로퍼티가 자동으로 부여된다.

__proto__는 생략 가능한 속성이라서, 인스턴스는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출할 수 있다.

Constructor.prototypedpsms constructor라는 프로퍼티가 있는데, 이는 다시 생성자 함수 자신을 가리킨다. 이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 때 필요한 수단이다.

계속해서 상위단계로 prototype Chaining을 하다 보면 Object.prototype에 도달하게 된다. 이 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있다. 이 때 접근 방식은 자신으로부터 가장 가까운 대상부터 점차 먼 대상으로 나아가며, 원하는 값을 찾으면 검색을 중단한다.

이 때문에 Object.prototype에는 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재하며, 객체 전용 메서드들도 Object 생성자 함수에 Static 하게 담겨있다.