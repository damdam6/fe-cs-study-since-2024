# Feature-Sliced Design (FSD)

Feature-Sliced Design (FSD)는 프론트엔드 애플리케이션의 구조를 잡는 아키텍처 방법론입니다.
이 방법론의 주요 목적은 끊임없이 변화하는 비즈니스 요구 사항에 직면하여 프로젝트를 더 이해하기 쉽고 안정적으로 만드는 것입니다.

## Concepts

![](https://feature-sliced.design/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

### Layers (레이어)

- App: everything that makes the app run — routing, entrypoints, global styles, providers.
- Pages: 전체 페이지 또는 중첩 라우팅에서 페이지의 주요 부분.
- Widgets: 독립적으로 작동하는 대규모 기능 또는 UI 컴포넌트, 보통 하나의 완전한 기능.
- Features: 제품 전반에 걸쳐 재사용되는 기능 구현체로, 사용자에게 실질적인 비즈니스 가치를 제공하는 동작.
- Entities — 프로젝트가 다루는 비즈니스 엔티티.
- Shared — 재사용 가능한 기능, 특히 프로젝트/비즈니스의 특성과 분리되어 있을 때 (반드시 그럴 필요는 없음).

> [!IMPORTANT]
>
> - **App**과 **Shared**는 다른 레이어들과 달리 슬라이스를 가지지 않으며, 직접 세그먼트로 구성
> - **Processes**는 더 이상 사용되지 않음

레이어를 다룰 때의 중요한 점은 한 레이어의 구성 요소는 **반드시 아래에 있는 레이어의 구성 요소만 알 수 있고 임포트할 수 있다**는 것입니다.

## Slices (슬라이스)

슬라이스는 비즈니스 도메인별로 코드를 분할합니다. 여러분은 자유롭게 이름을 선택할 수 있고, 원하는 만큼 많이 만들 수 있습니다.

슬라이스는 **같은 레이어 안에서 다른 슬라이스를 참조할 수 없으며**, 이 규칙은 높은 응집도와 낮은 결합도를 유지하는 데 도움이 됩니다.

## Segments (세그먼트)

**슬라이스**와 **App, Shared 레이어**는 세그먼트로 구성되며, 세그먼트는 목적에 따라 코드를 그룹화합니다.

세그먼트의 이름은 표준에 의해 제한되지 않지만, 가장 일반적인 목적을 위한 몇 가지 관례적인 이름이 있습니다.

- `ui`: everything related to UI display — UI components, date formatters, styles, etc.
- `api`: backend interactions — request functions, data types, mappers, etc.
- `model`: the data model — schemas, interfaces, stores, and business logic.
- `lib`: 슬라이스 안에 있는 다른 모듈이 필요로 하는 라이브러리 코드.
- `config`: configuration files and feature flags.

새로운 세그먼트를 만들 때 기억해야 할 유일한 중요한 점은 세그먼트 이름이 **본질(무엇인지)이 아닌 목적(왜)을 설명해야 한다**는 것입니다. "components", "hooks", "modals"과 같은 이름은 이 파일들이 무엇인지는 설명하지만 내부 코드를 탐색하는 데 도움이 되지 않기 때문에 사용해서는 안 됩니다. 이는 팀원들이 이러한 폴더의 모든 파일을 파헤쳐야 하며, 관련 없는 코드를 가까이 유지하게 되어 리팩토링의 영향을 받는 코드 영역이 넓어지고 결과적으로 코드 리뷰와 테스트를 더 어렵게 만듭니다.

## Define a strict public API (공개 API)

Feature-Sliced Design의 맥락에서 *공개 API*라는 용어는 **슬라이스나 세그먼트가 프로젝트의 다른 모듈에서 가져올 수 있는 것**을 선언하는 것을 의미합니다. 공개 API는 `index.js` 또는 `index.ts` 파일이며, 이 파일을 통해 슬라이스 또는 세그먼트에서 필요한 기능만 외부로 추출하고 불필요한 기능은 격리할 수 있습니다. 인덱스 파일은 진입점 역할을 합니다.

**슬라이스가 없는 Shared 계층의 경우**, Shared의 모든 것에 대한 단일 인덱스를 정의하는 것과 반대로 **각 세그먼트에 대해 별도의 공개 API를 정의**하는 것이 일반적으로 더 편리합니다. 이렇게 하면 Shared에서의 가져오기가 자연스럽게 의도별로 구성됩니다.

**슬라이스가 있는 다른 계층의 경우**, 일반적으로 **슬라이스당 하나의 인덱스를 정의**하는 것이 더 실용적입니다. 다른 계층은 일반적으로 내보내기가 훨씬 적기 때문입니다.

```
📂 pages/
  📂 feed/
    📄 index
  📂 sign-in/
    📄 index
  📂 article-read/
    📄 index
  📁 …
📂 shared/
  📂 ui/
    📄 index
  📂 api/
    📄 index
  📁 …
```

## Usage with NextJS

NextJS의 `app` 폴더를 프로젝트 루트로 이동하고, FSD 페이지들을 `app` 폴더로 옮기는 방식을 사용합니다. 이렇게 하면 `src` 폴더 내에서 FSD 프로젝트 구조를 유지할 수 있습니다. 또한, App Router와 Pages Router가 호환되므로 `pages` 폴더를 프로젝트 루트에 추가하는 것이 필요합니다.

```
├── app                # NextJS app 폴더
├── pages              # NextJS pages 폴더
│   ├── README.md      # 해당 폴더의 목적과 역할에 대한 설명
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages 폴더
│   ├── shared
│   ├── widgets
```

## 출처

- https://feature-sliced.design/kr/docs/get-started/overview
- https://feature-sliced.design/kr/docs/get-started/tutorial
- https://feature-sliced.design/kr/docs/guides/tech/with-nextjs
- https://emewjin.github.io/feature-sliced-design/
