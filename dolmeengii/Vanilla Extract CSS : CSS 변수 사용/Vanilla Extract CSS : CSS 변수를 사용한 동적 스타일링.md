# Vanilla Extract CSS : CSS 변수를 사용한 동적 스타일링

Vanilla Extract CSS는 CSS-in-JS 라이브러리 중 하나로, 타입스크립트와 함께 사용될 때 강력한 타이핑과 코드 완성 기능을 제공한다. 이 라이브러리는 `theme`, `sprinkles`, `recipe` 같은 개념을 통해 스타일을 선언적이고 모듈화된 방식으로 관리할 수 있게 도와준다.

`theme`, `sprinkles`, `recipe`는 모두 스타일링을 위해 설계되었지만, 사용 목적과 적용 방식에서 차이가 있다. 각각의 용도와 차이점을 자세히 살펴보자.

## Theme

`theme`는 Vanilla Extract CSS에서 스타일링에 사용되는 변수의 모음이다. 이를 통해 색상, 글꼴, 간격과 같은 디자인 토큰을 정의하고 이를 전체 애플리케이션에 걸쳐 일관되게 사용할 수 있다. `theme`를 사용하면 테마별 스타일링(예: 어두운 모드와 밝은 모드)을 쉽게 구현하고, 디자인 시스템을 효율적으로 관리할 수 있다.

```tsx
// themes.css.ts
import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    primary: "#0070f3",
    secondary: "#ff4081",
  },
  space: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
});
```

### Theme 사용 목적과 차이점

- **사용 목적**
  - **디자인 시스템 구축**: 전체 애플리케이션에 걸쳐 일관된 디자인을 유지하기 위해, 색상, 글꼴 크기, 간격 등의 기본 스타일 값을 정의하고 사용한다.
    ```tsx
    // 예시: 버튼 컴포넌트에서 theme 사용
    import { vars } from "./themes.css";

    const Button = () => (
      <button
        style={{
          backgroundColor: vars.color.primary,
          padding: vars.space.medium,
        }}
      >
        클릭하세요
      </button>
    );
    ```
  - **테마별 스타일링**: 사용자의 시스템 테마(예: 어두운 모드, 밝은 모드)에 맞추어 자동으로 스타일을 전환할 때 사용한다.
    ```tsx
    // 예시: 어두운 모드와 밝은 모드 전환
    const theme = isDarkMode ? darkTheme : lightTheme;
    document.body.className = themeClass;
    ```
  - **디자인 토큰 관리**: 디자인 팀과 개발 팀 간의 커뮤니케이션을 용이하게 하기 위해, 디자인 토큰을 코드로 관리한다.
    ```tsx
    // 예시: 디자인 토큰 사용
    const textStyle = {
      color: vars.color.secondary,
      margin: vars.space.small,
    };
    ```
- **차이점:** 다른 스타일링 방식과 비교했을 때, `theme`는 주로 정적인 값에 사용되며, 애플리케이션 전반에 걸쳐 일관성을 유지하는 데 초점을 맞춘다. 밝은 테마와 어두운 테마 전환 같은 기능을 구현할 때 유용하다.

<br>

## Sprinkles

`sprinkles` 는 Vanilla Extract의 유틸리티 함수 생성 도구로, 이를 사용하면 반응형 디자인, 상태에 따른 스타일 변화 등을 처리할 수 있는 CSS 유틸리티 클래스를 생성할 수 있다. 예를 들어, 마진, 패딩, 색상 등의 스타일 속성에 대한 유틸리티 클래스를 생성하고, 이러한 클래스를 조합하여 다양한 디자인 요구사항을 신속하게 충족시킬 수 있다.

```tsx
// sprinkles.css.ts
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./themes.css"; // theme에서 정의한 vars 가져오기

const properties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  properties: {
    display: ["none", "block", "flex"],
    flexDirection: ["row", "column"],
    justifyContent: ["flex-start", "center", "flex-end"],
    padding: vars.space,
  },
});

export const sprinkles = createSprinkles(properties);
```

### Sprinkles 사용 목적과 차이점

- **사용 목적:** `sprinkles`는 원자적 스타일링 방식을 지원하기 위해 사용된다. 반응형 디자인, 공간 배치(padding, margin), 디스플레이 타입 등을 쉽고 빠르게 적용할 수 있다.
  - **유틸리티 클래스 생성**: 마진, 패딩, 포지셔닝 등 자주 사용되는 CSS 속성에 대한 유틸리티 클래스를 생성하여, 효율적인 스타일링을 지원한다.
    ```tsx
    // 예시: 유틸리티 클래스 사용
    import { sprinkles } from "./sprinkles.css";

    const Box = () => (
      <div className={sprinkles({ padding: "medium", display: "flex" })}>
        내용
      </div>
    );
    ```
  - **반응형 디자인**: 다양한 화면 크기에 따른 스타일 변화를 쉽게 관리하기 위해, 미디어 쿼리 기반의 유틸리티 클래스를 생성한다.
    ```tsx
    // 예시: 반응형 스타일 적용
    const ResponsiveBox = () => (
      <div
        className={sprinkles({
          padding: "small",
          display: "block",
          conditions: { mobile: true, tablet: true },
        })}
      >
        반응형 내용
      </div>
    );
    ```
  - **빠른 프로토타이핑**: 스타일링에 필요한 클래스를 미리 정의해두고, 이를 조합함으로써 빠르게 프로토타입을 제작할 수 있다.
    ```tsx
    // 예시: 여러 유틸리티 클래스 조합
    const PrototypeComponent = () => (
      <div
        className={sprinkles({
          padding: "large",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        프로토타입 내용
      </div>
    );
    ```

