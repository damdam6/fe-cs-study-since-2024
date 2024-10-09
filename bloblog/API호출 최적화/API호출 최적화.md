## API 호출 최적화

### ✅ INDEX

[개요](#개요)  
[디바운싱(Debouncing)](#디바운싱-debouncing)  
[쓰로틀링(Throttling)](#쓰로틀링throttling)  
[기타 최적화 방안](#기타-최적화-방안)

## 개요

대규모 트래픽이나 실시간 상호작용이 많은 경우 api 최적화가 필수

### API 호출 최적화의 필요성

1. 성능 개선 및 서버 자원을 효율적으로 관리
   - 스크롤 이벤트나 버튼 연타 등으로 API 호출이 많아지면 서버의 성능 저하로 이어질 수 있으므로 불필요한 API 호출을 줄여 서버의 안정성 도모
   - api 요청 빈도를 조절하여 네트워크 트래픽 역시 효율적으로 관리 가능
   - 클라우드 기반 서비스에서는 비용 절감 효과도 있다.
2. 더 나은 사용자 경험 제공
   - 불필요한 딜레이나 과도한 로딩 없이 원활한 애플리케이션 작동
   - 사용자의 최종 입력이 완료된 후에 요청을 보내거나, 스크롤 이벤트 최적화 등이 그 예시

### 디바운싱과 쓰로틀링

- 자바스크립트에 한정되지 않는 프로그래밍 용어
- 둘을 비교하면 이런 느낌

![image1.png]()

## 디바운싱 (Debouncing)

> 연이어 발생하는 이벤트를 모아서 한번만 처리(마지막 or 처음)하는 방식  
> 특히 무의미하게, 무수하게 요청이 발생하는 경우에 이벤트를 막는 역할을 한다.
>
> _e.g. 버튼 연타하는 경우, 마지막 클릭 후 일정 시간이 지나면 모아서 처리_

- 사용 예시
  - 검색 api
    - 사용자의 검색어 입력이 끝나면 처리
    - 하지만 검색어가 업데이트 될 때마다 호출하는 것이 사용자 관점에서 편하다면 적용 x
  - resize 이벤트 처리
    - 브라우저 창 크기 업데이트가 멈추면 처리
  - 유료/횟수 제한이 있는 api를 사용할 때
- 디바운싱은 이벤트를 처리하는 시점으로 리딩 엣지(leading edge)와 트레일링 엣지(trailing edge)로 나눌 수 있다

  ![image2.png]()

  - 리딩 엣지 : 첫 이벤트가 기준
    - 처음에 실행하는 함수를 처리하고 그 뒤에 입력을 무시
    - 첫 요청이 들어온 후 일정 시간동안 요청을 무시한다는 점에서 쓰로틀링과 유사하다.
  - 트레일링 엣지 : 마지막 이벤트가 기준
    - 마지막으로 실행한 함수를 처리
    - 보통 디바운싱에서 채택

- 예제) 이벤트 다 끝나면 api 호출

```jsx
function App() {
  let timer;

  const debounceClick = () => {
    if (timer) {
      clearTimeout(timer); // 클릭이벤트가 계속 발생한다면, 1초 시간 초기화
    }
    timer = setTimeout(() => {
      console.log("API 호출"); // 클릭이벤트가 더이상 없다면, 1초 후 호출
    }, 1000);
  };

  return (
    <div>
      <button onClick={debounceClick}>클릭</button>
    </div>
  );
}
```

![디바운싱.gif]()

- 예제) 특정 크기로 resize 가 완료되면 한 번에 처리

```dart
// 디바운스 함수 정의
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ResizableBox = () => {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 200 });

  useEffect(() => {
    const box = boxRef.current;

    const observer = new ResizeObserver(
      debounce((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          console.log(`새 크기: ${width}px x ${height}px`);
        }
      }, 300) // 300ms 후에 마지막 이벤트만 처리
    );

		// 디바운싱 적용하지 않은 코드
    /* const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        console.log(`새 크기: ${width}px x ${height}px`);
      }
    }); */

    // 요소 관찰 시작
    observer.observe(box);

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      observer.disconnect();
    };
  }, []);

  const resizeBox = () => {
    setSize((prevSize) => ({
      width: prevSize.width === 200 ? 300 : 200,
      height: prevSize.height === 200 ? 300 : 200,
    }));
  };

  return (
    <div>
      <div
        className="box"
        ref={boxRef}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      ></div>
      <button onClick={resizeBox}>크기 변경 (Debound)</button>
    </div>
  );
};
```

![resize.gif]()

## 쓰로틀링(Throttling)

> 이벤트를 일정한 주기마다 발생하도록 하는 방식
>
> _e.g. 버튼을 한 번 누른 후에는 일정 시간동안 클릭을 못하게 한다_

- 사용 예시

  - 연속클릭을 하는 동안에도 (일정 시간이 지나면) 이벤트가 발생하기 때문에 scroll, resize, drag 시에 좀 더 매끄러운 사용자 경험을 구현

- 예제) 1초에 한 번씩만 api 호출
  - 이벤트가 1번 발생한 뒤, 일정 시간동안 이벤트를 무시하고 이후 이벤트를 발생 시킨다.

```jsx
function App() {
  let timer;

  const throttleClick = () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null; // 1초 후 타이머 초기화
        console.log("회원가입 API 호출");
      }, 1000);
    }
  };

  return (
    <div>
      <button onClick={throttleClick}>클릭</button>
    </div>
  );
}
```

![쓰로틀링.gif]()

- 예제) 스크롤 이벤트 관찰  
  \*\*7주차 [이미지 지연 로딩](<[https://github.com/damdam6/fe-cs-study-2024/blob/main/bloblog/지연로딩/지연로딩.md#이미지-지연-로딩](https://github.com/damdam6/fe-cs-study-2024/blob/main/bloblog/%EC%A7%80%EC%97%B0%EB%A1%9C%EB%94%A9/%EC%A7%80%EC%97%B0%EB%A1%9C%EB%94%A9.md#%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A7%80%EC%97%B0-%EB%A1%9C%EB%94%A9)>) 참고
  - 참고한 코드는 api 호출 한 번 + 이미지 로딩 타이밍 조절이고, 아래 코드는 스크롤 위치에 따라 api 여러 번 호출한다는 점에서 차이가 있긴 함.
  - 스크롤 이벤트 발생할 때마다 스크롤 위치를 계산하는 게 아닌, 쓰로틀링을 사용하여 0.2초 간격으로 스크롤 위치를 계산한다.

```jsx
let imagesData = []; // 이미지를 저장할 배열
let loading = false; // 현재 로딩 중인지 확인하는 변수

// 이미지 추가 함수
// 여기는 단순 html 조작이라 안봐도 됩니다 !
function addImagesToDOM() {
  if (imagesData.length === 0 || loading) return; // 데이터가 없거나 로딩 중이면 중단

  loading = true; // 로딩 시작
  const imagesToAdd = Math.min(6, imagesData.length); // 한 번에 추가할 이미지 수

  for (let i = 0; i < imagesToAdd; i++) {
    if (imagesData.length === 0) break; // 더 이상 추가할 이미지가 없으면 중단

    let imageData = imagesData.shift(); // 배열에서 이미지를 하나 꺼내옴
    let image = document.createElement("img");
    image.src = `${imageData.url}`;

    // 이미지 태그 만들어서 html 에 추가
    let gridCell = document.createElement("div");
    gridCell.classList.add("col");
    gridCell.classList.add("col-lg");
    gridCell.appendChild(image);

    document.getElementById("grid").appendChild(gridCell);
  }

  loading = false; // 로딩 완료
}

// 스크롤 위치 관찰 함수
function checkScrollPosition() {
  console.log("scroll 위치 관찰 함수 실행");
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 페이지의 아래쪽에 도달했을 때
  if (scrollY + windowHeight >= documentHeight - 50) {
    // 추가 이미지를 요청
    fetchCatImages(
      (data) => {
        imagesData.push(...data);
        addImagesToDOM(); // DOM에 추가
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

// 쓰로틀링을 적용한 스크롤 이벤트
let throttleTimeout;
const throttleDelay = 200; // 0.2초 간격으로 스크롤 위치 체크

window.addEventListener("scroll", () => {
  console.log("scroll 이벤트 발생");
  if (throttleTimeout) {
    clearTimeout(throttleTimeout);
  }

  throttleTimeout = setTimeout(() => {
    checkScrollPosition(); // 스크롤 위치 체크 함수 호출
  }, throttleDelay);
});

// 초기 이미지 로딩
fetchCatImages(
  (data) => {
    imagesData.push(...data);
    addImagesToDOM(); // DOM에 추가
  },
  (error) => {
    console.log(error);
  }
);
```

![scroll.gif]()

## 기타 최적화 방안

### 기타 최적화 방안

- 조건에 맞는 경우만 API 호출
  - e.g. 검색어 입력 시 한글이 완성되어야 검색 api 호출
- 캐싱 적용 : 캐시된 데이터 있으면 api 호출 x

### +) useDefferredValue, useTransition

[리액트 18의 새로운 훅: useDeferredValue와 useTransition](https://f-lab.kr/insight/react-18-new-hooks-20240630)

- react 18에서 지원
- 디바운싱, 쓰로틀링을 대체할 수 있는 리액트 훅
- ~~근데 어떤 점에서 유사한 기능을 제공하는지 아직 잘 이해 안됨..~~

## 👀 참고자료

[https://velog.io/@jerrychu/프론트엔드-API-호출-최적화-Debouncing](https://velog.io/@jerrychu/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-API-%ED%98%B8%EC%B6%9C-%EC%B5%9C%EC%A0%81%ED%99%94-Debouncing)

[https://velog.io/@imzzuu/JS-디바운싱Debouncing과-쓰로틀링Throttling-feat.-프엔-면접](https://velog.io/@imzzuu/JS-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1Debouncing%EA%B3%BC-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81Throttling-feat.-%ED%94%84%EC%97%94-%EB%A9%B4%EC%A0%91)

https://cheolsker.tistory.com/70#google_vignette

https://ysiksik.github.io/elegant-tekotok/2023-04-08-JASMINE-Debouncing-Throttling/

https://f-lab.kr/insight/react-18-new-hooks-20240630
