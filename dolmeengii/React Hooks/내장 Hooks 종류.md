### 목차
1. [React 내장 Hook](#react-내장-hook)
2. [State Hooks](#1-state-hooks)
3. [Context Hooks](#2-context-hooks)
4. [Ref Hooks](#3-ref-hooks)
5. [Effect Hooks](#4-effect-hooks)
6. [Performance Hooks](#5-performance-hooks)
7. [Other Hooks](#6-other-hooks)

---
# React 내장 Hook
React에 내장된 모든 Hook에 대해 간단하게 알아보자.

| 종류                    | 내용                                                                                                                                      |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **State Hooks**       | State를 통해 컴포넌트는 사용자 입력과 같은 정보를 기억할 수 있다. <br> - `useState`, `useReducer`                                                                |
| **Context Hooks**     | 컴포넌트가 Props를 전달하지 않고도 멀리 있는 부모 컴포넌트로부터 정보를 받을 수 있게 해준다.  <br> - `useContext`                                                            |
| **Ref Hooks**         | 컴포넌트가 DOM 노드나 Timeout ID와 같이 렌더링에 사용되지 않는 일부 정보를 보유할 수 있다. <br> - `useRef`, `useImperativeHandle`                                       |
| **Effect Hooks**      | Effect를 통해 컴포넌트를 외부 시스템에 연결하고 동기화 할 수 있다. <br> - `useEffect`, `useLayoutEffect`, `useInsertionEffect`                                   |
| **Performance Hooks** | 이전 렌더링 이후 데이터가 변경되지 않은 경우 캐시된 계산을 재사용하거나 재렌더링을 건너뛰도록 React 에 지시한다. <br> - `useMemo`, `useCallBack`, `useTransition`, `useDefferedValue` |
| **Other Hooks**       | 이 Hooks 는 대부분 라이브러리 작성자에게 유용하며, 애플리케이션 코드에서는 일반적으로 사용되지 않는다. <br> - `useDebugValue`, `useId`, `useSyncExternalStore`, `useActionState`  |

간단하게 정리하면 이정도로 정리할 수 있을 것이다. 또한, Custom Hook을 작성하여 리액트 프로젝트 내에서 나만의 Hook을 만들어 사용할 수도 있다. 일단, 위의 6가지 Hook에 대해 자세히 알아보도록 하자.


## 1. State Hooks
State Hooks는 React 컴포넌트가 사용자 입력과 같은 정보를 기억할 수 있게 해주는 중요한 기능입니다. 이를 통해 컴포넌트의 상태를 관리하고, 사용자와의 상호작용에 따라 UI를 동적으로 업데이트할 수 있다. 여기서는 useState와 useReducer 두 가지 주요 State Hook에 대해 구체적으로 설명하겠다.

### useState
#### 개념
useState는 가장 기본적인 State Hook으로, 상태 변수를 선언하고 직접 업데이트할 수 있게 해주며 주로 간단한 상태 관리에 사용된다.
#### 사용법과 예시코드
useState를 호출할 때 초기값을 전달하며, 두 개의 값을 반환한다. 현재 상태와 상태를 업데이트하는 함수이다.
```js
import React, { useState } from 'react';

const FormComponent = () => {
    // useState를 사용하여 입력값 상태를 선언
    const [inputValue, setInputValue] = useState(''); // 초기값은 빈 문자열

    const handleChange = (event) => {
        setInputValue(event.target.value); // 입력값 변경 시 상태 업데이트
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitted value: ${inputValue}`); // 입력값을 알림으로 표시
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange} // 입력값 변경 시 handleChange 호출
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormComponent;
```
> **설명**
> - **상태 변수**: `inputValue`는 현재 입력값을 저장하는 상태 변수이다.
> - **상태 업데이트 함수**: `setInputValue`는 입력값이 변경될 때 호출되어 상태를 업데이트한다.
> - **폼 제출**: 사용자가 입력한 값을 알림으로 표시한다.

<br>

### useReducer
#### 개념
useReducer는 상태를 더 복잡하게 관리할 때 사용되는 Hook으로, 특히 상태 업데이트 로직이 복잡하거나 여러 상태를 관리해야 할 때 유용하다. 이는 Redux와 유사한 방식으로 상태를 관리할 수 있다.

#### 사용법과 예시코드
useReducer는 리듀서 함수와 초기 상태를 인자로 받아 상태와 디스패치 함수를 반환한다. 리듀서 함수는 현재 상태와 액션을 받아 새로운 상태를 반환한다.
```js
import React, { useReducer } from 'react';

// 리듀서 함수 정의
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

const Counter = () => {
    const initialState = { count: 0 }; // 초기 상태
    const [state, dispatch] = useReducer(reducer, initialState); // useReducer 사용

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        </div>
    );
};

export default Counter;
```
> **설명**
> - **리듀서 함수**: `reducer`는 현재 상태와 액션을 받아 새로운 상태를 반환합니다. `increment`와 `decrement` 액션에 따라 카운트를 증가하거나 감소시킵니다.
> - **상태와 디스패치**: `useReducer`를 사용하여 상태와 상태를 업데이트하는 `dispatch` 함수를 가져옵니다.
> - **버튼 클릭**: 버튼 클릭 시 dispatch를 호출하여 액션을 보내고, 이에 따라 상태가 업데이트됩니다.

<br>

### useState와 useReducer 의 차이점
| useState                                                          | useReducer |
|-------------------------------------------------------------------|------------|
| - 간단한 상태 관리에 적합 <br> - 상태 업데이트가 간단하고 직관적 <br> - 각 상태 변수를 개별적으로 관리 | - 복잡한 상태 관리에 유용 <br> - 상태 업데이트 로직이 명확하게 분리되어 있어 코드의 가독성이 높아짐. <br> - 여러 상태 변수를 한 곳에서 관리할 수 있다. |


<br>
<br>

## 2. Context Hooks
Context Hooks는 React 애플리케이션에서 데이터(상태)를 여러 컴포넌트에 쉽게 전달할 수 있게 해주는 기능이다. 주로 useContext Hook을 사용하여 Context를 읽고 구독할 수 있으며, 이로 인해 Props를 통해 데이터를 전달하는 번거로움을 줄이고 깊이 있는 컴포넌트 구조에서도 필요한 데이터를 쉽게 접근할 수 있다.

### useContext
#### Context 의 기본 개념
- `Context`: React의 내장 기능으로, 컴포넌트 트리 내에서 데이터를 전역적으로 공유할 수 있도록 도와준다. 예를 들어, 사용자의 인증 상태, UI 테마, 언어 설정 등을 Context를 사용하여 관리할 수 있다.
- `Provider`: Context의 값을 제공하는 컴포넌트이다. 이 컴포넌트의 자식들은 해당 Context의 값을 사용할 수 있다.
- `Consumer`: Context의 값을 소비하는 컴포넌트이며, useContext Hook을 사용하여 값을 가져온다.

#### 사용법과 예시코드
useContext는 Context 객체를 인자로 받아 현재 Context의 값을 반환한다. 이 Hook을 사용하면 Context의 변화를 자동으로 구독하여 값이 변경될 때마다 컴포넌트가 리렌더링된다.
```js
import React, { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = createContext();

// 2. Provider 컴포넌트 정의
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 기본 테마를 'light'로 설정

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light')); // 테마 전환
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. 테마를 사용하는 컴포넌트 정의
const ThemedComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); // Context 값 가져오기

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', padding: '20px' }}>
            <h1>Current Theme: {theme}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button> {/* 테마 전환 버튼 */}
        </div>
    );
};

// 4. App 컴포넌트 정의
const App = () => {
    return (
        <ThemeProvider>
            <ThemedComponent />
        </ThemeProvider>
    );
};

export default App;
```
> **설명**   
> **1. Context 생성**
> - const ThemeContext = createContext();
> - createContext를 사용하여 새로운 Context 객체를 생성.
>
> **2. Provider 컴포넌트** `ThemeProvider`
> - ThemeProvider는 theme와 toggleTheme을 상태로 관리.
> - ThemeContext.Provider를 사용하여 자식 컴포넌트에게 Context 값을 제공.
> - toggleTheme 함수는 현재 테마를 'light'와 'dark'로 전환.
>
> **3. Context 사용** `ThemedComponent`
> - useContext(ThemeContext)를 호출하여 현재 테마와 테마 전환 함수를 가져옴.
> - 배경색과 글자색을 테마에 맞게 설정하고, 테마 전환 버튼을 제공.
>
> **4. App 컴포넌트**
> - ThemeProvider로 ThemedComponent를 감싸서, 해당 컴포넌트가 Context에 접근할 수 있게 한다.

##### **Context의 장점**
- `Props 전달의 간소화`: 깊은 컴포넌트 트리에서 Props를 통해 데이터를 전달할 필요가 없어진다.
- `전역 상태 관리`: 여러 컴포넌트에서 동일한 상태를 쉽게 공유하고 관리할 수 있다.
- `구독 자동화`: Context의 값이 변경될 때마다 자동으로 리렌더링되어 UI가 업데이트된다.

Context Hooks는 React 애플리케이션에서 전역적으로 데이터를 관리하고 전달하는 데 매우 유용한 도구이다. useContext를 사용하면 Context의 값을 쉽게 읽고 구독할 수 있어, 복잡한 Props 체인을 피하고 코드의 가독성을 높일 수 있다. 이를 통해 애플리케이션의 구조를 더 간결하고 효율적으로 설계할 수 있다.

<br>
<br>

## 3. Ref Hooks
Ref Hooks는 React에서 DOM 노드나 컴포넌트 인스턴스와 같은 정보를 유지할 수 있게 해주는 기능이다. Ref를 사용하면 상태와는 달리 업데이트가 이루어져도 컴포넌트가 다시 렌더링되지 않으며, 이는 React의 렌더링 최적화에 유용하다.

### useRef
#### Ref 기본 개념
- `Ref (Reference)`: React에서 특정 DOM 요소나 값에 대한 참조를 유지할 수 있도록 해주는 객체이다. 주로 DOM 요소에 직접 접근하거나, 컴포넌트의 인스턴스를 참조하는 데 사용된다.
- `렌더링에 영향 없음`: Ref의 값이 변경되더라도 컴포넌트는 다시 렌더링되지 않으므로, 성능 최적화에 유리하다.
- `탈출구`: React의 상태 관리와 생명주기 규칙을 벗어나야 할 때 유용하다. 예를 들어, 애니메이션, 포커스 관리, 외부 라이브러리와의 통합 등에서 사용된다.

#### 사용법과 예시코드
useRef는 Ref 객체를 생성하고, 이를 통해 DOM 요소나 값을 저장할 수 있다. useRef를 호출하면 { current: null } 형태의 객체를 반환하며, current 프로퍼티에 원하는 값을 할당할 수 있다.

```js
import React, { useRef } from 'react';

const TimerComponent = () => {
    const inputRef = useRef(null); // DOM 노드에 대한 Ref 생성
    const timerRef = useRef(null); // 타이머 ID를 저장할 Ref 생성

    const startTimer = () => {
        // 1초마다 메시지를 콘솔에 출력하는 타이머 시작
        timerRef.current = setInterval(() => {
            console.log('Timer is running...');
        }, 1000);
    };

    const stopTimer = () => {
        // 타이머를 정지
        clearInterval(timerRef.current);
        console.log('Timer stopped.');
    };

    const focusInput = () => {
        // input 요소에 포커스
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Type something..." />
            <button onClick={focusInput}>Focus Input</button>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
        </div>
    );
};

export default TimerComponent;
```
> **설명**   
> **1. Ref 생성**
> - `const inputRef = useRef(null);` 와 `const timerRef = useRef(null);` 를 통해 두 개의 Ref를 생성한다. 하나는 DOM 요소에 대한 Ref이고, 다른 하나는 타이머 ID를 저장하는 Ref이다.
>
> **2. 포커스 함수**
> - focusInput 함수는 `inputRef.current.focus()` 를 호출하여 입력 필드에 포커스를 준다. 이는 DOM 노드에 직접 접근한다.
>
> **3. 타이머 시작 및 정지**
> - `startTimer` 함수에서 `setInterval`을 사용하여 1초마다 콘솔에 메시지를 출력한다. 이때 타이머 ID는 `timerRef.current`에 저장된다.
> - `stopTimer` 함수는 `clearInterval(timerRef.current)`를 호출하여 타이머를 정지한다.
>
> **5. 렌더링**
> - 입력 필드와 버튼이 포함된 UI를 렌더링하며, 버튼 클릭 시 각각의 함수가 호출된다.

<br>

### useImperativeHandle
#### 개념
useImperativeHandle은 부모 컴포넌트가 자식 컴포넌트의 Ref를 커스터마이즈할 수 있게 해주는 Hook이다. 이 Hook을 사용하면, 자식 컴포넌트에서 부모에게 노출하고 싶은 메서드나 속성을 정의할 수 있다.
#### 사용법과 예시코드
useImperativeHandle을 사용하기 위해서는  `forwardRef`로 자식 컴포넌트를 정의해야 한다. 그런 다음 useImperativeHandle을 호출하여 부모에게 노출할 메서드나 속성을 정의한다.
```js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// CustomInput 컴포넌트 정의
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(); // 내부 input 요소에 대한 Ref 생성

    // 부모가 호출할 수 있는 메서드 정의
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus(); // input 요소에 포커스
        },
        clear: () => {
            inputRef.current.value = ''; // input 요소의 값을 지우는 메서드
        }
    }));

    return <input ref={inputRef} type="text" />;
});

