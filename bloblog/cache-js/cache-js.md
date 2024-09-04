## 자바스크립트 캐싱 실습

### ✅ INDEX

[생성 및 초기화](#생성-및-초기화)

[배열 및 객체 추가](#배열-및-객체-추가)

[캐시 검색](#캐시-검색)

[항목 및 캐시 제거](#항목-및-캐시-제거)

<aside>

    ✨ 캐시 API를 활용하면, 웹 캐시에 복사된 정적 자산들을 제어할 수 있다.

</aside>

## 생성 및 초기화

\*open 함수를 사용하여 생성한다.

```jsx
// 일반 함수
caches.open("newCache1").then(function (cache) {});

// 화살표 함수
caches.open("newCache2").then((cache) => {});
```

- `애플리케이션 > 캐시 스토리지` 에서 확인이 가능하다
- 동일한 이름의 캐시가 이미 존재하는 경우 캐시는 생성되지 않는다.
- 동일한 도메인에 여러 캐시를 추가할 수 있다.
- 다른 도메인에 설정된 캐시는 접근할 수 없다.

## 배열 및 객체 추가

\*add, addAll, put 함수를 사용하여 추가한다.

\*위 함수들은 Promise를 반환한다.

### add 함수

```jsx
let cacheName = "addCache";
// 반복적으로 쓰이는 city 목록을 캐싱
let url = "/city.json";

caches.open(cacheName).then((cache) => {
  cache
    .add(url)
    .then(() => {
      console.log("Cache add Success");
    })
    .catch((err) => {
      console.log(err);
    });
});
```

- 인자로 Request 객체 혹은 URL을 받고, 주어진 네트워크에 요청 후 그 응답을 저장한다.
  - 내부적으로 `fetch(request)`를 호출한 후, 성공적인 응답이 반환되면 캐시에 추가한다.
  - GET 요청만 가능하다.
- 만약 응답의 상태 코드가 200 범위에 있지 않은 경우 아무것도 저장되지 않고 `Promise`가 거부된다.

### addAll 함수

`add()`와 유사하게 작동하지만 Request 객체 또는 URL의 배열을 받는다.

```jsx
let cacheName = "addAllCache";
const urls = ["/city.json", "/"];

caches.open(cacheName).then((cache) => {
  cache
    .addAll(urls)
    .then(() => {
      console.log("All Caches add Success");
    })
    .catch((err) => {
      console.log(err);
    });
});
```

- 각 개별 요청에 대해 `cache.add()`를 호출하여 동작한다.
- 반환되는 Promise는 배열 중 하나라도 캐시되지 않으면 거부된다.

### put 함수

현재 cache 객체에 키/값 쌍을 추가한다.

```jsx
let cacheName = "putCache";

let url = "/";

fetch(url).then((res) => {
  return caches.open(cacheName).then((cache) => {
    return cache.put(url, res);
  });
});
```

- 자체 Response를 만들고 저장한다.
- 2개의 인자를 받는다.
  1. Request 객체 또는 URL
  2. Response 객체 또는 네트워크 응답

> ✨ **put 함수와 add 함수**
>
> - `fetch(req) -> Cache.put(req, res)` 과 `Cache.add(req)` 는 유사하게 작동한다.
>
> - 하지만 `add()` 는 GET 요청만 받을 수 있다는 제약이 있고, `put()` 은 사용자가 직접 fetch() 수행 후 응답을 받아 해당 응답을 put() 의 두번째 인자로 전달한다는 차이가 있다.
>
>   → put() 이 조금 더 유연한 사용이 가능하다고 볼 수 있다.

## 캐시 검색

### match 함수

요청한 URL에 대해 캐싱된 Response를 가져올 수 있다.

```jsx
// 프라미스 처리가 많아져서 async/await 구조로 수정함

let cacheName = "myCache";
let url = "/city.json";

async function getCachedData() {
  try {
    const cache = await caches.open(cacheName);

    // 캐시에서 인자로 주어지는 요청과 일치하는 응답을 가져온다.
    const res = await cache.match(url);

    if (res) {
      // JSON 데이터 파싱
      const val = await res.json();
      console.log(val);
    } else {
      console.log("캐시에서 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

getCachedData();
```

![image.png]()

- 일치하는 항목이 있으면 `Response` 를, 없으면 `undefined` 를 반환한다.
- 전체 캐시에서 검색했을 때, 인자로 주어진 요청과 두 개 이상 일치하는 경우 먼저 생성된 요청의 응답을 반환한다.
  - `cache.matchAll()` 을 사용하면 모든 요청을 배열 형태로 돌려준다.
- 두 번째 인자로 옵션을 받기도 한다.

  - Vary 헤더 또는 HTTP 메서드 (`GET`, `POST`, `PUT` 등)

  ```jsx
  const options = {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true,
  };

  const response = await cache.match(request, options);
  ```

### keys 함수

캐시의 모든 항목 및 캐시를 검색하기 위해서 keys 함수를 사용한다.

- 특정 캐시 객체에 캐싱된 요청 검색

  - 주의) 요청에 대한 응답을 가져오는 게 아닌, 요청 자체를 검색한다.
  - match 메서드와 동일하게 `keys(요청)` 혹은 `keys(요청, 옵션)` 형식으로 검색

  ```jsx
  let cacheName = "myCache";

  caches.open(cacheName).then((cache) => {
    cache.keys("/").then((urls) => {
      console.log(urls);
    });
  });
  ```

- 모든 캐시 검색 → 인자 넣지 않고 검색
  ```jsx
  caches.keys().then((keys) => {
    console.log(keys);
  });
  ```

## 항목 및 캐시 제거

\*delete 함수를 사용하여 제거한다.

\*항목 및 캐시가 존재하지 않으면 false를 반환한다.

### 캐시 내 특정 항목 제거

- 두 번째 인자로 옵션을 넣어 디테일한 삭제가 가능하다.

```jsx
let cacheName = "myCache";
let url = "/";

caches.open(cacheName).then((cache) => {
  cache.delete(url);
  console.log("요청 삭제 성공!");
});
```

### 캐시 제거

```jsx
let cacheName = "myCache";

caches.delete(cacheName).then(() => {
  console.log("캐시 삭제 성공!");
});
```

```jsx
let cacheName = "yourCache";

caches.delete(cacheName).then((res) => {
  console.log(res); // false
});
```

## 👀 참고자료

https://developer.mozilla.org/en-US/docs/Web/API/Cache/keys

https://web.dev/articles/cache-api-quick-guide?hl=ko#retrieving

https://developer-talk.tistory.com/242
