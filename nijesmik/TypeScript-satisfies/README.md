# 🤔 `satisfies`란?

`TypeScript 4.9`에서 도입된 연산자로, **값이 특정 타입을 만족하는지 검사하지만, 타입 추론은 유지**하게 해줌.

## 💡 예제1 (`satisfies` vs `as` vs `: 타입 선언`)

```ts
type ColorType = 'primary' | 'secondary' | 'danger';
```

### 1️⃣ `as` 사용 (타입 단언)

타입스크립트는 강제로 타입을 맞춰주지만, 실제 값이 올바른지 확인하지 않음.

```ts
const colors = ['primary', 'secondary'] as ReadonlyArray<ColorType>;
```

- **문제점**: `"danger"`가 빠져 있어도 에러가 발생하지 않음 ❌

### 2️⃣ `: 타입 선언` 사용

타입을 강제로 적용하기 때문에, 값의 원래 타입이 무시됨.

```ts
const colors: ReadonlyArray<ColorType> = ['primary', 'secondary'];
```

- `"danger"`가 빠지면 컴파일 에러 발생! 하지만...
- `colors[0]`의 타입이 `"primary" | "secondary" | "danger"`**(유니온 타입)로 추론됨** </br>
  → 즉, 각 요소의 타입이 구체적인 `"primary"`나 `"secondary"`가 아닌, 유니온(`ColorType`)이 되어버림.

```ts
const firstColor = colors[0];
// ❌ 타입: "primary" | "secondary" | "danger" (유니온 타입)
// -> 원래는 "primary"였지만, 타입 선언으로 인해 broader(넓어진) 타입이 됨
```

👉 이렇게 되면, 원래 배열에 있던 값이 `"primary"`라는 걸 알면서도, `"danger"`일 수도 있다고 타입스크립트가 생각함.

### 3️⃣ `satisfies` 사용 → 가장 안전한 방법

값의 원래 타입을 유지하면서도, 타입을 만족하는지만 검사함.

```ts
const colors = ['primary', 'secondary', 'danger'] as const satisfies ReadonlyArray<ColorType>;
```

- `"danger"`가 빠지면 에러 발생!
- `colors` 배열의 요소 타입이 `"primary"`, `"secondary"`, `"danger"`로 **개별적으로 추론됨** </br>
  → 즉, 유니온(`ColorType`)이 아니라, 각 요소가 정확한 리터럴 타입으로 남아 있음.

```ts
const firstColor = colors[0];
// ✅ 타입: "primary" (정확한 값 유지됨!)
```

👉 `"primary"`라는 값이 그대로 유지되어, 타입이 불필요하게 `ColorType`(유니온)으로 넓어지지 않음! 🎯

## 💡 예제2 (`satisfies` vs `: 타입 선언`)

```ts
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255], // blue 오타
};
```

[(TypeScript) satisfies 연산자](https://www.zerocho.com/category/TypeScript/post/638c327844d418915ee64b0b) 블로그 참고! (타입이 넓어졌을 때 단점이 잘 설명되어 있음 👍)

# 🚀 결론

- `satisfies`를 쓰면 원래 값을 유지하면서도 타입을 만족하는지 체크할 수 있다. </br>
- 유니온 타입을 강제로 씌우는 `: 타입 선언`이나 `as`보다 더 안전하고 유연한 방법! 🎯