// ParentComponent 정의
const ParentComponent = () => {
    const inputRef = useRef(); // CustomInput에 대한 Ref 생성

    const handleFocus = () => {
        inputRef.current.focus(); // 자식 컴포넌트의 focus 메서드 호출
    };

    const handleClear = () => {
        inputRef.current.clear(); // 자식 컴포넌트의 clear 메서드 호출
    };

    return (
        <div>
            <CustomInput ref={inputRef} />
            <button onClick={handleFocus}>Focus Custom Input</button>
            <button onClick={handleClear}>Clear Input</button>
        </div>
    );
};

export default ParentComponent;
```
> **설명**   
> **1. 자식 컴포넌트 정의**
> - CustomInput 컴포넌트는 forwardRef로 정의되어 있어, 부모 컴포넌트로부터 Ref를 받을 수 있다.
> - inputRef를 사용하여 실제 DOM 요소에 대한 참조 유지.
>
> **2. useImperativeHandle 사용**
> - `useImperativeHandle(ref, () => ({ ... }))`를 호출하여 부모에게 노출할 메서드 정의.
> - focus 메서드는 input 요소에 포커스를 주며, clear 메서드는 input 요소의 값을 지운다.
>
> **3. 부모 컴포넌트 정의**
> - `ParentComponent`에서 inputRef를 생성하여 CustomInput에 전달.
> - 두 개의 버튼을 통해 각각 focus와 clear 메서드 호출

#### 사용 사례
- `폼 유효성 검사`: 부모 컴포넌트에서 자식 컴포넌트의 입력값을 검사하거나 초기화할 수 있다.
- `커스텀 애니메이션`: 자식 컴포넌트에서 애니메이션 관련 메서드를 정의하고, 부모가 이를 호출하여 애니메이션을 실행할 수 있다.
- `외부 라이브러리 통합`: 외부 라이브러리의 API를 자식 컴포넌트에 통합할 때, 부모가 필요한 메서드를 호출하여 동작하게 할 수 있다.

<br>
<br>

## 4. Effect Hooks
Effect Hooks는 React 컴포넌트를 외부 시스템과 연결하고 동기화하는 데 사용되는 기능이다. 주로 useEffect Hook을 통해 구현되며, 네트워크 요청, 브라우저 DOM 조작, 애니메이션, 외부 라이브러리와의 통합 등 다양한 용도로 활용된다. 주로 `useEffect`를 사용하여 구현하고, 특정 상황에서 추가적인 제어가 필요할 때 사용할 수 있는 변형 Hook으로 `useLayoutEffect`와 `useInsertionEffect`를 제공한다.

### useEffect
#### Effect의 기본 개념
- `Effect`: 컴포넌트가 렌더링된 후에 실행되는 코드 블록으로, 외부 시스템과의 상호작용을 관리한다. 이는 API 호출, 이벤트 리스너 등록, 타이머 설정 등 다양한 작업을 포함한다.
- `탈출구`: Effect는 React의 상태 관리와 생명주기 규칙을 벗어나 외부 시스템과 상호작용할 수 있게 해주는 방법이다. 외부 시스템과의 상호작용이 필요하지 않다면 Effect를 사용할 필요가 없다.

#### 사용법과 예시코드
useEffect는 컴포넌트가 렌더링된 후에 실행되며, 다음과 같은 방식으로 사용된다.
> **1. Effect 함수**: 컴포넌트가 렌더링된 후에 실행될 함수를 정의합니다.   
> **2. 정리 함수**: Effect가 실행될 때 반환되는 함수로, 컴포넌트가 언마운트되거나 의존성이 변경될 때 호출됩니다.   
> **3. 의존성 배열**: Effect가 실행될 조건을 설정합니다. 이 배열에 포함된 값이 변경될 때만 Effect가 실행됩니다.

```js
import React, { useEffect, useState } from 'react';

