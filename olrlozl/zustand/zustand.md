### Zustand란

- 독일어로 "상태"를 의미하며, **작고 빠르고 확장 가능한 상태 관리 라이브러리**다.
- 간소화된 Flux 패턴을 사용하며 React와의 통합에 강점이 있다.
- 다른 상태 관리 라이브러리와 달리 Context API를 사용하지 않고 **클로저를 활용**해 스토어 내부 상태를 관리한다.
- redux-devtools를 활용해 디버깅이 가능하며, 사용법도 간단하다.

### Zustand 사용법

1. **설치**
    
    Zustand를 사용하려면 먼저 패키지를 설치해야 한다
    
    ```
    npm install zustand
    ```
    
2. **상태 스토어 생성**
    
    Zustand의 `create` 함수를 사용하여 상태 스토어를 생성한다
    
    ```jsx
    import { create } from 'zustand';
    
    const useStore = create((set) => ({
      count: 0, // 상태 초기값
      increase: () => set((state) => ({ count: state.count + 1 })), // 상태 업데이트 함수
      decrease: () => set((state) => ({ count: state.count - 1 })),
    }));
    ```
    
3. **상태 사용하기**
    
    `useStore` 훅을 사용하여 컴포넌트에서 Zustand 상태에 접근할 수 있다
    
    ```jsx
    import React from 'react';
    import { useStore } from './store'; // 스토어 파일 경로
    
    const Counter = () => {
      const { count, increase, decrease } = useStore();
    
      return (
        <div>
          <h1>{count}</h1>
          <button onClick={increase}>Increase</button>
          <button onClick={decrease}>Decrease</button>
        </div>
      );
    };
    
    export default Counter;
    
    ```
    
4. **상태 선택**
    
    전체 상태를 가져오는 대신 필요한 상태만 선택해서 사용할 수 있다
    
    ```jsx
    const count = useStore((state) => state.count);
    const increase = useStore((state) => state.increase);
    ```
    

### Zustand 주요 장점

- **간단한 API**
    - 복잡한 리듀서나 미들웨어 설정 없이 `set`과 `get` 함수만으로 상태를 정의하고 관리 가능.
- **가벼움**
    - 핵심 코드 크기가 약 1KB로, 번들 크기에 부담을 주지 않는다.
- **강력한 React 통합**
    - React Hook(`useStore`)으로 상태를 구독하고 컴포넌트와 쉽게 연동.
    - 특정 상태만 선택적으로 구독해 **불필요한 렌더링 최소화**.
- **선택적 상태 구독**
    - 상태의 특정 부분만 구독하도록 설계되어 성능 최적화에 유리하다.
- **비동기 작업 지원**
    - `async/await`를 직접 활용할 수 있어 네트워크 요청 및 비동기 작업 처리가 간단하다.

### Zustand가 Redux와 Context API보다 나은 이유

1. **간단한 사용법**
    - 추가적인 Hook이나 Provider로 컴포넌트를 감쌀 필요가 없다.
    - 보일러플레이트 코드가 현저히 줄어든다.
2. **효율적인 렌더링**
    - 상태가 변경될 때만 해당 컴포넌트를 렌더링해 불필요한 렌더링을 방지한다.
3. **일관성 있는 상태 관리**
    - 중앙 집중식 상태 관리와 액션 기반 구조로 관리가 체계적이고 일관성을 유지한다.

### React 상태관리 라이브러리 비교

- **npm trends 다운로드 순위**
  - 1위: redux (react-redux & redux-tookit)
  - 2위: **zustand**
  - 3위: jotai
  - 4위: recoil

| **항목** | **Redux** | **Zustand** | **Jotai** | **Recoil** |
| --- | --- | --- | --- | --- |
| **주요 특징** | Flux 패턴 기반, 중앙 집중식 상태 관리 | 간단하고 가벼운 클로저 기반 상태 관리 | 원자(atom) 기반 상태 관리 | 원자(atom)와 셀렉터 기반 그래프형 상태 관리 |
| **설치 크기** | 비교적 큼 (redux, react-redux 등) | 매우 작음 (1KB 미만) | 작음 | 작음 |
| **보일러플레이트** | 많음 | 거의 없음 | 없음 | 없음 |
| **상태 관리 방식** | 전역 스토어 | 전역 스토어 | 원자 단위 관리 | 원자 단위 관리 |
| **React 통합성** | Context API 사용, 별도 설정 필요 | React Hook 기반 | React Hook 기반 | React Hook 기반 |
| **성능 최적화** | 상태별 구독 불가능, 리렌더링 발생 가능 | 상태별 구독 가능, 불필요한 리렌더링 방지 | 상태별 구독 가능 | 상태별 구독 가능 |
| **학습 곡선** | 높음 | 낮음 | 낮음 | 중간 |
| **추천 사용 사례** | 대규모 애플리케이션, 복잡한 상태 관리 | 소규모 애플리케이션, 빠른 개발 | 독립적인 상태 관리가 필요한 경우 | 비동기 작업 및 상태 간 의존성이 많은 경우 |
