# 📋 목차

- [1. HTML에 대해](##-1.-html에-대해)
  * [HTML(Hyper Text Markup Language)이란?](###-html(hyper-text-markup-language)이란?)
  * [HTMl의 구성 요소](###-html의-구성-요소)
  * [HTML의 기본 구조](###-html의-기본-구조)
- [2. XHTML에 대해](##.-xhtml에-대해)
  * [XHTML이란?](###.-xhtml(extenstible-html)이란?)
  * [XHTML의 특징](###.-xhtml의-특징)
- [3. HTML vs XHTML](##.-3.-html-vs-xhtml)
  * [문법적 차이점](###-문법적-차이점)
  * [< br > vs < br / >](###-<-br->-vs-<-br-/->)
  * [HTML5의 등장, XHTML의 쇠퇴](###-html5의-등장,-xhtml의-쇠퇴)
- [🔖 참고 | HTML 문서를 XHTML 문서로 변환하는 방법](#####-[참고]-html-문서를-xhtml-문서로-변환하는-방법)
- [📚 참고한 사이트](#####-참고한-사이트)

## 1. HTML에 대해

### HTML(Hyper Text Markup Language)이란?
웹 페이지를 만들기 위한 표준 마크업 언어이다. 또한, HTML은 제목, 단락, 목록 등과 같은 본문을 위한 구조적 의미를 나타내는 것 뿐만 아니라 링크, 인용과 그 밖의 항목으로 구조적 문서를 만들 수 있는 방법을 제공한다. 그리고 이미지와 객체를 내장하여 대화형 양식을 생성하는 데 사용될 수 있다. 

### HTML의 구성 요소
#### 1) 태그
**태그란?**
- 웹문서를 구성하는 명령어로, < > 안에 들어 있는 정보를 정의
- 요소의 일부로 시작태그(요소의 시작, <>)와 종료태그(요소의 끝, < />) 두 종류
- 종료태그가 없는 < br > < hr > 와 같은 태그도 있음

#### 2) 요소
**요소란?**
- 시작태그와 종료태그, 그 사이의 내용으로 구성

**요소의 종류**

1️⃣ **빈 요소 (Empty Element)**

    - 내용 없이 구조적인 기능만 하는 요소
    - < br/ >, < hr/ >

2️⃣ **블록 요소 (Block Element)**

    - 블록 요소 포함 가능, 인라인 요소 포함 가능
    - 블록 요소 이후에 연달아 블록 요소를 사용하면 세로 형태로 표시
	ex) <p>갈비</p><p>찜</p> 의 결과
 	    -> 갈비
      	찜
    - margin과 padding 값을 가질 수 있음
    - h1~h6, div, list, p 등의 시맨틱 태그

3️⃣ **인라인 요소 (Element)**

    - 인라인 요소는 블록 요소 안에 포함될 수 있음
    - 인라인 요소 포함 가능, 블록 요소 포함 불가능
    - 인라인 요소 이후에 연달아 인라인 요소를 사용하면 가로 형태로 표시
	ex) <span>갈비</span><span>찜</span> 의 결과
 	    -> 갈비찜
    - 너비(width)와 높이(height)를 직접 가질 수 없음
        → display: block 을 이용해서 너비 생성 가능
    - a, span, strong 등이 있음

#### 3) 속성
``` HTML
<a href="링크">
	링크입니다. 
</a> 
``` 
**속성이란?**
- 태그를 보조하는 명령어로 태그 안쪽에 있음
- 태그의 문법 명령어가 다루지 못하는 명령을 보조
- width, height, alt, style, href 등이 있음

**속성 값 (Attribute Values)**
- 속성에 대한 값으로, “” 부분에 들어갈 값을 의미


### HTML의 기본 구조
#### 구성 요소
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
**DOCTYPE**

    - DOCTYPE은 HTML 문서 맨 처음에 명시해 이 문서의 버전을 나타냄
    - 반드시 작성해야 하며, 현재 <!DOCTYPE html> 은 HTML5 버전임을 의미

**HTML**

    - 이 문서가 html로 작성됐음을 브라우저에게 알림
    - 문서의 시작과 끝을 알리는 태그
    - lang 속성을 가지며, 이것으로 문서의 언어를 설정할 수 있음

**Head**

    - 메타 데이터와 타이틀을 넣어주는 곳
    - 웹 페이지에서 직접적으로 보이지는 않지만 페이지 인코딩 방식이나 참조하는 리소스 등 많은 설정이 가능
    -> 예를 들어 위 코드에서 
    <meat charset="UTF-8"> : 인코딩 방식을 정의한다.
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> : IE 문서 모드라는 뜻
    <meta name="viewport"> : 뷰포트의 크기를 정의한다.
    

**Body**

    - 주로 브라우저 화면에 보이는 것이 들어감
    - HTML 문서의 이미지, 리스트, 비디오 등과 같은 모든 콘텐츠를 나타내는 데 사용

* * *


## 2. XHTML에 대해
### XHTML(eXtensible HTML)이란?
XHTML은 HTML과 동등한 표현 능력을 지닌 XML Markup Language로, HTML의 문법에 따르지만 좀 더 명확하고 구조적이다. 웹 컨텐츠가 기존의 전통 컴퓨터에서 벗어나 다양한 기기들에 사용되기 시작하면서 부정확한 HTML을 지원하는데 필요한 자원이 부족한 환경이 생겨났고, 이로 인해 문서가 검사될 수 있도록 문서를 규정하는 XHTML이 등장했다.

### XHTML의 특징
**1) 구조적 측면**
  - XHTML DOCTYPE을 반드시 명시해야 함
  - < html > 태그의 xmlns 속성을 반드시 명시해야 함
  - < html >, < head >, < title >, < body > 태그를 반드시 사용해야 함

**2) 요소적 측면**
  - 모든 태그는 반드시 닫혀야 하고, 순서대로 닫아야 함
  - 모든 요소는 반드시 소문자로 작성되어야 함
  - XHTML 문서는 반드시 하나의 root 요소를 포함해야 한다.

**3) 속성적 측면**
  - 속성 이름은 반드시 소문자로 사용되어야 함
  - 속성값은 반드시 따옴표로 감싸야 함
  - 속성값 생략이 없어졌기 때문에 반드시 속성값을 명시해야 함


* * *
## 3. HTML vs XHTML
### 문법적 차이점
1️⃣ 종료 태그가 없는 빈 태그(empty tag)는 반드시 끝에 공백과 함께 슬래시(/)를 붙여야 합니다.
```HTML
HTML  : <hr>
XHTML : <hr />
```
2️⃣ 비어있지 않은 요소는 반드시 종료 태그를 가져야 합니다.
```HTML
HTML  : <p>첫 번째 문장</p><p>두 번째 문장
XHTML : <p>첫 번째 문장</p><p>두 번째 문장</p>
```
3️⃣ 요소들은 반드시 열린 순서대로 닫혀야 합니다.
```HTML
HTML  : <em><p>This is some text.</em></p>
XHTML : <em><p>This is some text.</p></em>
```
4️⃣ <img>태그에는 반드시 alt 속성이 기술되어야 합니다.
```HTML
HTML  : <img src="alternative.png" />
XHTML : <img src="alternative.png" alt="explanation" />
```
5️⃣ 모든 텍스트(text)는 반드시 태그로 감싸야 합니다.
```HTML
HTML  : <body>본문에 사용되는 텍스트 단락</body>
XHTML : <body><p>본문에 사용되는 텍스트 단락</p></body>
```
6️⃣ 속성값은 반드시 따옴표로 감싸야 합니다.
```HTML
HTML  : <td rowspan=3>
XHTML : <td rowspan="3">
```
7️⃣ 태그 이름이나 속성 이름에는 반드시 소문자만을 사용해야 합니다.
```HTML
HTML  : <BODY><P>태그 이름과 태그 속성은</P></BODY>
XHTML : <body><p>반드시 소문자만을 사용하자.</p></body>
```
8️⃣ 속성값 생략이 없어졌으므로, 반드시 속성값을 명시해야 합니다.
```HTML
HTML  : <textarea readonly>읽기만 가능합니다.</textarea>
XHTML : <textarea readonly="readonly">읽기만 가능합니다.</textarea>
```

### < br > vs < br / >
``` java
<br> vs <br />

HTML에서는 <br>로 사용하고 둘의 문법상 차이는 거의 없지만, HTML이 아닌 XHTML에서의 호환성을 위해 브라우저에서는 <br /> 로 사용해도 자동으로 <br>으로 바꿔 사용한다.

HTML을 생성하는 일부 시스템은 XML 생성기를 기반으로 할 수 있으므로 배어(bare) <br> 태그만 출력하는 기능이 없기 때문에 그러한 시스템을 사용하는 경우에는 <br />를 사용하는 것이 좋다.

그러나 XHTML을 사용하는 사람은 거의 없다. 콘텐츠를 XHTML로 해석하려면 application/xhtml+xml로 제공해야 하며 이전 버전의 IX에서는 작동하지 않기 때문에 작은 오류가 발생해도 페이지가 브라우저에 표시되지 않기 때문이다. 따라서 웹에서 XHTML처럼 보이는 대부분은 실제로 HTML로 제공되고 해석된다.

⇒ 결론

HTML : <br>이 기본, <br/>, <br /> 혼용 가능
XHTML : <br />이 기본, <br>, <br/> 혼용 가능
```

### HTML5의 등장, XHTML의 쇠퇴
XHTML은 HTML 4.01 버전의 element 요소를 사용하고, 문법은 XML을 따른다고 한다. HTML5 등장 이후, 여전히 HTML은 태그 닫는 것을 선택사항으로 두지만 오류를 야기하지 않도록 한다. 따라서 코드를 적게 사용하더라도 브라우저에서 모든 태그를 인식하게 함으로써 웹사이트의 크기 감량과 빠른 코딩이 가능해졌다. HTML5가 정립된 이후 엄격한 형식 위주의 XHTML은 사용되는 일이 많이 없다고 한다.
###### HTML에서는 닫는 태그를 작성하지 않아도 프로그램이 실행이 된다.
``` HTML
<!-- HTML 에서는 이렇게 작성해도 실행이 되지만, XHTML 에서는 이렇게 작성하면 실행이 안됨-->
<태그> 안녕하세요
```


* * *
##### [참고] HTML 문서를 XHTML 문서로 변환하는 방법
1. 첫줄에 다음 코드를 추가합니다.
``` HTML
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
```
2. xmlns 속성을 추가합니다.
3. 모든 태그 이름을 소문자로 바꿔줍니다.
4. 모든 빈 태그를 닫아줍니다.
5. 모든 속성 이름을 소문자로 바꿔줍니다.
6. 모든 속성값을 따옴표로 둘러쌉니다.

* * * 
##### 참고한 사이트
- https://www.tcpschool.com/html/html_expand_xhtml
- https://gofo-coding.tistory.com/entry/XHTMl
- https://velog.io/@ryalya/Android-XHTML%EC%9D%B4%EB%9E%80-%EB%AC%B8%EB%B2%95-HTML%EC%B0%A8%EC%9D%B4-%EC%9A%94%EC%86%8C-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EC%A0%95%EB%A6%AC
