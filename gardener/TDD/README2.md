# TDD (Test-Driven-Development)

## 0. 들어가며
저번 시간에는 TDD와 Front 분야의 대표적인 3개의 Tool인 Jest, RTL (React Test Library), Cypress에 대해서 알아보았다. 오늘은 이제 Jest를 기본으로 가져가고, RTL, Cypress와 함께 결합하여, Component Test, E2E Test의 범위까지 알아보자.

## 1. Jest, RTL, Cypress
| 라이브러리          | 주요 목적                | 장점                                    | 사용 시점                            |
|---------------------|-------------------------|-----------------------------------------|--------------------------------------|
| Jest               | 단위 테스트 및 스냅샷 테스트 | 빠른 실행 속도, 다양한 Matcher 지원, Mock 기능 제공 | 단위 테스트: 함수, 컴포넌트 테스트    |
| React Testing Library (RTL) | UI 렌더링 테스트        | 사용자 관점의 테스트, 간결한 API, React 친화적 | 컴포넌트 테스트: UI와 상호작용 테스트 |
| Cypress            | E2E 테스트              | 실제 브라우저 환경에서 테스트, 디버깅 용이       | 통합 테스트 및 E2E 테스트: 전체 흐름 테스트 |

잠시 복습을 먼저 하고 들어가면, 위의 표와 같다. 간단한 테스트의 범위인 단위 테스트부터, 통합 테스트까지 확장되어 나가며, 3개의 라이브러리를 함께 사용하는 방식으로 테스트를 구성할 수 있다.

Jest 단독으로는, 단위테스트를 수행한다. 함수, 유틸리티 코드, 단일 컴포넌트의 로직을 검증한다.

Jest + React Test Library를 사용하여, UI 중심의 컴포넌트 테스트를 수행한다. - 사용자가 입력하거나 버튼을 클릭했을 때 화면이 어떻게 변하는지 검증한다.

Jest + Cypress를 사용하며, E2E 방식의 테스트를 수행한다. 실제 브라우저 환경에서, 여러 컴포넌트와 페이지의 동작을 확인하며 테스트한다.

## 2. Test
여기 간단한 버튼 컴포넌트를 테스트한다고 가정하자.

```typescript
import React, { useState } from 'react';

export const Button = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clicked' : 'Click me'}
    </button>
  );
};
```

**1) Jest + RTL Test**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

test('changes text on click', () => {
  render(<Button />); // Button 컴포넌트를 가상 DOM에 렌더링
  const button = screen.getByText('Click me'); // "Click me" 텍스트를 가진 버튼을 찾음
  fireEvent.click(button); // 버튼을 클릭하는 이벤트를 트리거
  expect(button).toHaveTextContent('Clicked'); // 버튼이 "Clicked" 텍스트를 가지는지 확인
});
```

- render(Component)
  - React Component를 가상 DOM에 렌더링
  - render 안의 컴포넌트를 테스트 환경에서 실행할 수 있도록 설정함
  - render 를 통해 렌더링 된 요소는 DOM 트리를 가상으로 생성해 테스트에 활용
- screen.getByText('Click Me')
  - 렌더링된 DOM에서 특정 텍스트를 가진 요소를 검색함
  - 텍스트가 정확히 일치해야 함.
- fireEvent.click(button)
  - 특정 요소에서 사용자 이벤트(클릭, 입력)를 시뮬레이션함.
  - 실제 사용자가 버튼을 클릭했을 때 발생하는 이벤트와 동일하게 처리
  - 이 코드를 통해서 버튼의 onClick 핸들러를 호출함.
- expect(button).toHaveTextContext(`Clicked`)
  - Jest의 Matcher 메소드 중 하나인 toHaveTextContext를 사용하여, DOM 요소가 특정 텍스트를 포함하는지 확인한다.
  - 텍스트가 Clicked로 변경되었는지 검증함.

**2) Cypress를 활용한 사용자 흐름 테스트**
```typescript
describe('Button Component Test', () => {
  it('changes text on click', () => {
    cy.visit('/'); // 홈페이지 URL로 이동
    cy.contains('Click me').click(); // 버튼 클릭
    cy.contains('Clicked').should('be.visible'); // 결과 검증
  });
});
```

- cy.visit('/)
  - 지정된 URL 에 대해 브라우저 환경을 시뮬레이션하며 페이지를 로드함.
  - 실제 브라우저에서 앱을 실행한 것처럼 동작.
- cy.contains('Clicke me')
  - DOM에서 특정 텍스트("Click me") 를 가진 요소를 검색함
- cy.contains('Clicked').should('be.visible');
  - "Clicked" 라는 텍스트를 가진 요소가 화면에 보이는지 검증.
  - should는 assertion 메소드로 원하는 상태 (visible, exist)를 확인함
  - 브라우저에서 UI 상태를 확인하는데 사용됨
- describe / it
  - Cypress의 테스트 그룹 (describe)과 개별 테스트 케이스 (it) 를 정의함
  - describe 는 관련 테스트 케이스를 묶어주는 역할
  - it은 단일 테스트 케이스를 정의하며, 각 케이스는 독립적으로 실행됨.