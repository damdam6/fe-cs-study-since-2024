## useDefferredValue와 useTransition

### ✅ INDEX

[React 18의 새로운 훅](#react-18의-새로운-훅)  
[useDefferredValue](#usedefferredvalue)  
[useTransition](#usetransition)  
[유사점과 차이점](#유사점과-차이점)

## React 18의 새로운 훅

- [9주차 스터디]() 때 디바운싱과 쓰로틀링을 대체할 리액트 훅으로 `useDefferredValue`, `useTransition` 을 언급
- 짧게 살펴봤을 때 어떤 점에서 유사한지 이해가 안돼서 자세히 찾아보려 함

### 등장 이유 및 동작 방식

- 렌더링 성능 최적화
- 디바운싱과 쓰로틀링의 경우, 지연 시간을 수동으로 설정해야하고, 불필요한 호출 제한으로 사용자 경험이 나빠질 수 있기 때문에 대안으로 등장함
- 사용자의 상호작용이 있으면 화면이 멈춘 것처럼 보이지 않게 유저와의 상호작용에 집중하고, 무거운 작업은 메인 스레드가 놀고 있을 때 처리한다.
- 즉, 상태 변화의 우선순위를 나누고 우선순위가 높은 이벤트를 먼저 핸들링한 다음 우선순위가 낮은 상태를 핸들링한다.

## useDefferredValue

- 상태 값 변화에 낮은 우선순위를 지정하기 위한 훅 _(defer = 지연되다, 연기하다)_
- 가장 낮은 우선순위로 상태를 변경하고 싶은 값이 있으면 useDeferredValue로 해당 값을 래핑한다.

### 예제

```jsx
import { useDeferredValue, useState } from "react";

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const deferredValue = useDeferredValue(count2);

  const onIncrease = () => {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
    setCount3(count3 + 1);
    setCount4(count4 + 1);
  };

  console.log({ count1 });
  console.log({ count2 });
  console.log({ count3 });
  console.log({ count4 });
  console.log({ deferredValue });

  return <button onClick={onIncrease}>클릭</button>;
}
```

![defer.png]()

## useTransition

- `[isPending, startTransition]` 값을 반환한다.
  - isPending은 boolean 타입으로, 상태 변화가 지연되고 있음을 알린다.
  - startTransition은 상태 변화를 일으키는 콜백함수를 전달받는다. 이 때 해당 콜백함수는 낮은 우선순위로 실행되게 된다.

### 예제

- setText는 `startTransition` 함수로 래핑되어 있다.
- 따라서 setValue 가 먼저 진행된 다음 낮은 우선순위로 실행된다.

```jsx
import { useState, useTransition } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const onChange = (e) => {
    startTransition(() => {
      setText(e.target.value);
    });
    setValue(e.target.value);
  };

  console.log({ text, isPending });
  console.log({ value });

  return <input type="text" onChange={onChange} />;
}
```

![trans.png]()

### 두 hook 의 차이점?

- useDeferredValue
  - 값을 래핑하여 해당 값이 변화하는 것의 우선순위를 낮춘다
  - e.g. const deferredValue = useDeferredValue(count2);
- useTransition
  - 상태를 변경시키는 함수를 래핑하여 해당 함수의 우선순위를 낮추고, 다른 상태변경이 모두 일어난 다음 실행이 되게 한다.
  - e.g. startTransition(() => { setText(e.target.value); });

## 유사점과 차이점

(w/ 디바운싱, 쓰로틀링)

### 유사점

- 렌더링 성능 최적화라는 목적이 동일하다.
- 모두 사용자의 상호작용을 즉시 처리하지 않고 일정 시간 지연시키는 성격이 있다.
- 보통 `useDeferredValue` 와 디바운싱을 유사하다고 묶는다.
  - `useDeferredValue`는 값 업데이트의 우선순위를 낮추어 더 중요한 작업을 먼저 처리한다.
  - 일례로, 사용자가 검색어를 빠르게 입력할 때 실시간으로 바뀌는 값을 바로 렌더링하지 않고 최종적으로 값이 안정화된 후 마지막 값을 렌더링한다. 그 사이에 우선적으로 사용자 인터랙션이나 애니메이션 등 더 중요한 업데이트를 처리한다.
- 또한 `useTransition` 는 쓰로틀링과 비교할 수 있다.
  - `useTransition`는 무거운 상태 업데이트 작업을 비동기적으로 처리하여 업데이트 빈도를 조절한다.

### 차이점

- 디바운싱과 쓰로틀링은 직접적으로 지연을 주어 이벤트 발생 빈도를 제어한다.
- `useDeferredValue`와 `useTransition`은 상태 변경의 우선순위를 조절하여 처리를 지연시킨다.

## 👀 참고자료

https://doiler.tistory.com/83

[https://velog.io/@ktthee/React-18-에-추가된-useDeferredValue-를-써-보자](https://velog.io/@ktthee/React-18-%EC%97%90-%EC%B6%94%EA%B0%80%EB%90%9C-useDeferredValue-%EB%A5%BC-%EC%8D%A8-%EB%B3%B4%EC%9E%90)

[https://velog.io/@leejpsd/React18-디바운스Debounce와-스로틀Throttle-을-대체할-HOOK](https://velog.io/@leejpsd/React18-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4Debounce%EC%99%80-%EC%8A%A4%EB%A1%9C%ED%8B%80Throttle-%EC%9D%84-%EB%8C%80%EC%B2%B4%ED%95%A0-HOOK)
