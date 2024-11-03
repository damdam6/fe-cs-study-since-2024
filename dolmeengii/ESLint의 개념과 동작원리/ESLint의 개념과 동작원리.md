# ESLint의 개념과 동작원리

## 1. ESLint란?

### 1) ESLint 정의

ESLint는 ES와 Lint를 합친 것이다. 여기서 ES는 Ecma Script로 JavaScript를 의미하며, Lint는 에러가 있는 코드에 표시를 달아놓은 것을 의미한다.
ESLint는 JavaScript 코드의 문제를 발견하고 수정하는 데 사용되는 정적 분석 도구이다.

> 💡 **정적 분석 도구란?** <br>
> 소스 코드의 실행 없이 코드의 의미를 분석해 결함을 찾아내는 도구이다. 다시 말해 정적 분석 도구는 런타임 환경 없이 코드를 검사하고 디버깅 해준다.

### 2) ESLint의 주요 기능

#### ✅ 높은 구성 가능성

ESLint는 사용자 정의 규칙을 생성하거나 기존 규칙을 확장할 수 있다.

#### ✅ 플러그인 아키텍처

ESLint는 다양한 플러그인을 지원하여 여러 프레임워크와 라이브러리를 처리할 수 있도록 확장할 수 있다.

#### ✅ 자동 수정 기능

ESLint는 --fix 옵션을 사용하여 일부 문제를 자동으로 수정할 수 있어, 코드베이스를 유지 관리 하는 시간을 절약할 수 있다.

#### ✅ 빌드 도구와의 통합

ESLint는 인기 있는 빌드 도구와 편집기와도 매끄럽게 통합되어, 코드를 작성하는 동안 실시간으로 린팅을 지원한다.

### 3) ESLint를 사용하는 이유

코드스멜은 런타임 환경에서 발견하기 힘들고 찾기 위해서는 비용이 많이 들게 된다.

> 💡 **코드 스멜이란?** <br>
> 잠재적으로 버그가 발생할 수 있는 코드, 안티 패턴, 코드 컨벤션 위반 여부, 성능 문제, 오타, 사용되지 않는 코드, 잠재적인 보안 취약점 등을 의미한다.

<br>

ESLint를 사용하게 되면 다음과 같은 이점이 있다.

#### ✅ 일관성 유지

ESLint는 팀 내 모든 개발자가 동일한 코딩 표준을 준수하도록 보장하여, 코드베이스의 일관성을 유지할 수 있다.

#### ✅ 오류 예방

개발 과정에서 잠재적 문제를 잡아내어 버그가 실제로 제품에 도달하는 것을 방지한다.

#### ✅ 코드 품질 향상

ESLint는 최선의 관행을 촉진하여, 더 높은 품질의 유지 관리 가능한 코드를 작성할 수 있도록 돕는다.

#### ✅ 사용자 맞춤 설정

ESLint는 필요에 맞게 규칙을 조정할 수 있어 코드 작성 및 검토에 유연성을 제공한다.

<br>
<br>

## 2. ESLint 동작 원리

### 1) ESLint 동작 원리

1️⃣ 자바스크립트 코드를 문자열로 읽는다. <br>
2️⃣ 자바스크립트 코드를 분석할 수 있는 파서로 코드를 구조화한다. 이렇게 구조화한 트리를 추상구문트리(AST, Abstract Syntax tree) 라고 한다.

> eslint는 espree.parse() 메서드를 통해 AST로 변환해준다. <br>

3️⃣ AST를 기준으로 각종 규칙과 대조한다. <br>
4️⃣ 규칙과 대조했을 때 위반한 코드를 알리거나(report) 수정한다(fix). <br>

### 2) 예시와 함께 보기

eslint 규칙 중 자주 사용되는 max-depth 규칙에 대해 살펴보며 동작 원리를 알아보자.

> `max-depth` : 블록이 중첩될 수 있는 최대 깊이를 적용하는 규칙

```javascript
function dolmeengii() {
  while (true) {
    // 1depth
    for (;;) {
      // 2depth
      if (true) {
        // 3depth
        if (true) {
        } // 4depth
      }
    }
  }
}
```

#### **eslint max-depth에 대해 규정한 파일**

