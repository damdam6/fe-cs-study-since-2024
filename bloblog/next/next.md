\*\* Next.js 에 대한 개념을 공부하면서 부족한 부분을 보완해보았습니다.

## Next.js 가 기존 개발 방법과 다른 점?

### Next.js와 React

- React는 프론트엔드 웹 개발에 가장 널리 사용되는 자바스크립트 라이브러리
- Next.js는 React 기반 풀스택 프레임워크
  - SSR 및 SSG를 지원
  - React 는 UI 개발에 집중하는 반면, Next.js는 전체 웹 애플리케이션 개발을 위해 사용한다.

### Next.js 와 Vite

- Vite
  - CSR 기반 빌드 도구
  - ESBuild 기반으로 빠른 개발 서버를 제공
  - 최종 빌드 시 Rollup을 사용해서 번들링해야 함
- Next.js는 자체적인 Webpack/Turbopack 빌드 시스템을 가지고 있어서 Vite 같은 별도의 번들러가 필요 없음
  - `next build` 명령어를 통해 최적화된 프로덕션 빌드 수행

### 빌드 양상 비교

- Vite : 개발 환경에서 빠르게 실행 + 최종 빌드에서는 Rollup 사용하여 번들링

  > `ESbuild`를 활용

  - 개발 환경에서 `ESbuild`를 사용하여 JavaScript/TypeScript 변환 속도를 빠르게 처리
  - 하지만 프로덕션 빌드는 `Rollup`을 사용하여 더 최적화된 번들 생성

  > Rollup 기반 최적화 빌드

  - 모든 파일을 하나의 번들로 묶거나 코드 스플리팅을 통해 여러 개의 작은 파일로 나눔
  - 미사용 코드를 제거하여 번들 크기를 최소화하는 트리 셰이킹
  - 외부 라이브러리와 코드 의존성을 분석하여 최적화

  > 정적 HTML + 번들 파일 생성

  - `index.html`과 `dist/` 폴더에 최적화된 JS, CSS 파일을 생성
  - 브라우저에서 JavaScript 실행 후 UI 렌더링

- Next.js : 번들링 + 최적화에 유리

  > Webpack/Turbopack을 사용한 번들링

  - 기본적으로 Webpack을 사용하며 Next.js 13부터 Turbopack이 도입됨
  - Turbopack은 Webpack 보다 빌드 속도가 빠르고 캐싱 최적화를 더 잘 수행함

  > 트리 셰이킹 및 코드 스플리팅

  - Webpack이 자동으로 트리 셰이킹
  - Route 기반 코드 스플리팅 → 페이지별로 JS 번들을 생성

  > SSR 및 SSG 빌드 최적화

  - 필요한 데이터만 미리 가져오거나, 요청 시 서버에서 처리

  > 이미지 최적화 (`next/image`)

  - 자동으로 WebP 변환 및 Lazy Loading 적용

  > 정적 HTML + 번들 파일 생성

  - SSG → 미리 생성된 HTML 파일과 정적 JS 번들을 `.next/static`에 저장
  - SSR → 요청 시 서버에서 HTML을 생성하여 반환

## use client

### Hydration

- 정적 HTML을 동적인 (상호작용 가능한) HTML로 만들기 위해 그 위에 React 및 Next.js 애플리케이션을 생성하고 이벤트를 추가하는 것
- 하지만 해당 과정이 모든 컴포넌트에서 발생하지는 않는다.

### use client

- “use client” 지시어를 가지고 있는 컴포넌트만 클라이언트에서 hydrate 됨
  - 즉, 서버에서 렌더링 + 클라이언트에서 hydrate
  - 클라이언트는 "use client"를 가진 컴포넌트의 JavaScript 코드만 다운받음
  - +) "use client"를 선언하지 않은 컴포넌트 = 서버 컴포넌트 (사용자와 상호작용 불가능)
- "use client"가 많을수록 로딩이 오래 걸리므로 필요한 경우일 때만 선언하는 것이 좋음

## 데이터 가져오기

`getServerSideProps()` 와 `getStaticProps()` 의 작동방식 비교

### getServerSideProps()

- 매 요청마다 서버에서 실행 → 항상 최신 데이터 제공
- 방문할 때마다 최신 데이터를 가져와야 하는 경우 사용

### getStaticProps

- 빌드 단계에서서버에서 실행 → 추후 요청 시 빌드된 정적 페이지 제공
  - 데이터를 변경하려면 빌드를 다시 해야 함
  - `revalidate` 옵션을 사용하면 자동 업데이트 가능 = ISR
- CDN에 캐싱 가능 → 빠른 로딩 속도
- 데이터가 자주 변경되지 않는 페이지에 적합

```jsx
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return {
    props: { data }, // 페이지 컴포넌트에 props로 전달됨
    revalidate: 60, // 60초마다 다시 데이터 가져오기 (ISR)
  };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```