const ChatRoom = ({ roomId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const connection = createConnection(roomId); // 연결 생성
        connection.connect(); // 연결 시작

        const handleMessage = (message) => {
            setMessages(prevMessages => [...prevMessages, message]); // 메시지 추가
        };

        connection.onMessage(handleMessage); // 메시지 리스너 등록

        // Cleanup function
        return () => {
            connection.disconnect(); // 연결 종료
            connection.offMessage(handleMessage); // 메시지 리스너 해제
        };
    }, [roomId]); // roomId가 변경될 때만 Effect 실행

    return (
        <div>
            <h2>Chat Room: {roomId}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

// createConnection은 외부 API와의 연결을 설정하는 함수입니다. 
const createConnection = (roomId) => {
    return {
        connect: () => console.log(`Connected to room ${roomId}`),
        disconnect: () => console.log(`Disconnected from room ${roomId}`),
        onMessage: (callback) => {
            // 메시지를 수신하는 로직
            setInterval(() => {
                callback(`New message from room ${roomId}`);
            }, 2000);
        },
        offMessage: (callback) => {
            // 메시지 리스너 해제 로직
            console.log('Message listener removed');
        }
    };
};

export default ChatRoom;
```
> **설명**   
> **1. Effect 함수**
> - useEffect 내부에서 `createConnection` 함수를 호출하여 외부 시스템(채팅 방)에 연결.
> - `connection.connect()`를 통해 연결을 시작.
>
> **2. 메시지 리스너 등록**
> - `connection.onMessage(handleMessage)`를 통해 메시지를 수신할 리스너를 등록하고, 새로운 메시지가 수신되면 setMessages를 호출하여 상태를 업데이트한다.
>
> **3. 정리 함수**
> - return 문에서 정리 함수를 정의한다. 이 함수는 컴포넌트가 언마운트되거나 roomId가 변경될 때 호출된다. 여기서 연결을 종료하고, 메시지 리스너를 해제한다.
>
> **4. 의존성 배열**
> - `[roomId]`를 의존성 배열로 전달하여, roomId가 변경될 때만 Effect가 실행되도록 한다.

<br>

### useLayoutEffect
#### 개념
useLayoutEffect는 브라우저가 화면을 업데이트하기 전에 실행되는 Effect Hook으로 DOM 업데이트가 완료된 후, 브라우저가 화면을 다시 그리기 전에 실행된다. 이 Hook은 레이아웃을 계산하거나 DOM을 조작해야 할 때 유용하다. 예를 들어, 요소의 크기나 위치를 측정하고, 그에 따라 스타일을 조정하는 경우에 적합하다.

#### 사용법과 예시코드
useLayoutEffect의 사용법은 useEffect와 유사하다. Effect 함수와 정리 함수를 정의하고, 의존성 배열을 설정할 수 있다.
```js
import React, { useLayoutEffect, useRef, useState } from 'react';

const LayoutExample = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const boxRef = useRef(null);

    useLayoutEffect(() => {
        // boxRef.current의 크기를 측정하여 상태 업데이트
        if (boxRef.current) {
            const { width, height } = boxRef.current.getBoundingClientRect();
            setSize({ width, height });
        }
    }, []); // 컴포넌트가 마운트될 때만 실행

    return (
        <div>
            <div ref={boxRef} style={{ width: '100px', height: '100px', backgroundColor: 'lightblue' }}>
                Box
            </div>
            <p>Width: {size.width}, Height: {size.height}</p>
        </div>
    );
};

