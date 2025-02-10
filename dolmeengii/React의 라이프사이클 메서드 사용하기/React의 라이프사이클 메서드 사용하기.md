## React 라이프사이클 메서드 직접 사용해보기

지난 시간에 알아보았던 라이프사이클 메서드를 리액트 프로젝트에서 직접 사용해보자.

<br>

### 1. 예제 컴포넌트 생성하기.

우선 리액트 프로젝트를 하나 준비하고, src 디렉터리에 `LifeCycleSample.js` 컴포넌트 파일을 만들어준다.

```js
import { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref 설정 부분

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return nextState.number % 10 !== 4; // 숫자의 마지막 자리가 4면 리렌더링하지 않는다.
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트가 되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
```

이 컴포넌트는 각 라이프사이클을 실행할 때마다 콘솔 디버거에 기록한다. `state`는 컴포넌트의 상태를 저장하는 객체로, 여기서는 `number`와 `color`를 가지고 있다.

#### 라이프사이클 메서드

**constructor**

> 컴포넌트가 생성될 때 호출된다.  
> 여기서는 console.log('constructor')를 통해 생성 시점을 확인할 수 있다.

**static getDerivedStateFromProps**

> 부모 컴포넌트로부터 props가 변경될 때 호출된다.
> nextProps.color와 prevState.color를 비교하여 색상이 변경되면 상태를 업데이트한다.

**componentDidMount**

> 컴포넌트가 처음 렌더링된 후 호출된다.
> 여기서는 console.log('componentDidMount')를 통해 컴포넌트가 마운트된 시점을 확인할 수 있다.

**shouldComponentUpdate**

> 컴포넌트가 업데이트될지 여부를 결정한다.
> nextState.number의 마지막 자리가 4일 경우 리렌더링을 하지 않도록 설정한다.

**componentWillUnmount**

> 컴포넌트가 언마운트되기 직전에 호출된다.
> 여기서는 console.log('componentWillUnmount')를 통해 언마운트 시점을 확인할 수 있다.

**getSnapshotBeforeUpdate**

> 업데이트가 발생하기 직전에 호출된다.
> 이전 props와 현재 props의 색상을 비교하여, 색상이 변경되면 이전 색상을 반환한다.

**componentDidUpdate**

> 컴포넌트가 업데이트된 후 호출된다.
> 이전 props와 상태, 그리고 getSnapshotBeforeUpdate에서 반환된 값을 사용할 수 있다.

<br>

#### 렌더링

`render` 메서드가 컴포넌트의 UI를 정의하며, style 객체를 사용하여 텍스트 색상을 props로 전달된 color로 설정한다. 또한, `ref`를 사용하여 DOM 요소에 접근할 수 있다.

<br>

#### 전체 흐름

- 컴포넌트가 생성되면 `constructor`가 호출된다.
- props가 변경되면 `getDerivedStateFromProps`가 호출되어 상태를 업데이트한다.
- 컴포넌트가 마운트되면 `componentDidMount`가 호출된다.
- 버튼 클릭 시 handleClick이 호출되어 상태가 업데이트되고, `shouldComponentUpdate`가 호출되어 리렌더링 여부를 결정한다.
- 업데이트가 발생하면 `getSnapshotBeforeUpdate`와 `componentDidUpdate`가 호출된다.
- 컴포넌트가 언마운트되면 `componentWillUnmount`가 호출된다.

<br>
<br>

### 2. App 컴포넌트에서 예제 컴포넌트 사용하기

우선 App.js 파일에 있던 기존의 코드를 지우고, 아래와 같이 작성한다.

```js
import { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상을 생성한다.
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
```

button을 클릭할 때마다 handleClick 메서드가 호출되게 이벤트를 설정하고, LifeCycleSample 컴포넌트에 color 값을 props로 설정하여 콘솔에서 확인할 수 있게 해보자.

|                                                                                                                                 React.StrictMode 적용 시                                                                                                                                 |                                                                                                                                  React.StrictMode 미적용 시                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![strict 적용 이미지](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/Strict.GIF) | ![strict 미적용 이미지](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/noStrict.GIF) |

**❓ React.StrictMode 적용하면 왜 라이프사이클이 두번씩 호출되나요?**

