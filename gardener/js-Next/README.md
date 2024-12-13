# Next.js

## 1. Next.JS

Next.js를 공부하고, 이에 대한 정리 나아가 간단한 프로젝트까지 만들어보려고 한다. 강의를 들으면서 정리한 것임.

1) React 는 라이브러리, Next.js 는 프레임워크
- 라이브러리 : 코드내에서 사용하게 되는 것. 원하는 아키텍쳐를 사용하여 원하는 방식으로 코드를 작성한다. 코드 내에서 사용하려고 설치하는 것이지만, 사용의 주체는 바로 나 자신. 구조에 관한 모든 주체성이 나에게 있다. → 라이브러리의 도움이 필요할 때, 우리가 사용할 수 있는 것
- 프레임워크 : 우리의 코드를 사용한다. 주도권이 없음. 프레임워크가 주도하고 담당한다. 여러가지 결정을 우리 대신 해주고 자동화를 담당한다. 많은 결정을 내릴 필요가 없음. 그렇기에 우리가 규칙을 지켜야 함. import 하여 사용하는 개념이 아님.

2) Next.js를 먼저 수동으로 설치하기

프로젝트 폴더를 하나 생성하고 Terminal에

```shell
npm init -y //입력
```

그렇다면 package.json 파일이 생성되는 것을 확인할 수 있다.

```shell
npm install react@latest next@latest react-dom@latest
```

이후 위 명령어를 입력하므로 필요한 파일들을 설치한다.

- React는 UI와 다른 모든 것들을 구성하는 부분
- React-dom 은 브라우저의 Document Object Model (DOM)에 렌더링하는 역할이다.

이후 다시 package.json 파일을 확인해보자. package.json으로 돌아가서 license와 scripts 부분을 조금 수정해주어야 한다. 초기 버전은 아래와 같다.

```java
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  
  "license": "ISC",
```

```java
    "scripts": {
    "dev": "next dev" // 이제 next를 실행할 때 next dev 명령어를 통해 실행할 수 있다.
  },
  
  "license": "MIT"
```

- ISC와 MIT

    + ISC와 MIT : 오픈소스 라이센스의 한 종류로, 프로젝트에서 소스 코드를 사용할 때의 조건을 정의한다. package.json의 기본 값은 ISC (Node.js가 기본적으로 설정하기 때문)

  + 프로젝트가 개인용이라면 ISC를 사용해도 상관없지만, 협업 및 오픈소스 공유가 목적이라면 MIT 로 바꾸는 것이 더 적합하다.


이제 next dev 명령어를 통해 next는 우리들의 코드를 호출할 수 있다. 하지만 하나 더 필요한데, **page라는 파일인데, 이는 또! app 폴더 안에 있어야 한다. 이 파일에서 기본적인 컴포넌트들을 Export 하는 것이다.**

```java
export default function Gardener(){
  return <h1>Hello NextJS</h1>
}
```

이후 npm run dev를 통해 실행하면~ 쟈잔~

![](https://velog.velcdn.com/images/gardener/post/3512f0dd-ad91-4b7c-aef0-7dc912b410fe/image.png)

그러나 이후 눈썰미가 빠른 사람이라면, 생성과정에 TypeScript를 자동으로 설치하는 것을 확인할 수 있고 게다가, 자동으로? app 폴더 하단에 layout.tsx 파일이 생성되는 것을 볼 수 있다. 이 파일의 용도에 대해서는 있다가 알아보도록 하자.

## 2. Next.js의 Router

1. 기존 React의 Routing 방식
    - url을 지정하고 Home (예시, 특정 이름) 이라는 컴포넌트 render 를 요청하는 방식
    - 동적 라우팅도 가능하긴 하지만, 수동적.
    - 직접 url을 지정해주었어야했음.

2. Next.js의 Routing
    - Next에서 하나의 페이지를 만들기 위해 필요한 것은, **폴더를 만들어주는 것**이다. Ex) Gardener Page 만들어야지~ → Gardener를 이름으로 하는 폴더 만들기
    - 그 안에 다시 **page.tsx 파일**을 만들어, 렌더링할 요소를 입력해준다. → 사용자가 url로부터 보여지는 요소는 page.tsx 파일 안에 있다.
    - 파일 시스템을 통해서 경로를 생성해주는 방식.

    ```java
    export default function AboutUs() {
      return <h1>About Us!</h1>
    }
    ```

