## React-query 캐싱 실습

### ✅ INDEX

[React-Query](#react-query)

[React-query 캐싱 실습](#react-query-캐싱-실습)

[캐싱 여부에 따른 성능 비교](#캐싱-여부에-따른-성능-비교)

## React-Query

### 개요

서버 데이터를 가져오고 캐싱하는 데 최적화된 React 라이브러리

- 고수준의 추상화로 전역 상태 관리 및 데이터 동기화가 가능하다.
- 확장성이 좋고, 데이터 요청 및 관리를 하기 쉽게 만들어 준다.
  ```jsx
  // 예제

  // axios만 사용
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // react-query 사용
  const { isLoading, error, data } = useQuery("posts", () =>
    axios.get(url).then((res) => res.data)
  );
  ```
- 캐시를 통해 api 호출을 줄이고 사용자 경험을 향상할 수 있다.

### 데이터의 생애주기

devtool 실행시 아래와 같이 해당 데이터가 현재 어떤 상태인지 보여준다

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32b54871-9d93-4376-bc12-b11af2bce837/5a781fe8-8f5e-401e-8871-a7b61e675e6c/image.png)

- Fresh
  - staleTime이 지나지 않은 데이터
  - 데이터 재요청 시 캐시된 데이터를 그대로 반환한다.
- Fetching
  - 데이터 불러오는 중
  - 쿼리 함수 실행 완료를 기다리는 상태
- Paused
  - 쿼리 함수가 시작은 했는데 실제로 실행되고 있지 않음
  - e.g. 네트워크 오프라인 상태
- Stale
  - staleTime이 지난 데이터
  - 데이터 재요청 시 서버에 api를 다시 요청한다.
- Inactive
  - 컴포넌트가 unmount됐을 때, 해당 컴포넌트에서 불러온 데이터의 상태
  - 사용되지는 않지만 메모리에 남아 있는 상태
- +) delete
  - cacheTime이 지나서 아예 삭제된 상태
  - inactive한 데이터가 cacheTime이 지나면 가비지 컬렉터에 의해 메모리에서 제거된다.

## React-query 캐싱 실습

### 리액트 쿼리의 캐싱 전략

- fresh한 데이터를 조회하면, 기존의 데이터를 그냥 보여준다.
- stale한 데이터를 요청하면, 서버에 다시 요청해서 데이터를 가져온다.
  - 가져오는 동안 캐싱이된 데이터가 있다면 그 데이터를 보여준다. → cacheTime 지나지 않은 경우

### staleTime

- 기본 값 = 0초
- 캐시된 데이터가 fresh한 상태를 유지하는 시간
- staleTime 이 지난 경우 다시 요청한다.

### cacheTime

- 기본 값 = 5분
- 캐시된 데이터가 얼마나 오랫동안 메모리에 유지될지
- 캐시된 데이터가 일정 시간 동안 메모리에 유지된 후 가비지 컬렉터에 의해 제거된다.
- staleTime이 아무리 길어도 cacheTime이 짧으면, 캐시가 사라져서 refetch 가 무조건 일어난다.

### stale 한 상태?

- staleTime이 지난 데이터
- 아래와 같은 경우 refetch 되어 다시 fresh 해진다.
  - 새로 마운트 될 때 (e.g. 페이지를 이동했다가 왔을 때)
  - 브라우저 화면을 이탈했다가 다시 focus 할 때
  - 네트워크가 다시 연결될 때
  - `refetchInterval` 옵션을 설정한 경우

### 브라우저 캐싱과 비교

|             | React-query                                                                                                                                 | 브라우저 캐싱                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 지속성      | - 메모리에만 저장되기 때문에 새로고침하거나 브라우저가 닫히면 캐시된 데이터는 사라진다<br>- 데이터의 재사용성이 우수하고 유효성 관리에 유리 | 캐시된 자원은 일정 시간 동안 저장될 수 있으며, 브라우저 종료 후에도 캐시된 파일 재사용 가능                                                              |
| 데이터 관리 | - 주로 서버 상태 및 API 호출 관리에 초점<br>- 데이터 상태 판단 및 비동기 상태 효율적으로 처리 가능                                          | - 주로 정적 자원(HTML, CSS, 이미지, JS 파일 등)을 서버 요청 없이 빠르게 로드하는 데 초점<br>- 파일의 만료 시간을 설정하고, 만료된 데이터는 서버에 재요청 |

## 캐싱 여부에 따른 성능 비교

- 아래 코드는 fetch 요청이 간단하여 큰 차이가 없지만, 요청이 복잡해진다면 성능 차이가 더 커질 것이다.

```jsx
const getData = async () => {
  console.log("cache");
  const response = await fetch(`/data/city.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// 캐싱을 사용하는 쿼리
const { data: cachedData, isLoading: isLoadingCached } = useQuery({
  queryKey: ["city", "cached"],
  queryFn: getData,
  staleTime: 5 * 60 * 1000, // 5분 동안 데이터가 신선하다고 간주됨
  cacheTime: 10 * 60 * 1000, // 10분 동안 캐시에 데이터가 저장됨
});

const fetchData = async () => {
  console.log("fetch");
  const response = await fetch(`/data/city.json`, {
    cache: "no-store", // 브라우저 캐시 무시, 항상 서버에서 데이터 요청
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// 캐싱을 사용하지 않는 쿼리
const { data: uncachedData, isLoading: isLoadingUncached } = useQuery({
  queryKey: ["city", "uncached"],
  queryFn: fetchData,
});
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32b54871-9d93-4376-bc12-b11af2bce837/4e2be5c9-624b-46e1-91ae-c8545bf8e205/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32b54871-9d93-4376-bc12-b11af2bce837/44d6cab6-ab97-4b80-a781-e5364c095d4d/image.png)

## 👀 참고자료

https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults?from=reactQueryV3

[https://velog.io/@juhyeon1114/React-Query-캐싱-원리-w.-staleTime-cacheTime-Lifecycle](https://velog.io/@juhyeon1114/React-Query-%EC%BA%90%EC%8B%B1-%EC%9B%90%EB%A6%AC-w.-staleTime-cacheTime-Lifecycle)

https://velog.io/@muscatcola/React-Query-Query-Status-Fetch-Status

https://musma.github.io/2023/09/14/react-query.html
