## ESLint 커스터마이징

프로젝트를 개발하다 보면 해당 프로젝트에만 적용되는 규칙과 컨벤션이 필요한 순간이 온다. 이럴 때에 ESLint 커스텀 룰을 적용하여 손쉽게 관리할 수 있다.

### ESLint 커스터마이징 해보기

여기서 커스텀 룰은 ESLint에서 제공하는 기존의 룰의 설정을 바꾸는 것이 아니라, 직접 원하는대로 ESLint 플러그인을 제작하여 사용하는 것을 말한다. <br>
ESLint 공식문서에서 제공하는 방식을 따라 커스터마이징을 해보자.

#### 1️⃣ npm 프로젝트 만들기

```bash
$ mkdir eslint-plugin-dolmeengii
$ cd eslint-plugin-dolmeengii
$ npm init -y
```

<br>

#### 2️⃣ 커스텀 룰 만들기

나는 **변수 `dolmeengii` 가 무조건 값으로 `dolmeengii`를 가질 수 있도록 하는 규칙**을 만들고자 한다.  
디렉토리에 enforce-dolmeengii.js 라는 파일을 생성해주고, 아래와 같이 규칙을 정의한 코드를 작성한다.

```bash
$ mkdir lib
$ cd lib
$ touch index.js
$ mkdir rules
$ touch enforce-dolmeengii.js
```

여기서 index.js 는 추후에 json 에서 entry 포인트로 사용될 파일이다. 폴더 구조를 미리 짜임새 있게 작성해준다.

```js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `dolmeengii` can only be assigned a value of 'dolmeengii'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent.kind === "const") {
          if (node.id.type === "Identifier" && node.id.name === "dolmeengii") {
            if (
              node.init &&
              node.init.type === "Literal" &&
              node.init.value !== "dolmeengii"
            ) {
              context.report({
                node,
                message:
                  'Value other than "dolmeengii" assigned to `const dolmeengii`. Unexpected value: {{ notDolmeengii }}.',
                data: {
                  notDolmeengii: node.init.value,
                },
                fix(fixer) {
                  return fixer.replaceText(node.init, '"dolmeengii"');
                },
              });
            }
          }
        }
      },
    };
  },
};
```

<br>

#### 3️⃣ 테스트 파일 설정하기

enforce-dolmeengii-dolmeengii 가 잘 동작하는지 확인하는 테스트 코드를 작성해야 한다.
루트 디렉토리 아래에 test 폴더를 만들어준다.

```bash
$ mkdir tests
$ touch enforce-dolmeegnii.test.js
```

위 명령어를 입력하여 테스트 파일을 만들어준다.

또한 테스트 파일에서 eslint 패키지를 사용해야 하므로 루트 디렉토리 아래에서 다음의 명령어를 입력한다.

```bash
$ npm install eslint --save-dev
```

이제 package.json에서 테스트를 실행하기 위해 파일에 테스트 스크립트를 추가한다.

```json
// package.json
{
  "name": "eslint-plugin-dolmeengii",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": " lib/index.js",
  "scripts": {
    "test": "node tests/enforce-dolmeengii.test.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^9.14.0"
  }
}
```

<br>

#### 4️⃣ 테스트 코드 작성하기

```js
// enforce-dolmeengii.test.js
const { RuleTester } = require("eslint");
const dolmeengiiRule = require("../lib/rules/enforce-dolmeengii");

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2015 },
});

ruleTester.run(
  "enforce-dolmeengii", // rule name
  dolmeengiiRule, // rule code
  {
    // checks
    valid: [
      {
        code: "const dolmeengii = 'dolmeengii';",
      },
    ],
    invalid: [
      {
        code: "const dolmeengii = 'dola';",
        output: 'const dolmeengii = "dolmeengii";',
        errors: 1,
      },
    ],
  }
);

console.log("All tests passed!");
```

#### 5️⃣ 테스트 실행하기

다음 명령어를 사용하여 테스트를 실행한다.

```bash
$ npm test
```

