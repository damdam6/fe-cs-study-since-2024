# React 로 프로젝트 만들기

## 0. 들어가며
최근에 이제 과제전형으로 프로젝트를 만드는 과제가 있었는데, 초기 설정부터 매우 얼탔었다. 알고보니 지금까지 남이 설정해준 밥상에 숟가락만 올려놓고 있던 실정이었던 것. 그래서 이번 주차에는 프로젝트 초기 설정에 대해서, 알아본다. 하지만 얼마나 길어질지 모르겠다. 그래서 2주차로 나뉘어질 수도 있음.

## 1. 프로젝트 초기 설정
React로 프로젝트를 시작할 때 가장 보편적인 방법은 **Create React App**  을 사용하는 것입니다. CRA는 React 앱을 빠르게 생성하고 개발 환경을 자동으로 설정해주는 도구입니다. 명령어 하나로 React 앱의 기본 구조를 생성할 수도 있고, 별도의 Webpack 설정이나 Babel 설정을 할 필요 없이 바로 프로젝트를 시작할 수 있습니다.
```bash
npx create-react-app my-app
```
위 명령어를 실행하면 my-app 이라는 directory가 생성되고 그 안에 React 프로젝트의 기본 구조가 만들어집니다. CRA가 제공하는 기본 구조는 아래와 같습니다.
```js
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```

주요 파일
1) public/index.html : React 앱이 랜더링되는 HTML 파일. 이 파일 안의 <div id="root"></div> 가 React의 진입점입니다.
2) src/index.js : index.html의 root에 React를 렌더링하는 엔트리 파일입니다.
3) src/App.js :기본적으로 생성되는 React 컴포넌트. 이곳에 앱의 주요 로직을 추가할 수 있습니다.

```bash
cd my-app
npm start
```
위 명령어를 실행하면 로컬 개발 서버가 시작되고, 브라우저에서 http://localhost:3000 주소로 앱을 확인할 수 있습니다.

## 2. React 디렉토리 구조
일반적인 React 프로젝트의 기본적인 디렉토리 구조는 아래와 같이 설계할 수 있습니다. 이제 추가적으로 재사용성을 고려한 컴포넌트를 분리하거나, 필요한 목적의 폴더를 생성하기 위해 추가 폴더를 설정할 수 있습니다.

```
my-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils/
│   │   └── helper.js
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.png
│   │   ├── fonts/
│   │   └── styles/
│   │       └── global.css
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md
```

각 디렉토리 파일의 역할 설명
1) public/ 디렉토리
    : 이 디렉토리 안의 파일들은 그대로 클라이언트들에게 제공됩니다. 빌드 시 변환되지 않기 때문에 주로 정적 파일을 이곳에 둡니다.
    : index.html : React 앱이 랜더링되는 HTML 파일입니다. 이 파일의 이 파일 안의 <div id="root"></div> 에 React 컴포넌트들이 렌더링됩니다. 이 외에도 메타 정보, favicon, 메니페스트 파일등을 포함 가능합니다.

2) src/ 디렉토리
    : 프로젝트의 주요 소스 코드가 위치하는 곳입니다. 이 구조들을 어떻게 설계하느냐에 따라 코드의 가독성 및 유지 보수성이 크게 달라집니다.

