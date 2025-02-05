\*\* 지난 주에 이어 웹 앱의 기능들을 실습합니다.

## 푸시 알림 기능 실습

### Firebase 프로젝트 생성

https://console.firebase.google.com/u/0/?hl=ko

### 웹 앱에 Firebase 추가

![sdk.png]()

- Firebase 초기화

  - public 폴더에 `firebase-messaging-sw.js` 파일 추가
  - 제공해주는 코드 복붙

  ```jsx
  importScripts(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
  );

  const firebaseConfig = {
    apiKey: "",
    authDomain: "fe-study-7e7ab.firebaseapp.com",
    projectId: "fe-study-7e7ab",
    storageBucket: "fe-study-7e7ab.firebasestorage.app",
    messagingSenderId: "853613503821",
    appId: "",
  };

  firebase.initializeApp(firebaseConfig);

  // Firebase 메시징 활성화
  const messaging = firebase.messaging();

  // 백그라운드 메시지 이벤트 핸들링
  messaging.onBackgroundMessage((payload) => {
    console.log("백그라운드 메시지 수신:", payload);

    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/icons/favicon.png", // 알림 아이콘
    });
  });
  ```

    <aside>

        🛠 [ Messaging: We are unable to register the default service worker. ]

        위 코드도 서비스워커의 일종이라 service-worker.js 에 함께 넣어보았는데, 해당 오류가 발생하였다. 파일명이 정확히 "firebase-messaging-sw.js" 와 일치해야 인식하는 것으로 보인다.

    </aside>

- 서비스워커에 등록하여 브라우저가 꺼져 있을 때도 백그라운드 처리가 가능하도록 한다.

```jsx
// pages/_app.js
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // 서비스워커 등록
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

      // 푸시 알림 등록
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "FCM Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("FCM Service Worker registration failed:", error);
        });
    }
  }, []);
  return <Component {...pageProps} />;
}
```

### 클라이언트에 추가

- `utils/firebaseClient.js`

  - 클라이언트단에서 한 번 더 설정해준다.

  ```jsx
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken, onMessage } from "firebase/messaging";

  // Firebase 설정
  const firebaseConfig = {
    apiKey: "",
    authDomain: "fe-study-7e7ab.firebaseapp.com",
    projectId: "fe-study-7e7ab",
    storageBucket: "fe-study-7e7ab.firebasestorage.app",
    messagingSenderId: "853613503821",
    appId: "",
  };

  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  // FCM 토큰 요청
  export const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한 허용됨");

        // FCM 토큰 가져오기
        const token = await getToken(messaging, {
          vapidKey: "your-vapid-key",
        });

        if (token) {
          console.log("FCM 토큰:", token); // firebase 콘솔에 입력하기 위해
        }
      } else {
        console.log("알림 권한이 거부됨");
      }
    } catch (error) {
      console.error("FCM 토큰 요청 실패:", error);
    }
  };

  // 메시지 수신
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("메시지 수신:", payload);
        resolve(payload);
      });
    });
  ```

- 컴포넌트 생성

  ```jsx
  import { useEffect, useState } from "react";
  import {
    requestPermissionAndGetToken,
    onMessageListener,
  } from "../utils/firebaseClient";

  export default function PushNotification() {
    useEffect(() => {
      // FCM 토큰 요청
      requestPermissionAndGetToken();

      // 포그라운드 메시지 리스너
      onMessageListener().then((payload) => {
        alert("푸시 알림 수신:", payload);
      });
    }, []);

    return <div />;
  }
  ```

### Firebase 콘솔로 푸시 테스트

- 콘솔에 찍힌 FCM 토큰 등록해서 테스트 메시지 전송

![test.png]()

![token.png]()

### 성공!

![success.png]()

![console.png]()