![test](https://github.com/dolmeengii/fe-cs-study/blob/6adac05716c1dc42034f7ba06259b2a0681caf90/dolmeengii/ESLint%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95/images/passtest.png))
테스트가 실행되면 위 이미지와 같은 결과가 터미널에 표시된다.

#### 6️⃣ 플러그인에 사용자 정의 규칙 번들링

생성해두었던 index.js 파일에 이렇게 작성한다.

```js
const dolmeengiiRule = require("./rules/enforce-dolmeengii");
const plugin = { rules: { "enforce-dolmeengii": dolmeengiiRule } };
module.exports = plugin;
```

#### 7️⃣ 플러그인을 로컬에서 사용하기

npm에 게시하기 전에 플러그인을 테스트하고 싶거나, 플러그인을 사용하고 싶지만 npm에 게시하고 싶지 않을 경우에 플러그인을 로컬에서 테스트해볼 수 있다.
플러그인을 프로젝트에 추가하기 전에 플랫 구성 파일을eslint.config.js 사용하여 프로젝트에 대한 ESLint 구성을 만들어야 한다.

```bash
$ touch eslint.config.js
```

```js
// eslint.config.js
"use strict";

// Import the ESLint plugin locally
const eslintPluginDolmeengii = require("./lib/index");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    // Using the eslint-plugin-dolmeengii plugin defined locally
    plugins: { dolmeengii: eslintPluginDolmeengii },
    rules: {
      "dolmeengii/enforce-dolmeengii": "error",
    },
  },
];
```

이제 규칙을 테스트할 파일을 만들어보자.

```js
// example.js
function correctDolmeengii() {
  const dolmeengii = "dolmeengii";
}

function incorrectDolmeengii() {
  const dolmeengii = "dola";
}
```

그리고 터미널에서 다음 명령어를 사용하여 테스트 한다.

```bash
$ npx eslint example.js
```

![로컬테스트](https://github.com/dolmeengii/fe-cs-study/blob/6adac05716c1dc42034f7ba06259b2a0681caf90/dolmeengii/ESLint%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95/images/localtest.png)

#### 8️⃣ npm에 배포하기

배포를 위해 package.json 파일을 정리해주자.

```json
{
  "name": "eslint-plugin-dolmeengii",
  "version": "1.0.0",
  "description": "ESLint plugin for enforce-dolmeengii rule.",
  "main": "index.js",
  "scripts": {
    "test": "node test/enforce-dolmeengii.test.js"
  },
  "peerDependencies": {
    "eslint": ">=9.0.0"
  },
  "keywords": ["eslint", "eslintplugin", "eslint-plugin"],
  "author": "dolmeengii",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^9.15.0"
  }
}
```

> `name`: 패키지의 고유한 이름으로, npm의 다른 패키지는 같은 이름을 가질 수 없다. <br> > `main`: 플러그인 파일에 대한 상대 경로이며 entry point가 되는 파일을 넣어주면 된다. <br> > `description`: npm에서 볼 수 있는 패키지 설명이다. <br> > `peerDependencies: "eslint": ">=9.0.0`: 피어 종속성으로 추가함. 플러그인을 사용하려면 해당 버전 이상이어야 한다는 것을 명시. eslint피어 종속성으로 선언하려면 사용자가 플러그인과 별도로 프로젝트에 패키지를 추가해야 한다. <br> > `keywords`: 패키지를 쉽게 찾을 수 있도록 표준 키워드를 포함해준다. ["eslint", "eslintplugin", "eslint-plugin"]. 플러그인과 관련이 있을 수 있는 다른 키워드도 추가할 수 있다.

npm에 플러그인을 게시하기 위해 https://www.npmjs.com/ 이곳에서 회원가입을 진행해주어야 한다.

회원가입이 완료되었다면 터미널에서 다음의 명령어를 입력한다.

```bash
$ npm adduser username// 유저 정보 - username 부분에 npm 닉네임을 입력한다.
$ npm publish
```

만약 터미널에 error가 반환된다면 publish 에 실패한 것이다.

---

#### ✅ 직접 사용해보기

다른 프로젝트를 만들어 직접 사용해보았다.

```bash
npm install eslint-plugin-dolmeengii --save-dev
```

```js
// eslint.confing.js
```

js 파일을 하나 만들어 다음과 같이 입력한다.
![예시](https://github.com/dolmeengii/fe-cs-study/blob/6adac05716c1dc42034f7ba06259b2a0681caf90/dolmeengii/ESLint%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95/images/example1.png)
그리고 eslint 실행 명령어를 입력해준다.

```bash
$ npx eslint main.js
```

실행을 하면 다음과 같은 오류가 발생한다.
![error](https://github.com/dolmeengii/fe-cs-study/blob/6adac05716c1dc42034f7ba06259b2a0681caf90/dolmeengii/ESLint%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95/images/main.png)
터미널에 다음과 같이 입력한다.

```bash
$ npx eslint main.js --fix
```

그렇게 하면 main.js 파일의 코드가 올바르게 고쳐지는 모습을 확인할 수 있다.
![예시](https://github.com/dolmeengii/fe-cs-study/blob/6adac05716c1dc42034f7ba06259b2a0681caf90/dolmeengii/ESLint%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95/images/example2.png)

---

[**플러그인 제작 코드 보러 가기**](https://github.com/dolmeengii/eslint-plugin/tree/main/eslint-plugin-dolmeengii)

#### 참고 사이트

[ESLint Custom Rule Tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
[velog - Custom ESLint Plugin 만들기](https://velog.io/@jyooj08/Custom-ESLint-Plugin-%EB%A7%8C%EB%93%A4%EA%B8%B0-01qkk3wp)
[우아한 테크 - 10분 테코톡 낙타의 ESLint](https://www.youtube.com/watch?v=Be9q0k5BJ_s&t=151s)
