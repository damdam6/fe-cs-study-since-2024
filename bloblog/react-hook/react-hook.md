## 리액트 Hook

### ✅ INDEX

[Hook 개요](#hook-개요)  
[State Hook](#state-hook)  
[Effect Hook](#effect-hook)  
[기타 Hook](#기타-hook)

## Hook 개요

### Hook 등장 이전

- 리액트의 컴포넌트의 종류에는 `클래스형 컴포넌트`와 `함수형 컴포넌트`가 있다.
- 클래스형 컴포넌트의 단점 때문에 보통 함수형 컴포넌트를 사용하며, 상태 관리나 생명주기 관련 기능이 필요할 때만 클래스형 컴포넌트를 활용한다.
- 클래스형 컴포넌트의 단점
  - constructor, this, bind 와 같은 여러 규칙을 따라야 하기 때문에 코드가 복잡해지고 길어질 수 있다.
  - 특정 DOM 처리나 API 호출, 상태 관리 같은 로직의 재사용이 제한적이기 때문에 동일한 로직을 중복해서 넣어야 하는 상황이 발생한다.
  - 보통 Higher Order Component 패턴이나 Render Props 패턴으로 공통 로직을 관리하지만 사용이 복잡함.

### Hook 사용 이유

- 함수형 컴포넌트에서도 클래스형 컴포넌트의 작업을 할 수 있음
  - 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값 및 여러 React의 기능 사용 가능
  - 클래스형 컴포넌트보다 함수형 컴포넌트의 성능이 우수함 → 컴파일러가 코드 압축과 최적화를 진행하기에 용이
- 필요한 로직을 커스텀 훅으로 만들어 재사용할 수 있음

### Hook 사용 여부 비교

> 카운터 구현 예제

- 클래스형

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };

    // 함수 메서드의 this가 컴포넌트를 가리키도록 bind() 진행
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase() {
    this.setState({ number: this.state.number + 1 });
  }

  decrease() {
    this.setState({ number: this.state.number - 1 });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }}>{this.state.number}</div>
        <button onClick={this.increase}>더하기</button>
        <button onClick={this.decrease}>빼기</button>
      </div>
    );
  }
}
```

- 함수형 → 상태 선언 및 변경이 훨씬 직관적

```jsx
const App = () => {
  const [number, setNumber] = useState(0);
  const handleClickIncrement = () => {
    setNumber((prev) => prev + 1);
  };
  const handleClickDecrement = () => {
    setNumber((prev) => prev - 1);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>{number}</div>
      <button onClick={handleClickIncrement}>더하기</button>
      <button onClick={handleClickDecrement}>빼기</button>
    </div>
  );
};
```

## State Hook

> useState()

- state 변수를 선언하는 Hook 이다.
  - 클래스 컴포넌트의 `this.state`와 동일하게 작동
  - 일반적인 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 사라지지 않는다.
- 인자로 state 변수의 초기 값을 넘긴다.
  - 클래스 컴포넌트의 state 와 달리 객체일 필요는 없다.
- state 변수 및 해당 변수를 갱신하는 함수를 반환한다.
  - 위 카운터 구현 예제의 경우 배열 구조 분해 사용하여 할당함

## Effect Hook

> useEffect()

- 예제

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```

- Effect = Side effects

  - 데이터 가져오기, 구독 설정하기, 수동으로 React 컴포넌트의 DOM을 수정하는 것 등을 포함한다.
  - 정리(clean-up)가 필요한 것과 그렇지 않은 것으로 구분된다.

- 정리를 이용하지 않는 Effect

  - React는 useEffect 의 인자로 넘긴 Effect(함수)를 기억했다가 DOM 업데이트를 수행한 이후에 불러낸다.
  - 실행 이후 신경 쓸 것이 없다.
  - e.g. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등

- 정리가 필요한 Effect

  - 메모리 누수가 발생하지 않도록 정리(clean-up)가 필요함
    - e.g. 외부 데이터에 구독을 설정하는 경우, setInterval 함수 등
  - 컴포넌트가 언마운트 되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 Effect 함수가 clean-up 함수를 반환하도록 한다.

    ```jsx
    useEffect(() => {
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }

      // 구독 추가
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

      // 정리를 위한 함수 반환
      return () => {
        // 구독 해제
        ChatAPI.unsubscribeFromFriendStatus(
          props.friend.id,
          handleStatusChange
        );
      };
    });
    ```

    - 구독 추가 및 제거가 모두 하나의 effect 에 들어간다.
    - React는 컴포넌트가 업데이트 될 때 + 마운트 해제될 때 해당 정리함수를 실행한다.
    - 마운트 해제될 때에만 정리함수 실행하려면 useEffect 의 두 번째 인자로 빈 배열을 넘긴다.

- 모든 렌더링마다 effect를 적용하게 되면 때때로 성능 저하를 발생시킬 수 있음
  > 해결 방법 → `useEffect`의 두 번째 인자(선택)로 배열을 넘긴다.
  - 넘겨진 값들이 리렌더링 시에 변경되지 않는다면 effect 실행을 건너뛴다.
  - 배열 내의 하나의 값이라도 달라지면 effect 재실행
  - 빈 배열을 넘기게 되면, 그 어떤 값에도 의존하지 않기 때문에 딱 한 번만 실행된다.

## 기타 Hook

### useContext(context)

- context를 읽고 구독하는 함수
  - 명시적으로 props를 전달해주지 않아도 부모 컴포넌트가 트리에 있는 자식 컴포넌트의 정보를 사용할 수 있음
  - props drilling 의 불필요한 반복을 줄일 수 있다.

> 다크모드 설정 예제

