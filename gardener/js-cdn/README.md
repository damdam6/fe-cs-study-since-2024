# CDN (Content Delivery Network, 콘텐츠 전송 네트워크)

<img src="https://images.velog.io/images/youngblue/post/3f7b945b-bf84-4f3f-9007-aa9c2f85c7ea/cdn.png" />

## 1. CDN을 알아보기 전에... 기존의 방식
CDN이라는 것을 알아보기 전에 우리가 기존에 사용하는 네트워크 구조에 대해서 간단하게 짚고 넘어갈 필요가 있다.
우리가 흔히 사용하는 웹사이트는 기본적으로 **서버-클라이언트 모델**을 기반으로 작동한다.

1) 기본적인 네트워크 동작 흐름
   - 사용자가 웹사이트(gardener.com)에 접속하면, 브라우저는 해당 웹사이트의 **DNS 서버**에 요청을 보냄
   - DNS 서버가 **원본 서버 (origin server, 즉 웹사이트의 실제 서버 IP 주소)**의 위치를 알려준다.
   - 사용자의 브라우저가 원본 서버에 직접 요청을 보내고, HTML/CSS/JS, 이미지 등을 다운받음
   - 서버는 요청을 처리한 후, 응답 데이터를 사용자에게 직접 전송함.

-> 위와 같은 방식을 사용할시, 트래픽이 많아지면 서버 부하가 증가되어 속도가 느려지고, 서버와 사용자가 물리적으로 멀리 있을 경우 응답 시간이 길어진다. 또한 서버에서 직접 콘텐츠를 제공했을 때 네트워크 비용이 많이 발생하고, DDos 공격에 취약해질 수 있는 단점이 있다.

## 2. CDN

전 세계 여러 지역에 분산된 서버를 활용하여 컨텐츠를 빠르고 효율적으로 제공하는 네트워크 시스템.

### CDN의 동작 원리
사용자의 요청을 분석하여 최적의 경로를 찾고, 캐싱된 컨텐츠를 제공하는 방식으로 동작한다.

1) 사용자가 웹사이트에 접속하면, 브라우저는 HTML,CSS,JS, 이미지 등의 정적 파일을 요청함
2) DNS 라우팅을 통해 가장 가까운 CDN 서버로 연결한다.
3) 캐싱된 컨텐츠 제공 - CDN 서버에 해당 파일이 캐싱되어 있으면 즉시 응답. / 만약 캐싱되어 있지 않으면 원본 서버에서 가져와 캐싱한 후 제공
4) 브라우저 캐싱 및 업데이트 - 캐싱된 파일을 일정 기간 유지하며, 변경 시 최신 버전으로 업데이트

### CDN의 핵심 역할 
1) 정적 컨텐츠 (Static Content) 배포 - **웹 성능 최적화**
    + HTML, CSS, JavaScript, 이미지, 동영상 등의 정적 파일을 CDN 서버에 저장하고 사용자가 요청하면 빠르게 전달
    + 브라우는 CDN을 통해 정적 파일을 빠르게 가져올 수 있어 **로드 속도 향상**
2) 서버 부하 감소 - **전역 사용자 대상 WEB 배포**
    + 원본 (origin) 서버 대신 CDN이 요청을 처리하여, 트래픽을 분산하고, 서버 부담을 줄임.
    + 가까운 CDN 서버를 이용하여, 글로벌 사용자도 빠르게 콘텐츠를 로딩할 수 있다.
3) 네트워크 지연 (Latency) 최소화 - **브라우저 캐싱 및 캐시 무효화**
    + 사용자의 위치에서 가장 가까운 CDN 서버 (엣지 서버)에서 파일을 제공하여 응답 속도 향상
    + Cache-Control, ETag 등의 효율적인 설정을 통해 브라우저 캐시를 관리할 수 있음.
4) DDoS 공격 방어 및 보안 강화
    + CDN 네트워크가 공격을 분산시키고, HTTPS, 방화벽, 인증 기능등을 제공
    + HTTPS 기반의 CDN은 SSL/TLS 암호화를 적용하여 보안성을 높임
    + 일부 CDN은 DDoS 방어 기능을 포함하여 공격으로부터 보호
5) 자주 사용하는 라이브러리 로드 속도 향상
    + jQuery, React, Bootstrap 같은 프레임워크와 라이브러리는 공식 CDN을 제공하여, 로컬보다 빠르게 불러올 수 있음.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
// Cloudflare가 운영하는 무료 오픈소스 CDN
```

## 3. CDN 적용

CDN을 통해 불러오는 "script" 태그는 프로젝트의 **HTML 파일 내 어디에 위치하느냐에 따라 성능에 영향을 줄 수 있다.**

### 1) Head 태그 안에 배치하는 경우
```html
<head>
  <!-- jQuery 또는 라이브러리 CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
```
사용목적 : 페이지가 로드되기 전에 전역적으로 필요한 라이브러리 (ex) jQuery, React, Vue 등) 을 먼저 불러와야 할 때 / **브라우저가 페이지 렌더링을 시작하기 전에 필요한 코드가 있을 때**

단점
1) **렌더링 차단 문제 발생** : 스크립트가 실행될 때까지 페이지가 표시되지 않을 수 있음
2) **페이지 속도 저하** 브라우저가 HTML을 해석하기 전에 스크립트를 다운로드하고 실행해야 하기 때문.

### 2) Body 태그 바로 위에 배치하는 경우 (권장됨)

```html
<body>
  <h1>웹사이트 콘텐츠</h1>

  <!-- 메인 스크립트 (CDN 적용) -->
  <script src="https://cdn.example.com/assets/js/main.js"></script>
</body>
</html> 
```
1) CDN을 통해 불러온 스크립트가 HTML 요소에 의존할 때 사용
2) 페이지 렌더링이 완료된 후, 스크립트를 실행하고 싶을 때 사용
3) 웹 사이트의 성능 최적화를 원할 때 사용
4) main.js 같은 커스텀 JavaScript 파일이 DOM을 조작할 때 사용

+ 특정 라이브러리 (jQuery, React등)이 필요할 경우 **HTML에서 해당 라이브러리를 먼저 로드**해야함.

1) 정적 자산을 CDN에서 제공
정적 파일을 S3 + CloudFront, Vercel, Netlify 등의 CDN을 통해 서빙.
```html
<!-- 기존 방식 -->
<script src="/assets/js/main.js"></script>

<!-- CDN 적용 방식 -->
<script src="https://cdn.example.com/assets/js/main.js"></script>
```

2) 외부 라이브러리 CDN 활용
```html
<!-- Bootstrap CDN 예제 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```
공식 CDN을 이용하여 브라우저 캐싱을 활용하여 성능을 높일 수 있다.

3) Next.js, React 등에서 CDN 설정
```html
// Next.js 환경에서 이미지 최적화
import Image from 'next/image';

<Image
  src="https://cdn.example.com/my-image.png"
  width={500}
  height={300}
  alt="Example"
/>
```
Vercel 이나 Netlify를 활용하면 정적 파일을 CDN에서 배포 가능.