> React.StrictMode가 적용되어 있으면 일부 라이프사이클이 두 번씩 호출되는데, 개발 환경에서만 두 번씩 호출되며 실제 프로덕션 환경에서는 정상적으로 호출된다.  
> React.StrictMode는 리액트 애플리케이션에서 개발 중에 발생할 수 있는 문제를 감지하고 경고하기 위해 제공되는 도구로, 개발 모드에서만 활성화된다. 주로 부작용을 감지하고 불안전한 라이프사이클 메서드의 사용을 감지하고 경고한다.  
> 결론적으로, React.StrictMode 는 개발자가 더 안전하고 예측 가능한 코드를 작성할 수 있도록 돕기 위해 라이프사이클 메서드를 두 번 호출하는 것이다.

<br>

### 3. 에러 잡아내기

LifeCycleSample 컴포넌트의 render 함수에서 의도적인 에러를 발생시켜 보자. render 함수에서의 에러는 주로 존재하지 않는 함수를 사용하려고 하거나, 존재하지 않는 객체의 값을 조회하려고 할 때 발생한다. 자, 컴포넌트의 render 함수를 다음과 같이 고쳐보자.

```js
 render(){
        console.log('render');

        const style = {
            color: this.props.color
        };

        return (
            <div>
                {this.props.missing.value}
                <h1 style={style} ref={ref => this.myRef=ref}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>
                    더하기
                </button>
            </div>
        )
    }
```

존재하지 않는 props인 `missing` 객체의 value를 조회하여 렌더링해주려고 한다. 이렇게 하면 브라우저에서는 에러가 발생한다.

|                                                                                                                                                                          개발자 화면                                                                                                                                                                           |                                                                                                                                                                             실사용자 화면                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![error 이미지](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/%EC%97%90%EB%9F%AC%20%EB%B0%9C%EC%83%9D%20-%20%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD.png) | ![error 이미지-사용자](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/%EC%97%90%EB%9F%AC%20%EB%B0%9C%EC%83%9D%20-%20%EC%8B%A4%EC%82%AC%EC%9A%A9%EC%9E%90.png) |

우리는 개발 서버를 실행중이기 때문에 현재 어디서 에러가 발생하는지 알려주는 경고 문구가 뜨지만, 실제 사용자의 화면에서는 흰 화면만 보이게 된다. 지금부터 에러를 잡아주는 ErrorBoundary 컴포넌트를 맏들어보자. src 디렉터리에 `ErrorBoundary.js` 파일을 생성한 후 다음 코드를 작성한다.

```js
import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
    });
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.error) return <div> 에러가 발생했습니다. </div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
```

이제 에러가 발생하면 `componentDidCatch` 메서드가 호출되고 이 메서드가 **this.state.error 값을 true로 업데이트** 해준다. 그리고 render 함수는 this.state.error 값이 true일 때 에러가 발생했다는 문구를 보여줄 것이다.

이 컴포넌트를 App.js 에 있는 LifeCycleSample 컴포넌트를 감싸주게 해보자.

```js
import { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";
import ErrorBoundary from "./ErrorBoundary";

// 랜덤 색상을 생성한다.
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
```

이렇게 코드를 저장하여 다시 실행해보고, 개발 서버 환경에서 실행되는 경고 문구를 `X` 하여 닫아주면 다음 문구가 보일 것이다.

![에러 발생 문구 이미지](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/%EC%97%90%EB%9F%AC%20%EB%B0%9C%EC%83%9D%20%EB%AC%B8%EA%B5%AC%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png)

<br>

### 정리하자면...

![컴포넌트 라이프사이클 메서드의 흐름](https://github.com/dolmeengii/fe-cs-study/blob/465d1562a1eb58ee705faf1cb9c832bf7a295af4/dolmeengii/React%EC%9D%98%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/images/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%20%EB%A9%94%EC%84%9C%EB%93%9C%20%ED%9D%90%EB%A6%84.png)

라이프사이클 메서드는 컴포넌트의 상태에 변화가 있을 때마다 실행하는 메서드이다. 이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용하다. 추가로 컴포넌트의 업데이트 성능을 개선할 때는 `shouldComponentUpdate`가 중요하게 사용되는데 이는 추후에 다뤄보도록 하겠다.

<br>

---

##### 🔖 참고

- 리액트를 다루는 기술 - 김민준 지음
