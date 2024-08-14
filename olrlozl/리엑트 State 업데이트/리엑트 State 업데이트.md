### 1. 각 렌더링의 state값은 “고정”되어있고, state를 설정하면 다음 렌더링에 대해서만 변경된다.

**문제)** “증가” 버튼 한 번 클릭 시 결과는?

```jsx
	import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>증가</button>
    </>
  )
}
```

**정답)** number가 3만큼 증가하지 않고 1만 증가한다.

**이유)** onClick 핸들러에서 setNumber(number + 1)를 세 번 호출하더라도, 첫번째 렌더링에서 number는 항상 0이므로 state를 1로 세 번 설정하게 된다.


### 2. state 변수의 값은 이벤트 핸들러의 코드가 비동기적이더라도 **렌더링 내에서 절대 변경되지 않는다.

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setTimeout(() => {
    alert(number);
  }, 3000);
}}>증가</button>
```

**문제)** “증가” 버튼 클릭 시 alert창의 결과는? 

**정답)** number가 5만큼 증가하고 alert창에는 0이 표시된다.

**이유)** 첫번째 렌더링의 onClick 내에서, setNumber(number + 5)가 호출된 후에도 number의 값은 계속 0이기 때문에 alert창에 5가 아닌 0이 표시된다.


### 3. state 설정자 함수에 업데이터 함수를 전달하면, 다음 렌더링 전에 동일한 state 변수를 여러번 업데이트할 수 있다.

**문제)** “증가” 버튼 한 번 클릭 시 결과는?

```jsx
<button onClick={() => {
    setNumber(n => n + 1);
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  }}>증가</button>
```

**정답)** number가 3만큼 증가한다

**작동방식)**

  - `n => n + 1` : 업데이터 함수(updater function)
  
  1. `setNumber(n => n + 1)`: `n => n + 1`함수를 큐에 추가
  2. `setNumber(n => n + 1)`: `n => n + 1`함수를 큐에 추가
  3. `setNumber(n => n + 1)`: `n => n + 1`함수를 큐에 추가
  
  다음 렌더링 중에 `useState` 를 호출하면 React는 큐를 순회한다. 이전 `number` state는 `0`이었으므로 React는 이를 첫 번째 업데이터 함수에 `n` 인수로 전달한다. 그런 다음 React는 이전 업데이터 함수의 반환 값을 가져와서 다음 업데이터 함수에 `n`으로 전달하는 식으로 반복한다.
  
  | queued update | n | returns |
  | --- | --- | --- |
  | n => n + 1 | 0 | 0 + 1 = 1 |
  | n => n + 1 | 1 | 1 + 1 = 2 |
  | n => n + 1 | 2 | 2 + 1 = 3 |
  
  React는 `3`을 최종 결과로 저장하고 `useState`에서 반환한다.
    

### 4. `setNumber(n => n + 1);`는 **업데이터 함수**(`n => n + 1`) 를 큐에 추가하고, `setNumber(5);`는 “`5`로 바꾸기” 를 큐에 추가한다.

**문제)** “증가” 버튼 한 번 클릭 시 number의 값은?

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>증가</button>
```

**정답)** number는 42가 된다.

**작동 방식)**

  1. `setNumber(number + 5)`: number는 0이므로 *“`5`로 바꾸기”* 를 큐에 추가
  2. `setNumber(n => n + 1)`: `n => n + 1` 업데이터 함수를 큐에 추가
  3. `setNumber(42)`: *“`42`로 바꾸기”* 를 큐에 추가
  
  다음 렌더링하는 동안, React는 state 큐를 순회한다.
  
  | queued update | n | returns |
  | --- | --- | --- |
  | ”5로 바꾸기” | 0 (unused) | 5 |
  | n => n + 1 | 5 | 5 + 1 = 6 |
  | ”42로 바꾸기” | 6 (unused) | 42 |
  
  React는 `42`를 최종 결과로 저장하고 `useState`에서 반환한다.
    

### 요약

- state를 설정하더라도 기존 렌더링의 변수는 변경되지 않으며, 대신 새로운 렌더링을 요청한다.
- React는 이벤트 핸들러가 실행을 마친 후 state 업데이트를 처리하며, 이를 batching 이라고 한다.
- 하나의 이벤트에서 일부 state를 여러 번 업데이트하려면 `setNumber(n => n + 1)` 와 같이 업데이터 함수를 사용할 수 있다.


### 참고

https://react.dev/learn/state-as-a-snapshot

https://react.dev/learn/queueing-a-series-of-state-updates
