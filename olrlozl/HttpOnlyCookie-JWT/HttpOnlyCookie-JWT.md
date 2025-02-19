> *JWT를 로컬스토리지에서 저장하는 방식이 보안에 좋지 않을 것 같아 찾아보다가 HttpOnly + Secure 쿠키에 저장하는 방식을 알게 되어 주제로 선정했습니다.*

### JWT를 HttpOnly Cookie에 저장하는 이유

1. **XSS 공격 방지**
    - JWT를 `localStorage`나 `sessionStorage`에 저장하면, 클라이언트의 JavaScript에서 접근 가능
    - 하지만 XSS 공격이 발생하면 악성 스크립트가 JWT를 탈취할 수 있음
    - `HttpOnly Cookie`에 저장하면 JavaScript에서 접근할 수 없으므로, XSS로부터 보호 가능!
  
2. **CSRF 대응 (SameSite 설정 활용)**
    - CSRF 공격을 방지하기 위해 `SameSite` 설정을 추가하면 CSRF 공격을 어렵게 만들 수 있음
    - `SameSite=Strict` 또는 `SameSite=Lax` 설정을 하면, 다른 도메인에서 온 요청에서는 쿠키가 자동으로 포함되지 않도록 가능
  
3. **자동 전송 (편의성 증가)**
    - 쿠키에 저장된 JWT는 매 요청 시 **자동으로 서버로 전송**돼서, 클라이언트가 매번 `Authorization` 헤더를 추가할 필요가 없어서 간편해짐!


### **JWT를 HttpOnly Cookie에 저장하는 방식**

**1️⃣ JWT 발급 및 쿠키 설정 (서버)**

서버에서 JWT를 생성한 후, `Set-Cookie` 헤더를 사용해 **HttpOnly, Secure** 속성을 설정한 쿠키를 클라이언트에게 전달한다

```jsx
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const SECRET_KEY = 'your-secret-key';

app.post('/login', (req, res) => {
    const user = { id: 1, username: 'eunji' };
    
    // JWT 토큰 생성
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

    // HttpOnly Cookie에 저장하여 응답
    res.cookie('token', token, {
        httpOnly: true,  // JavaScript에서 접근 불가
        secure: true,    // HTTPS 환경에서만 전송
        sameSite: 'Strict', // CSRF 방지
        maxAge: 3600000  // 1시간 (밀리초 단위)
    });

    res.json({ message: 'Login successful' });
});

```

**2️⃣ 쿠키 기반 JWT 인증 처리 (서버)**

클라이언트에서 요청을 보낼 때, JWT가 자동으로 쿠키에 포함되므로, 서버에서 쿠키 값을 가져와서 검증하면 된다

```jsx
app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Authenticated', user: decoded });
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
});
```

**3️⃣ 로그아웃 처리 (쿠키 삭제)**

```jsx
app.post('/logout', (req, res) => {
    res.clearCookie('access_token', {
			  httpOnly: true,
			  secure: true,
			  sameSite: 'strict',
		});
		res.json({ message: 'Logged out' });
});
```

### **XSS와 CSRF**

1. **XSS**
    - Cross-Site Scripting
    - 공격자가 웹사이트에 **악성 JavaScript** 코드를 삽입하여 실행하도록 유도하는 공격.
    - 사용자의 **쿠키, 로그인 정보, 세션 데이터** 등을 탈취할 수 있음
    - 예) 공격자가 악성 스크립트를 DB나 게시판에 저장해두고, 피해자가 해당 페이지에 접속하면 자동 실행됨.
  
2. **CSRF**
    - Cross-Site Request Forgery
    - 사용자가 로그인한 상태에서 **공격자가 의도하지 않은 요청을 서버로 보내게 유도**하는 공격.
    - 예) 은행 웹사이트에 로그인한 상태에서, 공격자가 조장된 링크를 이메일이나 메시지로 보내고, 사용자가 이 링크를 클릭하면, 로그인 상태에서 자동으로 돈이 공격자 계좌로 이체됨

|  | XSS (Cross-Site Scripting) | CSRF (Cross-Site Request Forgery) |
| --- | --- | --- |
| **공격 대상** | 클라이언트 (브라우저) | 서버 (사용자의 인증된 세션) |
| **공격 방법** | 악성 JavaScript 실행 | 위조된 요청을 자동 전송 |
| **피해 결과** | 쿠키, 세션, 로컬 스토리지 탈취 | 원치 않는 계정 변경, 결제, 데이터 수정 |
| **방어 방법** | 입력값 필터링, CSP 설정 | CSRF 토큰, SameSite 쿠키 |
