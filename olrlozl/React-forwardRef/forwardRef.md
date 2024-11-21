## 1. forwardRef 란

- 기본적으로 리액트에서는 부모 컴포넌트가 자식 컴포넌트에 ref를 직접 전달할 수 없다. 하지만 `forwardRef`를 사용하면 상위 컴포넌트가 `ref`를 자식 컴포넌트로 전달할 수 있다.
- 기본 사용 예시:
    
    ```jsx
    import { forwardRef } from 'react';
    
    const MyInput = forwardRef(function MyInput(props, ref) {
      // ...
    });
    ```
    
- `forwardRef`의 인자 두 개
    - `props`: 컴포넌트에 전달된 속성값
    - `ref`: 부모 컴포넌트로부터 전달된 `ref`
- `forwardRef` 를 사용하는 경우
    - 자식 컴포넌트 내부의 DOM 요소에 직접 접근할 필요가 있을 때
    - 부모 컴포넌트에서 자식의 컴포넌트의 ref를 직접 조작하려할 때

## 2. 예제로 이해하기

### ex1. input 태그에 focus 이동하기

```jsx
import { useRef } from 'react';

export default function Form() {
	// 1. useRef Hook을 사용하여 inputRef를 선언
  const inputRef = useRef(null);

  function handleClick() {
	  // 3. inputRef.current에서 input DOM 노드를 읽고 focus()를 호출
    inputRef.current.focus(); 
  }

  return (
    <>
      // 2. React에 이 input태그의 DOM 노드를 inputRef.current에 넣음
      <input ref={inputRef} />  
      
      // 4. onClick으로 handleClick 이벤트 핸들러를 전달
      <button onClick={handleClick}> Focus the input </button>
    </>
  );
}
```

- `<input />`같은 브라우저 요소를 출력하는 내장 컴포넌트에 ref를 주입할 때, React는 ref의 `current` 프로퍼티를 그에 해당하는 (브라우저의 실제 `<input />` 같은) DOM 노드로 설정한다.
- 즉, `inputRef.current`는 `<input />` DOM 요소 자체를 가리킨다. 브라우저의 실제 DOM 노드를 참조하게 된다.

### ex2. 직접 만든 **컴포넌트의 input 태그에 focus 이동하기**

- 잘못된 예시:
    
    ```jsx
    import { useRef } from 'react';
    
    function MyInput(props) {
      return <input {...props} />;
    }
    
    export default function MyForm() {
      const inputRef = useRef(null);
    
      function handleClick() {
        inputRef.current.focus();
        // 여기서 에러 발생 Cannot read properties of null (reading 'focus')
      }
    
      return (
        <>
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            Focus the input
          </button>
        </>
      );
    }
    ```
    
    - `<MyInput />` 같이 **사용자 정의 컴포넌트**에 ref를 주입할 때는 ref의 current 값이 기본적으로 `null`로 설정된다. 이유는, 리액트가 사용자 정의 컴포넌트를 **DOM 요소가 아닌** 일반 자바스크립트 함수로 처리하기 때문이다.
    - 따라서 오류가 발생하며, 버튼을 클릭할 때 input 요소에 포커스 **되지 않는다.**
    - React는 기본적으로 다른 컴포넌트의 DOM 노드에 접근하는 것을 허용하지 않도록 설계되어있다. 컴포넌트의 자식도 예외는 아니다. 직접 다른 컴포넌트의 DOM 노드를 조작하는 것은 코드가 쉽게 깨지게 만들기 때문이다.
    - 이 문제를 해결하려면, `ref`를 자식 컴포넌트에서 받을 수 있도록 `forwardRef`를 사용해야 한다.
- **`forwardRef`를 사용한 해결 방법**
    
    ```jsx
    import { forwardRef, useRef } from 'react';
    
    const MyInput = forwardRef((props, ref) => {
      return <input {...props} ref={ref} />;
    });
    
    export default function Form() {
      const inputRef = useRef(null);
    
      function handleClick() {
        inputRef.current.focus();
      }
    
      return (
        <>
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            Focus the input
          </button>
        </>
      );
    }
    ```
    
    - `MyInput` 컴포넌트가 `forwardRef`로 래핑되었기 때문에, 부모 컴포넌트에서 전달한 `ref`는 실제 `<input />` DOM 요소를 참조하게 된다. 이때 `inputRef.current`는 `<input />` DOM 요소를 가리키게 되며, `focus()`와 같은 DOM 메서드를 호출할 수 있다.
    - 이 패턴은 디자인 시스템에서 버튼, 입력 요소 등의 저수준 컴포넌트에서 DOM 노드를 전달하기 위해 매우 흔하게 사용된다. 반면 폼, 목록 혹은 페이지 섹션 등의 고수준 컴포넌트에서는 의도하지 않은 DOM 구조 의존성 문제를 피하고자 일반적으로 DOM 노드를 노출하지 않는다.

## 3. useImperativeHandle

- 전체 **DOM 노드를 노출하는 대신** 제한된 메서드 집합과 함께 ***명령형 핸들* 이라고 하는 사용자 정의 객체를 노출**할 수 있다. 이 때  `useImperativeHandle`을 사용한다.
- 이를 위해 DOM 노드를 보유할 별도의 ref를 정의해야 한다. (여기서는 realInputRef)

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef((props, ref) => {
	// 1. 실제 <input /> DOM 요소를 참조하기 위한 로컬 ref 생성
  const realInputRef = useRef(null); 
  
  // 2. useImperativeHandle 훅을 사용하여 부모 컴포넌트가 사용할 수 있는 인스턴스 메서드를 정의
  useImperativeHandle(ref, () => {
	  return {
		  // 부모가 사용할 수 있도록 ref에 focus()와 scrollIntoView() 메서드를 할당
	    focus() {
	      realInputRef.current.focus();
	    },
	    scrollIntoView() {
	      inputRef.current.scrollIntoView();
	    },
    };
	  }, []);
	  
	// 3. <input />에 props와 함께 전달된 ref를 realInputRef로 연결
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

```

- 일부 컴포넌트가 `MyInput`의 ref를 받으면 DOM 노드 대신 `{ focus, scrollIntoView }` 객체만 받는다.
- ⇒ 이를 통해 노출하는 DOM 노드의 정보를 최소한으로 제한할 수 있다.

### 참고

https://ko.react.dev/reference/react/forwardRef#forwardref

[https://ko.react.dev/learn/manipulating-the-dom-with-refs](https://ko.react.dev/learn/manipulating-the-dom-with-refs#)
