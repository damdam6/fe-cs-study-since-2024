# Vanilla Extract CSS : CSS 변수 정의 방식

Vanilla Extract CSS를 사용할 때, `sprinkles`와 `vars`는 스타일을 정의하고 적용하는 데 중요한 역할을 한다. 둘 다 스타일링에 있어서 유연성과 재사용성을 제공하지만, 사용 목적과 방식에 차이가 있다.

## `vars` (Variables), `sprinkles` 개념

### `vars` (Variables)

`vars`는 CSS 변수를 정의하는 방식으로, Vanilla Extract에서 테마, 색상, 공간, 폰트 크기 등의 디자인 토큰을 관리할 수 있다. 이 변수들은 전역적으로 또는 특정 컴포넌트 내에서 참조될 수 있어 일관된 스타일링을 유지하는 데 도움을 준다.

#### 예시

```tsx
import { createGlobalTheme } from "@vanilla-extract/css";

const vars = createGlobalTheme(":root", {
  colors: {
    blue: "#007bff",
    white: "#ffffff",
    // 추가 색상 정의...
  },
  // 다른 디자인 토큰 정의...
});
```

### `sprinkles`

`sprinkles`는 Vanilla Extract에서 제공하는 기능으로, 공통적으로 사용되는 CSS 속성들을 추상화한 함수를 생성한다. 이 함수를 사용하면 개발자는 반복적으로 작성해야 하는 스타일 패턴을 간소화할 수 있으며, 타입 안전성을 보장받으면서 스타일을 적용할 수 있다. `sprinkles`는 주로 마진, 패딩, 정렬과 같은 레이아웃 관련 속성이나, 텍스트 크기, 색상 같은 간단한 시각적 속성을 빠르게 적용하는 데 사용된다.

#### 예시

```tsx
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const layoutProperties = defineProperties({
  properties: {
    display: ["none", "flex", "block"],
    flexDirection: ["row", "column"],
    // 추가 속성 정의...
  },
  // 다른 스타일 속성 정의...
});

const sprinkles = createSprinkles(layoutProperties);
```

<br>
<br>

## `vars` (Variables), `sprinkles` 차이점

### 1️⃣ **목적과 사용법**

`vars`는 스타일 변수를 정의하고 관리하는 데 사용되며, 전역적으로 또는 컴포넌트 스코프 내에서 일관된 디자인 값을 제공한다. 반면, `sprinkles`는 반복되는 스타일 패턴을 함수로 추상화하여 스타일을 더 효율적으로 적용할 수 있게 해주는 도구이다.

### 2️⃣ **재사용성**

`vars`와 `sprinkles` 모두 재사용성을 목적으로 하지만, `vars`는 디자인 시스템 내의 변수들(색상, 폰트 사이즈 등)을 관리하는 반면, `sprinkles`는 공통 스타일 패턴을 빠르게 적용하기 위한 함수를 생성한다.
<br>

### 3️⃣ **타입 안전성**

두 도구 모두 타입스크립트와의 통합을 통해 타입 안전성을 제공하지만, `sprinkles`는 스타일 속성과 값에 대한 자동 완성과 타입 체크를 더욱 강화하여 제공한다.

<br>
<br>

## `vars`와 `sprinkles` 활용 방안

### `vars` 활용

#### ✅ **테마 관리**

`vars`를 이용하여 테마별 색상, 폰트 크기, 간격 등을 정의하고, 이를 전역적으로 또는 특정 컴포넌트에 적용할 수 있다. 이렇게 함으로써 디자인 시스템의 일관성을 유지하고 필요에 따라 쉽게 테마를 변경할 수 있다.
<br>
예를 들어, 다크 모드와 라이트 모드를 지원하는 경우, 각 모드에 맞는 색상 변수를 정의하고, 사용자 설정에 따라 이를 동적으로 변경할 수 있다.

```tsx
const vars = createGlobalTheme(":root", {
  colors: {
    light: {
      background: "#ffffff",
      text: "#000000",
    },
    dark: {
      background: "#000000",
      text: "#ffffff",
    },
  },
});
```

- **createGlobalTheme 함수**: 이 함수는 전역적으로 사용할 CSS 변수를 정의한다. `:root`는 CSS의 최상위 요소를 의미하며, 여기서 정의된 변수는 애플리케이션의 모든 부분에서 사용할 수 있다.

- **색상 변수 정의**
  - colors: 색상 관련 변수 정의
  - light: 라이트 모드에 사용할 색상 그룹
    - background: 라이트 모드의 배경색을 흰색으로 설정
    - text: 라이트 모드의 텍스트 색상을 검은색으로 설정
  - dark: 다크 모드에 사용할 색상 그룹
    - background: 다크 모드의 배경색을 검은색으로 설정
    - text: 다크 모드의 텍스트 색상을 흰색으로 설정

##### 테마 사용 예시

