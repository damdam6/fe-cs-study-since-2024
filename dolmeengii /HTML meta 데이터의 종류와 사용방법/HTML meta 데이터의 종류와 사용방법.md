# HTML 메타데이터란?
HTML 메타데이터는 웹 페이지에 관한 정보를 제공하는 데이터로서, 웹 페이지의 콘텐츠 자체와는 다르게 주로 브라우저나 검색 엔진에게 페이지에 대한 추가적인 정보를 제공하기 위한 것이다. HTML 문서에서 메타데이터는 주로 `<head>` 내에 위치하며, `<meta>`, `<link>`, `<style>`, `<script>`, `<title>` 등의 태그로 표현된다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport">
	<title>Document</title>
</head>
<body>

</body>
</html>
```


# HTML 메타 데이터의 종류
## `<meta>`
HTML 문서에 대한 메타데이터를 제공한다. 메타데이터는 브라우저에 직접 표시되지는 않지만, 문서의 동작, 정보, 관계 등을 설명하거나 외부 도구와 서비스에 필요한 정보를 제공한다.

### charset
```HTML
<meta charset="UTF-8" />
```
character set의 약어로, 문서의 문자 인코딩을 정의한다. 여기서 UTF-8 은 문자 인코딩 방식으로, 세계 모든 문자와 기호를 표시할 수 있고, 인터넷 표준으로 허용되고 있어 웹사이트 인코딩 방식으로 많이 사용된다.


### name, content
```  HTML
<meta name="author" content="dolmeengii" />
<meta name="viewport" content="witdh=device-width, initial-scale=1.0" />
<meta name="description" content="HTML 메타데이터를 설명하는 페이지입니다." />
<meta name="keywords" content="html, meta" />
<meta name="copyright" content="dolmeengii" />
```
name-content 특성을 함께 사용하여 문서의 메타데이터를 이름-값 쌍으로 제공할 수 있다. 

1️⃣ `author`: 문서 작성자에 대한 정보   
2️⃣ `viewport`: 웹페이지가 모바일 장치에서 어떻게 렌더링될지 제어한다. 
```
💡 viewport는 무엇이고, 왜 사용하나요?

  뷰포트는 웹페이지가 사용자에게 보여지는 영역을 의미하는데,
  이는 화면에서 내가 스크롤을 움직이지 않고 볼 수 있는 영역을 의미한다.
  PC 에서는 브라우저의 크기를 변경함에 따라 뷰포트의 크기를 바꿀 수 있지만,
  모바일에서는 화면 크기가 고정되어 있기 때문에 뷰포트의 배율을 조절하여 내용을 봐야 한다.
```
3️⃣ `description`: 문서에 대한 간략한 설명을 제공하며, 검색 엔진이나 소셜 미디어 플랫폼에서 페이지를 공유 시 사용된다.  
4️⃣ `keyword`: 웹 페이지의 콘텐츠와 관련된 키워드를 원하는 개수만큼 추가할 수 있다. 검색 엔진 최적화를 위해 사용되었으나, 현재는 대부분의 검색 엔진이 해당 정보를 무시한다.  
```
💡 왜 검색 엔진에서는 keywords를 무시할까?

   google 검색 센터 문서에 따르면,
   약 10년 전에는 검색엔진이 웹페이지에 있는 컨텐츠에만 기반하여 페이지를 판단했으며,
   웹페이지로 연결되는 링크와 같은 페이지 외 요소는 고려하지 않았다고 한다. 
   당시 키워드 메타 태그는 일반적인 방문자가 키워드를 보지 않고도 종종 관련 없는 키워드를 입력할 수 있는 영역이 됐고,
   그런 방식으로 keyword 메타 태그가 악용되는 경우가 많아 google에서는 몇 년 전부터 keywords 태그를 무시했다고 한다.
```
5️⃣ `copyright`: 저작권 정보 

### http-equiv
해당 메타 태그의 내용을 HTTP 헤더의 일부로 해석하게 해준다. 해당 속성을 통해서 HTML 문서 내에서 HTTP 응답과 비슷한 효과를 구현할 수 있고, 프래그마 지시문을 정의하여 캐싱 동작을 제어하거나, 특정 시간 후에 페이지를 새로 고침 및 다른 URL로 리다이렉트 할 수 있다.
```
💡 프래그마 지시문이란?

