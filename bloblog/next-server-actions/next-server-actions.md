## ✅ INDEX

[Action 이란?](#action-이란)  
[Next Server Actions](#next-server-action)

## Action 이란?

### HTML Action

> form 태그의 action 속성

- 서버로 데이터를 제출하는 URL을 지정함
- 서버 측으로 폼 데이터를 전송하는 전통적인 방법
- `method="POST"`나 `method="GET"` 속성과 함께 사용

```html
<form action="/submit" method="POST">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
```

### React 19 Actions (React Server Actions)

> 서버에서 실행됨

- React 팀에서 제안한 새로운 서버 액션 방식
- fetch() 없이 직접 서버 함수를 호출하는 방식으로 동작
- Next Server Actions 와 거의 흡사한 형식

<aside>

    👀 Actions

    관례적으로 비동기 트랜지션(async transitions)을 사용하는 함수를 가리킨다. 데이터를 자동으로 제출하고 관리하는 역할을 한다.

    - 대기 상태 관리(Pending state): Actions는 요청이 시작될 때 대기 상태를 제공하며, 최종 상태 업데이트가 커밋되면 자동으로 상태를 초기화한다.
    - 낙관적 업데이트(Optimistic updates): Actions는 새로운 `useOptimistic` 훅을 지원하여, 요청이 진행되는 동안 사용자에게 즉각적인 피드백을 제공할 수 있도록 한다.
    - 에러 처리(Error handling): Actions는 에러 처리를 제공하여, 요청이 실패할 경우 Error Boundary를 표시할 수 있으며, 낙관적 업데이트를 원래 값으로 자동 복원한다.
    - 폼 처리(Forms): `<form>` 요소는 이제 `action` 및 `formAction` 속성에 함수를 전달할 수 있으며, 이를 통해 Actions가 기본적으로 사용된다. 또한, 폼이 제출된 후 자동으로 초기화된다.

    출처: https://react.dev/blog/2024/12/05/react-19

</aside>

### Next Server Actions

> 서버에서 직접 실행하는 함수

- React 19 Actions 를 기반으로 Next.js 에 최적화된 형태
- 서버 사이드에서 데이터를 처리하거나 외부 API와 상호작용하는 데 사용
- 클라이언트 컴포넌트에서 서버 함수 직접 호출 가능
  - API 라우트 방식에서는 직접 호출 불가능 → fetch 나 axios 사용
  - 네트워크 요청 없이 서버에서 데이터 처리가 가능하기 때문에 오버헤드 감소
  - 하지만 HTTP 요청이 반드시 필요한 상황에서는 사용할 수 없음 (e.g. 외부 API 요청, 서비스워커)
- 서버 상태나 DB에 접근 가능

## Next Server Actions

### 초기 세팅 방법

- Next.js 13 이상
- next.config.js 에서 serverActions 활성화
  - Next.js 14 이후로는 기본적으로 활성화됨
  ```jsx
  module.exports = {
    experimental: {
      serverActions: true,
    },
  };
  ```

### 사용해보기

> “use server” 키워드로 서버 함수 생성 + 클라이언트에서 호출

- app/actions.js

```jsx
"use server";

export async function createInvoice(formData) {
  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  console.log("서버에서 받은 데이터:", rawFormData);
  // ✅ mutate data (DB 저장 로직 추가 가능)
  // ✅ revalidate cache (데이터 갱신)
}
```

- app/page.js

```jsx
export default function Page() {
  return (
    <form action={createInvoice}>
      <input type="text" name="customerId" placeholder="Customer ID" />
      <input type="number" name="amount" placeholder="Amount" />
      <input type="text" name="status" placeholder="Status" />
      <button type="submit">Create Invoice</button>
    </form>
  );
}
```

### “use server” 키워드

> 특정 함수를 서버에서만 실행하도록 지정하는 키워드

- Next.js 14 부터 도입됨
- 클라이언트 측에 노출 x
- 파일 맨 위에 써서 파일의 모든 함수를 서버 함수로 만들거나 함수 맨 위에 인라인으로 사용하여 서버 함수로 만드는 데 사용

### 보안 고려 사항

> 클라이언트에서 직접 서버 함수로 데이터 보내는 경우 인증 및 권한 검증 필수

- 폼 데이터 검증: 서버에서 폼 데이터를 검증하고, 유효한 데이터만 처리
- 권한 확인: 서버 액션을 호출하기 전에 사용자가 올바른 권한을 가지고 있는지 체크

  - 예시 코드

  ```jsx
  "use server";

  import { db } from "@/lib/db"; // Your database client
  import { authenticate } from "@/lib/auth"; // Your authentication library

  export async function createUser(data, token) {
    const user = authenticate(token);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const newUser = await db.user.create({ data });
    return newUser;
  }
  ```

- CSRF 보호: 폼 전송 시 Cross-Site Request Forgery(CSRF) 공격을 방지할 수 있도록 CSRF 토큰 사용
- 민감 데이터 처리: 민감한 정보는 암호화하여 처리하고, 로그나 응답에서 노출되지 않도록 주의
