# 1. BOM (Browser Object Model)의 개념과 특징   
<br>

## 1) 브라우저 객체 모델(BOM, Browser Object Model) 이란?
### 브라우저 객체 모델의 개념
브라우저 객체 모델은 문서 이외의 모든 것을 제어하기 위해 브라우저가 제공하는 추가 객체를 나타낸다.
즉, 브라우저에 내장된 객체를 BOM(Browser Object Model) 이라고 한다. 이 구조의 최상위 객체인 Window 를 기준으로 하위 객체들이 Tree 형식의 계층적 구조로 이루어져 있는데 이를 브라우저 객체 모델이라고 한다.

![tree](https://github.com/dolmeengii/fe-cs-study/blob/6174dee5e109cda4866f1704a2c95a86102b5c14/dolmeengii/BOM%EC%9D%98%20%EA%B0%9C%EB%85%90%EA%B3%BC%20%EC%A2%85%EB%A5%98/image/tree.png)

### 브라우저 객체 모델의 표준
w3schools 에 따르면, 브라우저 객체 모델에 대한 공식 표준은 없다고 한다. 최신 브라우저는 JavaScript 상호작용을 위해 거의 동일한 메서드와 속성을 구현하여 이를 종종 BOM의 메서드 및 속성으로 표현한다고 한다.

모던 JavaScript 튜토리얼에 따르면 브라우저 환경에 대한 다양한 명세가 존재하는데 BOM은 HTML 명세서의 일부라고 한다. HTML 명세서는 태그, HTML 속성 같은 `HTML` 뿐만 아니라 다양한 객체와 메서드, 브라우저에서만 사용되는 DOM 확장을 다룬다고 한다.

> ❗️ HTML 명세서   
> 태그 등의 HTML 언어, setTimeout, alert, location 등의 다양한 브라우저 기능을 정의한 BOM에 대한 설명이 담겨있고, DOM 명세서에 다양한 프로퍼티와 메서드를 추가해 확장한 명세서이다.   
> [HTML 명세서 확인하러 가기](https://html.spec.whatwg.org/)

<br>
<br>
<br>

# 2.BOM(Browser Object Model)의 종류
<br>

## 1) Window 객체란?
### Window 객체의 개념
Window 객체는 브라우저에 의해 자동으로 생성되며 웹 브라우저의 창을 나타낸다. **Window 객체는 브라우저가 제공하는 객체이지 JS가 제공하는 객체가 아님**에 주의하자. 
             ⇒ Window 객체는 BOM(Browser Object Model)

Window 객체를 이용하면 브라우저 창에 대한 정보를 알 수 있고, 창을 제어할 수도 있다. 또한, var 키워드로 변수를 선언하거나 함수를 선언하면 이 Window 객체의 프로퍼티가 된다.

<br>

### Window 객체의 주요 메서드
window의 하위 메서드는 `window.`을 생략하고 바로 사용할 수 있다.
|메서드|설명|
|:--:|:--|
|open|`open('URL', '창 이름', '창 옵션')` 형식<br>URL 페이지를 새 창으로 나타낸다.|
|alert|`alert(data)` 형식<br>경고 창을 나타내고 data를 표시한다.|
|prompt|`prompt('질문', '답변')` 형식<br>질문과 답변으로 된 질의응답 창을 나타낸다.|
|confirm|`confirm('질문 내용')` 형식<br>질문 내용으로 확인이나 취소 창을 나타낸다.|
|setTimeout|`setTimeout(cb, time)`형식<br>단 한 번 일정한 시간 간격으로 콜백 함수를 호출하여 코드를 실행한다.|
|setInterval|`setInterval(cb, time)`형식<br>지속적으로 일정한 시간 간격으로 콜백 함수를 호출하여 코드를 실행한다.|


<br>
<br>

## 2) 주요 BOM 객체
<br>

### location
현재 웹 페이지의 URL 정보 또는 브라우저와 관련된 속성과 메서드를 제공하는 객체이다.

#### 1️⃣ location 객체의 프로퍼티
- `location.href` : 주소 영역의 참조 주소를 설정하거나 URL 반환
- `location.host` : URL의 호스트(도메인) 이름과 포트 번호를 반환
- `location.hostname` : URL의 호스트(도메인) 이름을 설정하거나 반환
- `location.port` : URL의 포트 번호를 설정하거나 반환
- `location.pathname` : URL의 디렉토리 경로를 반환
- `location.hash` : URL의 해시값을 반환
- `location.search` : URL의 Query String인 요청 매개변수를 반환
- `location.protocol` : URL의 Protocol 부분을 반환
- `location.origin` : URL의 프로토콜, 도메인, 포트번호를 반환

<br>

#### 2️⃣ location 객체의 메서드
|메서드|설명|
|:--:|:--|
|assign()| `location.assign(URL)`<br>매개변수로 전달된 문자열 타입의 URL로 로드|
|replace()| `location.replace(URL)`<br>현재 리소스를 매개변수로 전달된 문자열 타입의 URL로 로드|
|reload()|`location.reload()`<br>새로고침 버튼처럼 현재 리소스를 다시 불러온다.|
|toString()|`location.toString()`<br>현재 페이지의 URL을 문자열 타입으로 가져온다. href 프로퍼티의 반환 결과와 동일|

<br>
<br> 

### screen
사용자의 모니터 정보를 제공하는 객체이다. 즉, 웹브라우저 화면이 아닌 운영체제 화면의 속성을 제공한다.
#### 1️⃣ screen 객체의 프로퍼티
- `screen.width` : 화면의 너비 반환
- `screen.heigth` : 화면의 높이 반환
- `screen.availWidth` : 실제 화면에서 사용 가능한 너비 반환 (작업 표시줄 제외한 화면의 너비)
- `screen.availHeight` : 실제 화면에서 사용 가능한 높이 반환 (작업 표시줄 제외한 화면의 높이)
- `screen.colorDepth` : 사용 가능한 색상 수를 반환
- `screen.pixelDepth` : 한 픽셀당 비트 수를 반환

<br>
<br> 

### navigator
현재 방문자가 사용하는, 실행중인 브라우저에 관련된 정보와 운영체제 정보를 제공하는 객체이다.
#### 1️⃣ navigator의 프로퍼티
- `navigator.appCodeName` : 현재 브라우저의 코드명 반환
- `navigator.appName` : 현재 브라우저의 이름 반환
- `navigator.appVersion` : 현재 브라우저의 버전 정보 반환
- `navigator.cookieEnabled` : 브라우저의 쿠키 사용 가능 여부 반환
- `navigator.language` : 브라우저에서 사용되는 언어 반환
- `navigator.onLine` : 브라우저의 온라인 여부 반환
- `navigator.platform` :  브라우저가 실행되는 플랫폼 정보 반환 
- `navigator.product` : 브라우저에서 사용되는 엔진 이름 반환
- `navigator.userAgent` : 브라우저와 운영체제 정보를 반환 

<br>
<br> 

### frames
프레임으로 구분된 하나의 프레임들 각각이 window 객체를 별도로 가진다. 즉, frame 객체와 window 객체는 같은 개념이라 할 수 있다. frame 이름을 사용해 해당 frame을 지정할 때는 frame 이름에 대해 대소문자를 구변한다.
#### 1️⃣ frame 객체의 프로퍼티
- `top` : 윈도우 내에서 제일 처음에 정의된 프레임으로 최상위 window 객체를 의미
- `parent` : 현재 프레임의 부모에 해당하는 프레임
- `self` : 자기 자신의 프레임으로 window와 같은 object. 자신의 창을 가리킴
- `frame[i]` : 현재 윈도우에 포함된 모든 Frame 배열 반환
- `name` : 프레임 이름 반환
- `length` : 현재 프레임의 자식 프레임 개수 반환

<br>

#### 2️⃣ frame 객체 사용 형식
```
window.frames[idx].property
frames[idx].method
window.프레임이름.property
프레임이름.method
``` 

<br>
<br>

### history
사용자가 방문한 사이트의 기록을 남기고 방문한 사이트로 다시 돌아갈 수 있는 속성과 메서드를 제공하는 객체이다.
#### 1️⃣ history 객체의 메서드
|메서드|설명|
|:--:|:--|
|back()| `history.back()`<br>이전 방문 사이트로 이동한다.(뒤로가기)|
|forword()| `history.forward()`<br>다음 방문 사이트로 이동한다.(앞으로가기)|
|go()|`history.go(이동 숫자)`<br>현재 사이트에서 이동 숫자에 입력한 숫자만큼의 차이가 나는 방문 사이트로 이동한다. 음수, 양수 가능.|
|length|`history.length`<br>방문 기록에 저장된 목록의 개수를 반환한다.|

<br>

#### 2️⃣ history로 URL State 관리하기
##### `location.pushState(state, title, url)`
페이지를 리로드하지 않고 페이지 주소만 변경할 때 사용한다. 즉, 페이지의 이동 없이 주소만 바꿔준다.
> state: 브라우저 이동 시 넘겨줄 데이터를 작성한다.   
> title: 변경할 브라우저 제목으로 원치 않으면 null을 입력할 수 있다.    
> url: 변경할 주소 정보를 입력한다.    
>> ❗️브라우저 페이지를 이동하게 되면 `window.onpopstate`라는 이벤트가 발생하게 되는데, pushState를 했을 때는 popState가 발생하지 않고, 뒤로가기-앞으로가기를 클릭했을 때 popState가 발생하게 된다. 이를 이용하여 JS만으로 SPA의 페이지 전환을 구현할 수 있다.

<br>

##### `location.replaceState(state, title, url)`
 브라우저의 세션 기록을 수정하거나 대체하는 역할을 하며, 웹 페이지의 URL과 관련된 정보를 업데이트한다.   
> state: 새로운 URL과 관련된 상태로, 페이지의 히스토리 엔트리와 연결하여 추가 정보나 데이터를 저장하는 데 사용한다.   
> title: 페이지의 제목을 나타내는 문자열로 일반적으로 빈 문자열이 전달된다. 
> url: 변경할 주소 정보를 입력한다. 실제로 페이지가 다시 로드되거나 네트워크 요청은 발생하지 않는다. 

<br>
<br>


### XMLHttpRequest
서버와 통신을 하도록 하는 객체로, 전체 페이지를 새로고침 하지 않아도 URL을 통해 데이터를 송수신 할 수 있다. 표준 HTTP 방식으로 서버와 통신하며 비동기적으로 작업한다.   
대부분의 브라우저에서 지원하며, 
#### 1️⃣ XMLHttpRequest 객체의 메서드
|메서드|설명|
|:--:|:--|
|open(”HTTP method”, “URL”, sync/async)| - 요청 초기화<br> - GET / POST 지정<br> - 서버 URL 지정<br> - 동기 / 비동기 설정|
|send(content)| - GET 방식은 URL 에 필요 정보를 추가하기 때문에 null 적용<br> - POST 방식에서 파라미터 설정 처리|

<br>

#### 2️⃣ XMLHttpRequest 객체의 프로퍼티
|프로퍼티|설명|
|:--:|:--|
|onreadystatechange| - 서버에서 응답이 도착했을 때 호출될 콜백함수 지정<br> - 콜백함수 상태(readyState)가 변경될 때 마다 호출 |
| readyState | - **0** → UNSENT (객체 생성 후 open 메서드 호출 전)<br> - **1** → OPEND (open 메서드가 호출되고 send 호출 전)<br> - **2** → HEADERS_RECEIVED (send 메서드가 호출되었지만 서버 응답 전, 헤더와 상태 확인 가능)<br> - **3** → LOADING (다운로드 중, 데이터의 일부가 전송된 상태) <br> - **4** → DONE (모든 데이터 전송 완료) |
| staus | - 서버 처리 결과 상태 코드<br> - 200 → OK ; 요청 성공<br> - 404 → Not Found ; 페이지를 못 찾을 경우<br> - 500 → Server Error ; 서버에서 결과 생성 시 오류 발생 |
| responseText | 서버의 응답결과를 문자열로 받기 |
| responseXML | 서버의 응답결과를 XML Document 로 받기 |

<br>
<br>

---
#### 🔖 참고 사이트
- https://ko.javascript.info/browser-environment#ref-495
- https://www.w3schools.com/js/js_window.asp
- https://velog.io/@diso592/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EA%B0%9D%EC%B2%B4-%EB%AA%A8%EB%8D%B8-Browser-Object-Model
- https://wickies.tistory.com/26
- https://geniee.tistory.com/33
- https://developer-talk.tistory.com/876
- https://webzz.tistory.com/82
- https://developer.mozilla.org/en-US/docs/Web/API
- https://blog.naver.com/smilebanner88/220783110567
- https://kwangsunny.tistory.com/28
