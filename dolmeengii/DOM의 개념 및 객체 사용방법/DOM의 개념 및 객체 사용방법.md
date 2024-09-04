# DOM (Document Object Model)
## 1) DOM 이란?
### DOM의 개념
DOM(Document Object Model)은 메모리에 웹 페이지 문서 구조를 트리구조로 표현해서 웹 브라우저가 HTML 페이지를 인식하게 해준다. 웹 페이지를 이루는 요소들을 자바스크립트가 이용할 수 있게끔 브라우저가 트리구조로 만든 객체 모델을 의미한다.

다음은 예시코드에 대한 DOM 트리를 표현한 것이다.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Document</title>
</head>
<body>
    <h1>h1태그</h1>
    <p>p태그</p>
</body>
</html>

```

![DOM_TREE_EXAMPLE](https://www.freecodecamp.org/news/content/images/2024/01/9-dom-example.png)

<br>
<br>
<br>


### DOM 조작
위에 보이는 DOM 트리를 DOM에서 제공해주는 API를 사용하여 조작할 수 있다. 이 API를 이용해서 DOM 구조에 접근하거나 원하는 요소를 수정하거나 삭제할 수 있다.
```html
<button class="button"> Clink Me </button>
```

```javascript
// document는 브라우저에서 제공하는 window 객체 중 하나
// querySelector 를 사용하면 DOM 안에 class 이름이 button인 요소에 접근할 수 있음
var button = document.querySelector('.button');
button.onclick = function() {
  // DOM 안에 있는 요소의 스타일을 직접 변경한다. (DOM 조작)
	this.style.backgroundColor = "red";
}
```

### 웹 페이지 빌드 과정
브라우저가 서버에서 페이지에 대한 HTML 응답을 받고 화면에 표시하기 전에 여러 단계가 있다. 다음은 웹 브라우저가 HTML 문서를 읽고 스타일을 입혀 뷰포트에 표시하는 과정이다.   

![Critical_Render_Path](https://dimension85.com/images/critical-render-path-large.jpg)
   

**1️⃣ DOM tree 생성**   
     렌더 엔진이 문서를 읽어들여 파싱하고 어떤 내용을 렌더링할지 결정한다. 

**2️⃣ Render tree 생성**   
     브라우저가 DOM과 CSSOM(CSS Object Model)을 결합하는 과정으로, 이 프로세스는 화면에 보이는 모든 컨텐츠와 스타일 정보를 모두 포함하는 최종 렌더링 트리를 출력한다. 즉, 화면에 표시되는 모든 노드의 컨텐츠 및 스타일 정보를 포함한다.

**3️⃣ Layout (reflow)**   
     브라우저가 페이지에 표시되는 각 요소의 크기와 위치를 계산하는 단계이다.

**4️⃣ Paint**   
     실제 화면에 그리는 단계이다.   


<br>
<br>

## 2) Document Object 사용하기
### Document Object 란?
Window 객체가 브라우저 창이라고 한다면, document 객체는 브라우저 내에서 컨텐츠를 보여주는 웹 페이지 자체라고 할 수 있다.
   
<br>
<br>

### Document 객체 프로퍼티 사용
document 객체를 이용해서 웹페이지의 상태와 모든 HTML 태그들에 접근할 수 있다.
```javascript
let val;

val = document;

val = document.baseURI; // 웹 페이지에 대한 절대 URI 반환
val = document.head; // <head> 태그 반환
val = document.body; // <body> 태그 반환

val = document.forms; // <form> 태그 반환
val = document.forms[0].id;
val = document.forms[0].classList;
val = document.forms[0].className;

val = document.scripts; // <script> 태그 반환
val = document.scripts[0].getAttrubute('src');

console.log(val); // console 에서 반환값 확인해보기
```
<br>
<br>


### Document 객체 메서드 사용
document 객체의 메서드를 사용하면 다양한 방법으로 웹 페이지 내의 태그들에 접근할 수 있다.

<br>

**하나의 요소에 접근할 때**   
아래는 하나의 요소에 접근할 때 사용할 수 있는 세가지 메서드이다.
```jsx
// 파라미터로 전달한 ID를 가진 태그를 반환
document.getElementById(요소아이디);

// 파라미터로 전달한 name 속성을 가진 태그를 반환
document.getElementByName(요소의 name 속성값);

// 파라미터로 전달한 선택자에 맞는 첫 번째 태그를 반환
document.querySelector(선택자);
```

아래는 위의 세가지 코드를 사용한 예시 코드이다. 
```jsx
const headerContainer = document.getElementById('header-container');
headerContainer.style.display = 'none';
headerContainer.textContent = 'Text Content'; // 텍스트 컨텐츠 내용 바꾸기
headerContainer.innerText = 'Inner Text';
headerContainer.innerHTML = '<span>Inner HTML</span>'; // HTML 요소 삽입

