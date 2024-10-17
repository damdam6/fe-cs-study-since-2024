# 사용자 지정 속성 (CSS Variable)

## 1. 사용자 지정 속성이란?

### 1) 사용자 지정 속성의 개념

CSS를 작성하는 자가 정의하는 개체로, 문서 전반적으로 재사용할 임의의 값을 담는다. 사용자 지정 속성은 전용 표기법을 사용해 정의한다.

<br>

### 2) 사용자 지정 속성을 사용하는 이유

- 복잡한 웹 사이트는 어마어마한 양의 CSS를 가지고 있는데, 종종 많은 값을 반복적으로 사용한다. 이때에 사용자 지정 속성을 사용하면 한 영역에 값을 저장해놓고 다른 여러 곳에서 참조 해갈 수 있다.

  > 예를 들어, 수백 곳의 서로 다른 위치에서 같은 색상을 사용한다면, 그 색을 바꿔야 할 상황이 왔을 때 대규모 전역 검색 바꾸기를 피할 수 없다. 이럴 때 사용자 지정 속성을 사용하여 효율적으로 스타일링 할 수 있다.

- 두번째 이유로는 의미를 가지는 식별자를 사용한다는 것이다. 특히 같은 색을 다른 맥락에서 사용할 때 이 장점이 도드라진다.

<br>
<br>

## 2. 사용자 지정 방법

1️⃣ **CSS 변수를 생성한다.**

```css
--css-variable-name: css property value;

:root {
  --main-bg-color: #000080;
  --main-text-color: #fff;
}
```

2️⃣ **생성한 CSS 변수를 사용한다. (var() 이용)**

```css
cssproperty: var(--css-variable-name) body {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}
```

<br>
<br>

## 3. 사용자 지정 재정의하기 (Overriding)

-- CSS 변수가 페이지의 특정 섹션에서만 변경되기를 원할 때

버튼 요소에 대해 다른 색상의 파란색을 원한다고 가정해보자. 그 다음 버튼 selector 내부에 `--blue` 변수를 다시 선언할 수 있다. 이 선택기 내부에서 `var(--blue)`를 사용하면 여기에 선언된 로컬 `--blue` 변수 값을 사용한다.

지역 `--blue` 변수가 버튼 요소에 대한 전역 `--blue` 변수를 재정의한다는 것을 알 수 있다.

```css
:root {
  --blue: #1e90ff;
  --white: #ffffff;
}

body {
  background-color: var(--blue);
}

h2 {
  border-bottom: 2px solid var(--blue);
}

.container {
  color: var(--blue);
  backgrounf-color: var(--white);
  padding: 15px;
}

button {
  --blue: #0000ff;
  background-color: var(--white);
  color: var(--blue);
  border: 1px solid var(--blue);
  padding: 5px;
}
```

<br>
<br>

## 4. JavaScript 로 변수 변경

CSS 변수는 DOM에 액세스할 수 있으므로 JavaScript로 변수를 변경할 수 있다.

```jsx
// 인라인 스타일에서 변수 얻기
element.style.getPropertyValue("-my-var");

// 어느 곳에서나 변수 얻기
getComputeStyle(element).getPropertyValue("--my-var");

// 인라인 스타일에 변수 설정하기
element.style.setProperty("--my-var", jsVar + 4);
```

---

이를 토대로 CSS를 활용한 다크모드, 라이트모드 테마를 설정할 수 있다.

<br>

## 다크 모드 구현 예제 코드

**script.js**

```javascript
const toggleThemeBtn = document.querySelector(".header-theme-btn");

document.onload = setInitialTheme(localStorage.getItem("theme"));
function setInitialTheme(themeKey) {
  if (themeKey === "dark") {
    document.documentElement.classList.add("darkTheme");
  } else {
    document.documentElement.classList.remove("darkTheme");
  }
}

toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("darkTheme");

  if (document.documentElement.classList.contains("darkTheme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
```

> mode 에 대한 theme 를 javascript 로 코드를 작성하여 css와 html을 제어한다.

<br>

**general.css**

```css
:root {
  --primary: #ffffff;
  --secondary: #fafafa;
  --border: #dbdbdb;

  --story-border: #c7c7c7;

  --text-dark: #262626;
  --text-light: #999999;
}

:root.darkTheme {
  --primary: #000000;
  --secondary: #050505;
  --border: #262626;

  --story-border: #707070;

  --text-dark: #fafafa;
  --text-light: #999999;
}
```

> 가장 최상위 CSS 파일, 공통으로 쓰이는 CSS 파일에 두가지의 테마를 설정한다. 변수명을 일치시키면 하나의 요소에 대한 스타일링을 두번씩 할 필요가 없다.

> 여기서 `:root`는 가상 클래스로 html 문서의 최상위 요소를 가리킨다. 즉, root는 항상 html을 가리킨다. root의 스타일 적용 우선순위가 html보다 높다.

<br>

**header.css**

```css
/* 공통으로 적용되는 스타일으로 위에서 변수에 대한 값을 따로 선언해줬으므로, 여기서는 한번만 코드를 작성한다. */
.header {
  width: 100%;
  height: 44px;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  border-bottom: 1px solid var(--border);
}

/* Dark Mode Theme -- 다크모드에만 따로 적용하고 싶은 게 있으면 이렇게 하면 됨*/

.header-theme-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.header-theme-btn-sun {
  display: none;
}

.header-theme-btn-moon {
  display: unset;
}

:root.darkTheme .header-theme-btn-sun {
  display: unset;
}

:root.darkTheme .header-theme-btn-moon {
  display: none;
}
```

[❤️ 민돌멩이가 구현한 인스타그램 클론코딩 - 다크모드 구경하러가기](https://github.com/dolmeengii/goorm_deepdive/tree/442dfb507c098efa316925591a4d33c5dcbc53c1/instagram)