export default LayoutExample;
```
> **설명**   
> LayoutExample 컴포넌트는 박스의 크기를 측정하여 상태에 저장한다. useLayoutEffect를 사용하여 박스의 크기를 측정하고, 이를 상태로 업데이트하는데, 이 과정은 브라우저가 화면을 다시 그리기 전에 이루어지므로 사용자는 크기 변경을 인지하지 못한다.

<br>

### useInsertionEffect
#### 개념
useInsertionEffect는 React가 DOM을 변경하기 전에 실행되는 Effect Hook이며, 주로 CSS-in-JS 라이브러리에서 동적 스타일을 삽입할 때 사용된다. 이 Hook은 스타일이 설정된 후, DOM이 업데이트되기 전에 CSS를 삽입해야 하는 경우에 적합하다.

#### 사용법과 예시코드
useInsertionEffect의 사용법은 useEffect와 유사하지만, 이 Hook은 스타일을 삽입하는 데 특화되어 있다.
```js
import React, { useInsertionEffect } from 'react';

const DynamicStyleComponent = () => {
    useInsertionEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .dynamic {
                color: red;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style); // 컴포넌트 언마운트 시 스타일 제거
        };
    }, []); // 컴포넌트가 마운트될 때만 실행

    return <div className="dynamic">This text is styled dynamically!</div>;
};

