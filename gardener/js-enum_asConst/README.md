# Enum과 as Const

프로젝트를 진행하다가, enum과 as const가 상수(constants)로 사용될 수 있다는 것을 알았다. 이 두가지는 상수값을 명시적으로 정의하고, 타입 안정성을 제공한다. 하지만 이 둘에는 명백한 차이가 있었음.

## 1.Enum

> enum (Enumerated Type)
열거형 타입 데이터를 정의할 때 사용한다.

enum은 관련된 상수들의 집합을 정의하고, 이 집합 내의 각 상수는 고유한 값 (보통 숫자 또는 문자열) 을 가집니다.

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// 사용 예시
let move: Direction = Direction.Up;
```

enum은 TS에서 JS로 컴파일되는 과정에서 Key-Value의 관계가 양방향으로 구현된다.

사용 시점
1. 명확하게 정의된 상수 집합이 필요할 때
2. 상수의 값을 숫자 또는 문자열로 관리하고 싶을 때
3. 코드의 가독성을 높이고, 그룹화된 상수 값을 사용할 때.

장점
1. 생산성과 가독성이 높아집니다.
2. 정의한 Key-Value 관계만 성립할 수 있기 때문에 예기치 못한 에러를 발생을 방지 가능.

단점
1. 컴파일시 코드의 양이 증가함 - 굳이 Key-Value의 양방향 정의가 필요하지 않다면, 쓰지 않아도 됨.
2. Tree-Shaking (코드를 제거하여 코드를 가볍게 만드는 최적화 과정) 이 되지 않는다. - JS로 컴파일하는 과정에서 enum은 즉시 실행 함수로 컴파일 되기 때문에 enum의 구현과정에서 코드는 자체적으로 쓰이게 된다. 따라서 enum을 선언만 해두고 사용하지 않는다면 실제 컴파일된 코드에서는 enum이 살아있게 됨.

## 2. Const Enum
> const enum
JS로 컴파일 과정에서 코드가 남지 않음.

위 enum의 단점을 없앤 것

1. enum은 Key-Value의 관계가 양방향이 되지 않음
2. inlined되기 때문에 코드가 가벼워지고, Tree-shaking도 가능하게 됨. (readonly와 같이 동작함)


---

## 3. as Const

> as const
리터럴 타입을 정의할 때 사용

주로 객체나 배열의 값을 불변으로 만들고, 그 값 자체를 타입으로 사용하고자 할 때 유용함. as const를 사용하면, 해당 값이 변경되지 않음을 보장하고, 그 값을 타입 시스템에서 그대로 사용한다.

사용 시점
1. as const는 특정 값의 집합을 정의하고 그 값 자체를 타입으로 사용함.
2. 그 값이 변경되지 않음을, 보장하고 싶을 때

```ts
const COLORS = ['red', 'green', 'blue'] as const;

// 사용 예시
type Color = (typeof COLORS)[number];
let myColor: Color = 'red'; // 'red' | 'green' | 'blue' 타입
```

Type의 추론 범위를 줄여, 해당 값 자체를 Type의 추론 범위를 줄여서 해당 값 자체를 Type으로 만들어준다. 비록 양방향 바인딩을 해주지는 못하지만, 상수가 아닌 것을 상수로 만들어줌.
따라서 양방향 Mapping이 굳이 필요 없고, Value만 받아와서 Literal Type으로 지정하고 싶다면 as const 문법을 쓰면 충분함.

