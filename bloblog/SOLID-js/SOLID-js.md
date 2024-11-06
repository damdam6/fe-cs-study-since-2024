## 들어가며

- [클린코드 : 자바스크립트](<[https://github.com/sbyeol3/clean-code-javascript-kr?tab=readme-ov-file#클린코드--자바스크립트-한국어-번역](https://github.com/sbyeol3/clean-code-javascript-kr?tab=readme-ov-file#%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C--%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%9C%EA%B5%AD%EC%96%B4-%EB%B2%88%EC%97%AD)>)을 보다가 자바스크립트에 SOLID 원칙이 적용 가능할지 궁금해졌다.
- 특히 SOLID 원칙은 객체지향을 기반으로 하기 때문에 해당 원칙이 `함수를 주로 다룸 + 일반 객체지향과는 다른 클래스 문법` 을 가진 자바스크립트에 어떤 식으로 접목 되는지 찾아보았다.
- 일단 SOLID 원칙은 객체지향을 기반으로 하지만, 클래스는 함수, 데이터 및 타입을 포괄적으로 다루기 때문에 SOLID가 반드시 객체지향만을 위한 원칙은 아니라는 것을 밝히고 시작한다.

## 단일 책임 원칙 (SRP)

### 단일 책임 원칙

- 한 클래스는 하나의 책임만 가져야 한다.
- 클래스가 변경되어야 하는 이유가 한 가지보다 더 많으면 안된다
- 이는 재사용을 높이고 테스트를 쉽게 만들어 준다. 또한 하나의 클래스에 있는 많은 기능 중 하나를 수정해야 한다면 다른 모듈에 어떤 영향을 줄지 알기 어렵다.

### 예제

Bad) UserSettings 클래스가 기능을 여러 개 가지고 있음

```jsx
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

Good) UserAuth 클래스를 분할하여 UserSettings 클래스에서 가져다 씀

```jsx
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

## 개방/폐쇄 원칙 (OCP)

### 개방/폐쇄 원칙

- 확장에 열려 있어야 하고, 변경에 닫혀 있어야 한다. 즉, 이미 존재하는 코드를 변경하지 않고 새로운 기능을 추가하는 것을 허용한다.
- 내부에서 변경이 이루어지더라도 외부에서는 코드 변화가 없어야 한다.
  - e.g. 내부 동작이 바뀌었다고 함수 리턴 타입을 함부로 바꾸면 안된다 → 외부 코드 다 수정해야 함

### 예제

Bad) 새로운 notifyType이 추가될때마다 saveRecordAndNotify 내부를 변경해야함

```jsx
const saveRecordAndNotify = async (record, notifyType, notifyTo) {
    await recordManager.save(record);

    if (notifyType === "email") {
        emailManager.send(notifyTo, record);
    } else if (notifyType === "phone") {
        smsManager.send(notifyTo, record);
    }
}
```

Good) notifyType이 늘어나더라도 saveRecord에는 영향을 주지 않음

```jsx
const saveRecord = async (record, callback) {
    await recordManager.save(record);

    callback(record);
}

// 이메일로 보내기
saveRecord(record, (record) => {
    emailManager.send(notifyTo, record)
})

// SMS로 보내기
saveRecord(record, (record) => {
    smsManager.send(notifyTo, record)
})

// 슬랙으로 보내기
saveRecord(record, (record) => {
    slackManager.send(notifyTo, record)
})
```

## 리스코프 치환 원칙 (LSP)

### 리스코프 치환 원칙

- T가 부모 클래스, S가 자식 클래스라면, T 타입의 객체가 프로그램의 특성들을 변경하지 않고 S 타입의 객체로 대체될 수 있다.

### 예제

- 정사각형 - 직사각형 예시
  - 수학적으로 정사각형은 직사각형에 포함되는 관계
  - 하지만 직사각형(부모)이 너비와 높이를 자유롭게 설정할 수 있는 반면, 정사각형(자식)은 너비와 높이가 동일해야 함

Bad) 정사각형 getArea() 에서 에러 발생

```jsx
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea();
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

Good) 정사각형이 직사각형의 기능을 완전히 대체할 수 없으므로, 별도의 클래스로 구성한다.

```jsx
class Shape {
  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }

  getArea() {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

### JavaScript의 경우

- 사실 해당 원칙은 상속 기반이라서 함수형 프로그래밍에게 바로 적용하긴 어렵다.
- JavaScript 관점에서는, `먼저 선언된 조건과 나중에 선언된 조건의 충돌을 방지해야한다` 로 접근할 수 있다.
- 즉, 순환 종속성을 만들어내는 infinite Cycle을 만들지 않아야 한다.

```jsx
let [num1, setNum1] = useState(5);
let [num2, setNum2] = useState(10);
let [ratio, setRatio] = useState();

let [calc1, setCalc1] = useState();
let [calc2, setCalc2] = useState();

useEffect(() => {
  setRatio(num2 / num1);
}, [num1, num2]);

// calc1, calc2가 상호 참조의 관계에 있어 무한 루프의 위험성이 있다
// -> 의존성을 명확히 하여 단방향 참조를 하도록 수정해야 한다.
useEffect(() => {
  setCalc1(calc2 / ratio);
}, [calc2, ratio]);

useEffect(() => {
  setCalc2(calc1 * ratio);
}, [calc1, ratio]);
```

## 인터페이스 분리 원칙 (ISP)

### 인터페이스 분리 원칙

- 클라이언트는 그들이 사용하지 않는 인터페이스에 의존하도록 강제받지 않는다.

### 예제

Bad) EconomicPrinter 는 fax, scan 을 사용하지 않는데 구현을 해야 함

