# React Hook 의 개념

## React Hook 개요
### React Hook 이란?
> Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수입니다. Hook은 class 안에서는 동작하지 않습니다. 대신 class 없이 React를 사용할 수 있게 해주는 것입니다.

React Hook은 함수형 컴포넌트에서 상태(state)와 생명주기(lifecycle) 기능을 사용할 수 있도록 해주는 특별한 함수이다. Hooks를 통해 개발자는 컴포넌트 간의 상태 로직을 재사용하고, 코드의 가독성과 유지보수를 향상시킬 수 있다.


### React Hook 등장 배경
> Hook은 React 버전 16.8부터 React 요소로 새로 추가되었습니다. Hook을 이용하여 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.

React 공식 문서에 따르면 React Hook은 버전 16.8에 도입되어 사용되어 왔고, Hook이 추가되기 전에는 Class 바탕의 코드를 작성하여 구현했다고 한다. 클래스를 사용한 코드와, Hook을 사용한 코드에는 어떤 차이점이 있는지, 왜 Hook이 도입되었는지 알아보자.

#### Class 사용 코드
```js
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    
    componentDidMount() {
        // 컴포넌트가 마운트될 때 실행
        console.log('Counter mounted');
    }
    
    componentDidUpdate(prevProps, prevState) {
        // 상태가 업데이트될 때 실행
        if (prevState.count !== this.state.count) {
            console.log(`Count updated to: ${this.state.count}`);
        }
    }
    
    componentWillUnmount() {
        // 컴포넌트가 언마운트될 때 실행
        console.log('Counter will unmount');
    }
    
    increment = () => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    };
    
    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default Counter;
```

#### Hook 사용 코드
```js
import React, { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
        useEffect(() => {
            // 컴포넌트가 마운트될 때 실행
            console.log('Counter mounted');
            return () => {
                // 컴포넌트가 언마운트될 때 실행
                console.log('Counter will unmount');
            };
        }, []); // 빈 배열을 전달하여 마운트될 때만 실행
    
        useEffect(() => {
            // 상태가 업데이트될 때 실행
            console.log(`Count updated to: ${count}`);
        }, [count]); // count가 변경될 때만 실행
        const increment = () => {
            setCount((prevCount) => prevCount + 1);
        };
        
        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={increment}>Increment</button>
            </div>
        );
};

export default Counter;
```

