# Caching in Next.js

`Next.js 15`에서는 캐시를 여러 단계에서 설정할 수 있습니다:

1. Full Route Cache (라우트 수준)
2. Data cache (fetch 요청 수준)

## 🚀 1. Full Route Cache: 라우트 수준 캐시

라우트 수준 설정은 **페이지나 API 전체가 언제 다시 렌더링되는지**를 결정합니다.

| 옵션                          | 동작                                                                                 |
|-----------------------------|------------------------------------------------------------------------------------|
| `dynamic = "force-static"`  | **정적으로 캐시(SSG)** </br> - 빌드 시에만 데이터를 가져오고 이후 캐시된 결과를 반환. </br> - 재배포 전까지 데이터가 고정됨. |
| `dynamic = "force-dynamic"` | **매 요청 시 서버 실행** </br> - 캐시 없이 항상 최신 데이터 반환.                                       |
| `dynamic = "auto"` (기본값)    | **혼합 모드** </br> - `fetch`에 `cache`, `revalidate` 옵션을 보고 자동으로 결정.                   |
| `revalidate = n`            | **정적 + 주기적 갱신(ISR)** </br> - 첫 요청 이후 캐시하다가, `n`초마다 캐시 갱신.                          |

## ⚡ 2. Data cache: `fetch` 수준 캐시

`fetch()`의 캐시 옵션은 **외부 API 요청 결과를 캐시할지**를 결정합니다.

| 옵션                     | 동작              |
|------------------------|-----------------|
| `cache: "force-cache"` | 강력한 캐시 (Static) |
| `cache: "no-store"`    | 캐시 없음 (Dynamic) |
| `next.revalidate: n`   | 시간 기반 캐시        |

> [!NOTE]
>
> - 데이터 캐시는 `POST` 메서드를 사용하는 `fetch` 요청에는 적용되지 않습니다.
> - 데이터 캐시는 `cookies()`, `headers()`와 같은 동적 함수를 사용하는 요청에는 적용되지 않습니다.

## 💡 Data cache - Revalidation

<b>Revalidation(재검증)</b>은 데이터 캐시를 제거하고 최신 데이터를 다시 가져오는 프로세스입니다. 이는 데이터가 변경되었을 때 애플리케이션의 데이터를 업데이트하는 데 유용합니다.

1. **Time-based Revalidation(시간 기반 재검증)**: 일정 시간이 지난 후 데이터를 자동으로 재검증합니다. 이는 자주 변경되지 않고 신선도가 중요하지 않은 데이터에 유용합니다.
2. **On-demand Revalidation(온디맨드 재검증)**: 태그나 경로 기반으로 데이터를 수동으로 재검증합니다. 이는 가능한 한 빨리 최신 데이터를 표시하고 싶을 때 유용합니다.

### 1) Time-based Revalidation

시간 기반 재검증을 사용하려면 `fetch`의 `next.revalidate` 옵션을 사용하여 리소스의 캐시 수명(초)을 설정할 수 있습니다:

```jsx
fetch('https://...', {next: {revalidate: 3600}});
```

<img src='https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ftime-based-revalidation.png&w=3840&q=75' alt='time-based-revalidation' />

### 2) On-demand Revalidation

온디맨드 재검증은 캐시 태그(`revalidateTag`)를 기반으로 데이터를 재검증할 수 있게 해줍니다.

Next.js에는 fetch를 사용할 때 캐시된 데이터에 태그를 추가할 수 있는 캐시 태깅 시스템이 있습니다:

```jsx
// 캐시된 데이터에 태그 추가
fetch('https://...', {next: {tags: ['collection']}});
```

그런 다음 `revalidateTag`를 호출하여 해당 태그와 연관된 모든 데이터를 재검증할 수 있습니다:

```jsx
// 캐시된 데이터 재검증
revalidateTag('collection');
```

<img src='https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fon-demand-revalidation.png&w=3840&q=75' alt='on-demand-revalidation' />