```tsx
import React, { useState } from "react";
import { vars } from "./vars.css"; // 위에서 정의한 vars 파일을 가져옵니다.

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 테마에 따라 클래스 이름을 설정합니다.
  const currentTheme = isDarkMode ? vars.colors.dark : vars.colors.light;

  return (
    <div
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
    >
      <h1>테마 변경 예시</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </button>
    </div>
  );
};

export default App;
```

> useState 훅을 사용하여 `isDarkMode`라는 상태 변수를 생성하고, 이 변수를 통해 현재 모드가 다크 모드인지 라이트 모드인지를 관리한다.

> **`currentTheme` 변수는 isDarkMode의 값에 따라 다르게 설정**된다. 다크 모드일 경우 `vars.colors.dark`를 사용하고, 라이트 모드일 경우 `vars.colors.light`를 사용한다.

<br>

#### ✅ **디자인 토큰의 중앙 관리**

디자인 토큰(디자인에서 재사용되는 모든 값들)을 `vars`를 통해 중앙에서 관리함으로써, 디자인의 일관성을 보장하고, 변경 사항이 있을 때 쉽게 업데이트할 수 있다.

```ts
// tokens.css.ts
// 디자인 토큰을 정의하는 파일 - 애플리케이션의 스타일을 중앙에서 관리하는 역할
import { createGlobalTheme } from "@vanilla-extract/css";

const vars = createGlobalTheme(":root", {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
    text: "#333333",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  fontSizes: {
    small: "12px",
    medium: "16px",
    large: "24px",
  },
});

export { vars };
```

- **디자인 토큰 정의** : 위 코드에서 createGlobalTheme 함수를 사용하여 CSS 변수를 정의한다. colors, spacing, fontSizes와 같은 키를 사용하여 각각의 디자인 요소를 그룹화한다.
  - `colors`: 애플리케이션에서 사용할 색상을 정의한다.
  - `spacing`: 마진과 패딩에 사용할 간격을 정의한다.
  - `fontSizes`: 텍스트의 크기를 정의합니다.
- **전역 접근 가능**: `:root`를 사용하여 정의한 변수는 애플리케이션의 어디에서든 접근할 수 있다. 이렇게 하면 동일한 색상이나 간격을 여러 컴포넌트에서 일관되게 사용할 수 있다.

##### 컴포넌트에서 사용 예시

```tsx
// Button.tsx
import React from "react";
import { style } from "@vanilla-extract/css";
import { vars } from "./tokens.css";

const buttonStyle = style({
  backgroundColor: vars.colors.primary,
  color: vars.colors.background,
  padding: `${vars.spacing.medium} ${vars.spacing.large}`,
  fontSize: vars.fontSizes.medium,
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",

  ":hover": {
    backgroundColor: vars.colors.secondary,
  },
});

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <button className={buttonStyle}>{children}</button>;
};

export default Button;
```

- **스타일 적용**: buttonStyle 변수를 사용하여 버튼의 스타일을 정의. 여기서 vars를 통해 중앙에서 관리하는 디자인 토큰을 사용한다. backgroundColor, color, padding, fontSize 등을 vars에서 가져와서 사용할 수 있다.

- **호버 효과**: 버튼에 마우스를 올렸을 때 색상이 바뀌는 효과를 추가하는데, 이 효과에서 vars를 사용하여 색상을 변경한다.

<br>
<br>

### `sprinkles` 활용

#### ✅ **반복 스타일의 간소화**

공통 컴포넌트의 스타일을 `sprinkles`로 정의하여 재사용성을 높이고 의도치 않은 스타일 오류를 방지할 수 있다. 예를 들어, 버튼 스타일을 정의한 후, 여러 버튼 컴포넌트에서 이를 호출하여 사용할 수 있다.

```ts
// sprinkles.css.ts
// 공통 스타일을 정의하는 파일
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./tokens.css"; // 디자인 토큰을 가져옵니다.

const layoutProperties = defineProperties({
  properties: {
    padding: ["small", "medium", "large"],
    backgroundColor: [vars.colors.primary, vars.colors.secondary],
    color: [vars.colors.background, vars.colors.text],
    borderRadius: ["small", "medium", "large"],
  },
});

const sprinkles = createSprinkles(layoutProperties);

export { sprinkles };
```

- `defineProperties`: defineProperties 함수를 사용하여 스타일 속성을 정의한다. 여기서 버튼에 사용될 padding, backgroundColor, color, borderRadius 등의 속성을 설정한다.
- `createSprinkles`: 정의한 속성들을 기반으로 sprinkles 함수를 생성하며, 이 함수는 나중에 스타일을 적용할 때 사용된다.

##### 버튼 컴포넌트에서 사용 예시

```tsx
// Button.tsx
import React from "react";
import { sprinkles } from "./sprinkles.css";

const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}> = ({ children, variant = "primary" }) => {
  const buttonStyle = sprinkles({
    padding: "medium",
    backgroundColor:
      variant === "primary" ? vars.colors.primary : vars.colors.secondary,
    color: vars.colors.background,
    borderRadius: "small",
  });

  return <button className={buttonStyle}>{children}</button>;
};

export default Button;
```