**차이점:** `theme`나 `recipe`와 달리, `sprinkles`는 더 동적이고 세밀한 조정이 가능하다. **조건부 스타일링(예: 미디어 쿼리를 통한 반응형 디자인)에 특히 유용**하며, 스타일링을 위한 유틸리티 클래스를 생성한다. 타입스크립트와의 결합을 통해 타입 안전성을 보장받으며, 스타일 오류를 줄일 수 있다.

<br>

## Recipe

`recipe`는 Vanilla Extract에서 컴포넌트의 변형(variants)과 구성(compositions)을 관리하는 방법이다. Recipe를 사용하면 컴포넌트의 다양한 스타일 변형을 정의할 수 있고, 이를 조합하여 복잡한 스타일을 쉽게 구성할 수 있다. 예를 들어, 버튼 컴포넌트에 대해 '크기', '색상', '상태' 등의 변형을 정의하고, 이를 조합하여 여러 스타일의 버튼을 생성할 수 있다.

```tsx
// button.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const buttonRecipe = recipe({
  base: {
    // 기본 스타일
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: { fontSize: "12px" },
      medium: { fontSize: "16px" },
      large: { fontSize: "20px" },
    },
    color: {
      primary: { backgroundColor: "#0070f3", color: "#fff" },
      secondary: { backgroundColor: "#ff4081", color: "#fff" },
    },
    state: {
      disabled: { opacity: 0.5, cursor: "not-allowed" },
    },
  },
});
```

### Recipe 사용 목적과 차이점

- **사용 목적:** `recipe`는 복잡한 컴포넌트 스타일링을 위해 설계되었다.
  - **컴포넌트 스타일 변형 관리**: 하나의 컴포넌트에 여러 스타일 변형(예: 버튼의 크기, 색상 등)을 적용할 때 사용한다.

    ```tsx
    // 예시: 버튼 컴포넌트에서 recipe 사용
    import { buttonRecipe } from "./button.css";

    const Button = ({ size, color, state, children }) => (
      <button className={buttonRecipe({ size, color, state })}>
        {children}
      </button>
    );

    // 사용 예
    <Button size="medium" color="primary">
      기본 버튼
    </Button>;
    ```

  - **조건부 스타일링**: 컴포넌트의 상태(예: 활성화, 비활성화, 호버)에 따른 스타일 변화를 관리한다.
    ```tsx
    // 예시: 비활성화된 버튼
    <Button size="large" color="secondary" state="disabled">
      비활성화된 버튼
    </Button>
    ```
  - **스타일 조합**: 여러 스타일 속성을 조합하여 복잡한 컴포넌트 스타일을 쉽게 구성한다.
    ```tsx
    // 예시: 다양한 변형 조합
    <Button size="small" color="primary">작은 주 버튼</Button>
    <Button size="large" color="secondary">큰 부 버튼</Button>
    ```

**차이점:** `recipe`는 컴포넌트의 스타일링 로직을 캡슐화하고 재사용할 수 있도록 도와준다. `theme`의 정적인 값과 `sprinkles`의 유틸리티 클래스를 뛰어넘어, 컴포넌트의 상태나 속성에 따라 동적으로 스타일을 변경할 수 있는 복잡한 로직을 구현할 수 있다. 예를 들어, 버튼 컴포넌트에 대해 'small', 'medium', 'large' 같은 크기 변형이나 'primary', 'secondary' 같은 색상 변형을 쉽게 정의하고 관리할 수 있다.

<br>

---

## 요약

- **Theme**은 전체 애플리케이션의 일관된 스타일링을 위한 기본 변수의 집합이다.
- **Sprinkles**는 반복되는 스타일 패턴을 효율적으로 적용하기 위한 유틸리티 클래스 생성 도구이다.
- **Recipe**는 컴포넌트의 다양한 스타일 변형을 정의하고 관리하는 방법으로, 복잡한 스타일 조건을 쉽게 다룰 수 있다.

정리하자면 `theme`는 전역적인 디자인 시스템을 위한 기초를 제공하고, `sprinkles`는 빠르고 반응형인 스타일 적용을 위한 유틸리티를, `recipe`는 컴포넌트의 복잡한 스타일 변형과 로직을 관리하여, 유연한 스타일링을 가능하게 한다. 이 세가지 기능은 서로 보완적으로 작용하여, 타입스크립트 기반의 프로젝트에서 효율적이고 유지보수가 용이한 스타일 시스템을 구축하는 데 도움을 준다.