document.querySelector('#form-first-div');
document.querySelector('li').style.color = 'blue';
document.querySelector('ul il').style.color = 'red';

document.querySelector('li:last-child').style.color = 'red';
document.querySelector('li:nth-child(even)').style.color = 'lightgray';
```

<br>

**여러 요소에 접근할 때**   
아래는 여러 요소에 접근할 때 사용할 수 있는 세가지 메서드이다.
```jsx
// 파라미터로 전달한 태그 이름을 가진 모든 태그들을 반환 (배열)
document.getElementByTagName(태그 이름);

// 파라미터로 전달한 클래스 이름을 가진 모든 태그들을 반환 (배열)
document.getElementByClassName(클래스 이름);

// 파라미터로 전달한 선택자에 맞는 모든 태그를 반환 (배열)
document.querySelectorAll(선택자);
```
아래는 위의 세가지 코드를 사용한 예시 코드이다. 
```jsx
// 예시 코드
const items = document.getElementsByClassName('list-group-item');
console.log(items);

items[0].style.color = 'blue';
items[3].textContent = 'Hi';

let lists = document.getElementByTagName('li');
console.log(lists); // Collections 값으로 반환
lists.forEach((list) => {
	console.log(list);
}); // Collectios 일 때 forEach 사용 불가 -> Error 메시지 반환

lists = Array.from(lists);
console.log(lists); // Array 값으로 반환
lists.forEach((list) => {
	console.log(list);
}); // Array 의 요소를 반환
```

<br>
<br>
<br>

## 3) DOM 탐색하기

### Document 탐색하기

DOM을 이용하면 요소와 요소의 콘텐츠에 무엇이든 할 수 있다. 하지만 무언가를 하기 전에 당연히 조작하고자 하는 DOM 객체에 접근하는 것이 선행되어야 한다.   
DOM에 수행하는 모든 연산은 document 객체에서 시작하는데, 이 때 document 객체는 DOM에 접근하기 위한 `진입점` 이다. 이 진입점을 통과하면 어떤 노드이든지 접근할 수 있다.   
아래 그림은 DOM 노드 탐색이 어떤 관계를 통해 이루어지는지를 보여준다.

<br>

![DOM_탐색](./image/%08DOM%ED%83%90%EC%83%89.png)

#### 트리 상단의 documentElement와 body
DOM 트리 상단의 노드들은 document 가 제공하는 프로퍼티를 사용해 접근할 수 있다.   
1️⃣ `<html>` = `document.documentElement`   
 **document**를 제외하고 DOM 트리 꼭대기에 있는 문서 노드는 `<html>` 태그에 해당하는 docuement.documentElement이다. 

2️⃣ `<body>` = `document.body`   
 **document.body**는 `<body>`요소에 해당하는 DOM 노드로, 자주 쓰이는 노드 중 하나이다.

3️⃣ `<head>` = `document.head`   
`<head>` 태그는 **document.head**로 접근할 수 있다.

<br>

> ❗️`document.body`가 null일 수 있으니 주의해야 한다.   
> 스크립트를 읽는 도중에 존재하지 않는 요소는 스크립트에서 접근할 수 없다.    
> 브라우저가 아직 **document.body** 를 읽지 않았기 때문에 `<head>` 안에 있는 스크립트에서는 **document.body**에 접근하지 못한다.   
> 아래 예시 코드를 보자. 위와 같은 이유로 인해 첫번째 alert 창에는 null이 출력될 것이다.
> ```html
> <html>
>   <head>
>     <script>
>       alert( "HEAD: " + document.body ); // null, 아직 <body>에 해당하는 노드가 생성되지 않았음
>     </script>
>   </head>
>   <body>
>     <script>
>       alert( "BODY: " + document.body ); // HTMLBodyElement, 지금은 노드가 존재하므로 읽을 수 있음
>     </script>
>   </body>
> </html>
> 
<br>

### 자식 노드 탐색하기

childNodes, firstChild, lastChild로 자식 노드를 탐색할 수 있다.

