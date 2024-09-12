# Origin (출처)

- 웹 콘텐츠의 **출처**(origin)는 접근할 때 사용하는 URL의 `스킴(프로토콜)`, `호스트(도메인)`, `포트`로 정의된다.

- 두 URL의 프로토콜, 호스트, 포트(명시된 경우) 가 모두 일치하는 경우 동일한 출처를 가진다.
  
- URL: `http://www.example.com:80`
    - 프로토콜: `http://`
    - 호스트: `www.example.com`
    - 포트: `:80`

# SOP (Same-Origin Policy)

- 동일 출처 정책
  
- 같은 출처에서만 리소스를 공유할 수 있도록 하는 정책이다.
- 다른 출처의 리소스를 사용하는 것에 제한하는 보안 방식이다.
- 악성 공격을 방어하는 역할을 한다.
- 브라우저는 기본적으로 SOP를 적용하여 동일 출처의 자원만 접근할 수 있도록 제한하기 때문에, 다른 출처의 자원에 접근하려면 CORS를 통해 브라우저가 해당 요청을 허용하도록 해야 한다.

# CORS (Cross-Origin Resource Sharing)

- 교차 출처 리소스 공유
- **브라우저**가 자신의 출처가 아닌 **다른 출처**로부터 자원을 로딩하는 것을 **허용**하도록 서버가 허가 해주는 HTTP 헤더 기반 메커니즘이다.
- 사용자가 웹 브라우저(예: 크롬)에서 웹 페이지를 열고, 이 웹 페이지가 다른 출처의 서버에 데이터를 요청할 때, **브라우저가 CORS 정책을 검사**한다. 브라우저는 요청을 보낼 때 **서버의 CORS 설정을 확인**하여 요청을 허용할지 차단할지를 결정한다.
  
- CORS는 **브라우저**의 구현 스펙에 포함되는 정책이다.
    - 브라우저를 거치지 않는 **서버 간 통신**에서는 CORS 정책이 적용되지 않는다.
    - 서버는 요청을 정상적으로 처리해도, 브라우저에서 CORS 정책 위반으로 인해 에러가 발생할 수 있다. 이 경우 서버는 정상적인 요청과 응답을 처리했기 때문에 서버 로그는 정상으로 기록된다.

## CORS 동작 시나리오

### 1. Simple Request (단순 요청)

- 특정 조건 하에 그냥 요청을 보내도 되겠다고 판단하고, 예비 요청(Preflight Request) 없이 서버에 바로 본요청(Autual Request)을 보낸다.
- 서버에 바로 본 요청을 보낸 뒤, 서버는 헤더에 `Access-Control-Allow-Origin` 값 등 을 붙여서 보내주면 브라우저가 CORS 정책 위반 여부를 검사한다.

