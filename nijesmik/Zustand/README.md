# Zustand

## 💡 Selector

Zustand에서 스토어의 특정 부분만 선택하여 구독하는 함수

```tsx
import create from "zustand";

// Zustand 스토어 생성
const useStore = create((set) => ({
    count: 0,
    text: "Hello",
    increment: () => set((state) => ({count: state.count + 1})),
    setText: (newText) => set({text: newText}),
}));

// count만 구독하는 컴포넌트
const CountComponent = () => {
    const count = useStore((state) => state.count);
    return <div>Count: {count}</div>;
};

// text만 구독하는 컴포넌트
const TextComponent = () => {
    const text = useStore((state) => state.text);
    return <div>Text: {text}</div>;
};
```

- ✔️ `CountComponent`는 `count`만 구독하므로 `text`가 변경될 때 리렌더링되지 않음.
- ✔️ `TextComponent`는 `text`만 구독하므로 `count`가 변경될 때 리렌더링되지 않음.
- ✔️ 같은 스토어를 사용하더라도 각각의 컴포넌트가 구독하는 값이 다르면 서로 영향을 미치지 않음.

## ❌ 주의 사항

### 1️⃣ 인자 없이 사용하는 경우 (스토어 전체를 구독)

```tsx
const {count, increase} = useStore(); // ❌ 전체 상태를 가져옴
```

- 🚨 이 코드는 스토어의 모든 값이 변경될 때 리렌더링되므로 최적화가 전혀 안 됨.
- ✔️ 해결 방법: 필요한 값만 선택적으로 구독

### 2️⃣ 구독할 때 객체나 배열로 반환하는 경우

```tsx
const {count} = useStore((state) => ({count: state.count}));
```

```tsx
const [count, text] = useStore((state) => [state.count, state.text]);
```

- 🚨 객체가 매번 새로운 참조값을 가지게 되어, 상태가 변하지 않아도 리렌더링이 발생

## 💡 `shallow()`

Zustand의 `shallow`는 객체의 얕은 비교(Shallow Comparison)를 수행하는 함수이다. </br>
배열이나 객체를 상태로 구독할 때, `shallow`를 사용하면 불필요한 렌더링을 줄일 수 있음

```tsx
const user = useStore((state) => ({count: state.count, name: state.name}));
```

- ❌ user 객체가 매번 새로운 참조값을 가지므로, 리렌더링 발생

```tsx
import {shallow} from "zustand/shallow";

const user = useStore((state) => ({count: state.count, name: state.name}), shallow);
```

- ✅ `shallow` 비교를 통해 `count`나 `name`이 변하지 않으면 리렌더링 방지

## 💡 `getState()`

`getState()`는 Zustand 스토어의 현재 상태를 가져오는 함수로, `useStore()` 없이도 상태를 읽을 수 있음

### 1️⃣ 기본 사용법

```tsx
const count = useStore.getState().count;
```

- `getState()`을 사용하면 컴포넌트가 상태를 구독하지 않기 때문에 리렌더링이 자동으로 발생하지 않음.

### 2️⃣ `useStore()`와 `getState()`의 차이점

| 기능         | `useStore()`                                    | `getState()`                               |
|------------|-------------------------------------------------|--------------------------------------------|
| 구독 여부      | ✅ 상태 변경 시 자동 리렌더링                               | ❌ 구독하지 않음                                  |
| 사용 방식      | `const count = useStore(state => state.count);` | `const count = useStore.getState().count;` |
| 주로 사용되는 곳  | 컴포넌트 내부 (UI 업데이트용)                              | 이벤트 핸들러, 비동기 함수, 외부 로직                     |
| 리렌더링 발생 여부 | ✅ 상태 변경 시 발생                                    | ❌ 발생하지 않음                                  |