|| 상태 관리 | 생명 주기 메서드                                                                         |
|--|--|-----------------------------------------------------------------------------------|
| Class |`this.state`와 `this.setState`를 사용하여 상태 관리| `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 등의 메서드를 사용해야 함  |
| Hook  |`useState`를 사용하여 상태 관리       | `useEffect`를 사용하여 동일한 기능을 수행할 수 있으며, 의존성 배열을 통해 제어할 수 있음                          |



Class로 구현한 코드와 비교를 해보았다. Hook 을 도입한 코드는 코드도 간결해지고, 가독성도 더 좋아졌다. Class 로 구현을 하게 되면 기능을 추가할 때 구조가 복잡하여 기능 추가가 쉽지 않다. 그러니까, 리액트에서 Hook을 도입한 이유에 대해 글로 정리해보자면

##### 1. 상태 로직의 재사용 문제
기존에는 컴포넌트 간에 상태 로직을 재사용하기 어려웠다. 기존의 고차 컴포넌트(HOC)나 렌더 프로프(render props) 방식은 코드 구조를 복잡하게 만들고, `래퍼 지옥(wrapper hell)`이라는 문제를 초래했다.
> `고차 컴포넌트 (HOC: Higher-Order Component)`는 다른 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수로, 주로 공통된 로직을 재사용하기 위해 사용된다.   
> `렌더 프로프 (Render Props)`는 컴포넌트가 함수를 prop으로 전달받아, 그 함수에서 반환되는 React 요소를 렌더링하는 방식이다. 이 방식은 상태나 로직을 공유하기 위해 사용된다.

##### 2. 복잡한 컴포넌트 유지보수
상태 관련 로직과 사이드 이펙트가 한 컴포넌트에 혼합되어 관리하기 어렵다. 생명주기 메서드가 혼재되어 코드의 가독성과 유지보수가 어려워진다.

##### 3. Class의 복잡성
JavaScript의 this 키워드와 Class 개념이 어려워 Class를 사용하고자 할 때 복잡한 이해가 필요하며, 이는 코드의 재사용성과 구성의 어려움을 초래한다.

결론적으로 Hook은 상태 관련 로직을 독립적으로 추상화하여 컴포넌트 재사용성을 높이고, 함수형 컴포넌트의 사용을 장려함으로써 코드의 간결성과 최적화를 위해 도입됐다.


<br>

## Hook 사용 규칙
React 공식 문서에 따르면 Hook은 그냥 JavaScript 함수이지만, 다음과 같은 두 가지 규칙을 준수해야 한다.
- 최상위(at the top level)에서만 Hook을 호출해야한다.
- React 함수 컴포넌트 내에서만 Hook을 호출해야 합니다.

일단, 이 규칙을 이해하기 위해서는 JavaScript와 React의 렌더링 메커니즘을 먼저 이해해야한다.

| 자바스크립트의 렌더링 메커니즘                                                                                                                                                                                                                              | React의 렌더링 메커니즘                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **DOM 조작을 통한 UI 업데이트** <br><br> - `직접적인 DOM 조작`: 자바스크립트 코드를 통해 DOM 요소를 선택하고, 해당 요소의 속성이나 내용을 직접 변경함. <br><br> -`이벤트 기반`: 사용자의 이벤트(클릭, 입력 등)에 따라 UI를 업데이트 <br><br> -`상태 관리의 부재`: 상태를 관리하는 시스템이 없기 때문에, 상태 변화에 따라 UI를 업데이트하기 위해서는 매번 DOM을 직접 조작 | **선언적(declarative) 방식의 UI 라이브러리** <br><br> - `가상 DOM`: React는 가상 DOM을 사용하여 실제 DOM과의 차이를 계산 -> 필요한 부분만 업데이트할 수 있어 성능을 최적화 가능 <br><br> - `컴포넌트 기반 설계`: UI를 컴포넌트로 나누어, 각 컴포넌트가 자신의 상태를 관리. 상태가 변경되면 React는 해당 컴포넌트를 다시 렌더링 <br><br> - `Hooks와 상태 관리`: Hooks를 통해 상태와 사이드 이펙트를 관리, React의 렌더링 메커니즘과 통합. React는 Hooks 호출 순서를 기억하고, 이를 바탕으로 상태를 추적. |

자, 그럼 왜 이러한 규칙들이 있는지 확인해보자. 

### Hook을 최상위 레벨에서만 호출하기
> Hook을 반복문, 조건문, 중첩 함수, 또는 try/catch/finally 블록 내부에서 호출하지 마세요. 대신 Hook을 항상 React 함수의 최상위 레벨에서 호출하고, early return 이전에 사용해야 합니다. Hook은 React가 함수 컴포넌트를 렌더링하는 동안에만 호출할 수 있습니다.
> 
> ✅ 함수 컴포넌트의 본문 최상위 레벨에서 호출하세요.   
> ✅ 커스텀 Hook의 본문 최상위 레벨에서 호출하세요.
> 
> ![최상위 레벨 호출](https://github.com/dolmeengii/fe-cs-study/blob/8cfe62401089e2166713058b524a18f13d6a2321/dolmeengii/React%20Hooks/images/callRoot.png)

리액트 공식문서에 있는 설명을 옮겨왔다. 이 설명만 봤을 때는 왜 오류가 생기는지 알 수 없다. 그래서 구조적인 원리에 의한 문제점이 어떤 것들이 있는지 직접 찾아봤다.

##### 1. Hooks 호출 순서의 일관성 유지
Hooks는 컴포넌트가 렌더링될 때마다 특정 순서로 호출되어야 한다. React는 내부적으로 Hooks의 호출 순서를 기억하고, 이를 바탕으로 상태 및 효과를 관리한다. 만약 조건문, 반복문, 중첩 함수 등에서 Hooks를 호출하면, 호출 순서가 변경될 수 있는데, 이 경우 React는 이전 호출과 현재 호출을 비교할 수 없어 상태와 효과가 잘못 연결될 수 있다.

```js
const MyComponent = () => {
    const [count, setCount] = useState(0); // 1. Hook 호출

    if (count > 0) {
        const value = useSomeHook(); // 2. 조건문 안에서 Hook 호출
    }

    return <div>{count}</div>;
};
```
만약 위에서처럼 조건문 안에서 Hook을 호출하게 되면, 렌더링할 때마다 호출 순서가 달라질 수 있다. 여기서 count가 0보다 큰 경우에만 useSomeHook()이 호출되기 때문에 이 경우, React가 이 컴포넌트를 처음 렌더링할 때 count가 0이므로 useSomeHook()은 호출되지 않는다. 하지만 다음 렌더링에서 count가 1로 변경되면, useSomeHook()이 호출된다.
> 호출 순서의 변화
> - 첫 번째 렌더링: useState()가 호출되고, useSomeHook()은 호출되지 않음.
>     - 첫 번째 렌더링에서는 useState()가 0번째 Hook으로 호출되고, useSomeHook()은 호출되지 않음.
> - 두 번째 렌더링: count가 1로 증가하여 useSomeHook()이 호출됨.
>     - 두 번째 렌더링에서는 useState()가 여전히 0번째 Hook으로, useSomeHook()은 1번째 Hook으로 호출됨.

##### 2. 상태와 사이드 이펙트의 불일치
Hooks는 상태와 사이드 이펙트를 관리하는 데 사용되며, 이러한 관리가 일관되어야 한다. Hooks를 최상위 레벨에서 호출하면, 컴포넌트가 다시 렌더링될 때마다 항상 같은 순서로 호출되므로 상태와 효과의 일관성을 유지할 수 있다.
> - `상태 (State)`: 컴포넌트의 현재 데이터를 나타낸다. 예를 들어, 버튼 클릭 횟수, 입력한 텍스트 등이 상태이다.   
> - `사이드 이펙트 (Side Effect)`: 컴포넌트가 렌더링될 때 발생하는 외부 작업을 말한다. 예를 들어, API에서 데이터를 가져오거나, 타이머를 설정하는 것 등이 있다.

```js
const MyComponent = () => {
    const [count, setCount] = useState(0); // 상태를 설정

    useEffect(() => {
        console.log(`Count is: ${count}`); // 사이드 이펙트
    }, [count]); // count가 변경될 때마다 실행

    const increment = () => {
        setCount(count + 1); // 상태 업데이트
    };

    return <button onClick={increment}>Increment</button>;
};
```
위 예시에서는 `count`라는 상태가 있으며, 버튼을 클릭할 때마다 증가한다. `useEffect`를 사용하여 count가 변경될 때마다 콘솔에 현재 count 값을 출력한다. 이렇게 상태와 사이드 이펙트가 명확하게 연결되어 있기 때문에, count가 변경될 때마다 올바른 값을 콘솔에 출력할 수 있다.

만약 `useEffect`를 최상위 레벨에서 호출하지 않고 조건문 안에 넣거나, 반복문 안에서 호출하게 되면, 호출 순서가 달라질 수 있다. 이 경우, React는 어떤 상태가 어떤 사이드 이펙트와 연결되어 있는지 기억할 수 없게 되어, 예기치 않은 결과를 초래할 수 있다.

##### 3. React의 렌더링 메커니즘
> ###### React의 렌더링 과정
> 1. 컴포넌트 함수 호출: React는 컴포넌트 함수를 호출하여 JSX를 반환한다.
> 2. Hooks 호출: 컴포넌트 내에서 사용된 Hooks가 호출됩니다. 이때 상태를 설정하거나 사이드 이펙트를 관리한다. 
> 3. UI 업데이트: 반환된 JSX를 기반으로 UI가 업데이트된다.

React는 컴포넌트를 렌더링할 때 Hooks를 호출하여 내부 상태를 설정하고, 사이드 이펙트를 적용하는데, 이 때 Hooks가 최상위 레벨에서 호출되지 않으면 React는 호출 순서가 달라져서 어떤 상태가 어떤 Hook과 연결되는지 알 수 없게 되어 상태 추적이 어려워진다. 예를 들어, 컴포넌트가 재렌더링될 때 이전 상태와 새로운 상태를 비교하는 과정에서 혼란이 생길 수 있다.

```js
const MyComponent = () => {
    const [count, setCount] = useState(0); // 1. Hook 호출

    if (count > 0) {
        const value = useSomeHook(); // 2. 조건문 안에서 Hook 호출
    }

    return <button onClick={() => setCount(count + 1)}>Increment</button>;
};
```
> - 첫 번째 렌더링: count가 0이므로, useSomeHook()은 호출되지 않음.
> - 두 번째 렌더링: count가 1로 증가하면 useSomeHook()이 호출됨.

이 경우, React는 첫 번째 렌더링에서는 useState()가 0번째 Hook으로, useSomeHook()은 호출되지 않아 1번째 Hook으로 기억한다. 두 번째 렌더링에서는 useState()가 여전히 0번째 Hook으로, useSomeHook()은 1번째 Hook으로 호출되므로, 상태 추적에 문제가 생긴다.

결론적으로, Hooks를 항상 최상위 레벨에서 호출해야 하는 이유는 React의 상태 관리와 렌더링 일관성을 유지하기 위해서이다. 이러한 규칙을 따르지 않으면 상태와 효과의 연결이 깨져, 예기치 않은 동작이나 에러가 발생할 수 있는 것이다.

<br>

### Hook React 함수에서만 호출하기
> 일반 자바스크립트 함수에서 Hook을 호출하지 마세요. 대신 다음과 같이 사용할 수 있습니다.
>
> ✅ Hook을 React 함수 컴포넌트에서 호출하세요.   
> ✅ Hook을 커스텀 Hook에서 호출하세요.

##### 1. React의 상태 관리 시스템과의 연결 부족 
React의 상태 관리 시스템은 컴포넌트의 렌더링 과정과 밀접하게 연관되어 있는데, Hooks는 컴포넌트가 렌더링될 때 호출되어 상태를 설정하고 사이드 이펙트를 관리한다. 일반 자바스크립트 함수는 React의 렌더링 메커니즘과 연결되지 않기 때문에, 상태를 추적하거나 변경할 수 없다.

##### 2. 호출 순서와 일관성 문제
Hooks는 항상 같은 순서로 호출되어야 하며, React는 이 순서를 기억하여 상태와 Hook을 연결한다고 했다. 그런데 일반 자바스크립트 함수에서 Hooks를 호출하면 호출 순서가 변할 수 있어, React가 상태를 올바르게 추적할 수 없기 때문에 상태와 관련된 정보가 누락되거나 잘못 연결될 수 있다.

##### 3. React의 생명주기와 동기화
React는 컴포넌트의 생명주기(마운트, 업데이트, 언마운트)에 따라 Hooks를 호출힌다. 일반 자바스크립트 함수에서는 이러한 생명주기와 동기화할 수 없기 때문에, 상태 변화에 따른 적절한 업데이트가 이루어지지 않는다.

##### 4. 상태와 사이드 이펙트의 일치성
React는 상태가 변경될 때마다 Hooks를 호출하여 사이드 이펙트를 처리한다고 했는데, 일반 자바스크립트 함수에서는 이러한 메커니즘이 작동하지 않아 상태와 사이드 이펙트 간의 일치성을 유지할 수 없다.

따라서, React는 일반 자바스크립트 함수에서 작성된 코드의 상태를 추적할 수 없으며, 상태 관리를 위해서는 React의 함수 컴포넌트나 커스텀 Hook 내에서 Hooks를 사용해야 한다. 이렇게 함으로써 React는 상태와 사이드 이펙트를 일관되게 관리하고, 안정적인 UI를 제공할 수 있다.




----
> [리액트 공식문서 보러가기](https://ko.react.dev/reference/rules/rules-of-hooks#only-call-hooks-at-the-top-level)