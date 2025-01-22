# Tanstack Query (React Query)

## 소개

- HTTP 요청을 통해 프론트엔드 UI를 백엔드 데이터와 동기화하는 데 사용되는 강력한 라이브러리
- React Query라는 이름으로 시작했지만, 다른 프레임워크에서도 활용할 수 있도록 기능이 확장되며 TanStack Query라는 이름으로 변경됨

### **대표적인 기능**

- 데이터 가져오기 및 캐싱
- 동일 요청의 중복 제거
- 신선한 데이터 유지
- 무한 스크롤, 페이지네이션 등의 성능 최적화
- 네트워크 재연결, 요청 실패 등의 자동 갱신

### **설치**

```
npm install @tanstack/react-query
```

## useQuery

- `useQuery`는 데이터를 가져오는(fetch) 작업에 최적화된 훅
- 일반적으로 `GET` 요청을 통해 데이터를 조회할 때 사용하며, 데이터의 캐싱 및 상태 관리를 자동으로 처리해줌.
- **기본 사용법**
    
    ```jsx
    import { useQuery } from '@tanstack/react-query';
    import { fetchEvents } from 'util/http.js';
    
    export default function NewEventSection() {
      const { data, isLoading, isError, error, refetch } = useQuery({
    	  queryKey: ['events'], // 고유 식별자 역할을 하는 키
    	  queryFn: fetchEvents, // 데이터를 가져오는 함수
    	  enabled: true,        // 쿼리의 활성화 여부
    	  staleTime: 5000,      // 캐시 데이터가 신선하다고 간주되는 시간 (밀리초)
    	  cacheTime: 300000,    // 캐시된 데이터를 보관할 최대 시간 (밀리초)
    	});
    
      if (isLoading) return <p>Loading...</p>;
      if (isError) return <p>Error: {error.message}</p>;
    
      return (
        <div>
          <h1>Event List</h1>
          {data.map(event => (
            <p key={event.id}>{event.name}</p>
          ))}
        </div>
      );
    }
    ```
    
- **주요 옵션**
    
    
    | 옵션 | 설명 |
    | --- | --- |
    | `queryKey` | 쿼리를 식별하는 고유 키. 배열 형태로 값을 제공하며, 같은 키를 가진 쿼리는 캐시 데이터를 재사용한다. |
    | `queryFn` | 데이터를 가져오는 함수. 프로미스를 반환해야 하며, 직접 작성하거나 `fetch`, `axios` 등으로 구현할 수 있다. |
    | `enabled` | 쿼리의 활성화 여부를 결정. `false`로 설정하면 쿼리가 자동 실행되지 않는다. |
    | `staleTime` | 데이터가 신선하다고 간주되는 시간. 이 시간 동안 새 요청이 자동 전송되지 않는다. 기본값은 `0` |
    | `cacheTime` | 캐시 데이터를 유지하는 시간. 기본값은 `5분(300000ms)` |
    | `refetch` | 수동으로 쿼리를 다시 실행하는 함수. 버튼 클릭 등 특정 이벤트에서 데이터를 새로고침할 때 사용한다. |
    | `isLoading` | 데이터 로딩 상태 |
    | `isError` | 오류 발생 여부 |
    | `error` | 발생한 오류 객체 |

## useMutation

- `useMutation`은 데이터를 생성, 업데이트, 삭제하는 **변경 작업**에 최적화된 훅
- 주로 `POST`, `PUT`, `DELETE` 요청에 사용되며, 명시적으로 동작을 트리거한다.
- **기본 사용법**
    
    ```jsx
    const { mutate } = useMutation({
      mutationFn: createNewEvent, // 데이터를 변경하는 함수
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] }); // 캐시 무효화
      },
    });
    ```
    
- **주요 옵션**
    
    
    | 옵션 | 설명 |
    | --- | --- |
    | `mutationFn` | 데이터를 변경하는 함수. 프로미스를 반환해야 한다. |
    | `onSuccess` | 요청이 성공적으로 완료된 후 실행되는 콜백 함수. 주로 `queryClient.invalidateQueries`를 호출해 캐시된 데이터를 최신 상태로 만든다. |
    | `onError` | 요청 실패 시 실행되는 콜백 함수. |
    | `onSettled` | 성공 여부와 관계없이 요청이 완료된 후 실행. |
    | `mutate` | 변경 작업을 실행하는 함수. |

## useQuery과 useMutation 비교

| 기능 | `useQuery` | `useMutation` |
| --- | --- | --- |
| 용도 | 데이터 조회 (`GET`) | 데이터 생성, 수정, 삭제 (`POST`, `PUT`, `DELETE`) |
| 요청 시점 | 자동 실행 | 수동 실행 (`mutate` 함수로 호출) |
| 캐싱 | 기본 제공 | 사용하지 않음 |

## QueryClient

- React Query(Tanstack Query)의 핵심 객체로, 쿼리와 캐시를 관리하는 데 사용된다.
- 모든 `useQuery`와 `useMutation` 훅의 동작을 통제하며, 캐시 설정, 쿼리 무효화, 데이터 업데이트 등의 기능을 제공한다.
- React Query를 사용하려면 `QueryClientProvider`로 컴포넌트를 감싸야 한다.

```jsx
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

- **주요 메서드**
    
    `QueryClient` 객체는 캐시와 쿼리 데이터를 조작하는 다양한 메서드를 제공한다.
    
    | 메서드 | 설명 |
    | --- | --- |
    | `invalidateQueries(queryKey)` | 특정 키와 관련된 모든 쿼리를 무효화하고 새 데이터를 가져온다. |
    | `resetQueries(queryKey)`  | 쿼리를 리셋하고 초기 상태로 되돌린다. |
    | `refetchQueries(queryKey)` | 해당 키의 모든 쿼리를 다시 실행한다. |
    | `setQueryData(queryKey, data)` | 캐시된 데이터를 수동으로 설정한다. |
    | `getQueryData(queryKey)` | 특정 쿼리 키의 캐시 데이터를 반환한다. |
