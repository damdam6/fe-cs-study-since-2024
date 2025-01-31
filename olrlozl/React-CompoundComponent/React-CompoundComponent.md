## 📌 컴파운드 컴포넌트(Compound Component)란

- 리액트에서 **여러 개의 컴포넌트를 부모-자식 관계로 묶어서** 하나의 큰 컴포넌트처럼 동작하게 만드는 디자인 패턴
- 이 패턴을 사용하면 컴포넌트 간에 **상호작용을 쉽게 처리하고, 보다 유연한 UI를 구축**할 수 있음
- 또한 **컴포넌트들이 독립적이면서도** 부모 컴포넌트가 자식 컴포넌트들의 위치, 동작, 상태 등을 제어할 수 있음

## 📌 유용한 경우

컴포넌트들이 서로 **연관된 상태를 공유하면서도, 개별적으로 구성할 수 있는** 경우

**✔ 예시:**

- `<Tabs>` 같은 탭 UI
- `<Accordion>` 같은 아코디언 UI
- `<Dropdown>` 같은 드롭다운 메뉴
- `<Stepper>` 같은 멀티스텝 폼

## 📌 사용하는 이유

- **상호작용 및 상태 관리 용이**:
    - 부모 컴포넌트가 자식 컴포넌트의 상태와 행동을 관리하면서, 자식 컴포넌트들은 독립적이고 재사용 가능하게 유지됨. 이렇게 하면 서로 간의 복잡한 의존성을 줄일 수 있음.
- **UI의 유연성 및 재사용성 향상**:
    - 자식 컴포넌트들을 여러 방식으로 조합하여 유연한 UI를 만들 수 있음. 컴포넌트들의 배치나 위치, 동작 등을 부모 컴포넌트에서 제어할 수 있기 때문에 다양한 변형이 가능하고, 재사용성이 높아짐.
- **간결한 코드 관리**:
    - 복잡한 UI를 여러 자식 컴포넌트로 나누어 캡슐화하고, 부모 컴포넌트에서 이를 제어하면서도, 각 자식은 독립적으로 관리되어 코드가 더 깔끔하고 유지보수하기 쉬워짐.
- **구성 요소 간 의존성 최소화**:
    - 컴파운드 컴포넌트는 자식들끼리의 의존성을 최소화하고, 부모 컴포넌트에서 필요한 조합을 설정함으로써 각 컴포넌트가 자신의 역할에 집중할 수 있게 만듦.

## 📌 예제 코드

https://github.com/user-attachments/assets/13da4723-40b4-4330-9a7e-3f86af9136de

```jsx
// App.jsx

import Accordion from "./components/Accordion";

function App() {
  return (
    <Accordion className="accordion">
      <Accordion.Item id="item1" className="accordion-item">
        <Accordion.Title className="accordion-title">Title 1</Accordion.Title>
        <Accordion.Content className="accordion-content">
          Content 1
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="item2" className="accordion-item">
        <Accordion.Title className="accordion-title">Title 2</Accordion.Title>
        <Accordion.Content className="accordion-content">
          Content 2
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

export default App;

```

```jsx
// Accordion.jsx

import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

// 🔔 Context API를 활용한 상태 공유
const AccordionContext = createContext();

export function useAccordionContext() {
	// 🔔 Context 값 가져오기
  const ctx = useContext(AccordionContext);

	// 🔔 Accordion 컴포넌트 내부가 아닌 곳에서 Accordion.Item이나 Accordion.Title이나 Accordion.Content를 사용하면 오류를 던짐.
  if (!ctx) {
    throw new Error(
      "Accordion 관련 컴포넌트는 <Accordion>으로 감싸져야 합니다."
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  // 🌴 상태 관리
  const [openItemId, setOpenItemId] = useState(null);

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = { openItemId, toggleItem };

  return (
	  // 🔔 Context Provider로 하위 컴포넌트들에게 상태 전달
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

// Compound Component 패턴 적용을 위해 Accordion 컴포넌트에 하위 컴포넌트를 속성으로 추가
// 👉 Accordion이라는 루트 컴포넌트 아래에서만 사용하도록 강제할 수 있음.
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
```

```jsx
// AccordionItem.jsx

import { createContext, useContext } from "react";

// 🚀 id를 하위 컴포넌트로 내려주기 위한 Context
const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      "Accordion.Title과 Accordion.Content는 Accordion.Item 내부에서 사용해야 합니다."
    );
  }
  return ctx;
}

export default function AccordionItem({ id, className, children }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}

```

```jsx
// AccordionTitle.jsx

import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({ className, children }) {
  const { toggleItem } = useAccordionContext();
  const id = useAccordionItemContext(); // 🚀 id를 컨텍스트에서 가져오기

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}

```

```jsx
// AccordionContent.jsx

import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionContent({ className, children }) {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext(); // 🚀 id를 컨텍스트에서 가져오기

  const isOpen = openItemId === id;

  return (
    <div className={`${className} ${isOpen ? "open" : "hidden"}`}>
      {isOpen && children}
    </div>
  );
}

```
