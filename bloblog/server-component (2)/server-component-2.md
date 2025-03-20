## 들어가며

\*\*서버 컴포넌트에 대해 찾아보는 와중 내가 App Router 와 Pages Router 의 개념을 혼용해서 사용하고 있다는 것을 깨달았다. 실제로는 혼용하는 경우가 있지만, 정리하고 넘어가면 좋을 것 같아 정리해봤다.

### Pages Router

> Next.js의 전통적인 라우팅 시스템으로, 파일 시스템을 기반으로 한다.  
> 즉 `pages/` 디렉토리의 파일 구조가 곧 애플리케이션의 라우트 구조가 된다.

- 파일 이름 기반의 라우팅
  ```
  pages/
    index.js
    about.js
    posts/
      [id].js
  ```
- `_app.js`와 `_document.js`로 전역 레이아웃 관리
- `getStaticProps`, `getServerSideProps` 등을 통한 데이터 패칭
- 간단하고 직관적임

### App Router

> Next.js 13에서 도입된 새로운 라우팅 시스템이다.

- `app/` 디렉토리 사용
- 폴더 이름 기반의 라우팅

  ```
  app/
    layout.js
    page.js
    about/
      page.js
    posts/
      [id]/
        page.js

  ```

- 레이아웃, 로딩 상태, 에러 처리 등을 위해 특수 파일을 사용한다.
  - 각 폴더에 `layout.js` 파일을 두어 중첩 레이아웃 구현
- 기본적으로 서버 컴포넌트 지원
  - 서버 컴포넌트에서 직접 데이터 패칭 가능 (`async/await` 사용 가능)
- 향상된 성능과 유연성

## App Router 의 서버 컴포넌트

### 서버와 클라이언트의 경계

- 서버 컴포넌트와 클라이언트 컴포넌트 사이에는 네트워크 경계가 존재
- 만약 서버 컴포넌트 내에서 직접 데이터를 가져오면 클라이언트 컴포넌트로 전달되기 전까지 네트워크 경계를 넘지 않기 때문에 직렬화 필요 x
  - 클라이언트로 전달될 때만 직렬화 수행
  - 즉, 클라이언트 컴포넌트에 전달되기 전까지는 네트워크 경계를 넘지 않음

<aside>

    ✅ 직렬화 (serialization)

    주로 서버에서 클라이언트로 데이터 전달 시 수행한다.
    서버에서 `getStaticProps`나 `getServerSideProps`를 사용하는 경우 받아온 데이터는 직렬화한 후 넘겨준다. (아래 내용 참고)

</aside>

```jsx
// page.js
export default async function Posts() {
  const res = await fetch("https://api.example.com/posts");
  const data = await res.json(); // 직렬화 없이 전달

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### cf. Pages Router 의 데이터 패칭

- 네트워크 경계가 페이지 컴포넌트와 데이터 패칭 로직 사이에 존재
- 클라이언트에 전달하려면 JSON 형태로 직렬화하여 리턴
- 즉, 데이터 패칭 → 직렬화 → 페이지 컴포넌트에 전달

```jsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return { props: { data } } // 데이터 직렬화
```

## 서버 컴포넌트에서 클라이언트 컴포넌트 호출

이 때 클라이언트 컴포넌트는 서버에서 직접 렌더링되지 않고 클라이언트로 전달되어 렌더링됨

```jsx
// Gallery.js

"use client"; // 클라이언트에서만 동작하도록 선언

import { useState } from "react";
import { Carousel } from "acme-carousel";

export default function Gallery() {
  let [isOpen, setIsOpen] = useState(false); // 상태 관리 -> 클라이언트 컴포넌트

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
      {isOpen && <Carousel />}
    </div>
  );
}
```

```jsx
// page.js

import Gallery from "./Gallery"; // 클라이언트 컴포넌트

export default function Page() {
  return (
    <div>
      <h1>Welcome</h1>
      <Gallery /> {/* 클라이언트에서 렌더링 */}
    </div>
  );
}
```

## 서버 컴포넌트에서 Context 사용하기

### Context

- 전역 상태 공유를 위해 Context 사용
- 주로 상태 업데이트 후 트리 깊은 곳에 있는 상호 작용이 있는 컴포넌트를 다시 렌더링하는 데 사용
- 상태 관리나 상태 구독은 클라이언트 측 동작이므로 서버 컴포넌트 내에서는 Context를 직접 생성하거나 사용할 수 없음

→ 따라서 Context 를 사용하기 위해서는 클라이언트 컴포넌트를 반드시 사용하여야 한다!

### 사용 예시

- Context 생성

```jsx
// ThemeContext.js
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- 클라이언트 컴포넌트

```jsx
// ThemeClientComponent.js
"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeClientComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      Current theme: {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

- 서버 컴포넌트에서 사용

```jsx
// app/page.js (서버 컴포넌트)
import ThemeClientComponent from "./ThemeClientComponent";

export default function Page() {
  return (
    <div>
      <h1>Server Component</h1>
      <ThemeClientComponent />
    </div>
  );
}
```
