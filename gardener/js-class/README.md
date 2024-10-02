# Class
벌써 Core JavaScript 이 책의 마지막 부분 Class 이다. 다음 주에는 뭐를 해야할지 슬슬 고민이 되는 부분.

클래스 : 어떤 사물의 공통적인 속성을 모아 정의한 것. 추상적인 개념.
## 1. Class & Instance

<img alt="ㅎㅅㅎ" src="https://blog.kakaocdn.net/dn/dNxJAF/btrS9PEWVjp/wEynPmtYYqIlAJyGLZKkk1/img.png">

클래스에는 상하관계가 존재한다. 클래스는 하위로 갈수록 상위 클래스의 속성을 상속하면서 더 구체적인 요건이 추가 또는 변경된다. 그럼에도 하위 클래스가 아무리 구체화되더라도 이들은 결국 추상적인 개념일 뿐이다.

인스턴스 : 클래스의 속성을 지니는 실존하는 개체. 어떤 클래스에 속한 개체는, 그 클래스의 조건을 모두 만족하므로 그 클래스의 구체적인 예시, 즉 인스턴스가 된다.

현실세계에서는 개체들이 이미 존재하는 상태에서, 이들을 구분짓기 위해 클래스를 도입한다. 그러나 프로그래밍 언어 상에는 접근방식이 정반대이다. 사용자가 직접 여러 클래스를 정의해야 하며, 클래스를 바탕으로 인스턴스를 만들 때, 비로소 어떤 개체가 클래스의 속성을 지니게 된다. 또한, 한 인스턴스는 하나의 클래스만을 바탕으로 만들어지며, 인스턴스를 생성할 때 호출할 수 있는 클래스는 오직 하나뿐이다.
## 2. JavaScript의 Class

0. 들어가며

지금까지 우리가 학습해왔던 내용을 기반으로 하면, JavaScript는 Prototype 기반 언어이므로 클래스의 개념이 존재하지 않다고 배웠다. 하지만 Prototype 을 일반적인 의미의 클래스 관점에서 접근해보면 비슷하게 해석할 수 있는 요소가 있다.

<img src="https://hdw0903.github.io/images/static_member.png">

1. 생성자 함수 Array를 new 연산자와 함께 호출하며 인스턴스를 생성한다.
2. 이 때 Array를 일종의 Class라고 하면, Array의 Prototype 객체 내부 요소들이 인스턴스에 '상속'된다고 볼 수 있다.
3. (엄밀히는 상속이 아닌 프로토타입 체이닝에 의한 참조) 그러나 결과적으로는 동일하게 동작한다.
4. 한편 Array 내부 프로퍼티들 중 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는다.

인스턴스에 상속되는지 (인스턴스가 참조하는지) 여부에 따라 Static member와 Instance member 로 나뉜다. 이 분류는 다른 언어의 클래스 구성요소에 대한 정의를 차용한 것으로서 클래스 입장에서 사용 대상에 따라 구분한 것.

```js
// 생성자
var Rectangle = function (widtgh, height) {
    this.width = width;
    this.height = height;
}

//프로토타입 메서드
Rectangle.prototype.getArea = function(){
    return this.width * this.height
}

// 스태틱 메서드
Rectangle.isRectangle = function (instance) {
    return instance instanceof  Rectangle && instance.width>0 && instance.height > 0;
}

var rect1 = new Rectangle(3,4)
console.log(rect1.getArea()); //12
console.log(rect1.isRectangle(rect1)); //Error
console.log(Rectangle.isRectangle(rect1)) // true
```

인스턴스에서 직접 호출할 수 있는 메서드를 프로토타입 메서드를 프로토타입 메서드, 인스턴스에서 직접 접근할 수 없는 메서드를 스태틱 메서드라고 한다.
스태틱 메서드는 생성자 함수를 this로 해야만 호출할 수 있다.

일반적인 사용 방식, 즉 구체적인 인스턴스가 사용할 메서드를 정의한 '틀' 역할을 담당하는 목적을 가질 때의 클래스는 추상적인 개념이다. 하지만 클래스 자체를 this로 해서 직접 접근해야만 하는 스태틱 메서드를 호출할 때의 클래스는 그 자체가 하나의 개체로서 취급된다.
## 3. 클래스 상속

클래스 상속을 흉내내기 위한 3가지 방법을 소개한다.

1) SubClass.prototype에 SuperClass의 인스턴스를 할당한 다음 프로퍼티를 모두 삭제하는 방법

서브클래스의 프로토타입을 부모 클래스의 인스턴스로 설정하는 것입니다. 이렇게 하면 서브클래스는 부모 클래스의 모든 메서드와 프로퍼티를 상속받게 된다. 이렇게 하면 부모 클래스의 인스턴스 프로퍼티도 상속받게 되는데 이는 원치 않은 결과일 수도 있다. 그래서 상속받고 싶지 않은 프로퍼티를 삭제할 수 있다.