export default DynamicStyleComponent;
```
> **설명**   
> DynamicStyleComponent는 useInsertionEffect를 사용하여 동적으로 스타일을 삽입한다. 스타일은 컴포넌트가 마운트될 때 추가되고 언마운트될 때 제거되며, 이 방식은 CSS-in-JS 라이브러리에서 동적 스타일을 관리하는 데 유용하다.

#### useLayoutEffect와 useInsertionEffect의 차이점
| |useLayoutEffect|useInsertionEffect|
|--|--|--|
|타이밍| - 브라우저가 화면을 다시 그리기 전에 실행<br> - 레이아웃 계산과 DOM 조작에 적합| - React가 DOM을 변경하기 전에 실행 <br> - 주로 동적 CSS 삽입에 적합|
|사용 시기| DOM 요소의 크기나 위치를 측정하고, 그에 따라 레이아웃을 조정할 때 사용됨. | CSS-in-JS 라이브러리와 같은 상황에서 동적 스타일을 삽입할 필요가 있을 때 사용됨.|

<br>
<br>

## 5. Performance Hooks
Performance Hooks는 React 애플리케이션의 렌더링 성능을 최적화하는 데 사용되는 여러 가지 도구로, 이 Hooks를 사용하면 불필요한 재렌더링을 줄이고 계산 결과를 캐시하여 앱의 반응성을 향상시킬 수 있다.

### useMemo
#### 개념
useMemo는 비용이 많이 드는 계산 결과를 메모이제이션하여, 의존성 배열에 있는 값이 변경되지 않는 한 계산을 다시 수행하지 않도록 한다. 이는 성능 최적화에 유용하다.
#### 사용법과 예시코드
useMemo는 계산하고자 하는 값을 반환하는 함수와 의존성 배열로 두 개의 인자를 받는다.
```js
import React, { useMemo } from 'react';

