## Redux란

- 애플리케이션 상태를 효율적으로 관리하기 위한 상태 관리 라이브러리

## Redux를 사용하는 이유

- **중앙 집중화된 상태 관리**
    - Redux는 모든 상태를 **하나의 중앙 Store**에서 관리.
    - 이를 통해 상태를 한 곳에서 쉽게 추적하고 관리할 수 있음.
- **예측 가능한 상태 변경**
    - 상태 변경은 항상 순수 함수인 Reducer를 통해 이루어짐.
    - 명시적인 액션(action)을 기반으로 상태가 변경되기 때문에, 상태 흐름이 예측 가능하고 디버깅이 쉬움.
- **단방향 데이터 흐름**
    - Redux는 Flux와 동일하게 단방향 데이터 흐름을 따름:
        - **Action → Reducer → Store → View**.
    - 단방향 흐름은 데이터 변경과 그 결과를 추적하기 쉽게 만들어 줌.
- **디버깅 및 개발 도구 지원**
    - Redux DevTools를 통해 **상태 변화 추적**, **시간 여행 디버깅**, **액션 기록 재생** 등이 가능.
    - 이러한 도구는 복잡한 앱 개발 시 생산성을 크게 향상시킴.
- **확장성과 구조화된 코드**
    - Redux는 애플리케이션의 상태 관리 로직을 구조화하고, 확장하기 쉬운 방식으로 작성 가능.
    - 상태 관리와 UI 로직이 분리되므로 코드의 유지보수성과 확장성이 증가.
- **프레임워크 독립적**
    - Redux는 React에 종속적이지 않으며, Angular, Vue.js, 또는 Vanilla JavaScript에서도 사용할 수 있음.
    - 다양한 환경에서 일관된 상태 관리 패턴을 제공.

## Redux의 구성요소

### 1. Store

- Redux Store는 Redux의 데이터들을 저장하기 위한 저장소
- Redux에서는 한 애플리케이션당 하나의 Store를 만든다.
- Store 안에는, 현재의 `State`와, `Reducer`가 들어가있고, 추가적으로 몇가지 내장 함수들 (getState(), dispatch(action)등)이 있다.

### 2. State

Redux의 State는 Redux Store에 저장되어 있는 데이터

### 3. Action

- Redux State에 변화를 주기 위한 행동
- 상태에 어떠한 변화가 필요할 때 Action을 발생
- Action은 JavaScript 객체 형태로 존재
- 액션 객체는 `type` 필드를 필수적으로 가지고 있어야하고 그 외의 값들은 개발자 마음대로 넣어줄 수 있다.

```jsx
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

### 4. Action Creator

- Action 객체를 생성하는 역할을 하는 JavaScript 함수

```jsx
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data
  };
}
```

### 5. Dispatch

- `store`에 `action`을 전달하여 `state`를 업데이트하는 함수

```jsx
store.dispatch({ type: 'INCREMENT' });
```

### 6. Reducer

- Action이 발생하면, Action을 실제로 처리하는 역할을 하는 함수
- Redux State에 변화를 주는 역할
- 현재 `state`와 `action`을 입력으로 받아 새로운 `state`를 반환

```jsx
// 카운터를 위한 리듀서
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state; // default: 기존 state를 그대로 반환하도록 작성
  }
}
```

## Redux의 데이터 흐름

![redux_data_flow](./redux_data_flow.gif)

1. 먼저 사용자가 UI에서 Deposit 10$ 버튼을 누른다
2. 그러면 클릭 이벤트가 이벤트 핸들러로 전달이 되고, `Action`이 만들어지고 `Dispatch`된다
3. `Dispatch`된 `Action`은 현재 `State`와 함께 `Reducer`로 전달이 되며,
4. `Reducer`에서는 변경된 새로운 `State`를 리턴한다
5. 그리고 이렇게 변경된 새로운 `State`가 UI에 나타난다

## Redux의 3가지 규칙

### 1. Single source of truth

- 애플리케이션 상태를 단일 진실의 원천으로 다룸
- 하나의 애플리케이션 안에는 하나의 `Store`가 있다.
- 장점
    - 애플리케이션의 상태를 쉽게 추적하고 디버깅
    - 상태를 공유하는 여러 컴포넌트 간의 데이터 동기화가 간편

```jsx
const initialState = {
  user: { name: 'Eunji', loggedIn: true },
  todos: [{ id: 1, text: 'Learn Redux', completed: false }],
};

const store = createStore(reducer, initialState);
```

### 2. State is read-only

- 상태는 읽기전용이다.
- 상태는 직접 수정할 수 없으며, 상태를 변경하려면 `action`을 통해서만 가능
- `action`은 `state`를 변경하려는 **의도를 설명하는 객체**이며, `state`는 `reducer`가 이 `action`을 처리하여 새 `state`를 반환하면서 업데이트된다.

```jsx
store.getState().user.name = 'John'; // ❌ 상태를 직접 변경하면 안됨.

store.dispatch({ type: 'UPDATE_NAME', payload: { name: 'John' } }); // ⭕️ action을 사용해서 상태 변경해야함
```

### 3. Changes are made with pure functions

- `state`의 변경은 순수 함수(Pure Function)인 `reducer`에 의해 수행된다.
- `state`의 변경은 항상 `reducer`를 통해 이루어져야 하며, `reducer`는 **순수 함수**로 작성해야 한다.
- **순수 함수**
    - 입력값이 동일하면 항상 동일한 출력값을 반환
    - 외부 상태를 변경하지 않음

## Redux 예제

```jsx
import { createStore } from 'redux';

// 1. 초기 상태
const initialState = { count: 0 };

// 2. 리듀서 정의
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
	    // 기존 상태를 직접 변경하지 않고 새로운 상태 객체 반환
      // state.count += 1; ❌ 기존 상태를 직접 변경하면 안됨.
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
	    // 상태를 변경하지 않을 경우 기존 상태 반환
      return state;
  }
}

// 3. 스토어 생성
const store = createStore(counterReducer);

// 4. 스토어 구독
store.subscribe(() => console.log(store.getState())); // 상태 변경 시 실행될 콜백 함수 등록

// 5. 액션 디스패치
store.dispatch({ type: 'INCREMENT' }); // { count: 1 } 출력
store.dispatch({ type: 'INCREMENT' }); // { count: 2 } 출력
store.dispatch({ type: 'DECREMENT' }); // { count: 1 } 출력

// 구독 해제
unsubscribe();
store.dispatch({ type: 'INCREMENT' }); // 아무 출력도 없음

```
