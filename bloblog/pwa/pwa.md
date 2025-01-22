## ✅ INDEX

[PWA 개요](#pwa-개요)  
[PWA 구성요소](#pwa-구성요소)

## PWA 개요

### PWA란?

Progressive Web Application

- 웹 기술을 사용하여 네이티브 앱과 유사한 사용자 경험을 제공하는 애플리케이션
- 일반 웹사이트처럼 브라우저에서 접근 가능 + 네이티브 앱 기능 (e.g. 오프라인 사용, 푸시 알림, 홈 화면에 추가)

### **PWA의 주요 특징**

- 서비스워커와 캐싱 전략을 도입하여 네트워크 연결이 없는 상태에서도 오프라인 지원 가능
- 백그라운드에서 자동으로 최신 콘텐츠를 유지
- 캐싱 및 효율적인 리소스 관리를 통해 빠른 페이지 로딩이 가능
- 앱처럼 사용할 수 있도록 홈 화면에 아이콘 추가 가능
- 앱과 유사한 UI/UX를 제공하여 사용자 경험 개선
- 사용자에게 푸시 알림 가능

### PWA의 장점

\*\*네이티브 앱과 비교

- 크로스 플랫폼 → iOS, Android, 데스크톱 등 다양한 플랫폼에서 실행 가능
- 개발 및 유지보수 비용이 저렴
- 앱스토어 검수 없이 업데이트가 가능하여 배포가 빠름
- 웹 기술을 기반으로 하여 SEO 친화적

### PWA의 단점

\*\*네이티브 앱과 비교

- 블루투스, NFC 등 네이티브 기능 접근이 제한적
- 사파리의 PWA 지원이 제한적이라 iOS 이용자는 제약이 있음
- 앱스토어에 등록되지 않음

## PWA 구성요소

### **필수 구성 요소**

- 웹 앱 매니페스트
  - JSON 파일로 아이콘, 앱 이름, 시작 URL 등 앱 메타데이터 정의
- 서비스 워커 (service worker)
  - 백그라운드에서 실행되는 스크립트. 캐싱, 푸시 알림, 오프라인 지원 등 처리
- HTTPS 환경에서 호스팅
  - 보안 통신을 위한 필수 조건
  - PWA는 HTTPS 환경에서만 동작

### **웹 앱 매니페스트**

- PWA가 홈 화면에 설치되고, 앱처럼 실행될 수 있도록 설정을 제공
- 아이콘, 시작 URL, 화면 방향, 색상 등 앱 디자인 및 동작 정의
  ```json
  // manifest.json
  {
    "name": "My App",
    "short_name": "App",
    "description": "A simple Progressive Web App",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
      {
        "src": "icons/app-icon.png",
        "sizes": "192x192",
        "type": "image/png"
      }
    ]
  }
  ```
  - HTML 파일에 `<link rel="manifest" href="manifest.json">` 태그를 추가하여 브라우저에 매니페스트 파일 등록

### **서비스 워커**

- 브라우저에서 독립적으로 실행되는 스크립트
- 네트워크 요청을 가로채 오프라인 기능이나 네트워크 연결 없이도 필요한 리소스를 제공하는 백그라운드 작업을 지원
  - 데이터 일관성을 위해 로컬 데이터와 서버 데이터를 동기화하는 작업 필요
- 푸시 알림 지원

```jsx
// service-worker.js
self.addEventListener("install", (event) => {
  // 비동기 작업이 완료될 때까지 대기
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      // 캐시에 아래 파일들을 추가
      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // 응답 정의
  event.respondWith(
    // 캐시에 있는지 확인 후 없으면 네트워크에서 가져온다.
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 데이터 동기화 등록
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncDataWithServer());
  }
});

// 데이터 동기화 함수
async function syncDataWithServer() {
  // 로컬에 저장된 데이터 가져오기
  const localData = await getLocalData();

  // 서버에 데이터 전송
  await fetch("/sync-endpoint", {
    method: "POST",
    body: JSON.stringify(localData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 서버와 동기화 후 로컬 데이터 삭제 또는 업데이트
  clearLocalData();
}
```

- 서비스 워커 기본 흐름
  - 설치(install)
    - 서비스 워커가 처음 실행될 때 필요한 자원을 캐시
    - 오프라인 상태에서도 웹 앱이 동작할 수 있도록 한다.
    - install 이벤트가 완료되면 서비스 워커가 활성화된다.
  - 활성화(activate)
    - 이전 캐시를 정리하거나, 필요한 업데이트를 진행
    - 필요한 경우만 진행
  - 가로채기(fetch)
    - 네트워크 요청을 가로채 캐시 데이터를 반환하거나 네트워크에서 직접 데이터를 가져와 반환

### 서비스 워커로 푸시 알림 구현

> **1. 서비스 워커 등록**

```jsx
if ("serviceWorker" in navigator && "PushManager" in window) {
  // 서비스 워커 등록
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}
```

> **2. 푸시 알림 권한 요청**

```jsx
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("푸시 알림 권한이 허용되었습니다.");
  } else {
    console.log("푸시 알림 권한이 거부되었습니다.");
  }
});
```

> **3. 푸시 알림 구독**

```jsx
// service-worker.js
// push 이벤트에 알림 수신 및 표시 설정
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/images/icon.png",
    badge: "/images/badge.png",
  };
  event.waitUntil(self.registration.showNotification("새로운 알림", options));
});
```

```jsx
navigator.serviceWorker.ready
  .then((registration) => {
    // 구독
    return registration.pushManager.subscribe({
      userVisibleOnly: true, // 푸시 알림을 사용자에게 표시하도록 설정
      applicationServerKey: urlB64ToUint8Array("<VAPID 공개 키>"),
    });
  })
  .then((subscription) => {
    console.log("푸시 알림 구독 성공:", subscription);
    // 서버로 구독 정보 전송
    sendSubscriptionToServer(subscription);
  })
  .catch((error) => {
    console.error("푸시 알림 구독 실패:", error);
  });
```

- `applicationServerKey`
  - VAPID (Voluntary Application Server Identification) 공개 키
  - 서버 측에서 푸시 알림을 전송할 때 사용된다.
  - 브라우저와 서버 간의 보안을 위해 사용

> **4. 푸시 메시지 전송**
>
> 푸시 알림 전송은 서버에서 처리한다.

```jsx
const webPush = require("web-push");

// VAPID 키 설정
const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 구독 정보 (브라우저에서 받은 구독 객체)
const pushSubscription = {
  /* 구독 객체 */
};

// 푸시 메시지 전송
const payload = JSON.stringify({ title: "새로운 알림", message: "내용" });

webPush
  .sendNotification(pushSubscription, payload)
  .then((response) => {
    console.log("푸시 메시지 전송 성공:", response);
  })
  .catch((error) => {
    console.error("푸시 메시지 전송 실패:", error);
  });
```

- `pushSubscription` 구독 객체를 사용하여 푸시 메시지를 전송합니다.
- `Web Push` 라이브러리 또는 직접 HTTP 요청을 만들어 알림을 전송