const filterTodos = (todos, tab) => {
    // 특정 탭에 따라 할 일 필터링
    return todos.filter(todo => todo.tab === tab);
};

const TodoList = ({ todos, tab }) => {
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

    return (
        <ul>
            {visibleTodos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
};

export default TodoList;
```
> **설명**
> - filterTodos 함수는 주어진 todos 배열에서 특정 tab에 맞는 할 일을 필터링한다.
> - useMemo를 사용하여 `visibleTodos`를 계산한다. todos나 tab이 변경될 때만 필터링이 다시 수행되고, 그렇지 않으면 이전 계산 결과를 재사용한다.

<br>

### useCallback
#### 개념
useCallback은 함수를 메모이제이션하여, 의존성 배열에 있는 값이 변경되지 않는 한 동일한 함수 인스턴스를 반환한다. 이는 자식 컴포넌트에 함수를 전달할 때 불필요한 재렌더링을 방지하는 데 유용하다.

#### 사용법과 예시코드
useCallback은 메모이제이션할 함수와 의존성 배열로 두 개의 인자를 받는다.
```js
import React, { useCallback, useState } from 'react';

const TodoItem = React.memo(({ todo, onToggle }) => {
    console.log(`Rendering: ${todo.text}`);
    return (
        <li onClick={() => onToggle(todo.id)}>
            {todo.text}
        </li>
    );
});

const TodoList = ({ todos }) => {
    const [completed, setCompleted] = useState([]);

    const toggleTodo = useCallback((id) => {
        setCompleted(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    }, []);

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
            ))}
        </ul>
    );
};

