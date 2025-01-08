### 0. 들어가며
친구의 면접썰을 들으면서, CS적으로 프레임워크 및 라이브러리들을 바라보는 시선이 하나 생기게 되었는데, NextJS를 조금 더 심도있게 공부하면서, 브라우저의 렌더링 과정에 대해서 궁금증이 생기게 되었다. 제목과 같이 3가지 분야에 대해서 알아본다.

### 1. Browser의 렌더링 과정
![](https://velog.velcdn.com/images/gardener/post/48008450-6275-4b87-9c76-c4977d45931f/image.png)

1. DOM 트리 생성
    - HTML을 파싱하여 DOM 객체로 이뤄진 DOM 트리를 생성한다.
2. CSSOM (CSS Object Model) 트리 생성
    - COSS parser는 inline Style과 CSS 코드를 파싱하여 CSSOM 트리를 생성한다.
3. Render Tree 생성
    - DOM과 CSSOM의 정보를 바탕으로 실제 브라우저의 화면에 노출돼야하는 노드들에 대한 정보인 Render Tree를 생성한다.
4. Layout (Reflow)
    - 렌더 트리의 각 노드들이 브라우저의 Viewport 내에서 언느 위치에 어떤 크기로 배치돼야하는지에 대한 정보를 계산함.
5. Repaint
    - 렌더 트리의 각 노드들을 모니터에 실제 픽셀로 그리는 단계

브라우저 성능 저하의 원인은 Layout과 Repaint의 과정 때문이다. DOM을 수정할 때마다 렌더트리생성부터 4,5의 과정을 반복해야하기 때문이다.

위 방법의 개선을 위해 Virtual DOM이 등장하게 되었다. 바로 2013년, React의 등장 이후.

### 2. React의 렌더링 과정
![](https://velog.velcdn.com/images/gardener/post/3597da65-3d4f-435e-b535-4ab8cc669538/image.png)
JS Bundle 안에 이 서비스에서 접근 가능한 모든 컴포넌트 코드들이 존재.

조금은 길 수도 있는 CSR의 과정 때문에 FCP (First Contentful Paint : 요청 시작 시점으로부터 컨텐츠가 화면에 처음 나타나는데 걸린 시간) : 요청시작부터 컨텐츠 렌더링까지의 과정이 길 수도 있다.

1. Render 단계
    - React.createElement로 생성
2. Reconcilation 단계
    - 이전 Elements와 새로 생성된 elements 비교
3. Commit 단계
    - 필요한 경우에 DOM 업데이트

  
++ DIFF Algorithm
: Component 내에 State가 변경된 경우 React는 해당 Component를 Dirty 하다고 Batch에 표시한다.
![](https://velog.velcdn.com/images/gardener/post/a86765b7-3a6f-42fc-a8cc-1f0eba5af795/image.png)

이 떄, Virtual DOM과 실제 브라우저에 등록된 DOM 사이에서 DOM 엘리먼트들을 비교하고 순회하며 Dirty 체크된 엘리먼트들을 처리한다.
![](https://velog.velcdn.com/images/gardener/post/62bbb885-6a5e-4641-a38e-572b3780fbbb/image.png)

1. Level By Level
    - 트리를 비교할 때 동일한 Level의 Node 들 끼리만 비교
2. 같은 위치에서 엘리먼트 타입이 다른 경우

   ex) Div 태그가 Span 태그로 바뀐 경우

    1. 기존 트리를 제거 후 새 트리를 만든다.
    2. 기존 트리 제거 시 트리 내부의 엘리먼트 및 컴포넌트들을 모두 제거한다.
    3. 새로운 트리를 만들 때 내부 엘리먼트, 컴포넌트들도 모두 새로 만든다.
3. 같은 위치에서 엘리먼트가 DOM을 표현하고 그 타입이 같은 경우

   ex) Class가 변경된 경우

    1. 엘리먼트의 Attributes를 비교한다.
    2. 변경된 Attributes만 업데이트 한다.
    3. 자식 엘리먼트들에 Diff 알고리즘을 재귀적으로 적용한다.
4. 같은 위치에서 엘리먼트가 펌포넌트이고, 그 타입이 같은 경우

   ex) ```<Item price=100 /> →  <Item price=200/>```

    1. 컴포넌트 인스턴스 자체는 변하지 않음 (Component의 State 유지)
    2. 컴포넌트 인스턴스의 업데이트 전 Life Cycle Method 들이 호출되며 props가 업데이트 된다.
    3. render()를 호출하고, 컴포넌트의 이전 엘리먼트 트리와 다음 엘리먼트 트리에 대해 diff 알고리즘을 재귀적으로 적용
5. 자식 노드에 대한 재귀적 처리
    - DOM 노드의 자식들을 재귀적으로 처리할 때 React는 기본적으로 동시에 두 리스트를 순회하고, 차이점이 있으면 변경을 생성
        1. 마지막 Node가 추가된 경우 마지막 노트만 update된다.
        2. 맨 앞 Node가 추가된 경우 모든 Node에 대한 Update가 발생한다.

           → 이는 매우 비효율적, 그러니 React는 자체적으로 Childeren들이 Key를 두어 관리한다. (전역적 Key가 아니다. 형제들 사이에서만 Key가 존재해도 됨!)

```js
[불필요한 성능 저하 발생]
// before
<ul>
  <li>ItemA</li>
  <li>ItemB</li>
</ul>

// after
<ul>
    <li>ItemC</li> // ItemA -> ItemC 변경
    <li>ItemA</li> // ItemB -> ItemA 변경
    <li>ItemB</li> // ItemB 추가
</ul>

[Key를 두어 관리]
// before
<ul>
  <li key="A">ItemA</li>
  <li key="B">ItemB</li>
</ul>

// after
<ul>
    <li key="C">ItemC</li> // ItemC 추가
    <li key="A">ItemA</li> // ItemA 유지
    <li key="B">ItemB</li> // ItemB 유지
</ul>
```

### 3. NextJS의 렌더링 과정
![](https://velog.velcdn.com/images/gardener/post/c44b8cc3-801d-4121-994a-91013ba80840/image.png)
![](https://velog.velcdn.com/images/gardener/post/00860a4e-d9a0-4f41-b3fd-0cb34f85d942/image.png)

1. JS 실행 (렌더링) : JS 코드 (React 컴포넌트) 를 HTML로 변환하는 과정
    - 또한 이 때, preFetching 과정이 일어난다. 모든 페이지의 번들파일을 전달하는 경우가 아닌, 해당하는 홈페이지에서의 이동 가능한 링크만 전달함. 만약에 모든 파일을 전달하게 된다면 용량이 너무 커지게 되고 Hydration이 늦어지기 때문.


2. 화면에 렌더링 : HTML 코드를 브라우저가 화면에 그려내는 작업
3. FCP 단계까지는 브라우저와 상호작용 불가
4. TTI : Time To Interactive : 상호작용 가능한 시간

빠른 FCP 달성 + 빠른 페이지 이동 의 달성이 가능!

#### 참고
- https://velog.io/@hyerin0930/브라우저-렌더링-과정과-React의-Virtual-DOM
- 한 입 크기로 잘라먹는 Next.js(v15) - 이정환 강사님 (Inflearn)