```javascript
// max-depth.js
// node_modules > eslint > lib > rules > max-depth.js
"use strict";

module.exports = {
  // meta는 규칙에 대한 메타데이터 정보를 담고 있다.
  meta: {
    type: "suggestion",

    docs: {
      description: "Enforce a maximum depth that blocks can be nested",
      recommended: false,
      url: "https://eslint.org/docs/latest/rules/max-depth",
    },
    schema: [
      {
        oneOf: [
          {
            type: "integer",
            minimum: 0,
          },
          {
            type: "object",
            properties: {
              maximum: {
                type: "integer",
                minimum: 0,
              },
              max: {
                type: "integer",
                minimum: 0,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      // 객체의 키값 - tooDeeply
      tooDeeply:
        "Blocks are nested too deeply ({{depth}}). Maximum allowed is {{maxDepth}}.",
    },
  },

  create(context) {
    const functionStack = [],
      option = context.options[0];
    let maxDepth = 4;

    if (
      typeof option === "object" &&
      (Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max"))
    ) {
      maxDepth = option.maximum || option.max;
    }
    if (typeof option === "number") {
      maxDepth = option;
    }

    // 핸들러1
    function startFunction() {
      functionStack.push(0);
    }

    // 핸들러2
    function endFunction() {
      functionStack.pop();
    }

    // 핸들러3
    function pushBlock(node) {
      const len = ++functionStack[functionStack.length - 1];

      if (len > maxDepth) {
        context.report({
          node,
          messageId: "tooDeeply", // 여기서 객체의 키값이 메시지Id로 사용됨
          data: { depth: len, maxDepth },
        });
      }
    }

    // 핸들러4
    function popBlock() {
      functionStack[functionStack.length - 1]--;
    }

    // create 함수는 객체를 반환한다.
    return {
      // 핸들러1 연결
      Program: startFunction,
      FunctionDeclaration: startFunction,
      FunctionExpression: startFunction,
      ArrowFunctionExpression: startFunction,
      StaticBlock: startFunction,

      IfStatement(node) {
        if (node.parent.type !== "IfStatement") {
          pushBlock(node);
        }
      },
      // 핸들러3 연결
      SwitchStatement: pushBlock,
      TryStatement: pushBlock,
      DoWhileStatement: pushBlock,
      WhileStatement: pushBlock,
      WithStatement: pushBlock,
      ForStatement: pushBlock,
      ForInStatement: pushBlock,
      ForOfStatement: pushBlock,

      // 핸들러4 연결
      "IfStatement:exit": popBlock,
      "SwitchStatement:exit": popBlock,
      "TryStatement:exit": popBlock,
      "DoWhileStatement:exit": popBlock,
      "WhileStatement:exit": popBlock,
      "WithStatement:exit": popBlock,
      "ForStatement:exit": popBlock,
      "ForInStatement:exit": popBlock,
      "ForOfStatement:exit": popBlock,

      // 헨들러2 연결
      "FunctionDeclaration:exit": endFunction,
      "FunctionExpression:exit": endFunction,
      "ArrowFunctionExpression:exit": endFunction,
      "StaticBlock:exit": endFunction,
      "Program:exit": endFunction,
    };
  },
};
```

- **`type`** : 규칙의 유형
  - **problem** : 코드에 오류가 발생할 수 있는 규칙을 사용했을 때
  - **suggestion** : 코드에 오류는 없지만 더 좋은 코드로 개선할 수 있을 때
  - **layout** : 코드 실행 방법과는 상관 없이 코드의 스타일(세미콜론, 공백 등)을 정의할 때
- **`docs`** : 문서화에 필요한 정보
  - max-depth가 정의되어 있는 설명
  - eslint recommend를 사용할 수 있는지 여부
  - url
- **`schema`** : 규칙의 옵션 설정
  - `max-depth: [’error’, 3]` 처럼 사용함
  - 옵션을 설정하지 않으려면 빈 배열로 두거나 스키마를 생략한다.
- **`messages`** : 안내할 메시지 설정
  - 객체의 키값은 `messageId`로 사용한다.
  - 오류를 전송할 때 해당 메세지 아이디를 사용하여 메시지를 설정한다.
- **`create`** : 실제로 코드의 문제점을 확인하는 로직
  - 객체를 반환
  - 반환되는 각각의 객체 키는 노드 타입 / selector 이다.
  - 노드의 타입을 통해서 규칙을 설정할 수 있다.
  - 핸들러를 설정하고 연결하게 되면 해당 노드 타입을 만날 때 마다 핸들러를 실행하는 방식으로 규칙이 설정됨

<br>
<br>

---

### 참고한 사이트

- [우아한 테크 - 10분 테코톡 (낙타의 ESLint)](https://www.youtube.com/watch?v=Be9q0k5BJ_s)
- https://sancho216.tistory.com/entry/ESLint-%EB%9C%BB%EA%B8%B0%EB%8A%A5%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9-%EA%B7%9C%EC%B9%99%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8airbnb-ESLint-%EC%B4%9D%EC%A0%95%EB%A6%AC
- https://velog.io/@jiwon/ESlint
- https://www.daleseo.com/eslint-config/