- 특정 조건
    - 요청 메소드가 `GET`, `POST`, 또는 `HEAD` 중 하나여야 한다.
    - 요청에 포함되는 헤더는 `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` (단, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` 만 허용) 와 같은 기본 헤더만 포함될 수 있다.
    
- 사진 파일 업로드(multipart/form-data)가 아니라면 대체로, REST API가 `Content-Type` 으로 `application/json` 을 사용하기 때문에 사실상 지켜지기 어려운 조건이고, 거의 대부분은 Preflight 방식으로 처리한다.

### 2. Preflight Request (사전 요청)

- 브라우저가 서버에게 본 요청(Actual Request)을 보내기 전에, 서버가 특정 HTTP 메소드를 허용하는지 확인하기 위한 `OPTIONS` 메소드를 통해 예비 요청(Preflight Request)을 보낸다. 브라우저 스스로 이 요청을 보내는 것이 안전한지 미리 확인하는 것이다.
- 서버는 CORS 헤더를 설정하여 클라이언트가 본 요청을 보내도 되는지를 판단한다.
- 사전 요청은 일반적인 상황에서는 브라우저에서 자동으로 발생된다. 그러므로 프론트엔드 개발자가 이 요청을 직접 작성할 필요는 없다.

- 예시
    - 클라이언트는 `DELETE` 요청을 하기 전에 사전 요청을 통해 서버가 `DELETE`를 허용하는지 물어본다.
      - Preflight Request
        
        ```
        OPTIONS /resource/foo
        Access-Control-Request-Method: DELETE (실제 요청의 메서드)
        Access-Control-Request-Headers: origin, x-requested-with (실제 요청의 추가 헤더)
        Origin: https://foo.bar.org (요청 출처)
        ```
        
    - 서버가 허용하는 경우, `Access-Control-Allow-Methods` 헤더 값에 `DELETE`를 포함하여 사전 요청에 응답한다.
      - Preflight Response
      
        ```
        HTTP/1.1 204 No Content
        Connection: keep-alive
        Access-Control-Allow-Origin: https://foo.bar.org (서버 측 허가 출처)
        Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE (서버 측 허가 메서드)
        Access-Control-Max-Age: 86400 (Preflight 응답 캐시 시간)
        ```
        
        - `Access-Control-Max-Age` 헤더를 사용하면 브라우저가 사전 요청의 응답을 캐시할 수 있게 되어, 동일한 URL에 대한 CORS 요청 시, 사전 요청을 재사용할 수 있어서, 요청 속도를 높이고 서버 부하를 줄일 수 있다.

- **Preflight의 중요성**
    - CORS를 모르는 서버를 위해서 Preflight가 필요하다!
      
    - CORS 설정을 하지 않은 서버에게 Preflight 없이 바로 본 요청을 보내는 경우를 살펴보자
      
        1. 클라이언트는 자신의 출처(origin)와 함께 브라우저에 요청을 보낸다.
        2. 브라우저는 이 요청을 서버에 전달한다.
        3. 서버는 요청을 처리한 후 *Allow-Origin가 없는(CORS 설정안했기 때문)* 응답을 보낸다.
        4. 브라우저는 응답을 받고 Allow-Origin가 없음을 확인하여 이제서야 CORS 에러를 발생시킨다.
           
        - c번에서 서버가 요청을 이미 처리했기 때문에, 예를 들어 DELETE 요청을 보냈다면, 데이터가 삭제된 후에야 CORS 에러가 발생하게 된다. 이는 데이터 손실이나 의도치 않은 동작으로 이어질 수 있다.
        - Preflight 요청이 있었다면, 클라이언트는 CORS 에러를 확인한 후 본 요청(ex. DELETE)을 보낼 수 없었을 것이다.

### 3. Credential Request (인증정보 포함 요청)

- 인증 정보를 포함하여 서버에 요청하는 방식이다
- CORS의 기본적인 방식이 아닌, 다른 출처 간 통신에서 좀 더 보안을 강화하고 민감한 정보를 안전하게 전송하기 위해 사용된다.

- 클라이언트 측 설정:
    
    클라이언트는 fetch API나 XMLHttpRequest에서 인증과 관련된 옵션인 `credentials`에 `same-origin`이나 `include` 설정하여 인증 정보를 포함시킨다. 그러면 브라우저는 다른 출처의 리소스를 요청할 때 단순히 `Access-Control-Allow-Origin`만 확인하는 것이 아니라 더 엄격한 검사를 수행한다.
    
- 서버측 설정:
  
    서버는 `Access-Control-Allow-Credentials: true` 헤더를 설정하여 클라이언트에서 보내는 인증 정보를 허용해야 하며, 이때 `Access-Control-Allow-Origin`은 `*`로 설정할 수 없고, 클라이언트의 출처를 명시해야한다.
    

## CORS 에러 해결방법

1. **서버에서 CORS 헤더 설정:**
    
    서버에서 `Access-Control-Allow-Origin` 헤더를 설정하여 요청을 허용할 출처를 명시한다. ex) `Access-Control-Allow-Origin: https://example.com`
    
2. **프록시 서버 사용:**
    
    ```jsx
    module.exports = {
      devServer: {
        proxy: {
          '/api': {
            target: 'https://api.evan.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
          },
        }
      }
    ```
    
    Webpack을 사용하는 개발 환경에서 이렇게 프록시 서버를 설정하면, 로컬 환경에서 `/api`로 시작하는 URL로 보내는 요청에 대해 브라우저는 `localhost:8000/api`로 요청을 보낸 것으로 알고 있지만, 사실 뒤에서 웹팩이 `https://api.evan.com`으로 요청을 프록싱해주기 때문에 마치 CORS 정책을 지킨 것처럼 브라우저를 속이면서도 우리는 원하는 서버와 자유롭게 통신을 할 수 있다. 즉, 프록싱을 통해 CORS 정책을 우회할 수 있는 것이다.
    

---

**참고**

- https://evan-moon.github.io/2020/05/21/about-cors/
- [https://velog.io/@wjdwl002/CORS의-기본-개념과-동작-방식부제-Preflight-요청이란](https://velog.io/@wjdwl002/CORS%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90%EA%B3%BC-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D%EB%B6%80%EC%A0%9C-Preflight-%EC%9A%94%EC%B2%AD%EC%9D%B4%EB%9E%80)
- https://www.youtube.com/watch?v=-2TgkKYmJt4
- https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