3) components/ : 재사용 가능한 컴포넌트를 모아놓은 디렉토리입니다. 컴포넌트는 한 화면에서 여러 번 재사용되거나, 별도로 기능을 분리할 수 있는 단위이죠. ex) 버튼, 헤더, 폼 필드 등
4) pages/ : 페이지 단위로 구성된 컴포넌트들을 모아놓은 디렉토리입니다. 페이지는 보통 라우팅에 의해 전환되는 대규모 컴포넌트들입니다. 각 페이지는 또 다른 하위 컴포넌트들로 구성될 수 있습니다.
5) hooks/ : 커스텀 훅을 정의하는 디렉토리입니다. 리액트의 훅을 활용해 로직을 재사용할 수 있는데, 이 훅들을 정리해 모아두면 코드의 유지보수가 쉬워집니다.
6) services/ : 외부 서비스나 API와의 상호작용을 처리하는 비즈니스 로직을 담당하는 디렉토리입니다. API 호출, 인증 로직등을 이곳에 작성합니다.
7) utils/ : 여러 컴포넌트에서 공통으로 사용될 수 있는 유틸리티 함수들을 저장하는 디렉토리입니다. 형식 변환, 데이터 처리 등 반복적으로 사용되는 로직을 유틸로 분리하면 코드의 재사용성을 높일 수 있습니다.
8) assets/ : 이미지, 폰트, CSS 파일 등 프로젝트에서 사용하는 정적 리소스를 모아놓은 디렉토리입니다. images, fonts, styles, global.css (전역 스타일 정의 파일) 등이 포함됩니다.
9) App.js : 애플리케이션의 Root Component 여기서 주로 라우팅이나 상태 관리를 설정.
10) .gitignore : Git 에서 관리하지 않을 파일들을 정의하는 설정 파일. 보통 node_modules나 환경변수 파일등이 포함됩니다.
11) package.json : 프로젝트의 의존성 관리 및 스크립트 실행을 담당하는 파일. 프로젝트에서 사용중인 라이브러리 버전과 설정 정보를 기록합니다.
12) README.md : 프로젝트의 설명을 담은 파일로, 주로 프로젝트를 시작하는 방법이나 개발 방법등을 기록합니다.

## 3. 패키지 매니저 선택
패키지 매니저는 프로젝트에서 사용하는 라이브러리나 모듈을 설치, 업데이트, 삭제하는 도구입니다. 대표적인 패키지 매니저로는 npm, yarn, pnpm 등이 있습니다.

1) npm (Node Package Manager)
: npm은 Node.js 와 함께 기본으로 제공되는 패키지 매니저로, 가장 널리 사용되고 있는 도구입니다.

주요 명령어

``` bash
   npm init        # 새로운 Node.js 프로젝트 생성
   npm install     # 프로젝트의 의존성 패키지 설치
   npm install <package>  # 특정 패키지 설치
   npm update      # 패키지 업데이트
   npm uninstall <package>  # 패키지 삭제
   npm run <script>  # package.json의 스크립트 실행
```

장점 : 별도의 설치 과정이 필요없음. npm registry (npm  저장소) 가 매우 크고, 다양한 라이브러리 제공

단점 : 네트워크 문제로 인한 패키지 설치 속ㄱ도가 느릴 수 있음.

2) Yarn
: 페이스북에서 개발한 npm의 대안 패키지 매니저. npm의 개선 형태, 설치 속도와 의존성 관리에서 더 나은 성능을 제공하는 것이 특징. 성능과 보안 면에서 우수한 점을 강조함.
: 병렬 설치 : npm과 달리 패키지 설치 시 병렬로 처리하여 설치 속도가 빠르다.
: 캐시 활용 : 설치된 패키지를 로컬에 캐시하여, 동일한 패키지를 다시 설치할 때 다운로드 시간을 줄여줌.
: 고정된 의존성 트리 : yarn.lock 파일을 통해 프로젝트에서 정확한 패키지 버전과 의존성 트리를 고정할 수 있어 안정적인 배포를 보장함.

```bash
yarn init       # 프로젝트 초기화
yarn add <package>  # 패키지 설치
yarn remove <package>  # 패키지 삭제
yarn install    # 모든 의존성 설치
yarn upgrade    # 패키지 업데이트
yarn run <script>  # package.json의 스크립트 실행
```

장점 : 빠른 속도 (병령 설치와 캐시 기능을 통해 가능) / 의존성 충돌 해결 (yarn.lock 파일 덕분에) / npm과 호환 가능

단점 : 추가 설치 필요 (Node.js 에 기본적으로 포함되어 있지 않음)

3) pnpm
: 하드 링크 사용 : 동일한 패키지를 여러 프로젝트에서 사용할 경우, 중복된 파일을 저장하지 않고 링크를 걸어 디스크 공간을 절약함
: 고속 설치 : pnpm은 매우 빠른 설치 속도를 제공
: isolation : pnpm은 패키지를 프로젝트별로 격리하여 관리하며, 이를 통해 의존성 충돌 문제를 최소화합니다.

```bash
pnpm init       # 프로젝트 초기화
pnpm add <package>  # 패키지 설치
pnpm remove <package>  # 패키지 삭제
pnpm install    # 모든 의존성 설치
pnpm update     # 패키지 업데이트
pnpm run <script>  # package.json의 스크립트 실행
```