```jsx
let val;

const list = document.querySelector("ul.list-group");
const listItem = document.querySelector("li.list-group-item:first-child");

console.log('list', list);
console.log('listItem', listItem);

// childNode 반환하기
val = list.childNodes; // list의 자식 노드들에 대한 NodeList 반환, line break 도 반환됨
val = list.childNodes[0]; // NodeList 의 첫번째 요소 반환
val = list.childNodes[0].nodeName;
val = list.childNodes[3];
val = list.childNodes[3].nodeType; // NodeType 반환

/* NodeType 번호별 의미하는 것
1. Element
2. Attribute (deprecated)
3. Text node
8. Comment node (주석)
9. Document itself
10. Doctype
*/

// children element nodes 반환
val = list.children; // HTML Collection 반환, line break 포함 안됨
val = list.children[1];
list.chlidren[1].textContent = 'Hi';

// First child
val = list.firstChild; 
// list.firstChlid === list.childNodes[0];
val = list.firstElementChlid; 

// Last Chlid
val = list.lastChild; 
// list.lastChild === list.childNodes[list.childNodes.length -1];
val = list.lastElemntChild;

// child 요소 count
val = list.childElementCount;

console.log('val', val);

```

<br>

> **💡DOM Collection**   
>   
> 위의 예시 코드에서 childNode는 마치 배열 같아 보이지만, 배열이 아닌 반복가능(iterable)한 유사 배열 객체인 컬렉션(collection)이다.

<br>

> **💡childeNode가 collection 이기 때문에 가지는 특징**
>   
> 1️⃣ 배열이 아니지만 `forEach` , `for .. of`  사용 가능 (`for … in` 은 불가능)
> ```jsx
> for(let node of list.childNodes){
> 	console.log(node);
> }
> ```
> 2️⃣ 배열이 아니기 때문에 배열에서 사용가능한 메서드 사용 불가
> ```jsx
> console.log(list.chlidNodes.filter); // undefined : filter 메서드가 없다.
> ```
> 3️⃣ 배열 메서드를 사용하고 싶다면 `Array.from` 을 사용하여 배열을 만들어 사용해야 한다.
> ```jsx
> console.log(Array.from(list.childNodes).filter);
> ```
> <br>

<br>
<br>

### 부모와 형제 노드 탐색하기

```jsx
// parent Node 반환
val = listItem.parentNode;
val = listItem.parentElement;
val = listItem.parentElement.parentElement;

// next sibling 반환
val = listItem.nextSibling;
val = listItem.nextElementSibling;
val = listItem.nextSibling.nextElementSibling;
val = listItem.nextSibling.nextElementSibling.previousElementSibling;

// previous Sibling 반환
val = listItem.previousSibling;
val = listItem.previousElementSibling;
```

#### 정리

`자식 노드` : 바로 아래의 자식 요소를 나타낸다.   
`후손 노드` : 중첩 관계에 있는 모든 요소를 의미하며, 자식 노드와 그것의 자식 노드가 모두 후손 노드

<br>

##### ✅ 탐색 프로퍼티

| 모든 노드에 적용 가능 | parentNode, childNode, firstChild, lastChild, previousSibling, nextSibling |
| --- | --- |
| 요소 노드만 적용 가능 | parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling |

<br>
<br>


## 4) Document 이용하여 요소 생성하기
### createElement
`document.createElement(tagName);` 을 사용하여 요소를 생성 할 수 있다.

#### 예시 코드
```jsx
// element 생성하기
const li = document.createElement('li');

// class 추가하기
li.className = 'list-group-item';

// id 추가하기
li.id = 'new-item';

// 속성 추가하기
li.setAttribute('name', 'new list item');

// Link element 생성하기
const link = document.createElement('a');

link.className = 'alarm-item';
link.innerHTML = '<i class="bi-alarm"></i>' // bootstrap 에서 아이콘 가져오기

li.appendChild(link);

// 상위 태그에 하위 태그로 집어넣기
document.querySelector('ul.list-group').appendChild(li);
```
<br>
<br>

## 5) Document 이용하여 Node 삭제, 교체 하기
### removeChild
`parentNode.removeChild(node)` 를 사용하여 하나의 노드를 삭제한다. 삭제 시 삭제할 노드를 자식으로 가진 부모 노드에서 실행된다.
```jsx
const listParent = document.querySelector('ul');
const list = document.querySelectorAll('li');

listParent.removeChild(list[0]);
```

### replaceChild
`parentNode.replaceChild(new Chlid, old Child)` 를 사용하여 원래 있는 child를 삭제하고 새 child로 교체한다. 교체 시 교체할 노드를 자식으로 가진 부모 노드에서 실행된다.
```jsx
const listParent = document.querySelector('ul');
const list = document.querySelectorAll('li');

const oldElement = document.getElementById('A');
const newElement = document.createElement('span');

newElement.textContent = 'Hi';

oldElement.parentNode.replaceChild(newElement, oldElement);
```