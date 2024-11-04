# React로 프로젝트 만들기 2

## 0. 들어가며
저번주에 이어서 2편이다. 이번 주차에는 CSS 설정, TypeScript 설정, 환경 변수 설정, 최적화 및 번들링에 대해서 알아본다.

## 5. CSS 설정
1) 전통적인 CSS 파일 사용

가장 기본적인, 다른 CSS 라이브러리들을 사용하지 않고, 그냥 HTML이나 JSX에서 import 해서 사용하는 방식입니다. React 컴포넌트에서 CSS 파일을 import 해서 사용합니다.
```jsx
/* Button.css */
.primary-button {
    background-color: blue;
    color: white;
}


// Button.js
import './Button.css';

function Button() {
  return <button className="primary-button">Click me</button>;
}
export default Button;

```
장점으로는, 설정이 간단한 점. 단점으로는 CSS 클래스가 전역으로밖에 사용될 수 없어서, 클래스의 이름이 같다면 충돌이 발생할 수 있다. 또한 복잡한 스타일링이나 테마등을 관리하는데에 어려움이 존재한다.

위의 CSS 클래스가 전역으로 사용되는 것을 막기 위해, CSS 모듈을 만들어 local 스코프를 만들어 충돌을 방지하는 방법도 선택할 수 있다. 로컬 스코프로 만드는 방법은 간단한데, CSS 파일의 이름을 .module.css 확장자로 만들어 사용하는 것이다.

2) Sass (CSS 전처리기)
CSS 전처리기는 CSS에 변수, 중첩 규칙, 함수와 같은 기능을 추가하여, 더 구조화된 스타일링을 할 수 있도록 돕습니다.

```scss
// bash 를 통한 scss 설치
npm install bash

//scss
$primary-color: blue;

.primaryButton {
  background-color: $primary-color;
  color: white;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```
장점으로는 변수, 중첩등을 사용해 스타일 재사용성을 높이고 관리하기 쉽다. 그러나 전처리 과정이 필요하기에 빌드 시간이 다소 길어질 수 있다.

3) CSS-in-JS (Styled-components, Emotioin)
CSS-in-JS 는 JS 파일 내에서, CSS를 작성하고 적용하는 방식입니다. 이 방식은 React 컴포넌트와 스타일을 함께 정의할 수 있어서 컴포넌트 단위 스타일링이 쉬워지고, 동적인 스타일 적용도 가능합니다.

```jsx
// bash
npm install styled-components

// Button.js
import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: blue;
  color: white;
  &:hover {
    background-color: darkblue;
  }
`;

function Button() {
    return <PrimaryButton>Click me</PrimaryButton>;
}
export default Button;

```
장점으로는 스타일이 컴포넌트 내부에 정의되며 CSS 클래스 충돌이 방지된다. 그러나 JS와 CSS가 결합되어 파일 크기가 커질 수 있고, 성능에 영향이 미칠 수 있습니다.
4) Tailwind CSS
Tailwind 는 유틸리티 클래스만으로 구성된 CSS 프레임워크로, HTML 요소에 여러 유틸리티 클래스를 조합해 스타일을 적용한다. 커스터마이징이 쉽고 빠르게 스타일을 적용가능하다. 본인도 프로젝트를 진행하면서 학습 곡선이 가장 낮았기에 2번 선택했던 이력이 있음.
```jsx
// bash
npm install tailwindcss
npx tailwindcss init

// Button.js
function Button() {
    return <button className="bg-blue-500 text-white py-2 px-4 rounded">Click me</button>;
}
export default Button;
```
장점으로는 학습 곡선이 낮기에 빠르고 일관성 있는 스타일링이 가능하다. 커스터마이징도 가능함. 그러나 코드의 가독성이 너무 떨어지고, 세세한 커스터마이징이 아니라면 디자인에 한계를 맞게 될 수도 있다.

5) Vanilla-Extract-CSS, Linaria

위 CSS들은 최근에 나오게 된 CSS 라이브러리들이다. 먼저 Vanilla-Extract-CSS는 TS 기반의 CSS-in-JS 라이브러리로, CSS 파일로 최적화된 빌드 아웃풋을 생성한다. TS 지원으로 타입 안정성이 높고, CSS 파일로 빌드되어 성능이 좋고, 정적 파일 형태로 최적화된다.

Linaria 는 CSS-in-JS 라이브러리 중 성능에 초점을 맞춘 라이브러리이다. 런타임 오버헤드 없이 컴파일 시 CSS를 추출하여 빌드하며, 성능과 스타일링의 동적 기능을 모두 충족할 수 있다.

## 6. TypeScript 설정
TS 는 JS의 상위 언어로, 정적 타입 검사를 제공하여 개발 중 오류를 사전에 예방하고, 코드의 가독성과 유지 보수성을 높여준다. JS의 모든 기능을 포함하여 JS로 컴파일되며 100% 호환되는 모습을 보인다.

1) 설치
```bash
// 만약 CRA를 사용하여 TS를 설정한다면
npx create-react-app my-app --template typescript

