 # TDD (Test-Driven-Development)
 
## 0. 들어가며
최근 기업의 많은 공고들에서 TDD에 대한 중요성이 확대되고, 이와 더불어 TDD를 진행할 수 있는 Library 들인 Jest, Cypress 들을 우대사항으로 명시하는 경우가 많아졌다. 그래서 이번 주부터 당분간 TDD에 대해서 알아볼 수 있도록 한다. 사실 TDD라고 하면 나의 입장에서는 Back-End 의 분야에서만 주로 사용된다고 생각했는데, 알고보니 Front에서도 적용할 수 있다는 사실! 이를 알았다면 프로젝트 상황 후 리팩토링에서 TDD를 해볼 걸 그랬다는 생각과 함께, 시작해본다.

## 1. Test Driven Development
 :**테스트 주도 개발**

이 컴포넌트가 어떤 동작을 해야하는가? 를 먼저 정의하고 테스트 코드를 작성하는게 중요하다.
테스트를 먼저 작성하고, 테스트를 통과할 수 있는 최소한의 코드를 구현하며, 개발을 진행하는 방식이다. 

1) TDD의 절차
   1. Failing Test 작성 : 기능 요구사항에 따라 실패하는 테스트를 작성
   2. Code 작성 : Test를 통과하기 위한 최소한의 코드 구현
   3. Refactor : 요구사항의 의도대로 동작하는 코드를 리팩토링하며 품질을 개선한다.


2) TDD를 하는 이유
   1. 버그 방지 : 테스트를 통해 요구사항이 정확하게 구현되었는지 보장
   2. 리팩토링 안정성 : 코드 변경시 기존 기능이 깨지지 않음을 보장
   3. 명확한 요구사항 정의 : 테스트 작성 과정에서 기능의 요구사항을 명확히 이해
   4. 유지보수 용이성 : 코드의 의도를 테스트로 문서화.


3) Front TDD의 주요 Tool
   1. Jest : JS 기반의 테스트 러너, 단위 테스트와 스냅샷 테스트를 지원함
   2. React Testing Library : DOM 상호작용, 렌더링 테스트를 도와주는 라이브러리
   3. Cypress : E2E 테스트(End-to-End)를 위한 도구

| 라이브러리          | 주요 목적                | 장점                                    | 사용 시점                            |
|---------------------|-------------------------|-----------------------------------------|--------------------------------------|
| Jest               | 단위 테스트 및 스냅샷 테스트 | 빠른 실행 속도, 다양한 Matcher 지원, Mock 기능 제공 | 단위 테스트: 함수, 컴포넌트 테스트    |
| React Testing Library (RTL) | UI 렌더링 테스트        | 사용자 관점의 테스트, 간결한 API, React 친화적 | 컴포넌트 테스트: UI와 상호작용 테스트 |
| Cypress            | E2E 테스트              | 실제 브라우저 환경에서 테스트, 디버깅 용이       | 통합 테스트 및 E2E 테스트: 전체 흐름 테스트 |


4) 디렉토리 구조
```plaintext
src/
├── components/
│   ├── Counter.tsx
│   └── __tests__/
│       └── Counter.test.tsx
└── utils/
    ├── math.ts
    └── __tests__/
        └── math.test.ts
```
일반적으로 __tests__ 폴더를 만들어서 그 아래에 위치시커나, 컴포넌트와 같은 위치에 작성한다.

파일명은 *(테스트 하려는 컴포넌트 or 코드 이름).test.tsx 또는 *.spec.tsx 형식을 따른다.

여기까지 알아보면서, 그렇다면 많은 테스트 코드들이 작성된다면, 빌드 과정에 포함되어 성능을 저하시키지 않을까? 하는 의문이 있었다.

하지만, 결론적으로 Jest, Cypress 등을 통해 작성된 테스트 코드는 앱의 빌드 프로세스에 포함되지 않는다. 이 코드들은 개발 도구에서만 실행되며, 빌드시 제거되기 때문이다.!

테스트 실행도구들 (Jest, Cypress) 또한, 개발 의존성에만 포함되며, 프로덕션 빌드에는 영향을 주지 않는다.

# 2. Jest
Jest는 주로 단위 테스트에 사용된다. 함수의 입력과 출력을 검증하는데 주로 사용된다.

먼저 설치를 해야겠죠?
```plaintext
npm install --save-dev jest
```

여기 우리가 더하고 빼는 함수를 만들었다고 가정하자.

```typescript
// calculator.ts 파일이라고 가정
export default function add(a: number , b: number) {
  return a+b;
}

export default function minus(a: number, b:number) {
  return a-b;
}
```

이 함수들이 정상적으로 작동하는지 테스트해보기 위해서는 아래와 같이 Test Code를 작성할 수 있다.
```typescript
// calculator.test.ts
import { add, minus} from './calculator';

test('1+2는 3이여야 함', ()=>{
  expect(add(1,2)).toBe(3);
});

test('5-3은 2여야 함', () => {
  expect(minus(5,2)).toBe(3);
});
```
Jest의 Assertion 형식 예시이다.
```typescript
expect(테스트 값).matcher(기대 값);
```
위의 matcher 부분에서 다양한 사용 예시를 확인할 수 있다.
```typescript
test('다양한 Jest matchers', () => {
  expect(2 + 2).toBe(4); // 정확히 4인지 확인
  expect([1, 2, 3]).toContain(2); // 배열에 2가 포함되어 있는지 확인
  expect('Hello World').toMatch(/World/); // 정규식에 일치하는지 확인
  expect({ a: 1 }).toEqual({ a: 1 }); // 객체가 동일한지 확인
  expect(() => { throw new Error('Oops!'); }).toThrow('Oops!'); // 에러 발생 여부 확인
});
```

작성 이후 실행 해보고 출력값까지 알아보자. 콘솔에 실행하게 된다면 아래와 같이 출력된다.
```vbnet
// PASS : 테스트가 성공적으로 통과했음을 나타냄
 PASS  ./calculator.test.js
  ✓ adds 1 + 2 to equal 3 (5ms)
  ✓ subtracts 5 - 3 to equal 2 (2ms)

// Test Suites : 테스트 파일 단위로 성공 / 실패를 보여줌
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.234s // 시간은 임의로 1234 라고 표시ㅣ
```


(분량상의 이유로 Jest 까지만 알아보고, 다음 주에 RTL, Cypress와 통합된 코드들을 살펴보자. 다음 주에 만나요~)