```javascript
function SuperClass() {
  this.name = "Super";
}

SuperClass.prototype.sayHello = function () {
  console.log("Hello from SuperClass");
};

function SubClass() {
  SuperClass.call(this); // SuperClass의 생성자 호출
}

SubClass.prototype = new SuperClass(); // SuperClass의 인스턴스를 SubClass의 프로토타입으로 설정
delete SubClass.prototype.name; // 불필요한 프로퍼티 삭제
SubClass.prototype.constructor = SubClass; // constructor 수정

const instance = new SubClass();
instance.sayHello(); // 부모 클래스의 메서드 사용
```
1. SuperClass 생성자 함수 : SuperCalss 는 생성자 함수로, 인스턴스가 생성될 때 name 이라는 프로퍼티가 "Super" 로 설정된다. / 이 생성자 함수는 프로토타입에 sayHello 라는 메서드를 추가했다.
2. SubClass 생성자 함수 : SubClass 내부에서 SuperClass.call(this) 를 호출했다. 이것은 SuperClass의 생성자 함수를 SubClass 안에서 실행한다., 이로 인해 name 프로퍼티가 SubClass 인스턴스에 생성된다.
3. call(this)는 SuperClass의 코드를 SubClass 의 인스턴스 문맥에서 실행하므로, SubClass 인스턴스에 부모 클래스의 프로퍼티들이 복사가 된다.
4. 프로토타입 할당 : SubClass.prototype = new SuperClass()는 서브 클래스의 프로토타입을 부모 클래스의 인스턴스로 설정하는 것인데, 이 과정에서 부모 클래스가 가지고 있는 모든 메서드와 프로퍼티들이 상속된다.
5. 그러나 위 과정에서 name 이라는 인스턴스 프로퍼티도 함께 상속되었다. 이는 인스턴스가 생성될 때마다 덮어쓰게 되어서 원하지 않는 동작이 아닐수도 있다.
6. 그렇기 때문에 프로퍼티를 삭제한다. delete.SubClass.prototype.name 으로 필요 없는 name 프로퍼티를 삭제한다. 이로 인해 서브 클래스는 더 이상 부모ㅓ 클래스의 name 프로퍼티를 상속받지 않게 된다.
7. Constructor 수정 : 마지막으로 SubClass.prototype.constructor를 SubClass로 다시 설정하는 이유는, 자바스크립트에서 상속을 설정하면 constructor가 부모 클래스 쪽으로 연결될 수 있기 때문에 이를 바로잡는 과정이다.

2) 빈 함수(Bridge)를 활용하는 방법

중간에 Bridge 역할을 하는 빈 함수를 사용하는 것이다. 이를 통해 부모 클래스와 서브 클래스 간의 관계를 느슨하게 만들 수 있다. 직접 부모 클래스의 인스턴스를 서브클래스의 프로토타입에 할당하지 않고, 중간 다리 역할을 하는 함수를 끼워 넣는다.

```js
function SuperClass() {}
SuperClass.prototype.sayHello = function () {
  console.log("Hello from SuperClass");
};

function SubClass() {}

function Bridge() {}
Bridge.prototype = SuperClass.prototype; // 부모 클래스의 프로토타입을 브리지 함수에 연결
SubClass.prototype = new Bridge(); // 서브클래스의 프로토타입을 브리지 인스턴스로 설정
SubClass.prototype.constructor = SubClass; // constructor 수정

const instance = new SubClass();
instance.sayHello(); // "Hello from SuperClass" 출력
```
1. Bridge 함수의 역할 : Bridge는 아무 동작도 하지 않는 빈 함수다. 그 프로토타입에 SuperClass.prototype을 할당해 부모 클래스의 프로토타입을 복사하는 역할을 한다.
2. 상속 구조의 느슨한 결합 : 이 방법은 부모 클래스와 자식 클래스 간의 결합을 느슨하게 만들기 위한 방법이다. 즉, 부모 클래스의 인스턴스가 직접적으로 자식 클래스의 프로토타입에 할당되지 않도록 브리지를 두어, 상속 구조를 더 유연하게 유지할 수 있다.
3. 프로토타입 연결 : SubClass.prototype = new Bridge(); 로 브리지의 인스턴스를 서브클래스의 프로토타입으로 설정한다. 이렇게 하면 부모 클래스의 프로토타입을 참조하고 있으므로, 서브클래스도 부모 클래스의 메서드를 상속받게 된다.
4. constructor 수정 : 1) 방법과 마찬가지로 constructor 를 다시 한 번 수정해 서브클래스의 생성자를 명확히 설정한다.

3) Object.create를 이용하는 방법
   Object.create()는 가장 간단한 방법이다. 이 방법을 사용하면 서브클래스의 프로토타입을 부모 클래스의 프로토타입으로 연결할 수 있다. 이 방법은 서브클래스의 프로토타입에 부모 클래스의 인스턴스를 할당하는 것보다 더 명확하고, 상속 구조가 명료하게 표현된다.

```js
function SuperClass() {}
SuperClass.prototype.sayHello = function () {
  console.log("Hello from SuperClass");
};

function SubClass() {}

SubClass.prototype = Object.create(SuperClass.prototype); // SuperClass의 프로토타입을 상속
SubClass.prototype.constructor = SubClass;

const instance = new SubClass();
instance.sayHello(); // 부모 클래스의 메서드 사용
```

1. Object.create()의 역할 : Object.create(SuperClass.prototype) 을 사용해서, 부모 클래스의 프로토타입을 복사하고 새로운 객체를 만들어, 서브클래스의 프로토타입에 할당한다. 명료한 상속 구조를 설정한다.
2. 프로토타입 상속 : Object.create()는 객체를 생성하는 방법인데, 여기서 부모 클래스의 프로토타입을 새 객체의 프로토타입으로 설정해준다. 즉, 서브클래스는 부모 클래스의 메서드들을 상속 받게 된다.
3. Constructor 수정 : 역시 Constructor 는 다시 SubClass로 수정. JS 상속 구조에서 정확한 생성자를 가리키도록 만드는 것.

## 4. 마무리하며

일단 책에서도 JS의 클래스는 제일 어렵다고 이야기하고 있다. 가볍게..(?) 읽어주시면 될 것 같다. 이제 Core Javascript 의 교재 정리는 오늘이 마지막이다. 이제 다음으로 무엇을 해야할지 고민해야겠다.