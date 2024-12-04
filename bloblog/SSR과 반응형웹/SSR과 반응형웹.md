## SSR과 반응형 웹

### 들어가며

- NEXTJS 에서 반응형 웹을 어떻게 구성하는지 찾아보다가, SSR의 경우에는 Hydration 되기 전에 어떻게 디바이스를 구분할 수 있을지 궁금해졌다.
- 또한 데스크탑 기준으로 설계 + 화면 너비로 모바일을 구분하여 스타일링을 했을 때, 모바일로 접근 시 발생하는 깜빡임 현상을 해결한 블로그를 보고 이번 주 주제를 선정하게 되었다.

## 서버 사이드 렌더링

### 주요 렌더링 방식

- 클라이언트 사이드 렌더링 (CSR)
- 서버 사이드 렌더링 (SSR)
- 정적 사이트 생성 (SSG)
- 하이브리드 방식
  - 점진적 서버 사이드 렌더링(ISR)
  - NEXTJS 는 하이브리드 방식도 지원함

### SSR의 동작 과정

![SSR의 동작 과정]()

1. 사용자가 URL을 입력하거나 링크를 클릭하여 서버에 요청
2. 서버는 받은 url을 기준으로 어떤 페이지를 렌더링할 지 결정
   1. `getServerSideProps` 실행
   2. 필요한 데이터를 가져와 HTML 생성
   3. React 컴포넌트가 서버에서 실행되어 정적인 HTML 형태로 변환
3. 서버에서 생성된 HTML을 클라이언트에게 전송
4. 브라우저는 받은 html 파일을 해석하여 DOM을 생성하고 Hydration
   1. Hydration : 클라이언트가 정적 HTML에 React의 동적 기능을 추가하여 인터랙션 가능케 함

### 반응형 웹 구성에서의 문제점

- 서버에서 생성한 HTML은 디바이스 크기나 뷰포트 정보 등 브라우저 환경을 알지 못함
- 따라서 Hydration 전에는 완전한 반응형 웹을 구성하기 어렵다.

<aside>

    💬 미디어 쿼리 등 CSS로 처리하면 브라우저 렌더링될 때 화면 너비에 맞춰 적용하기 때문에 문제가 없다. 내가 본 블로그에서는 `useMediaQuery` 라는 자바스크립트 훅을 사용한 경우라 약간의 혼동이 있었다. ㅜㅜ

</aside>

## SSR에서 반응형 구현하기

### 일반적인 구현 과정

- 서버에서 HTML을 생성하여 클라이언트로 전달
- 서버는 클라이언트의 디바이스 크기를 모르기 때문에 초기 HTML은 가능한 한 디바이스 중립적으로 렌더링
- 이후 클라이언트에서 Hydration을 거치면 CSR처럼 화면 크기에 따른 동적 변경이 가능해져 반응형 구성이 완성됨
  - 이 시점부터 브라우저 API를 사용해 화면 크기나 디바이스 정보 확인 가능
  - useEffect 등으로 브라우저 크기에 따라 처리

### 서버에서 디바이스 정보 유추하기

- 서버에서 HTTP 요청 헤더의`User-Agent`를 기반으로 디바이스 정보를 유추하여 초기 화면에 반영 가능
- User-Agent 예시

  ![User-Agent]()

```jsx
export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  const isMobile = /mobile/i.test(userAgent);
  return {
    props: { isMobile },
  };
}

export default function Home({ isMobile }) {
  return (
    <div className={isMobile ? "mobile-container" : "desktop-container"}>
      반응형 페이지
    </div>
  );
}
```

### 더 공부하면 좋을 것들

- `next/image`를 사용하면 위처럼 디바이스 크기별로 따로 처리할 필요 없이 맞는 이미지를 자동으로 제공한다고 한다. ~~사실 이번 주에 하려던 건 이거였다..~~

## 👀 참고자료

https://seohyun.palms.blog/ssr-responsive
https://dev-district.tistory.com/43
