## Styled-Component란

- React와 같은 JavaScript 프레임워크에서 CSS를 컴포넌트 단위로 관리할 수 있도록 도와주는 라이브러리다.
- CSS-in-JS 라이브러리로, 스타일을 JavaScript 코드 내에서 직접 작성하고 관리할 수 있게 해준다.

## 주요 기능 및 특징

- **컴포넌트 기반 접근 방식:**
    - 컴포넌트 기반으로 스타일을 정의하므로, 각 스타일드 컴포넌트가 독립적으로 작동한다. 이는 UI를 모듈화하고, 재사용성을 높이며, 코드의 구조를 더 명확하게 만들어준다.
 
- **자동으로 고유 클래스 이름 생성:**
    - 각 스타일드 컴포넌트는 고유한 클래스 이름을 자동으로 생성하여, 클래스 이름 충돌, 중복, 오타 문제를 방지한다. 스타일의 범위가 컴포넌트에 국한되어 있어 전역 스타일의 영향을 받지 않는다.
      
- **동적 스타일링:**
    - 컴포넌트의 props나 전역 테마를 기반으로 스타일을 쉽게 조정할 수 있다. 여러 개의 클래스를 수동으로 관리할 필요 없이, 동적 스타일링이 간단하고 직관적이다.
      
- **중첩 스타일링 및 상속:**
    - 중첩 스타일링을 지원하여, 컴포넌트 내에서 다른 스타일드 컴포넌트를 쉽게 포함하고 스타일을 상속받을 수 있다. 이를 통해 보다 복잡한 레이아웃과 디자인을 손쉽게 관리할 수 있다.
      
- **유지보수 용이:**
    - 스타일링이 컴포넌트와 함께 정의되기 때문에, 다양한 파일을 검색하며 스타일을 찾을 필요가 없다. 코드베이스가 커져도 유지보수가 쉬워진다.

## 사용 방법

- 패키지 설치
    
    ```
    npm install styled-components
    ```
    
- styled 함수 import
    
    ```jsx
    import styled from 'styled-components';
    ```
    
- 기본 구조
    
    ```jsx
    const 컴포넌트명 = styled.사용할html태그`
      CSS 스타일링
    `
    ```
    

### 1. 스타일이 적용된 컴포넌트 만들기

```jsx
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

function App () {
	return(
	    <Title>Hello World!</Title>
	)
}

export default App;
```

### 2. Props를 사용하여 스타일 조정하기

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.$primary ? "red" : "white"};
  color: ${({ $primary }) => $primary ? "white" : "red"};
`;

function App () {
	return(
	    <div>
		<Button>Normal</Button>
		<Button $primary>Primary</Button>
	    </div>
	)
}

export default App;
```

1. `<Button $primary></Button>`
    - 스타일 속성 명명 규칙:
        - styled-components에서는 `$` 기호를 붙여 props가 스타일링의 목적에만 사용된다는 것을 명시적으로 표시할 수 있다. 이는 스타일 속성과 일반 props를 구분하여 혼동을 줄이는 데 도움을 준다. `$` 기호를 붙이는 것은 선택적이며, 필수는 아니다.
    - 조건부 스타일링
        - `Button` 컴포넌트에 `$primary` 라는 props를 전달하여 버튼의 스타일을 동적으로 변경할 수 있다.
          
2. `${props => props.$primary ? "red" : "white"}`
    - 이 구문은 템플릿 리터럴 내에서 JavaScript 표현식을 사용하는 방법이다.
    - `props`는 `Button` 컴포넌트에 전달된 props 객체를 나타낸다.
    - `props.$primary`가 참(true)인지 거짓(false)인지에 따라 다른 값을 반환한다
      
3. `${({ $primary }) => $primary ? "white" : "red"};`
    - 구조분해 할당을 사용하여 `props` 객체에서 `$primary` 속성만을 추출하여 변수로 사용하여 코드를 더 간결하고 읽기 쉽게 만들 수도 있다.

### 3. 컴포넌트의 스타일을 상속받아 스타일 확장하기

```jsx
import styled from 'styled-components';

const Button = styled.button`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

function App () {
	return(
	    <div>
		<Button>Normal Button</Button>
		<TomatoButton>Tomato Button</TomatoButton>
	    </div>
	)
}

export default App;
```

- `styled(Button)`을 사용하여 기존의 `Button` 컴포넌트를 상속받아 기본 스타일을 유지하면서, 특정 스타일만 수정하여 `TomatoButton` 컴포넌트를 만들 수 있다.
- 재사용성, 유지보수성, 커스터마이징의 장점을 가진다.

### 4. 스타일이 적용된 컴포넌트를 다른 태그로 변환하기

```jsx
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
  display: block;
`;

function App () {
	return(
	    <div>
		<Button>Normal Button</Button>
		<Button as="a" href="#">Link with Button styles</Button>
	    </div>
	)
}

export default App;
```

- `as` prop은 컴포넌트의 스타일을 재사용하면서도, 컴포넌트의 HTML 태그를 동적으로 변경할 수 있게 해준다.
- 같은 스타일을 다양한 HTML 요소에 적용할 수 있으므로, 코드 중복을 줄이고 스타일의 일관성을 유지할 수 있다.

### 5. 가상 요소, 가상 선택자 적용하기

```jsx
import styled from "styled-components";

const StyledButton = styled.button`
  color: black;

  &::before {
    content: "→";
  }

  &:hover {
    color: red;
  }
`;

function App() {
  return <StyledButton>Hover Me</StyledButton>;
}

export default App;
```

- `&`는 **현재 컴포넌트**를 참조하는 선택자로, 스타일이 적용될 요소를 기준으로 추가 스타일을 정의할 때 사용한다.

### 6. 중첩 스타일링하기

```jsx
import styled from "styled-components";

const Card = styled.div`
  background-color: white;

  h1 {
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #666;
  }
`;

function App() {
  return (
    <Card>
      <h1>Title</h1>
      <p>Content</p>
    </Card>
  );
}

export default App;
```

- `Card` 컴포넌트 내의 `h1`과 `p` 요소는 `Card`의 스타일과 함께 정의되어 있으며, 중첩된 스타일링을 통해 코드의 가독성과 유지보수성을 높인다.

### 7. `&&`로 우선순위 높은 스타일 지정하기

```jsx
import styled from 'styled-components';

const Button = styled.button`
  color: blue;

  &:hover {
    color: green;
  }

  && {
    color: red; /* 이 스타일은 다른 스타일보다 우선순위가 높다 */
  }
`;

function App() {
  return <Button>Click Me</Button>;
}

export default App;

```

- `&&` 이중 앰퍼샌드는 특정 컴포넌트 인스턴스에 스타일을 재정의할 때 유용하다. 다른 조건보다 이 스타일이 더 높은 우선순위를 가지도록 보장한다.

### 8. `createGlobalStyle`로 전역 스타일 정의하기

```jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: red;
  }

  p {
    line-height: 1.5;
    font-size: 16px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <h1>Hello, World!</h1>
      <p>This is a global style example.</p>
    </>
  );
}

export default App;
```

- `createGlobalStyle`은 일반적인 `styled` 함수와 다르게 특정 컴포넌트 내에 스타일이 제한되지 않고, 전체 문서에 적용된다.
- 전역 스타일은 애플리케이션 전체에 영향을 미치므로, 필요한 경우에만 신중하게 사용해야 한다.
