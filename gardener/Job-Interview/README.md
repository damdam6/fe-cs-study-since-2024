# Front-End 기술 면접 대비 질문 답변 알아보기

## 0. 들어가며
무엇을 해야할지 고민하다가, 이전에 즐겨찾기로 등록해놓은 프론트엔드 기출면접 20선에서 확실히 알았으면 하는 개념에 대해 5가지를 들고왔다.

## 1. 해당 프레임워크를 선택한 이유 (React, Vue, Next.js)
<img src="https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/waszdxb6gy1n9x3sfroi/design-web-ui-in-react-js-next-js-angular-js-or-vue-js.png" />
프론트엔드 개발에서 FrameWork를 선택하는 이유는 개발 생산성, 성능 최적화, 커뮤니티 지원, 유지보수성 등의 이유 때문이다.

1. React
    - 컴포넌트 기반 구조로 UI를 재사용 가능하게 만듬
    - 가상 DOM(Virtual DOM)으로 렌더링 최적화
    - Hooks를 사용하여 함수형 방식으로 상태 및 라이프사이클을 관리 가능
2. Vue
    - 템플릿 기반 구조, HTML/CSS 활용도가 높음
    - 반응형 시스템으로 상태 변경시 자동으로 업데이트
    - Vue Router, Vuex 등과의 통합성이 좋음.
3. Next.js
    - React 기반의 프레임워크로 SSR과 SSG를 지원함
    - SEO 최적화 가능 (SSR,SSG 활용)
    - API Routes 기능을 제공하여 백엔드 기능 일부 수행 가능

## 2. 클래스형 컴포넌트와 함수형 컴포넌트의 차이
<img src="https://velog.velcdn.com/images/clydehan/post/e0d78a70-a458-47b5-98db-d82e08640d93/image.png" />
우리는 React 에서 함수형 컴포넌트만 사용했겠지만, 이전에는 클래스형 컴포넌트가 있었다.

1. 클래스형 컴포넌트
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        클릭: {this.state.count}
      </button>
    );
  }
}
```
- this.state로 상태를 관리
- this.setState()를 사용하여 상태 업데이트
- render() 메서드를 이용하여 UI를 반환

2. 함수형 컴포넌트
```javascript
import { useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭: {count}
    </button>
  );
};
```
- Hooks를 사용 가능
- this 키워드를 사용할 필요 없음. -> props를 불러올 필요 없이 바로 호출 가능 (this.props를 통해 값을 불러오지 않아도 됨)

## 3. 이벤트 버블링, 캡쳐링
<img src="https://velog.velcdn.com/images/falling_star3/post/7f801ff2-79cd-40a8-8def-1ce1f0463fab/image.png" />
이벤트 전파의 유형으로, **이벤트가 DOM 요소 간에 전달되는 방식** 을 의미한다.

1. 이벤트 캡처링
이벤트가 **루트 요소에서 시작** 하여 하위 요소로 전파됨
addEventListener의 capture:true 옵선을 사용하면 캡처링 단계에서 실행됨.
```javascript
document.querySelector("div").addEventListener("click", () => {
  console.log("캡처링 단계에서 실행");
}, true); // 캡처링을 활성화하면 부모 요소가 먼저 실행됨

<button onClick={(e) => e.stopPropagation()}> // event.stopPropagation을 사용하면 버블링 또는 캡처링을 중단할 수 있음.
    클릭 (부모 이벤트 실행 안됨)
</button>
```

2. 이벤트 버블링

이벤트가 **가장 깊은 요소에서 시작**하여 부모 요소로 전파됨. 기본적으로 onClick과 같은 이벤트 리스너는 버블링 단계에서 실행됨.

```javascript
<div onClick={() => alert("부모 div 클릭됨")}>
  <button onClick={() => alert("버튼 클릭됨")}>클릭</button>
</div>

// 버튼 클릭시 "버튼 클릭됨" -> "부모 div 클릭됨" 순서로 실행됨.
```

## 4. Restful API와 HTTP
<img src="https://velog.velcdn.com/images/somday/post/2a7df2da-2a3c-44af-b059-ee03efc125ef/restapi-image.png" />
1. RESTful API : REST 아키텍처 스타일을 따르는 API 를 의미 

- **클라이언트-서버 구조** : 프론트엔드(클라이언트)와 백엔드(서버)가 분리됨
- **무상태성** : 각 요청은 독립적으로 처리되며, 서버는 클라이언트의 이전 요청 상태를 저장하지 않음
- **자원 기반** : URL을 통해 리소스를 명확하게 식별 (/user/gardener, /product/123)
- **표준 HTTP 메소드 활용**

2. HTTP
- GET : 리소스를 조회 (데이터를 가져오기)
- POST : 새로운 리소스를 생성
- PUT : 기존 리소스를 완전히 수정 (전체 업데이트)
- PATCH : 기존 리소스의 일부만 수정 (부분 업데이트)
- DELETE : 리소스를 삭제

**GET 요청은 데이터를 변경하지 않아야 하며, POST 요청은 동일한 요청을 여러 번 보내면 같은 결과가 보장되지 않을 수도 있음 (멱등성 X). 반면, PUT과 DELETE는 여러 번 호출해도 같은 결과가 보장됨 (멱등성 O).**

## 5. CSRF나 XSS 공격을 막는 방법
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3y4UoKKDyUZmhTIS7lXMkHrSRmLQoKFktYQ&s" />
CSRF는 공격자가 사용자의 인증 정보를 도용하여 원하지 않는 요청을 실행하게 하는 것이다.

XSS는 공격자가 악성 스크립트를 삽입하여 사용자 브라우저에서 실행하도록 유도하는 것이다.

1. CSRF 방어 방법
   - CSRF 토큰 사용 : 요청마다 CSRF 토큰을 포함하여 검증
   - SameSite 쿠키 설정 : SameSite = strict 또는 SameSite = lax 설정
   - CORS 정책 강화 : 신뢰할 수 있는 출처에서만 요청을 허용


2. XSS 방어 방법
   - 입력값 검증 및 필터링 : HTML 태그 및 JS 코드 삽입 방지
   - 출력 시 이스케이프 처리 : innerText 사용
   - CSP(Content Security Policy) 적용 : 스크립트 실행을 제한