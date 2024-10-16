# Reflow와 Repaint

### 브라우저 렌더링 과정

1. HTML 파싱 및 스타일 계산
    - HTML 을 파싱하여 DOM 생성, CSS 파싱하여 CSSOM만듦
    - 위의 두 개를 결합하여 렌더 트리를 형성함.
2. 레이아웃
    - 렌더 트리는 DOM 구조와 각 노드의 스타일 정보를 포함하지만 페이지를 위해서는 충분하지 않다. 브라우저가 각 노드의 크기와 위치를 계산해야 한다. (레이아웃 트리 생성)
3. 페인트
    - 브라우저가 요소를 그릴 순서도를 결정함.(페인트 기록)
4. 컴포지팅
    - 컴포지팅 기법을 통해 정보를 계층으로 나눔. 이는 컴포지터 스레드에서 실행되며 최종적으로 레이어 트리를 생성한 후 화면에 렌더링 함.

### Reflow와 Repaint

- Reflow
    - 브라우저 성능에 큰 영향을 미침
    - 페이지의 전체 또는 일부 레이아웃이 업데이트 됨
    - width, height, font-size 등을 변경할 때 발생
- Repaint
    - 페이지의 요소가 색상과 같이 레이아웃에 영향을 미치지 않는 속성을 변경하면 발생함.
    - 레이아웃에 영향이 없으나 성능엔 영향을 미침. (Repaint보다는 저렴)
    - outline, visibility, color 등을 변경할 때 발생.

### Avoid Reflow and Repaint

- Reflow
    - reflow가 한 번만 실행되게 코드를 변경하기 예시 (DOM  및 스타일 변경 일괄 처리)
        
        ```jsx
        
        // bad
        const body = document.body;
        body.style.width = '50px';
        body.style.height = '100px';
         
        // good
        const body = document.body;
        body.style.cssText = 'width: 50px; heigh: 100px;';
        ```
        
        ```jsx
        // bad
        const ulElement = document.getElementsByTagName('ul')[0];
        for(let i=0; i<10; i++) {
          ulElement.innerHTML += `<li> list${i} </li>`;
        }
         
        // good
        const ulElement = document.getElementsByTagName('ul')[0];
        let strHtml = ulElement.innerHTML;
        for(let i=0; i<10; i++) {
          strHtml += `<li> list${i} </li>`;
        }
        ulElement.innerHTML = strHtml;
        ```
        
    - DOM Depth 최소화
    - 동적으로 변경되는 인라인 스타일 피하기
    - 레이아웃 속성에 자주 엑세스 지양
    
- Repaint
    - 자주 변경되는 요소를 최적화 하려면 레이어(will-change, transform, opacity)사용
    - 브라우저가 최적화하기 쉬운 속성 사용(transfrom, opacity)
    

---

### 참고 자료

https://www.explainthis.io/en/swe/repaint-and-reflow

https://devowen.com/463

[https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md](https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md)

https://falsy.me/브라우저의-이해-1-reflow-repaint에-대하여-알아봅니다/

https://velog.io/@hugh0223/React-Repaint-와-Reflow-에-대해서-이해하고-기록하기코드