장점 : 디스크 공간 절약 (하드 링크로 처리할 수 있기 때문에), 빠른 속도, 격리된 패키지 관리

## 4. 코드 스타일 통일
가독성 향상, 협업 효율성 향상, 버그 감소, 자동화된 코드 포맷팅 등의 장점을 획득하기 위해 EsLint, Prettier 등을 사용. 이 때 ESLint가 코드 품질을 검사하고, Prettier가 포맷팅을 담당하는 방식으로 결합한다.

1) ESLint
: JS와 React 프로젝트에서 코드의 품질을 검증하고, 스타일을 강제하는 도구. ESLint 는 개발 중 발생할 수 있는 잠재적인 오류를 미리 알려주고, 사용자가 설정한 규칙에 따라 코드를 분석하여 스타일을 통일시킵니다.
: 주요 기능으로 문법 오류 감지, 스타일 규칙 적용, 특정환경에 따라 플러그인을 추가해 더욱 정교한 코드 분석을 할 수 있다.

2) Prettier
: 코드 포멧터로 코드 스타일 규칙을 설정하고, 이를 자동으로 맞춰주는 도구. 다양한 파일 형식 (HTML,CSS,JSON) 에도 적용  가능.
: 주요 기능으로 자동 코드 포맷팅, 언어별 포매팅, ESLint와 연동이 가능합니다.

3) 설치

```bash
0. 내 프로젝트 루트 디렉토리로 이동한뒤에 설치해야합니다. 설치 과정에서 node_modules와 설정 파일들이 현재 프로젝트 디렉토리에서 생성되기 때문에, 반드시 프로젝트 디렉토리에서 명령을 실행해야 합니다.
cd my-project

1. ESLint 설치 : 관련 패키지를 설치해야 한다.
npm install eslint --save-dev

2. ESLint 초기화
npx eslint --init
```
이 과정까지 진행했을 때 아래와 같은 질문들을 받게 되는데, 잘 읽고 응답하면 된다.

```bash
How would you like to use ESLint?: "To check syntax, find problems, and enforce code style"을 선택.
What type of modules does your project use?: "JavaScript modules (import/export)" 선택.
Which framework does your project use?: React 프로젝트라면 "React" 선택.
Does your project use TypeScript?: TypeScript를 사용한다면 "Yes"를, 아니라면 "No" 선택.
Where does your code run?: "Browser" 선택.
What format do you want your config file to be in?: "JSON"이나 "JavaScript" 중 원하는 형식을 선택.
```
설정이 완료되면 eslintrc.json 혹은 .eslintrc.js 파일이 생성됩니다.

```bash
3. Prettier 설치
npm install --save-dev prettier

4. Eslint와 Prettier를 함께 사용하기 위한 플러그인 설치
npm install --save-dev eslint-config-prettier eslint-plugin-prettierr
```
5. ESLint 설정 파일 수정 : .eslintrc.json 파일을 수정하여 Prettier와 연동되록 설정한다.
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"  // Prettier 관련 설정 추가
  ],
  "rules": {
    "prettier/prettier": "error",  // Prettier 관련 오류를 ESLint에서 잡도록 설정
    "react/react-in-jsx-scope": "off"  // 예시: React 17 이상에서 JSX scope 경고 끄기
  }
}
```
6. Prettier 설정 파일 추가 : .prettierrc 파일을 만들어 Prettier의 설정을 명시할 수 있습니다.
```json
{
  "semi": true,            // 세미콜론을 항상 사용
  "singleQuote": true,     // 작은따옴표 사용
  "tabWidth": 2,           // 탭 간격
  "trailingComma": "es5",  // ES5 규칙에 따라 마지막 요소에 쉼표 추가
  "arrowParens": "always"  // 화살표 함수의 매개변수에 괄호 항상 사용
}
```
7. 사용하고 있는 IDE 에서 적합한 Settings 설정을 통해 완료

이제 절반 왔다. 나머지 절반 (CSS 설정, TypeScript 통합, 환경 변수 설정, 최적화 및 번들링) 은 길어지니까 다음 주에 추가로 알아볼 수 있도록 하자.