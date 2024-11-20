## HTTP 메서드와 멱등성

### ✅ INDEX

[HTTP 메서드의 멱등성](#http-메서드의-멱등성)  
[멱등성 구현하기](#멱등성-구현하기)

### 💬 들어가며

프론트엔드 개념은 아니지만, CS 면접에서 보고 정리하면 좋을 것 같아 주제로 선정함

## HTTP 메서드의 멱등성

### "멱등하다"란?

- 첫 번째 수행을 한 뒤 여러 차례 적용해도 결과를 변경시키지 않는 작업 또는 기능의 속성
- 멱등한 작업의 결과는 한 번 수행하든 여러 번 수행하든 같습니다.

  > e.g.  
  > 어떤 숫자에 1을 곱하는 연산 → 여러 번 수행해도 처음 1을 곱한 것과 같은 숫자가 된다.
  > 절대값 함수 → 같은 값에 대해 여러 번 수행해도 처음과 항상 같은 숫자가 돌아온다.

### HTTP 메서드에서의 멱등성

- 멱등성은 HTTP 메서드의 주요 속성 중 하나이다.

| **메서드** | **멱등성** |
| ---------- | ---------- |
| GET        | O          |
| POST       | X          |
| PUT        | O          |
| DELETE     | O          |
| PATCH      | X          |
| CONNECT    | X          |
| OPTIONS    | O          |
| TRACE      | O          |
| HEAD       | O          |

- 멱등한 메서드
  - `GET`와 같이 리소스를 조회하는 메서드는 멱등하다.
  - `PUT`은 여러 번 호출해도 매번 같은 리소스로 대체하기 때문에 멱등하다.
  - `DELETE`도 여러 번 호출해도 결과가 멱등하다.
- 멱등하지 않은 메서드
  - `POST`, `PATCH`는 서버 데이터를 변경하기 때문에 호출할 때마다 응답이 달라지고, 이는 멱등하지 않다.
- 멱등하지 않은 메서드에 멱등성을 제공하려면 서버에서 멱등성을 구현해야 한다

### 멱등성이 왜 필요한가?

- 멱등한 API는 여러 번 요청해도 처음 요청과 동일한 결과를 받고, 서버 상태에도 영향을 미치지 않는다.
- 이러한 성질은 의도하지 않은 문제를 일으키지 않으면서 요청 재시도가 가능하다
- 즉, 안전한 API를 만드는 데 필요하다.
- 또한 요청마다 고유한 식별자가 담겨있어 중복 요청을 판단할 수 있고, 이를 통해 이미 처리된 요청이 중복으로 요청된 것을 인지하면 처리하지 않고 서버에 저장된 결과를 반환한다.

- 결제 요청 API 예시
  - 멱등성이 보장되지 않은 경우, 결제 당시 네트워크 오류나 타임아웃이 발생한 경우 중복 결제를 막기 위해 결제 성공 여부를 체크하고 사용자가 다시 결제를 시도해야 한다.
  - 하지만 멱등한 API라면 같은 요청을 보내지 않고 전에 받지 못한 결과만 다시 받을 수 있고, 중복 요청이 되더라도 실제로는 결제가 되지 않아 안전한 요청이 가능하다.

### +) 멱등성과 안전성

- 안전성
  - 리소스를 변경하지 않는 특성
  - e.g. `GET`, `HEAD`, `OPTIONS`
- 멱등성과 안전성
  - 안전성이 보장된 메서드는 멱등성도 보장하지만, 멱등성을 지닌 메서드가 항상 안전성을 보장하지는 않는다.
  - e.g. `PUT`, `DELETE` → 멱등성 o 안전성 x (리소스를 변경하기 때문에)

## 멱등성 구현하기

### 멱등키

- 헤더(표준방식), 요청 본문, URL 쿼리 매개변수 중 하나에 멱등키를 API 요청에 포함하면 멱등성을 보장할 수 있다.
  - 헤더에 `Idempotency-Key: {IDEMPOTENCY_KEY}` 추가
  - 멱등키는 UUID v4 처럼 충분히 무작위적인 고유 값이어야 한다.
- 이전 요청과 동일한 멱등키를 가진 요청이 오면 서버에서 처리하지 않고 첫 요청의 응답을 반환한다.

### 예제

~~중복으로 요청하고 결과를 보여주고 싶은데 중복 요청이 안되는 이슈 발생 .. 코드만 참고하세요~~

- 서버 (Express 로 구현)

```jsx
const idempotencyResponses = new Map(); // 멱등키 관리

router.post("/api/insert", function (req, res) {
  const body = req.body;

  // 헤더에서 멱등키 가져오기
  const idempotencyKey = req.headers["idempotency-key"] || null;

  // 이미 결과값 있는 경우 해당 값 반환
  if (idempotencyKey && idempotencyResponses.has(idempotencyKey)) {
    const response = idempotencyResponses.get(idempotencyKey);
    return res.send(response);
  }

  // 실제 데이터 insert 진행
  conn.query("SELECT MAX(bnum)+1 as bnum FROM board", function (err, result) {
    if (err) {
      return res.status(500).send({ status: "fail", error: err.message });
    }

    const sql =
      "INSERT INTO board (bnum, id, title, content, writedate) VALUES (?, ?, ?, ?, NOW())";
    const params = [result[0].bnum, body.id, body.title, body.content];

    conn.query(sql, params, function (err, insertResult) {
      if (err) {
        const value = {
          status: "fail",
          responseData: null,
          errorMessage: err.message || err,
        };
        // 응답 갱신 (fail)
        if (idempotencyKey) {
          idempotencyResponses.set(idempotencyKey, value);
        }
        return res.status(500).send({ status: "fail", error: err.message });
      }

      const value = {
        status: "success",
        responseData: insertResult,
        errorMessage: null,
      };

      // 응답 갱신 (success)
      if (idempotencyKey) {
        idempotencyResponses.set(idempotencyKey, value);
      }

      res.send({ status: "success", data: insertResult });
    });
  });
});
```

- 클라이언트

```jsx
// api
function addPost(param, idempotentKey, success, fail) {
  localFetch("/insert", {
    method: "POST",
    body: JSON.stringify(param),
    headers: { "Idempotency-Key": idempotentKey },
  })
    .then(success)
    .catch(fail);
}

// util
let idempotentKey = null; // 멱등키

function handleAddPost() {
  document
    .getElementById("postForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });

      // 멱등키가 없다면 새로 생성 (uuid 라이브러리 활용)
      if (!idempotentKey) {
        idempotentKey = v4();
      }

      addPost(
        formObj,
        idempotentKey,
        (response) => {
          location.reload();
          alert("게시글을 작성하였습니다.");
          idempotentKey = null; // 멱등키 삭제
        },
        (error) => {
          console.error("전송 실패:", error);
        }
      );
    });
}
```

### 👀 참고자료

https://docs.tosspayments.com/blog/what-is-idempotency#멱등성이-뭔가요

https://developer.mozilla.org/ko/docs/Glossary/Idempotent
