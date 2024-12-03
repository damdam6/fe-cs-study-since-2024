# Serverless Architecture

## 1. 서버리스 아키텍쳐
애플리케이션을 실행하기 위해 직접 서버를 관리하지 않아도 되는 클라우드 컴퓨팅 모델. 서버리스 아키텍쳐에서는 백엔드 로직이 클라우드 제공자의 서버에서 필요할 때만 실행되며, 사용한 만큼만 비용을 지불합니다.

- 서버 관리를 클라우드 제공자가 책임짐
- 특정 이벤트 (ex: HTTP 요청, DB Trigger) 가 발생하면 서버리스 함수가 실행됨.
- 짧은 수명과 빠른 시작 속도

## 2. 필요성
- 간단히 백엔드 API / 데이터 처리를 구현할 수 있음. (AWS Lambda, Firebase Functions, Vercel API Routes) 등을 사용하며 복잡한 서버 환경 없이 간단한 백엔드 로직을 구현하며 FE에서 활용가능함.
- 정적 사이트 생성 (SSG) 나 서버사이드렌더링 (SSR) 을 지원하는 환경에서 활용됩니다. ++ Next.js의 API Routes는 서버리스 방식으로 동작하며, 클라우드에서 실행 가능한 API를 생성.
- 페이지 요청시 서버리스 함수가 데이터를 처리하여 사용자에게 동적으로 컨텐츠를 제공
- 실시간 알림, 데이터 업데이트 등 FE에서 자주 요구되는 기능을 서버리스 함수로 구현 가능

## 3. Tool
서버리스 아키텍쳐에 주로 쓰이는 3가지 툴에 대해서 알아보자.

1. AWS Lambda
 - AWS에서 제공하는 서버리스 컴퓨팅 서비스.
 - 사용자가 작성한 코드를 특정 이벤트가 발생할 때 실행
 - 사용한 만큼만 비용 지불
 - Node.js, Python, Java 등 다양한 언어 지원.

사용예시
1. 사용자가 이미지를 업로드하면 Lambda함수가 이를 압축하거나 변환
2. HTTP API 요청이 들어오면 DB에서 정보를 가져와 변환.

```javascript
exports.handler = async (event) => { //event는 HTTP 요청 정보를 담고 있음.
  const name = event.queryStringParameters.name || "World";
    // 쿼리 파라미터를 통해 사용자 이름을 받아 "Hello, [name]!" 메세지를 반환함.
  
  return {
    statusCode: 200,
    body: `Hello, ${name}!`,
  };
};
```
2. Vercel API Routes
- 정적 사이트 생성 (SSG) 와 서버사이드 렌더링 (SSR)을 지원하는 플랫폼.
- API Routes 는 Vercel에서 제공하는 서버리스 함수 기능으로, 간단한 API를 작성해 Next.js와 통합.
- 빠르고 쉬운 배포 및 자동 확장 기능

사용예시
1. 폼 데이터를 처리하고 이메일을 발송
2. DB에서 정보를 가져와 동적으로 페이지 렌더링

```javascript
// 파일 위치 예시 : /pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, World!' });
}

// /api/hello.js 경로로 요청을 보내면 이 함수가 실행됨
// req: 요청 (request 객체, res 응답 (response 객체))
// JSON 형식으로 메세지를 반환.
```

3. Netlify Functions
- 정적 사이트와 서버리스 백엔드 기능을 제공하는 플랫폼 -> 서버리스 함수를 쉽게 배포할 수 있도록 도와주는 기능
- Git에 코드를 푸시하면 자동으로 배포
- 간단한 설정으로 서버리스 API 생성
- Jamstack 아키텍쳐와 잘 어울림

사용 예시
1. 실시간 데이터를 가져와 웹페이지에 표시
2. 폼 데이터를 서버에 저장하거나 이메일 발송

```javascript
// 파일 위치: /netlify/functions/hello.js
// Netlify의 function 디렉토리에 파일을 배치하면 자동으로 API 사용 가능
// 브라우저에서 해당 함수의 URL에 접근하면 Hello, Netlify 메시지를 받을 수 있음.
// 서버리스 함수가 배포되면 자동으로 고유한 URL이 생성됨.

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Hello, Netlify!",
  };
};
```

## 4. 서버리스 아키텍처의 구성 요소

1. 함수 (Function as a Service, FaaS)
- 서버리스 아키텍쳐의 핵심은 개별적으로 실행되는 함수
- 클라우드에서 제공하는 실행 환경을 사용
- 이벤트가 발생하면 해당 함수가 실행됨

2. 이벤트
- 함수 실행을 트리거하는 요인
- HTTP 요청 (API Gateway) -> REST API 또는 GraphQL API 구현
- DB 변경 -> 실시간 업데이트 처리
- 파일 업로드 -> AWS S3와 같은 스토리지 서비스
- 스케쥴링 -> 정기적인 작업

3. 백엔드 서비스와의 통합
- 데이터베이스, 메세지 큐, 스토리지 서비스 등과 통합하여 동작함.

4. 배포와 관리
- 코드 배포 후 클라우드 플랫폼이 자동으로 관리함.

## 마치며
이제 다음 시간에는 Next.js와 Vercel을 결합한 간단한 서버리스 아키텍쳐를 구현해보면 좋을 것 같다!