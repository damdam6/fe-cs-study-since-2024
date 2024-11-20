# 1. Express

## 0. 들어가며
최근에 SSAFY에서 같이 프로젝트를 했었던 형을 만났는데, 이 분은 개발에 진심인 사람이여가지고, 계속해서 공부를 하고 있는 미친 광기를 보여주고 있는 사람이었다.. 오랜만에 만나서 취준 관련 이야기도 나누고, 개발 공부 커리큘럼 관련한 이야기도 나누었다. 그러던 중, Front 개발에서 React와 TypeScript 다음으로 공부해야할 것은 Express와 Nest.js다라고 하는 이야기가 나와서, 오늘은 이를 주제로 다뤄보려고 한다. 

공부하다가, 알았는데 Express와 Nest.js 모두 BackEnd의 분야이지만, React와의 통합과 API 설계의 관점에서 접근해서 공부해볼 수 있도록 하자.

## 1. Express
1. Express 기본 설명
   - Node.js 기반의 경량 웹 프레임워크
   - HTTP 요청 및 응답 처리, 라우팅, 미들웨어 사용이 특징
2. 주요 특징
   - 최소한의 구조 : 필요한 기능만 선택적으로 추가가 가능하다.
   - 미들웨어 시스템 : 요청 / 응답 흐름을 처리하고, 확장성 제공
   - Restful API 구축에 적합
3. 사용 사례
   - API 서버
   - 간단한 웹 애플리케이션
   - 마이크로 서비스

## 2. React와의 차이점
1. 역할과 목적

| **특징** | **Express**                                                    | **React**                             |
|--------|----------------------------------------------------------------|---------------------------------------|
| **용도** | 서버 애플리케이션 개발                                                   | 사용자 인터페이스(UI) 개발                      |
| **역할** | - HTTP 요청/응답 처리   <br/> - API 개발          <br/> - 데이터 처리 및 라우팅 | - 브라우저에서 화면 렌더링    <br/> - UI 컴포넌트 관리 |

- Express 는 "Get/users" 요청이 들어오면 데이터를 반환한다.
- React는 데이터를 받아와 화면에 리스트의 형태로 출력

2. 실행 환경
- Express는 서버에서 돌아가는 프로그램
- React는 사용자의 브라우저에서 동작하는 프로그램

3. 기술적인 특징

| **특징**     | **Express**               | **React**                               |
|------------|---------------------------|-----------------------------------------|
| **언어 기반**  | Node.js (JS)              | JS(주로 ES6+) 및 JSX                       |
| **구조화 방식** | - 라우터 중심  <br/> - 미들웨어 사용 | 컴포넌트 중심    <br/> - 상태 관리 (State, props) |
| **상태 관리**  | Express 자체에는 없음           | 내장된 상태 관리 (useState 등)                  |

4. 주요 기능 비교
1) Express 
   - HTTP 요청 처리 : 클라이언트가 보내는 요청 (GET, POST) 등에 따라 데이터를 반환하거나 저장
   - API 서버 : React와 같은 프론트엔드에서 사용할 데이터를 제공
   - 미들웨어 : 요청을 가공하거나 처리 (예: 인증, 로깅)
   - 라우팅 : 클라이언트 요청을 특정 경로로 분기
   ``` javascript
   app.get('/users', (req, res) => res.json({ name: 'Gardener' }));
   ```

2) React
   - UI 렌더링 : 데이터 (예: Express에서 가져온)를 기반으로 화면 구성
   - 컴포넌트 기반 개발 : 독립적인 UI 블록을 조합해 화면을 구성
   - 상태관리 useState, useEffect 등을 통해 데이터와 UI 동기화
```javascript
function UserList({ users }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

## 3. Express + React 함께 사용하는 프로젝트 예시
1) Express로 API 서버 구현
```javascript
const express = require('express');
const app = express();
app.get('/api/users', (req, res) => res.json([{ id: 1, name: 'John' }]));
app.listen(3000, () => console.log('Server running on port 3000'));
```

2) React로 사용자 인터페이스 구현
```javascript
import { useState, useEffect } from 'react';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

3) 간단한 Express의 주요 개념
- 라우팅 : 경로별로 요청을 처리하기
```javascript
app.get('/users', (req, res) => res.send('User List'));
app.post('/users', (req, res) => res.send('User Created'));
```
- 미들웨어 : 요청과 응답 사이의 로직 추가
```javascript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```
- 요청 데이터 처리 : JSON, URL-encoded 데이터 처리
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

- 에러 핸들링 : 에러를 처리하는 미들웨어 작성
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

- 간단한 조회, 생성, 삭제 기능 만들기 예제
```javascript
let todos = [];

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});
```