컴퓨터 언어와 시스템에서 찾을 수 있는 지시문으로, 일반적으로 해당 언어나 시스템의 동작을 특별하게 제어하려는 목적으로 사용된다.
HTTP/HTML에서 프래그마는 캐싱 동작을 제어하는 데 사용된다.
```
1️⃣ **Refresh**   
웹 페이지를 자동으로 새로고침 하거나, 다른 페이지로 redirection 하는 데 사용된다.   
- content 특성에 양의 정수 값인 시간을 설정한 경우 : 해당 시간 이후 새로고침
- content 특성에 양의 정수 값 + `;url=` 이 붙는 경우 : 해당 시간 이후 URL로 redirect
``` html
<!-- 5초 후 새로고침 -->
<meta http-equiv="refresh" content="5" />

<!-- 5초 후 해당 url로 새로고침 -->
<meta http-equiv="refresh" content="5;url=https://github.com/dolmeengii" />

```

2️⃣ **캐싱제어**   
브라우저가 페이지를 캐싱하는 방법을 제어한다.
``` html
<!-- 캐싱 금지 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
```

## `<title>`
HTML 문서의 제목을 정의하는 태그로, 텍스트만 포함할 수 있으며 <head> 태그 내에 작성한다. 웹 브라우저의 제목 표시줄이나 탭에 표시되며, 북마크, 검색 엔진 결과 등에서도 사용된다. 
``` html
<title> 민돌멩이의 Frontend-CS </title>
```

## `<base>`
해당 태그를 사용하면 문서의 모든 상대 URL이 기본 URL을 참조하여 절대 URL로 해석된다.   
- 문서에는 하나의 <base> 요소만 존재할 수 있다.
- `<head>` 섹션의 최상단에 위치해야 한다.
- 스크립트에서 문서의 기준 URL에 접근해야 할 때는 `document.baseURI`를 사용할 수 있다.
- 만약 `<base>` 요소가 존재하지 않을 때 baseURI의 기본값은 `location.href`이다.
``` html
<!DOCTYPE html>
<html>
  <head>
    <base href="https://www.dolmeengii.com" target="_blank" />
  </head>
  <body>
    <a href="profile.html">프로필 이동</a> <!-- https://www.dolmeengii.com/profile.html 로 해석 -->
  </body>
</html>
```

1️⃣ **href**   
상대 URL의 기본 URL을 지정한다.

2️⃣ **target**   
target을 명시하지 않은 문서 내의 태그가 기본적으로 열리는 대상을 설정한다. target을 명시하지 않은 태그에는 `<a>`, `<area>`, `<form>` 등이 있다.   
- `_self` : default 값으로 결과를 현재 브라우징 문맥에서 보여준다.   
- `_blank` : 결과를 새로 생성한 탭에서 보여준다.   
- `_parent` : 현재 페이지가 프레임 내에 존재하는 경우, 결과를 부모 브라우징 문맥에서 보여준다. 부모가 없다면 `_self`와 동일하다.
- `_top` : 결과를 최상위 브라우징 맥락에서 보여준다. 프레임 내에서 사용될 때의 문서를 전체 창에 로드하기 위해서 사용한다. 부모가 없다면 `_self`와 동일하다.

## `<link>`
외부 문서를 가져와서 연결하는 역할, 현재 문서와 외부 리소스의 관계를 명시한다.
```html
<head>
  <link rel="stylesheet" href="./main.css" />
  <link rel="icon" href="./favicon.png" />
  <link rel="alternate stylesheet" href="alternate-styles.css" title="Alternate Styles" />

  <link href="print.css" rel="stylesheet" media="print" />
  <link href="mobile.css" rel=stylesheet" media="screen and (max-width: 600px)" />

  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="rss.xml" />

  <link rel="preconnect" href="https://dolmeengii.com" />
</head>
```
1️⃣ **rel**   
현재 문서와 연결된 리소스와의 관계 정의   
- stylesheet: 스타일시트
- icon: 파비콘
- alternate: 대체 콘텐츠

2️⃣ **href**   
연결된 리소스의 URL 지정

3️⃣ **type**   
연결된 리소스의 MIME 타입을 지정   
```
💡 MIME 은 무엇인가요?

