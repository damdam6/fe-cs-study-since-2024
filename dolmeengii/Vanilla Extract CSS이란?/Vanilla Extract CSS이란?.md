# Vanilla Extract CSS란?

## Vanilla Extract CSS 개요

Vanilla Extract CSS는 타입스크립트를 기반으로 한 스타일링 솔루션으로, CSS-in-JS의 장점을 활용하면서도 런타임 성능 문제를 해결하는 데 중점을 둔다. 이 기술은 정적 CSS 파일을 생성하여 성능을 최적화하고, 타입 안전성을 제공하는 것이 특징이다.

> 🩵 **Vanilla Extract CSS 특징에 따른 장점** <br>
>
> - **성능 최적화**
>   > Vanilla Extract는 런타임에서 CSS를 생성하지 않고, 빌드 타임에 모든 스타일을 정적으로 생성하는 `Zero-runtime CSS`이다. 페이지 로딩 속도를 개선하고, 성능을 최적화하는 데 큰 도움이 된다.
> - **타입 안전성**
>   > Vanilla Extract는 타입스크립트를 사용하여 스타일을 정의함으로써 코드의 안정성을 높이고, 개발 중 발생할 수 있는 오류를 사전에 방지할 수 있다.
> - **유지보수성**
>   > 로컬 스코프와 CSS 변수를 통해 스타일 충돌을 방지하고, 쉽게 관리할 수 있다.

<br>
<br>

### Vanilla Extract CSS 특징

#### 1. 타입스크립트 기반

Vanilla Extract는 타입스크립트를 사용하여 스타일을 정의한다. 타입스크립트의 정적 타입 시스템을 활용함으로써, 개발자는 스타일을 작성할 때 타입 안전성을 보장받을 수 있다. 이는 코드 작성 중 발생할 수 있는 오류를 사전에 방지하고, IDE의 자동 완성 기능을 통해 개발 효율성을 높인다.

```typescript
import { style } from "@vanilla-extract/css";

const buttonStyle = style({
  backgroundColor: "blue",
  color: "white",
  padding: "10px",
});

// 타입스크립트의 타입 안전성을 활용하여 스타일을 정의
const button: HTMLButtonElement = document.createElement("button");
button.className = buttonStyle;
button.textContent = "Click Me";
document.body.appendChild(button);
```

<br>

#### 2. 정적 CSS 생성

Vanilla Extract는 빌드 타임에 정적 CSS 파일을 생성한다. 이는 런타임에 CSS를 생성하는 기존의 CSS-in-JS 접근 방식과는 다르다. 정적 파일을 사용함으로써 페이지 로딩 속도를 개선하고, 성능을 최적화할 수 있다. 이 방식은 특히 대규모 애플리케이션에서 유리하다.

```typescript
import { style } from "@vanilla-extract/css";

const containerStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

// 빌드 시 정적 CSS 파일로 변환되어 최적화된 결과를 제공
const container = document.createElement("div");
container.className = containerStyle;
document.body.appendChild(container);
```

<br>

#### 3. 로컬 스코프

Vanilla Extract는 클래스 이름을 로컬 스코프에서 생성한다. 이는 스타일 충돌을 방지하고, 더 나은 유지보수성을 제공한다. 각 스타일은 고유한 이름으로 변환되어, 다른 컴포넌트의 스타일과 격리된다.

```typescript
import { style } from "@vanilla-extract/css";

const headerStyle = style({
  backgroundColor: "lightblue",
  padding: "20px",
});

const footerStyle = style({
  backgroundColor: "lightgreen",
  padding: "10px",
});

// 서로 다른 스타일이 로컬 스코프에서 생성되어 충돌이 없음
const header = document.createElement("header");
header.className = headerStyle;
header.textContent = "Header";

const footer = document.createElement("footer");
footer.className = footerStyle;
footer.textContent = "Footer";

document.body.appendChild(header);
document.body.appendChild(footer);
```

<br>

#### 4. CSS 변수 지원

Vanilla Extract는 CSS 변수를 사용하여 동적인 스타일링을 지원한다. 이를 통해 테마 변경이나 스타일 조정이 용이해진다. CSS 변수를 활용하면, 런타임에 스타일을 동적으로 변경할 수 있는 유연성을 제공한다.

```typescript
import { createTheme, style } from "@vanilla-extract/css";

const [themeClass, vars] = createTheme({
  color: {
    primary: "blue",
    secondary: "green",
  },
});

const buttonStyle = style({
  backgroundColor: vars.color.primary,
  color: "white",
  padding: "10px",
});

// 테마에 따라 버튼의 배경색이 동적으로 변경됨
const button = document.createElement("button");
button.className = buttonStyle;
button.textContent = "Themed Button";
document.body.appendChild(button);

// 테마 변경 예시
document.body.classList.add(themeClass);
```

<br>
<br>

Vanilla Extract CSS는 타입스크립트를 기반으로 하여 정적 CSS 파일을 생성하고, 로컬 스코프와 CSS 변수 지원을 통해 스타일링의 유연성과 유지보수성을 높인다. 이러한 특징들은 특히 대규모 애플리케이션에서 성능과 개발 효율성을 극대화한다. 각 특징을 활용하여 개발자는 더 나은 사용자 경험을 제공할 수 있다.

---

## 참고) Vanilla Extrac CSS 설치하기

Vanilla Extract를 사용하기 위해서는 먼저 패키지를 설치해야 한다. npm 또는 yarn을 통해 설치할 수 있다. 여기서는 npm 을 기준으로 설명한다.

#### 1. 명령어 입력하여 설치하기

```bash
npm install @vanilla-extract/css
```

<br>

#### 2. 스타일 작성하기

타입스크립트 파일에서 스타일을 정의한다.

```typescript
import { style } from "@vanilla-extract/css";

export const button = style({
  backgroundColor: "blue",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
});
```

<br>

#### 3. 스타일 적용하기

생성된 클래스를 컴포넌트에 적용한다.

```typescript
import { button } from "./styles.css";

function App() {
  return <button className={button}>Click Me</button>;
}
```

<br>

#### 4. 빌드

빌드 프로세스에서 Vanilla Extract가 정적 CSS 파일을 생성한다.

---

#### Vanilla Extract CSS를 사용한 프로젝트 보러 가기

[NoColored - FE Repository](https://github.com/NoColored/NoColored-fe)