export default TodoList;
```
> **설명**
> - TodoItem 컴포넌트는 `React.memo`로 감싸져 있어, props가 변경되지 않는 한 재렌더링되지 않는다.
> - toggleTodo 함수는 useCallback을 사용하여 메모이제이션되는데, 이로 인해 TodoList가 재렌더링되더라도 toggleTodo 함수의 참조가 변경되지 않으며 자식 컴포넌트가 불필요하게 재렌더링되지 않는다.

<br>

### useTransition
#### 개념
useTransition은 상태 전환을 비차단식(Non-Blocking)으로 처리할 수 있도록 해주는 Hook으로, 중요한 UI 업데이트가 사용자 인터페이스를 차단하지 않고 다른 업데이트가 이를 중단할 수 있다.

#### 사용법과 예시코드
useTransition은 상태 전환 함수를 반환하며, 이 함수를 사용하여 비차단식으로 상태 전환을 수행할 수 있다.
```js
import React, { useState, useTransition } from 'react';

const TransitionExample = () => {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);

    const handleClick = () => {
        startTransition(() => {
            setCount(count + 1); // 상태 전환을 비차단식으로 수행
        });
    };

    return (
        <div>
            <button onClick={handleClick}>Increment Count</button>
            {isPending && <span>Loading...</span>}
            <p>Count: {count}</p>
        </div>
    );
};

export default TransitionExample;
```
> **설명**
> - useTransition을 사용하여 startTransition 함수를 생성하며, 이 함수를 사용하여 상태 전환을 비차단식으로 수행한다.
> - 버튼 클릭 시 상태가 변경되지만, 다른 UI 업데이트가 차단되지 않으며 로딩 상태를 표시할 수 있다.

<br>

### useDeferredValue
#### 개념
useDeferredValue는 중요하지 않은 UI 업데이트를 지연시켜, 더 중요한 업데이트가 먼저 반영되도록 한다. 이로 인해 사용자 인터페이스의 반응성을 향상시킬 수 있다.

#### 사용법과 예시코드
useDeferredValue는 하나의 인자를 받아 지연된 값을 반환한다.
```js
import React, { useState, useDeferredValue } from 'react';

const InputWithDeferredValue = () => {
    const [inputValue, setInputValue] = useState('');
    const deferredValue = useDeferredValue(inputValue); // 지연된 값

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <p>Immediate Value: {inputValue}</p>
            <p>Deferred Value: {deferredValue}</p>
        </div>
    );
};

export default InputWithDeferredValue;
```
> **설명**
> 사용자가 입력 필드에 텍스트를 입력하면 `inputValue`가 즉시 업데이트된다. 그러나 `deferredValue`는 지연된 값으로, 입력이 완료된 후에 업데이트된다. 이를 통해 입력 중에 UI가 더 부드럽게 반응할 수 있다.

<br>
<br>

## 6. Other hooks
주로 라이브러리 작성자나 고급 사용자에게 유용한 React의 추가 Hook들이다. 이러한 Hook들은 애플리케이션 코드에서는 자주 사용되지 않지만, 특정 상황에서 매우 유용할 수 있다.

### useDebugValue
#### 개념
useDebugValue는 커스텀 Hook에 대해 React 개발자 도구에서 표시할 레이블을 설정할 수 있게 해주는 Hook이다. 이 Hook을 사용하면 디버깅 시 커스텀 Hook의 상태나 정보를 더 쉽게 파악할 수 있다.

#### 사용법과 예시코드
useDebugValue는 하나의 인자를 받으며, 이 인자는 React 개발자 도구에서 표시할 값이다.
```js
import { useDebugValue, useState } from 'react';