- `variant` 속성: 버튼의 스타일을 선택하기 위해 variant라는 선택적 속성을 추가했으며, primary 또는 secondary로 버튼의 색상을 다르게 설정할 수 있다.
- 스타일 적용: sprinkles 함수를 사용하여 버튼 스타일을 정의한다. padding, backgroundColor, color, borderRadius를 설정하여 일관된 스타일을 유지할 수 있다.

##### 버튼 사용 예시

```tsx
// App.tsx
import React from "react";
import Button from "./Button";

const App: React.FC = () => {
  return (
    <div>
      <h1>버튼 예시</h1>
      <Button variant="primary">기본 버튼</Button>
      <Button variant="secondary">보조 버튼</Button>
    </div>
  );
};

export default App;
```

<br>

#### ✅ **빠른 스타일 프로토타이핑**

`sprinkles`를 사용하여 다양한 스타일 옵션을 조합해 빠르게 프로토타이핑을 하면서 어떤 스타일이 가장 적합한지를 실험할 수 있다. 이 과정에서 CSS 속성을 함수 인자로 전달함으로써 복잡한 스타일링도 간편하게 구현할 수 있다.

```tsx
// ButtonWithIcon.tsx
import React from "react";
import { sprinkles } from "./sprinkles.css";
import { vars } from "./tokens.css";

const ButtonWithIcon: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
  padding?: "small" | "medium" | "large";
  backgroundColor?: keyof typeof vars.colors;
}> = ({ icon, children, padding = "medium", backgroundColor = "primary" }) => {
  const buttonStyle = sprinkles({
    padding: padding, // padding 속성을 props로 받아서 사용
    backgroundColor: vars.colors[backgroundColor], // backgroundColor 속성을 props로 받아서 사용
    color: vars.colors.background,
    borderRadius: "small",
  });

  return (
    <button className={buttonStyle}>
      {icon}
      {children}
    </button>
  );
};

export default ButtonWithIcon;
```

- **padding 및 backgroundColor 속성**: ButtonWithIcon 컴포넌트에 padding과 backgroundColor라는 두 개의 새로운 props를 추가했다. 이를 통해 **버튼의 패딩과 배경 색상을 외부에서 쉽게 조정**할 수 있다.
- **기본값 설정**: `padding`의 기본값은 'medium', `backgroundColor`의 기본값은 'primary'로 설정하여, 사용자가 별도로 값을 지정하지 않을 경우에도 적절한 스타일을 갖도록 했다.

<br>

이와 같이 sprinkles를 사용하여 버튼의 스타일을 정의함으로써 다른 컴포넌트와 일관된 스타일을 유지할 수 있다. 이렇게 하면 스타일이 중복되지 않고 변경 사항이 있을 경우 한 곳에서만 수정하면 된다.

##### ButtonWithIcon 사용 예시

```tsx
// App.tsx
import React from "react";
import ButtonWithIcon from "./ButtonWithIcon";

const App: React.FC = () => {
  return (
    <div>
      <h1>버튼 스타일 프로토타이핑</h1>

      {/* 기본 버튼 */}
      <ButtonWithIcon
        icon={<span>🔵</span>}
        padding="medium"
        backgroundColor="primary"
      >
        기본 버튼
      </ButtonWithIcon>

      {/* 작은 패딩의 보조 버튼 */}
      <ButtonWithIcon
        icon={<span>⚪</span>}
        padding="small"
        backgroundColor="secondary"
      >
        작은 보조 버튼
      </ButtonWithIcon>

      {/* 큰 패딩의 경고 버튼 */}
      <ButtonWithIcon
        icon={<span>⚠️</span>}
        padding="large"
        backgroundColor="warning"
      >
        큰 경고 버튼
      </ButtonWithIcon>

      {/* 기본 패딩의 경고 버튼 */}
      <ButtonWithIcon
        icon={<span>⚠️</span>}
        padding="medium"
        backgroundColor="warning"
      >
        기본 경고 버튼
      </ButtonWithIcon>
    </div>
  );
};

export default App;
```

위와 같이 버튼을 다양한 스타일로 설정함으로써 개발자는 즉시 결과를 확인할 수 있다. 변경된 스타일이 어떻게 나타나는지를 즉시 볼 수 있기 때문에 디자인 프로세스가 매우 빠르고 유연해진다. 또한, 이러한 접근 방식은 개발자가 다양한 디자인 옵션을 빠르게 시험해보게 하여 최적의 스타일을 찾는 데 드는 시간을 줄일 수 있다.

<br>
<br>

---

### 결론

`vars`와 `sprinkles`는 Vanilla Extract를 사용하는 프로젝트에서 각기 다른 방식으로 스타일링의 효율성과 일관성을 높이는 데 기여한다. `vars`를 통해 프로젝트 전반에 걸쳐 사용될 디자인 토큰을 관리하고, `sprinkles`로는 반복되는 스타일 패턴을 간편하게 적용할 수 있다.
