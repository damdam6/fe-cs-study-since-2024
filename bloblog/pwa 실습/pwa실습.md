## ✅ INDEX

[Next에서 PWA 설정하기](#next-에서-pwa-설정하기)  
[캐싱 / 오프라인 기능 실습](#캐싱--오프라인-기능-실습)

## Next 에서 PWA 설정하기

### Next 프로젝트 생성

```bash
npm create-next-app@latest next-pwa-example
cd next-pwa-example
```

### next-pwa 패키지 설치

```bash
npm install next-pwa
```

### PWA 설정

```jsx
// next.config.mjs
// 아래 pwa 설정을 추가한다.

import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public", // 서비스 워커와 관련 파일들이 저장될 폴더
  register: true, // 서비스 워커를 자동으로 등록
  skipWaiting: true, // 새로운 서비스 워커를 즉시 활성화
});

export default nextConfig;
```

### manifest 파일 추가하기

브라우저는 `public/manifest.json` 파일을 참조해 PWA로 인식한다.

- 속성
  - name / short_name : 앱 이름 설정
  - icons : 앱 아이콘
  - start_url : 앱 시작 URL
  - display : PWA 표시 방식 (`standalone`으로 설정하면 네이티브 앱처럼 표시)
  - theme_color : 브라우저 상단 색상
  - background_color : 앱 배경색
- 예시 코드

```jsx
{
  "short_name": "MyApp",
  "name": "My Progressive Web App",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

- \_document.js 에서 `public/manifest.json` 를 등록

```jsx
// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### **서비스 워커 추가 및 등록**

- PWA의 핵심이며, 캐싱이나 오프라인 작업 등을 지원
- 서비스 워커 파일(`service-worker.js`) 위치는 public 폴더
- 서비스 워커 파일 등록은 `_app.js` 에서 따로 진행한다

```jsx
// _app.js
// 서비스 워커 파일 등록

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return <Component {...pageProps} />;
}
```

![sw.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week20/bloblog/pwa%20%EC%8B%A4%EC%8A%B5/image/sw.png?raw=true)

## 캐싱 / 오프라인 기능 실습

### 정적 페이지 캐싱

- 캐싱 스크립트 추가

```jsx
// service-worker.js

const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "/about"]; // 캐싱할 페이지 경로

// 설치 단계에서 캐시 생성 및 파일 저장
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache); // 페이지 캐싱
    })
  );
});

// fetch 이벤트를 가로채 캐시 사용
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 존재하면 캐시된 리소스 반환, 없으면 네트워크 요청
      return response || fetch(event.request);
    })
  );
});

// 새로운 서비스 워커 활성화 시 이전 캐시 삭제
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
```

- 페이지

```jsx
// 정적 데이터 생성
export async function getStaticProps() {
  return {
    props: {
      message: "This page is ... ",
    },
  };
}

export default function About({ message }) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
```

![static.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week20/bloblog/pwa%20%EC%8B%A4%EC%8A%B5/image/static.png?raw=true)

- 오프라인 상태일 때도 페이지 정상 로딩됨
- `my-cache-v1` 정상적으로 저장됨

### 동적 페이지 캐싱

- 캐싱 스크립트 추가

```jsx
const STATIC_CACHE_NAME = "static-cache-v1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1";
const urlsToCache = ["/", "/about"]; // 캐싱할 페이지 경로

// 설치 단계에서 정적 리소스 캐싱
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache); // 정적 페이지 캐싱
    })
  );
});

// fetch 이벤트를 가로채 캐시 사용
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 동적 데이터 캐싱
  if (url.pathname.startsWith("/api/data")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone()); // 동적 데이터 캐싱
            return networkResponse;
          });
        });

        // 캐시된 응답 또는 네트워크 요청 반환
        return cachedResponse || fetchPromise;
      })
    );
  } else {
    // 정적 데이터 캐싱
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 캐시에 존재하면 캐시된 리소스 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
    );
  }
});

// 서비스 워커 활성화 시 이전 캐시 삭제
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // 캐시 정리
          }
        })
      )
    )
  );
});
```

- 페이지

```jsx
export default function Home() {
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setName(data.name));
  }, []);

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Home Page</h1>
        <pre>{name ? "Hi! " + name : "Loading..."}</pre>
      </div>
    </>
  );
}
```

![dynamic.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week20/bloblog/pwa%20%EC%8B%A4%EC%8A%B5/image/dynamic.png?raw=true)

![dynamic-cache.png](https://github.com/bloblog/fe-cs-study-2024/blob/bloblog-week20/bloblog/pwa%20%EC%8B%A4%EC%8A%B5/image/dynamic-cache.png?raw=true)

- 오프라인 상태에서도 캐싱된 데이터 사용하여 렌더링
- `dynamic-cache-v1` 캐시 정상적으로 저장됨