const useCustomHook = (value) => {
    const [state, setState] = useState(value);

    useDebugValue(state ? 'Value is set' : 'Value is not set');

    return [state, setState];
};

// 커스텀 Hook을 사용하는 컴포넌트
const Component = () => {
    const [value, setValue] = useCustomHook(true);

    return <div>{value ? 'Value is true' : 'Value is false'}</div>;
};
```
> **설명**   
> useCustomHook에서 useDebugValue를 사용하여 현재 상태에 따라 표시할 레이블을 설정한다. React 개발자 도구에서 이 레이블이 나타나, 디버깅 시 유용하다.

<br>

### useId
#### 개념
useId는 컴포넌트가 고유한 ID를 생성하고 이를 자신과 연결할 수 있게 해주는 Hook으로, 일반적으로 접근성 API와 함께 사용되어 고유한 ID를 필요로 하는 요소에 적용된다.

#### 사용법과 예시코드
useId를 호출하면 고유한 ID 문자열을 반환한다.
```js
import React, { useId } from 'react';

const AccessibleInput = () => {
    const id = useId(); // 고유 ID 생성

    return (
        <div>
            <label htmlFor={id}>Name:</label>
            <input id={id} type="text" />
        </div>
    );
};

export default AccessibleInput;
```
> **설명**   
> useId를 사용하여 생성된 ID를 `<label>`과 `<input>` 요소에 연결한다. 이를 통해 접근성을 개선하고, ID 충돌을 방지할 수 있다.

<br>

### useSyncExternalStore
#### 개념
useSyncExternalStore는 컴포넌트가 외부 저장소(예: 상태 관리 라이브러리, 브라우저 스토리지 등)를 구독할 수 있게 해주는 Hook이다. 이 Hook은 React 18에서 추가된 새로운 Hook으로, 외부 상태를 동기화하는 데 사용된다.

#### 사용법과 예시코드
이 Hook은 외부 저장소에서 현재 값을 가져오는 함수, 저장소의 변경을 구독하는 함수, 그리고 선택적으로 클린업 함수를 반환하는 함수로 세 가지 인자를 받는다.
```js
import { useSyncExternalStore } from 'react';

// 외부 저장소 예시
const store = {
    subscribers: new Set(),
    value: 0,
    getValue: () => store.value,
    subscribe: (callback) => {
        store.subscribers.add(callback);
        return () => {
            store.subscribers.delete(callback);
        };
    },
    setValue: (newValue) => {
        store.value = newValue;
        store.subscribers.forEach(callback => callback());
    },
};

const useStoreValue = () => {
    return useSyncExternalStore(
        store.subscribe, // 변경 구독
        store.getValue   // 현재 값 가져오기
    );
};

const Component = () => {
    const value = useStoreValue();

    return <div>Current Value: {value}</div>;
};
```
> **설명**   
> useSyncExternalStore를 사용하여 외부 저장소인 store의 값을 구독하고, 현재 값을 가져온다. 이 Hook은 외부 상태가 변경될 때 컴포넌트를 리렌더링한다.

<br>

### useActionState
#### 개념
useActionState는 액션을 통해 상태를 관리할 수 있게 해주는 Hook으로, 이는 React 18에서 추가된 새로운 Hook이다. 상태 관리와 관련된 액션을 처리하는 데 유용하다.

#### 사용법과 예시코드
useActionState는 상태와 상태를 업데이트하는 함수를 반환한다. 이 Hook은 상태 업데이트와 함께 액션을 처리하는 데 최적화되어 있다.

```js
import { useActionState } from 'react';

// 상태와 액션을 관리하는 간단한 예시
const useCounter = () => {
    const [count, setCount] = useActionState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return { count, increment, decrement };
};

const CounterComponent = () => {
    const { count, increment, decrement } = useCounter();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default CounterComponent;
```
> **설명**
> useCounter Hook을 정의하고, 상태와 상태를 업데이트하는 함수를 사용하여 카운터 기능을 구현한다. useActionState를 통해 상태 업데이트와 관련된 액션을 처리한다.


<br>
<br>

--- 
오늘은 리액트19에서 제공하는 내장 Hooks의 종류와 사용법에 대해 간략하게 알아보았다. 다음 시간에는 Custom Hook을 만들어 사용하는 방법에 대해 알아보도록 하겠다.