Multipurpose Internet Mail Extension의 약자로 파일변환을 뜻한다.
MIME는 이메일과 함께 동봉할 파일을 텍스트 문자로 전환하여 이메일 시스템을 통해 전달하기 위해 개발됐다.
현재는 웹을 통해서 여러 형태의 파일을 전달하는 데 사용되고 있다.
```
   
4️⃣ **media**   
스타일시트가 적용될 미디어의 유형을 지정

5️⃣ **sizes**   
연결된 리소스의 크기를 정의

6️⃣ **disabled**   
`rel="stylesheet"` 에 한정하여 스타일시트를 불러와 문서에 적용할지 나타낸다. HTML을 불러오는 시점에 disabled를 지정한 경우 스타일시트는 페이지 로딩 시점에 불러오지 않는다.

## `<style>`
웹 문서 내에 내장 스타일 정보를 포함하기 위해 사용한다.
``` html
<head>
  <style>
    div {
      color: red;
    }
  </style>
  <!-- media query 포함 가능 -->
  <style media="all and (max-width: 500px)">
    div {
      color: blue;
    }
   </style>
</head>
```
1️⃣ **type**   
선택 사항으로 스타일 언어의 MIME 유형이다. 초기의 HTML 버전에서는 type 속성을 사용하여 `type="text/css"` 와 같이 스타일시트 언어를 지정했지만, HTML5 에서는 기본값이므로 필수가 아니게 됐다.

2️⃣ **media**   
스타일을 적용할 매체로 미디어 쿼리를 속성값으로 가지며, 기본값은 all 이다.

## `<script>`
웹 문서에 스크립트, JavaScript 코드를 포함하거나 참조할 때 사용하며, 웹 페이지 동작을 조작하거나 변경할 수 있고 동적인 특성을 웹 페이지에 추가할 수 있다.   
`<script>` 태그는 `<head>`, `<body>` 둘 다 위치할 수 있지만, 스크립트가 문서의 파싱을 차단할 수 있기 때문에 주로 문서의 끝 `</body>` 태그 바로 앞에 위치시키는 것을 권장한다.
``` html
<head>
  <!-- 내부 스크립트 -->
  <script>
    console.log('우하하');
  </script>

  <!-- 외부 스크립트 -->
  <script src="./main.js"></script>
</head>
```
내부 스크립트: HTML 문서 내에서 script 코드 작성 가능
외부 스크립트: HTML 문서 외에서 script 코드를 작성하고 해당 파일을 src 속성을 사용하여 문서 내에 연결한다.

1️⃣ **type**   
선택 사항으로 스타일 언어의 MIME 유형이다. 초기의 HTML 버전에서는 type 속성을 사용하여 `type="text/javascript"` 와 같이 스타일시트 언어를 지정했지만, HTML5 에서는 기본값이므로 필수가 아니게 됐다.

2️⃣ **async**
HTML 구문 분석 중에도 스크립트를 가져오고, 사용 가능해지는 즉시 평가를 수행한다. 스크립트를 비동기적으로 로드하고 실행할 때 사용하며, 스크립트 로딩이 페이지의 렌더링을 차단하지 않게 하므로 페이지 로드 시간을 개선할 수 있다.
```html
<script async src="./main.js"></script>
```

3️⃣ **defer**
스크립트를 로드하되 페이지 파싱이 완료될 때까지 실행을 지연시킬 때 사용한다.
```html
<script defer src="./main.js"></script>
```

```
💡 async와 defer의 공통점

스크립트를 다운로드 하는 동안 HTML이 중단되지 않는다.
```
```
💡 async와 defer의 차이점

다수의 스크립트를 다운로드 받을 때, 
async는 먼저 다운로드가 완료된 스크립트를 우선적으로 곧바로 실행하고,
defer는 모든 스크립트가 다운로드 됐을 때 HTML을 완전히 다 읽은 후에 실행한다.
```


--------
**참고 사이트**   
https://hymndev.tistory.com/92   
https://znos.tistory.com/10   
https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag?hl=ko   
https://wikidocs.net/164662   
https://webroadcast.tistory.com/15#:~:text=async%EC%99%80%20defer%EC%9D%98%20%EC%B0%A8%EC%9D%B4%EC%A0%90,%EB%90%9C%20%EC%88%9C%EC%84%9C%EB%8C%80%EB%A1%9C%20%EC%8B%A4%ED%96%89%EB%90%9C%EB%8B%A4.   
https://velog.io/@cherrycock/script-async%EC%99%80-defer%EC%9D%98-%EC%B0%A8%EC%9D%B4    
https://zzandoli.tistory.com/60