![useContext.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week08/bloblog/react-hook/image/useContext.png?raw=true)

```jsx
// ThemeContext.js
// Context 생성 -> 기본값으로 null을 넣어준다.
export const ThemeContext = createContext(null);

// App.js
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// Page.js
// 자식 컴포넌트에 전달만 함
const Page = () => {
  return (
    <div className="page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

// Header.js
const Header = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <h1>Welcome 홍길동!</h1>
    </header>
  );
};

// Content.js
// Header.js 와 비슷

// Footer.js
const Footer = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <footer
      className="footer"
      style={{ backgroundColor: isDark ? "black" : "lightgray" }}
    >
      <button className="button" onClick={toggleTheme}>
        Dark Mode
      </button>
    </footer>
  );
};
```

### useReducer(reducer, default)

- useState 보다 다양한 상황에 따라 다양한 상태를 업데이트해줄 수 있다.
- 첫번째 파라미터에 Reducer 함수, 두번째 파라미터에 해당 Reducer의 기본 값을 전달한다.
- 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 장점이 있다.

- Reducer 함수는 현재 상태 및 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달 받아 새로운 상태를 반환하는 함수이다.

  - 이 때 action 객체는 Redux 와 달리 반드시 type 필드를 지니고 있을 필요가 없으며, 객체가 아니어도 상관이 없다.

  ```jsx
  function reducer(state, action) {
    return { ... }; // 업데이트한 새로운 상태를 반환합니다
  }
  ```

- Dispatch 함수는 상태 업데이트를 위한 이벤트 트리거와 같은 역할을 한다.
  - action 객체를 인자로 넘겨주게 되면 reducer 함수가 실행되고, reducer 함수는 상태 업데이트 후 새로운 상태를 반환한다.

> 카운터 구현 예제 2

```jsx
function App() {
  function reducer(state, action) {
    // action.type에 따라 작업 수행
    switch (action.type) {
      case "INCREMENT":
        return { value: state.value + 1 };
      case "DECREMENT":
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
}
```

> 상태변수 여러 개 한 번에 관리하기

```jsx
function App() {
  function reducer(state, action) {
    return {
      ...state,
      // action.name 은 input 태그의 name 속성을 의미
      [action.name]: action.value,
    };
  }

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
}
```

### useMemo

- 연산 최적화 가능
- 렌더링마다 연산을 하는 것이 아니라, 특정 값이 바뀌었을 때만 연산을 실행
  - 특정 값이 그대로라면 이전에 연산했던 결과를 재사용
- `useMemo(() => getAverage(list), [list]);` → list 값이 바뀌었을 때만 평균 구한다.

> 합계, 평균 구하기

```jsx
// 합계는 useMemo 사용 x
// 평균은 useMemo 사용 o
const getSum = (numbers) => {
  console.log("합계 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum;
};

const getAverage = (numbers) => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

function App() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const sum = getSum(list);
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>합계 값:</b> {sum}
      </div>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
}
```

- useMemo 를 사용하지 않는 경우, input 의 value 만 바뀌어도 합계를 계산한다.
- 반면 useMemo 를 사용하면 list 에 추가되었을 때만 평균을 계산한다.

### useCallback

- useMemo와 유사함
- 주로 렌더링 성능을 최적화해야 하는 상황에서 사용
  - 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.
  - 컴포넌트의 렌더링이 자주 발생하거나, 렌더링 해야 할 컴포넌트의 개수가 많은 경우 최적화 해주는 게 좋다.
- 하지만 함수가 단순한 경우, 오히려 `useCallback`이나 `useMemo`가 비용이 더 들기도 한다

  - 내부적으로 의존성 배열을 비교하고 관리해야 하기 때문에

- 주로 일반 값을 재사용하기 위해서는 useMemo 를, 함수를 재사용 하기 위해서는 useCallback 을 사용한다.

```jsx
// 둘은 동일한 코드
useCallback(() => {
  console.log("hello world!");
}, []);

useMemo(() => {
  const fn = () => {
    console.log("hello world!");
  };
  return fn;
}, []);
```

### useRef

- ref 를 쉽게 사용 할 수 있게 해준다.

```jsx
function App() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    // 숫자 추가 후에 인풋 창으로 포커스 넘어감
    inputEl.current.focus();
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
}
```

> 로컬 변수로 활용하기

- 일반적인 컴포넌트 내부 변수의 경우, 컴포넌트 리렌더링 발생 시 모두 초기화된다.
- 변수를 컴포넌트 바깥에 선언하는 방법의 문제점을 극복하기 위해 useRef 를 사용한다.
  - 컴포넌트가 여러개가 되거나, 마운트/언마운트시 값이 초기화되지 않는 문제
- useRef 사용한 변수는 값이 변할 때마다 리렌더링이 발생하지는 않지만, 다른 변수(아래에서는 num)로 인해 리렌더링이 발생하면 초기화되지 않고 그 전의 값이 유지된다.

```jsx
const RefSample = () => {
  const [num, setNum] = useState(0);
  const id = useRef(1);

  const setId = (n) => {
    id.current = n;
  };

  const printId = () => {
    console.log(id.current);
  };

  return (
    <div>
      <div>refsample</div>
      <div>{id.current}</div>
      <button onClick={() => setId(id.current + 1)}>1 증가</button>
      <button onClick={() => setNum(num + 1)}>리렌더링 발생</button>
    </div>
  );
};
```

## 👀 참고자료

https://ko.legacy.reactjs.org/docs/hooks-intro.html

https://ko.javascript.info/class

https://codingbroker.tistory.com/23

https://velog.io/@velopert/react-hooks

https://points.tistory.com/88

https://developer-jeongyeon.tistory.com/63