// 기존 React 프로젝트에 TS를 추가한다면
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
// TS 컴파일러와 React 관련 타입 선언 파일을 설치함.
```

2) TS 설정 파일 (tsconfig.json) 생성
프로젝트 루트 디렉토리에 tsconfig.json 파일이 생성되어야 한다. 이 파일은 TS컴파일러의 옵션을 설정하는 역할을 함.
```json
//bash
npx tsc --init

//json의 형태의 tsconfig.json 파일의 예시
{
  "compilerOptions": {
    "target": "es6", //컴파일된 JS의 대상 버전을 지정
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true, // JS 파일을 TS 프로젝트에도 포함할 수 있게 함
    "skipLibCheck": true,
    "strict": true, // TS의 엄격한 타입 검사를 활성화하여 타입 안정성을 높임
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true, // CommonJS 모듈과의 호환성을 위해 default import 를 지원함
    "module": "esnext", // 모듈 시스템을 설정함
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx" // React JSX 를 사용할 수 있도록 설정함.
  },
  "include": ["src"]
```
TS를 통해 React 함수형 컴포넌트의 props 타입을 지정하거나, React의 상태와 이밴트 핸들러의 타입을 지정할 수 있다.
```typescript
// 함수형 컴포넌트
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// 상태와 이벤트 핸들러 타입 지정
const [count, setCount] = useState<number>(0);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked");
};
```

## 7. 환경 변수 설정
환경 변수는 애플리케이션이 실행되는 환경에 따라 달라질 수 있는 값들을 외부에서 관리할 수 있게 해주는 설정 파일이다. 환경 변수를 사용한다면 민감한 정보 (API 키, 데이터베이스 URL) 를 코드에 직접 하드코딩하지 않고, 배포 환경마다 다른 설정을 적용할 수 있다.

React 프로젝트에서 환경 변수는 .env 파일을 사용해 환경 변수를 설정하고 해당 값을 애플리케이션에서 읽어 사용할 수 있다.

프로젝트 루트 디렉토리에 .env 파일을 생성하고 해당 파일에 변수명과 값을 한 줄에 하나씩 작성한다. 일반적으로 개발, 테스트, 프로덕션 등 환경마다 다른 설정이 필요할 수 있다.

```plaintext
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=abcdef123456

// 아래의 여러 파일들을 만들어, 각 환경에 맞게 사용가능하도록 설정한다.
# .env.development
REACT_APP_API_URL=https://dev-api.example.com
REACT_APP_API_KEY=dev123

# .env.production
REACT_APP_API_URL=https://prod-api.example.com
REACT_APP_API_KEY=prod123
```
위에서 설정한 환경 변수는 process.env 객체를 통해 애플리케이션 코드에서 접근할 수 있다.
```js
// src/config.js
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export { API_URL, API_KEY };

// src/App.js
import React from 'react';
import { API_URL, API_KEY } from './config';

function App() {
    return (
        <div>
            <h1>API URL: {API_URL}</h1>
            <h1>API Key: {API_KEY}</h1>
        </div>
    );
}