![](https://velog.velcdn.com/images/gardener/post/a4648b22-53f9-4806-bc73-75fae8efc90a/image.png)

+++ page.tsx 파일의 이름만 아니라면 app 폴더 안에 다른 폴더 및 파일을 넣어도 된다. (잘 사용하지는 않지만)

++ not-found 페이지 : app 폴더 안에 not-found.tsx 파일을 만들면, 비정상 url로 접근했을 때, 해당 페이지를 노출한다.

1.  Nav bar 만들기
    1. 프로젝트 폴더 안에 components 폴더를 하나 둔다.
    2. Routing 을 적용하기 위해서 next 의 Link 를 import 해올 필요가 있다.
    3. Link의 필수 속성은 href이고 이는 url의 주소를 지정하는 것이다. 아래 코드를 보면 바로 이해가 가능하다.

    ```java
    import Link from "next/link";
    
    export default function Navigation() {
      return <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about-us"> About Us </Link> </li>
        </ul>
      </nav>
    }
    ```

![](https://velog.velcdn.com/images/gardener/post/345ca8ff-b4bb-40d0-99eb-9446f0a68744/image.png)

++ url에 대한 정보를 알려주는 Hook 만들기

내가 지금 nav bar의 어느 부분에 있는지 알고 싶어서, usePathname이라는 hook 을 사용하고자 했다.

그러나 아래 코드 최상단의 “use client”를 붙이지 않으면, 에러가 노출되더라고, 이는 대체 뭘까?

```java
"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navigation() {

  const path = usePathname();

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li> {path==="/" ? "💕💕" : ""}
        <li><Link href="/about-us"> About Us </Link> {path==="/about-us" ? "💕💕" : ""} </li>
      </ul>
    </nav>
  );
}
```

![](https://velog.velcdn.com/images/gardener/post/1bfcc8f5-bf0e-48c8-9b82-5477da2e3dc8/image.png)

1. Route Groups : Route를 그룹화해서 logical group으로 만드는 것. 괄호안에 Logical한 이름을 정해서 그 안에 위치시킨다. 괄호 폴더는 URL에 영향을 미치지 않는다.

   +++ layout.tsx 파일 (Root 파일) , not-found.tsx 파일과 같은 경우 모든 routes에 공유되므로, 묶어놓을 필요가 없다.


1. Dynamic Route

   : /movies/:id —> <Movie />

![](https://velog.velcdn.com/images/gardener/post/a00068fa-4c27-46d3-8655-4d8ad815620b/image.png)

Dynamic Routing을 사용하기 위해서는 대괄호를 통해서 Dynamic하게 지정할 변수 이름을 폴더로 만들고, 그 안에 page.tsx 파일을 만들어주어야 한다.

![](https://velog.velcdn.com/images/gardener/post/1442eb2c-1adc-48ef-84c0-0e427b5936e0/image.png)

console.log 를 통해 이 id의 정채를 알기 위해서 console.log(props)를 해보면 parameters와 searchParams를 출력한다.

![](https://velog.velcdn.com/images/gardener/post/db2c4bfc-48fc-4b95-b260-1179c972e310/image.png)

아래는 최종 예시 코드

```jsx
export default  function MovieDetail({
  params: {id},
}: {
  params: {id: string }
}) {
  return(
    <div>
      <h1>Movies {id}</h1>
    </div>
  );
}
```

