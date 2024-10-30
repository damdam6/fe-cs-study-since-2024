## ✅ INDEX

[개요](#개요)  
[MVC 패턴](#mvc-패턴)  
[MVP 패턴](#mvp-패턴)  
[MVVM 패턴](#mvvm-패턴)  
[Flux 패턴](#flux-패턴)  
[정리 : 두 패턴의 차이점](#정리--두-패턴의-차이점)

## 개요

### 주제 선정 이유

- [프론트엔드 면접 질문 모음](https://zero-base.co.kr/event/media_insight_contents_FE_frontend_tech_Interview) 보다가 잘 모르겠어서 이번 주 주제로 선정함
- 찾아보니 예전 cs 스터디 때 비슷한 내용을 다뤘어서 유사한 기타 패턴(MVC, MVP)도 가져와봄

## MVC 패턴

_모델(Model) + 뷰(View) + 컨트롤러(Controller)_

![mvc.jpg](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week11/bloblog/MVVM-Flux/image/mvc.jpg?raw=true)

### View

- UI 요소
- 사용자와 상호작용을 통해 데이터 입력 및 변경이 일어나면 컨트롤러에 전달한다.

### Controller

- 모델과 뷰를 이어준다.
- 이벤트 등 메인 로직 및 뷰의 생명 주기를 관리한다.
- 모델이나 뷰가 업데이트되면 이를 해석하여 각각 구성요소에 전달
  - 작동 순서 ; View → Controller → Model → Controller → View

### Model

- 데이터 (e.g. 서버에서 가져온 데이터, 상수, 변수 등)
- 뷰에서 데이터를 생성하거나 수정하면, 컨트롤러가 모델을 생성하거나 갱신한다.

### 특징

- 단방향 바인딩
- 재사용성과 확장성이 용이
- MVVC, Flux 패턴에 비해 컴포넌트 간 의존성 관리가 엄격하지 않아 자유도가 높다.
- 애플리케이션이 복잡해지면 모델과 뷰의 관계도 복잡해진다는 단점이 있다.

### **MVC 패턴의 예시 - React.js**

- 가상 DOM이 컨트롤러 대신 view를 업데이트하는 것이 기존 MVC 와 다른 부분
- 사용자와 상호작용 → `setState` 함수 트리거(controller) → state(model) 값 변경 → 리액트의 가상 DOM이 변경 사항을 감지하여 view 업데이트

## MVP 패턴

_모델(Model) + 뷰(View) + 프레젠터(Presenter)_

- MVC와의 차이?
  - 컨트롤러가 여러 개의 뷰를 관리할 수 있는 것과 달리, 뷰와 프레젠터는 일대일 관계를 가진다.
  - 이로 인해 MVC 보다 더 강한 결합을 가진다.

## MVVM 패턴

_모델(Model) + 뷰(View) + 뷰모델(View Model)_

![mvvm.jpg](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week11/bloblog/MVVM-Flux/image/mvvm.jpg?raw=true)

### View

- Action 이 들어오면 커맨드 패턴으로 ViewModel 에 Action 전달
  <aside>

      ✅ 커맨드 패턴

      객체 지향 디자인 패턴 중 하나
      여러 처리를 하나의 객체로 캡슐화하여 처리

</aside>

### Model

- 애플리케이션의 데이터와 비즈니스 로직을 담당.

### ViewModel

- Model과 View 사이를 이어주며, 뷰의 상태를 관리하고 모델에게 데이터 요청 및 받은 데이터를 변환하여 뷰에 전달한다.
- 뷰와 데이터 바인딩이 되어 있으며, 뷰를 더 추상화한 계층이다 → UI 와 데이터 처리를 분리
  - 데이터 바인딩 : 화면의 데이터와 메모리의 데이터를 일치시킴 → 뷰 모델 변경시 뷰도 변경된다.

### 특징

- 양방향 데이터 바인딩이 가능하며, View와 ViewModel 간의 데이터 동기화가 자동으로 이루어집니다.
  - +) MVVM의 데이터 바인딩은 뷰와 뷰모델을 연결해주지만, 서로 직접 참조하지는 않으므로 결합도가 낮다.
- 코드 재사용성이 높고, UI 업데이트 로직이 단순하여 UI 요소가 많은 경우 관리가 편리하다,
- 단위 테스팅 용이하며, 변수를 변경하는 함수를 사용하지 않아도 됨
- 하지만 양방향 바인딩으로 인해 디버깅이 어려울 수 있으며, 복잡한 프로젝트에서는 로직이 복잡해질 수 있음

### **MVVM 패턴의 예 - Vue.js**

```jsx
// 뷰 모델
// 인스턴스 생성 및 마운트
const app = Vue.createApp({
  data() {
    return {
      name: ''  // 모델
    };
  },
  methods: {
    clearName() {
      this.name = ''; // 데이터 업데이트
    }
  }
});

// id가 "app"인 요소에 Vue 앱 마운트
app.mount('#app');

<div id="app">
  <p>안녕하세요, {{ name }}님!</p>
  <input v-model="name" placeholder="이름을 입력하세요" />
  <button @click="clearName">이름 지우기</button>
</div>

```

- Vue의 v-model 디렉티브를 사용하여 `<input>`과 뷰모델의 name 속성이 양방향으로 바인딩됨
- 인풋창에 이름을 입력하면 name 속성이 자동으로 업데이트됨

## Flux 패턴

_Action+ Dispatcher + Store + View_

### Action

- 데이터 변화를 유발하는 이벤트

### Dispatcher

- Action을 받아서 Store로 전달

### Store

- Dispatcher를 통해 Action을 처리
- 데이터와 비즈니스 로직을 포함하여 상태를 관리

### View

- UI 요소
- Store에서 상태를 받아서 렌더링

### 특징

- 단방향 데이터 흐름
  - Action이 발생하면 Dispatcher를 통해 Store로 전달되고, Store는 상태를 업데이트한 후 View에 반영
- 데이터 흐름이 명확하게 설계되어 있어 디버깅이 용이하고, 상태 관리가 투명함
- 구조가 상대적으로 복잡할 수 있으며, 작은 프로젝트에 적용하기에는 과할 수 있음

### Flux 패턴의 예 - Redux

- Redux 는 Flux 패턴을 따르는 대표적인 라이브러리

```jsx
// 액션 정의
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

// 리듀서 정의
const initialState = { count: 0 };

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

// 스토어에 리듀서 연결
import { createStore } from "redux";
import { counterReducer } from "./reducer";

export const store = createStore(counterReducer);

// 리액트 컴포넌트에서 호출
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
```

- Action: increment라는 상태 업데이트 요청을 dispatch 사용해서 스토어로 전달
- Store
  - 리듀서가 INCREMENT 액션을 받아 count를 증가시킨 새 상태를 반환
  - 리듀서는 Store 내부에서 상태를 갱신하는 로직을 담당
- View: count를 보여주고, 버튼 클릭 등 사용자와 상호작용한다.

## 정리 : 두 패턴의 차이점

일단 MVVM은 Angular, Vue.js 등 에서 사용되며, Flux는 React에서 주로 사용된다.

두 패턴의 차이점은 데이터 흐름과 상태 관리 방식으로 정리할 수 있다.

먼저 MVVM은 양방향 데이터 바인딩을 Flux는 단방향 데이터 흐름을 사용한다. 상태 관리 측면에서는, MVVM 의 경우 ViewModel이 상태를 관리하고 Flux에서는 Store가 상태를 관리한다.

MVVM은 복잡한 UI 상태를 쉽게 관리할 수 있는 반면, Flux는 복잡한 데이터 흐름을 관리하기 유리하다.

+) 데이터 흐름이 다르기 때문에, 테스트 측면에서도 차이가 있다. Flux는 단방향 데이터 흐름과 단일 책임 원칙을 따르므로 테스트하기 쉽고, MVVM에서는 ViewModel과 View 간의 양방향 데이터 바인딩 때문에 테스트하기가 어려울 수 있다.

### 👀 참고자료

https://zero-base.co.kr/event/media_insight_contents_FE_frontend_tech_Interview

[https://velog.io/@ajm0718/프론트엔드-디자인-패턴과-VAC-패턴](https://velog.io/@ajm0718/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4%EA%B3%BC-VAC-%ED%8C%A8%ED%84%B4)

[https://velog.io/@luna238/프론트엔드의-MVC](https://velog.io/@luna238/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%9D%98-MVC)