export default App;
```

마지막으로 이 env 파일은 .gitignore 에 포함하여 버전 관리에서 제외하여야 한다. 민감한 정보가 포함되어 있기에 git 에 업로드하면 대 참사가 발생할 수도.

## 8. 번들링 및 최적화
번들링은 여러 개의 파일과 모듈을 하나의 파일로 압축하고 묶어주는 과정을 의미한다. React는 보통 여러 개의 모듈로 이루어져 있는데, 번들링을 통해 이를 한 파일 또는 몇 개의 큰 파일로 묶어 최적화 할 수 있다. 결과로, 네트워크 요청 수를 줄이고, 애플리케이션이 더 빠르게 로드되도록 한다. 이 번들링 도구로 Webpack과 Vite 등이 있다.

1) Webpack : 가장 널리 사용되는 번들링 도구로, 기본적인 설정 외에 다양한 플러그인과 로더를 통해 CSS, 이미지 파일 등도 번들링할 수 있다.
2) Vite : 최신 번들링 도구로 ES Modules 를 기반으로 빠른 개발 서버를 제공한다. 특히 HMR 기능으로 코드 변경 사항을 빠르게 반영해 개발 경험이 좋다고 함.

최적화에는 다양한 방법이 있다. 최적화는 프로젝트의 초기 설정보다는, 프로젝트를 완료하고 나서 리팩토링을 어떠한 방식으로 할 수 있는가에 대한 개념이다. 조금 많아서, 중요해보이는걸 짧게 설명하고자 함.
1) 코드 스플리팅 : 애플리케이션의 코드를 여러 청크로 나누어 필요할 때마다 로드하도록 하는 방식. React 에서는 React.lazy와 Suspense를 사용하여 동적 import 를 통해 특정 페이지나 컴포넌트를 비동기로 로드할 수 있다.
```js
import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
export default App;
```
위와 같은 방식으로 HeavyComponent는 필요할 때만 로드되어 로딩 속도를 개선하고 초기 번들 크기를 줄여준다.

2) 트리 쉐이킹
트리 쉐이킹은 사용하지 않는 코드나 모듈을 자동으로 제거해주는 최적화 방법이다. WebPacck은 자동으로 트리 쉐이킹을 수행하며, 번들링 시 불필요한 코드가 포함되지 않도록 함.


3) 코드 압축
불필요한 공백, 줄바꿈, 주석 등을 제거하고, 변수명을 축약하여 번들 파일 크기를 줄이는 과정이다. Webpack은 기본적으로 Terser 플러그인을 사용하여 JS 파일을 압축한다.


4) 이미지 및 자산 최적화
Webpack의 image-webpack-loader 를 사용하여 PNG, JPEG 같은 이미지를 압축할 수 있다. 아이콘 처럼 작은 SVG 파일은 한 파일로 묶어 스프라이트로 사용하는 것이 좋다. 픈토와 같은 경우도 WOFF2 같은 경량 포맷을 사용하여 파일 크기를 줄일 수 있다.


5) 캐싱 및 Service Worker 설정
애플리케이션이 정적 파일을 캐시에 저장하여, 다시 로드할 때 서버 요청을 최소화하도록 한다. 이는 네트워크 연결이 없는 경우에도 애플리케이션을 사용할 수 있도록 캐싱을 지원한다.
```js
// index.js
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();
```
캐시에서 불러오기 때문에 빠른 속도를 보장하지만, 파일이 변경된 경우 이를 갱신하는 로직을 추가해야하므로 필요한 경우에만 적용하는 것이 좋다.

6) React 메모이제이션 및 리렌더링 최적화
컴포넌트가 불필요하게 리렌더링 되는 경우 성능이 저하될 수 있다. 이를 방지하기 위해 React.memo, useMemo, useCallback 훅을 사용해 리렌더링을 최적화 할 수 있다.

1. React.memo : props가 변경되지 않으면 컴포넌트를 리렌더링하지 않도록 설정할 수 있다.
2. useMemo : 계산이 많은 연산을 메모이제이션해, 값이 변경될 때만 연산을 수행하도록 한다.
3. useCallback : 함수 참조를 메모이제이션해, 함수의 재생성을 방지할 수 있다.

```js
import React, { useMemo, useCallback } from 'react';

const MyComponent = React.memo(({ count }) => {
  const calculatedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <div>
      <span>{calculatedValue}</span>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
});
```

7) 분석 도구 활용
최적화와 번들링의 효과를 평가하기 위해 Lighthouse, Webpack Bundle Analyzer와 같은 분석도구를 사용할 수 있다.

이제 기본적인 프로젝트 환경 설정이 완료되었다. 생각보다 분량이 너무 많아 길어졌다. 이제 프로젝트의 시간이다.