```jsx
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    throw new Error('Fax not supported.');
  }

  scan() {
    throw new Error('Scan not supported.');
  }
}
```

Good) 인터페이스를 분리하여 필요한 것만 사용

```jsx
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```

### JavaScript의 경우

- 자바스크립트 자체에는 인터페이스 개념이 없어 엄격하게 적용되진 않지만, 오히려 강제된 인터페이스나 타입 검사가 없기 때문에 중요하게 여겨지기도 한다.
- 자바스크립트의 덕타이핑을 활용하여 암묵적으로 해당 원칙을 적용할 수 있다.

<aside>

    ✅ 덕타이핑 (duck typing)

    “사람이 오리처럼 행동하면 오리로 봐도 무방하다” 개념에서 시작
    인터페이스 구현으로 타입을 구분하지 않고, 변수와 메소드에 의해 타입이 결정된다. → 동적 타이핑

</aside>

- 위의 Good 예시에 덕타이핑을 적용한다면?
  - 인터페이스 역할을 하는 `perform...` 함수는 해당 메서드가 있는지 확인하여 처리

```jsx
// Printer 인터페이스 역할
function performPrint(device) {
  if (typeof device.print === "function") {
    device.print();
  } else {
    console.log("This device cannot print.");
  }
}

// Fax 인터페이스 역할
function performFax(device) {
  if (typeof device.fax === "function") {
    device.fax();
  } else {
    console.log("This device cannot fax.");
  }
}

// Scanner 인터페이스 역할
function performScan(device) {
  if (typeof device.scan === "function") {
    device.scan();
  } else {
    console.log("This device cannot scan.");
  }
}

// AllInOnePrinter는 모든 기능을 구현
const allInOnePrinter = {
  print: () => console.log("Printing..."),
  fax: () => console.log("Sending fax..."),
  scan: () => console.log("Scanning document..."),
};

// EconomicPrinter는 print 기능만 구현
const economicPrinter = {
  print: () => console.log("Printing..."),
};

performPrint(allInOnePrinter); // "Printing..."
performFax(allInOnePrinter); // "Sending fax..."
performScan(allInOnePrinter); // "Scanning document..."

performPrint(economicPrinter); // "Printing..."
performFax(economicPrinter); // "This device cannot fax."
performScan(economicPrinter); // "This device cannot scan."
```

## 의존 역전 원칙 (DIP)

### 의존 역전 원칙

- 구체화에 의존하지 말고 추상화에 의존해라
- 고수준의 모듈은 저수준의 모듈에 의존적이지 않아야 하며, 두 모듈은 추상화에 의존해야 한다.
  - 고수준 모듈을 저수준 모듈의 세부사항을 기반으로 설정하면 안된다.
- 해당 원칙을 통해 모듈 간의 의존성을 낮춰준다.

### 예제

Bad) 전달받는 인스턴스의 종류에 따라 다른 메소드를 호출해야함

```jsx
class FileSystem {
  writeToFile(data) {
    // Implementation
  }
}

class ExternalDB {
  writeToDatabase(data) {
    // Implementation
  }
}

class LocalPersistance {
  push(data) {
    // Implementation
  }
}

// 고수준의 모듈
class PersistanceManager {
  saveData(db, data) {
    if (db instanceof FileSystem) {
      db.writeToFile(data);
    }

    if (db instanceof ExternalDB) {
      db.writeToDatabase(data);
    }

    if (db instanceof LocalPersistance) {
      db.push(data);
    }
  }
}
```

Good) PersistanceManager를 구체화에 의존하는것이 아닌 추상화된 storage에 의존하도록 수정

```jsx
interface Storage {
  save(data)
}

class FileSystem {
  save(data) {
    // Implementation
    ..writeToFile(data)
  }
}

class ExternalDB {
  save(data) {
    // Implementation
    ..writeToDatabase(data)
  }
}

class LocalPersistance {
  save(data) {
    // Implementation
    ..push(data)
  }
}

// 고수준의 모듈
class PersistanceManager {
  saveData(storage, data) {
    storage.save(data)
  }
}
```

### JavaScript의 경우

- 자바스크립트는 인터페이스가 없으므로, 객체가 필요한 메서드(_e.g. `save()`_)를 가지고 있는지 여부는 코드에서 암묵적으로 확인해야 한다.
- 일례로, 컴포넌트에서 직접 `axios` 나 `fetch`를 바로 호출한다면 해당 원칙에 어긋난다.
  - 이는 특정 라이브러리에 의존하게 되기 때문이다.
  - api를 별도의 모듈로 추상화하여 사용해야 한다.

## 👀 참고자료

https://github.com/sbyeol3/clean-code-javascript-kr?tab=readme-ov-file#solid

https://github.com/738/clean-code-typescript?tab=readme-ov-file#solid

https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C

https://trend21c.tistory.com/2235

https://nesoy.github.io/articles/2018-02/Duck-Typing
