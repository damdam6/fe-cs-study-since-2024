## ✅ INDEX

[페이지 라우팅이 너무 귀찮다](#페이지-라우팅이-너무-귀찮다)  
[Next.js 로 전환하기](#nextjs-로-전환하기)  
[동적 라우팅은?](#동적-라우팅은)  
[결론](#결론)

## 페이지 라우팅이 너무 귀찮다

사실 간단한 작업이긴 하지만 귀찮은 부분이 너무 많다.

그리고 딱 보기에도 코드가 상당히 지저분해 보인다.

![routing.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week18/bloblog/next-routing/image/routing.png?raw=true)

그래서 오직 페이지 라우팅만을 위해 Next.js를 도입해보려고 한다.

## Next.js 로 전환하기

참고로 기존 프로젝트는 vite 기반으로 구성되어있다.

### **1. Next.js 설치하기**

React 프로젝트 루트 디렉토리에서 아래 명령을 수행한다.

```bash
npm install next react react-dom
```

### **2. 폴더 구조 세팅하기**

chatGPT 는 다음과 같은 폴더 구조를 제시했다.

```
project/
├── pages/         # Next.js의 핵심: 각 파일은 라우트로 동작
│   ├── index.js   # 메인 페이지 (/)
│   ├── about.js   # 예제 페이지 (/about)
├── public/        # 정적 파일 (이미지, 아이콘 등)
├── styles/        # CSS 파일
├── components/    # React 컴포넌트
├── package.json
└── ...
```

위 폴더 구조를 기반으로 어느 정도 형태는 갖추게 되었다.

![dir1.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week18/bloblog/next-routing/image/dir1.png?raw=true)

하지만 여기서 궁금증이 생겼다.

React 프로젝트의 메인이 되는 `main.js` 나 `App.js`, `index.html` 을 어떻게 처리해야 할까?

결론만 말하자면, 기존 엔트리 관련 파일들은 필요가 없어진다.

만약 `App.js` 나 `index.html` 이 수정 혹은 커스텀이 필요하다면, Next.js 의 기본 구조인 `pages/_app.js`와 `pages/_document.js`를 사용하면 된다.

그래서 최종 폴더 구조는 다음과 같다.

![dir2.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week18/bloblog/next-routing/image/dir2.png?raw=true)

### 그런데 왜 기존 파일들이 필요가 없을까?

> **main.js**

React 에서 `ReactDOM.render` 또는 `createRoot`를 호출하여 App을 HTML에 렌더링하는 역할을 한다.

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

하지만 Next.js는 자체적으로 HTML과 렌더링 과정을 관리하기 때문에 필요가 없다.

> **App.js**

React에서 애플리케이션의 전체 구조를 정의하거나 글로벌 설정을 포함하는 역할을 한다.

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

하지만 Next.js 는 `pages/` 디렉토리의 파일을 기준으로 라우트를 자동으로 생성하고,

글로벌 설정은 `pages/_app.js` 파일에서 수행하기 때문에 필요가 없다.

> **index.html**

React에서 애플리케이션의 진입점으로 사용된다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

하지만 Next.js는 HTML 파일을 자동으로 생성하기 때문에 이는 불필요하다.

### **3. package.json 수정**

`package.json`에 Next.js 실행 명령을 다음과 같이 추가한다.

```json
"scripts": {
  "dev": "next dev",       // 개발 모드 실행
  "build": "next build",   // 프로덕션 빌드
  "start": "next start"    // 프로덕션 서버 실행
}
```

### **4. 기타 코드 업데이트**

페이지 라우팅 자체가 목적이라 아래 설정들은 따로 해주지는 않았다.

- Head 관리: React의 `<Helmet>` 대신 Next.js의 `next/head`를 사용
- 이미지 최적화: Next.js의 `<Image>` 컴포넌트를 사용
- SSR/SSG: 필요 시 `getServerSideProps`나 `getStaticProps`를 활용

### **5. Next 실행하기**

`npm run dev` 명령어로 실행하면 잘 돌아가는 것을 볼 수 있다.

![home.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week18/bloblog/next-routing/image/home.png?raw=true)

![postList.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week18/bloblog/next-routing/image/postList.png?raw=true)

## 동적 라우팅은?

postdetail 페이지를 id에 따라 동적으로 라우팅 하도록 구현해볼 것이다.

Next.js 는 파일 이름에 `[parameter]`를 사용하여 동적 라우팅을 구현한다.

chatGPT 가 제시한 폴더 구조 예시는 다음과 같다.

```
/pages
  ├── index.js            // 루트 페이지 (/)
  ├── post
  │    ├── [id].js        // 동적 라우트 (/post/:id)
  │    └── create.js      // 정적 라우트 (/post/create)
  ├── user
       └── [username].js  // 동적 라우트 (/user/:username)
```

`[id].js` 파일 내부에서 파라미터에 접근하기 위해 다음과 같이 구성한다.

```jsx
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { id } = router.query; // URL의 id 파라미터 추출

  return (
    <div>
      <h1>Post ID: {id}</h1>
    </div>
  );
}
```

+) 현재는 단순한 폴더 구조이지만, 만약 파라미터를 여러 개 사용한다면 다음과 같이 내부 코드를 구성하면 된다.

```jsx
import { useRouter } from "next/router";

export default function UserTab() {
  const router = useRouter();

  // URL의 username과 tab 파라미터 추출
  const { username, tab } = router.query;

  return (
    <div>
      <h1>User: {username}</h1>
      <p>Current Tab: {tab}</p>
    </div>
  );
}
```

## 결론

React 프로젝트의 페이지 라우팅을 Next.js 로 구현해보았다.

확실히 적용하기 전보다 코드가 간단해지고, 폴더 구조가 명확해서 개발할 때 편리했다.
