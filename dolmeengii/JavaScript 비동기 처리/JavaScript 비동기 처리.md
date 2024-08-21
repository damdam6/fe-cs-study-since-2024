# 비동기란?
## 🧡 동기와 비동기
동기(Synchronous)는 시간을 맞추어 순차적으로 진행되는 반면에  비동기(Asynchronous)는 시간을 맞추지 않고 동시에 여러개를 진행한다.   
![img](https://velog.velcdn.com/images%2Fyangddu%2Fpost%2Ff6a3a5be-59e9-4fb7-9074-966bc8b61574%2F%E1%84%83%E1%85%A9%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%80%E1%85%B52.jpeg)


## 🧡 JS에서의 비동기 처리 과정
JavaScript는 싱글 스레드이다. 즉, 하나의 일을 할 때 하나밖에 못하는 동기 언어이다. 순차적으로 일을 할 때에 만약, 지금 수행하는 일이 오래 걸린다면 다른 작업들은 지금의 작업이 완료될 때까지 기다려야 한다. 이러한 문제점을 해결하기 위해 비동기로 일을 수행하게 된다.   
[img]()


> **❗JavaScript는 동기 언어라고 했는데 어떻게 비동기로 일을 수행할 수 있다는 것일까?**   
>> 사실 JavaScript에서 사용되는 setTimeout과 같은 비동기 함수는 자바스크립트 내장 함수가 아니다. 브라우저에서 사용을 한다면 browser api인 window object 를 사용하는 것이고, Node 에서 사용한다면 Node api 인 global object를 사용하는 것이다.
그래서 결국 JavaScript는 다른 것의 도움을 받아 비동기처럼 사용할 수 있는 것이다.
   
<br>

### JS 코드 처리 과정
우선, JavaScript의 코드 처리 과정을 간단하게 알아보자. JavaScript는 코드를 실행하려면 JavaScript 엔진이 필요하다.   
이 엔진은 두가지 주요 구성 요소로 구성된다.   

- `Memory Heap` : 메모리 할당이 발생하는 곳으로, 변수를 정의하면 저장이 되는 곳이다.   
- `Call Stack` : 코드가 실행될 때 스택들이 이곳에 쌓인다.  

![img](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Q6kamkgcFVopQWeR.png)

#### 예시로 살펴보기
``` javascript
function B(){
  setTimeout(function(){
    console.log('B-1...');
  }, 1500);
}

function A(){
  console.log('A-1...');
  B();
  console.log('A-2...');
}

A();
```
위 코드의 결과를 예상해보자. 어떤 결과가 나올까?
다음은 콘솔에 찍힌 결과이다.
```
A-1...
A-2...
B-1...
```
왜 B가 중간에 있지 않고 A가 다 출력이 된 후에 마지막에 나온 것일까?  
Call Stack을 살펴보자.   
[img](callstack)

<br>

**setTimeout 처리과정**   
브라우저는 Javascript 엔진 이외에도 `Web APIs`, `Callback Queue`, `Event Loop`가 있다.
> 1️. 비동기 작업인 setTimeout 은 Web API에서 처리해준다.   
> 2️. setTimeout의 시간이 지나서 완료되면 Callback Queue로 함수가 들어오게 된다.    
> 3️. Callback Queue에서 Web API의 콜백 함수들이 대기하게 된다.   
> 4️. Event Loop는 Call Stack 과 Callback Queue 를 주시하고 있다가 Call Stack 이 비게 되면 먼저 들어온 순서대로 Callback Queue에 있는 함수들을 Call Stack에 넣어준다.

![eventloop](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4lHHyfEhVB0LnQ3HlhSs8g.png)


## 🧡 JS에서 비동기 처리하는 방법 3가지
만약 비동기 요청이 여러 개 있을 때 하나의 요청이 다른 요청의 결과에 의존한다면 어떻게 될까?   
아래의 코드에서처럼 둘 다 비동기 요청을 보내는데 두 번째 요청이 첫 번째 요청의 결과가 필요할 수 있다. 하지만 둘 다 병렬적으로 요청을 보내기 때문에 response1을 가지기 전에 두번째 요청이 보내지게 된다.   
이러한 부분은 어떻게 처리할 수 있을까?
``` javascript
// 1st request
const response1 = request('https://abc.com');

// 2nd request
const response2 = request('https://bcd.com', response1);
```
이러한 문제를 해결하기 위해 Callback 함수, Promise, Async/Await 를 이용할 수 있다.

<br>

### 1️⃣ Callback 함수
콜백 함수는 특정 함수에 매개변수로 전달된 함수를 의미한다. 그리고 그 콜백 함수는 함수를 전달받은 함수 안에서 호출된다.
``` javascript
function firstFunction(parameters, callback) {
	const response1 = request(`https://abc.com?id=${parameters.id}`);
	callback(response1);
}

function firstFunction(parameters, callback) {
	const response2 = request(`https://abc.com?id=${parameters.id}`);
	callback();
}

firstFunction(para, function (response1) {
	secondFunction(response1, function () {
		thirdFunction(para, function (){
			// ...
		})
	})
}
```
**Callback 사용의 단점**   
위의 코드에서 볼 수 있듯이 소스 코드를 보는 데 가독성이 떨어지고, 에러 처리를 한다면 모든 콜백에서 각각 에러 핸들링을 해주어야 한다.

<br>

### 2️⃣ Promise 객체
Promise 객체는 new 키워드와 생성자를 사용해 만든다. 생성자는 매개변수로 실행함수를 받으며, 이 함수는 매개 변수로 두가지 함수를 받는다.  
첫번째 함수 `resolve`는 비동기 작업을 성공적으로 완료해 결과를 값으로 반환할 때 호출해야 하고, 두번째 함수 `reject`는 작업이 실패하여 오류의 원인을 반환할 때 호출하면된다. 두번째 함수는 주로 오류 객체를 받는다.    
``` javascript
const myFirstPromise = new Promise((resolve, reject) => {
		// do something asynchronous which eventually calls either
		// resolve(someValue) // fulfilled
		// reject("failure reason") // rejected
});
```
Promise는 자바스크립트 비동기 처리에 사용되며, 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다.   
간단하게 사용해보면 아래와 같이 작성할 수 있다.
``` javascript
let myFirstPromise = new Promise((resolve, reject) => {
	// 우리가 수행한 비동기 작업이 성공한 경우 resolve 호출, 실패한 경우 reject 호출
	// 이 예제는 setTimeout() 을 사용해 비동기 코드를 흉내낸다.
	// 실제로는 여기서 XHR 이나, HTML5 API를 사용할 것이다.
	setTimeout(function() {
		resolve("성공!");
	}, 250)
})

myFirstPromise.then((successMessage) => {
	// successMessage는 위에서 resolve 호출에 제공한 값이다.
	console.log("와!" + successMessage);
});
```


<br>

### 3️⃣ Async, Await
async await 은 비동기 코드를 마치 동기 코드 처럼 보이게 한다. Promise에 then 메서드를 체인 형식으로 호출하는 것보다 가독성이 좋다. await은 async 내부 함수에서만 사용이 가능하며 해당하는 코드의 실행이 완료될 때까지 뒤의 코드로 넘어가지 않는다. 동기식 코드에서는 try… catch 구문을 async/await 구조에서 사용할 수 있다. 
```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response1 => response1.json())
	.then(json => console.log(json))
	.then(() => fetch('https://jsonplaceholder.typicode.com/todos/2'))
	.then(response2 => response2.json())
	.then(json => console.log(json))
	.catch(err => console.log(err))
	.finally(() => console.log("---모든 작업 끝---"));
```

위와 같은 코드를 async await 를 사용하여 아래와 같이 나타낼 수 있다.

``` javascript
async function makeRequests() {
	try {
		const response1 = await fetch('https://jsonplaceholder.typicode.com/todos/1')
		const jsonResponse1 = await response1.json();
		console.log('jsonResponse1', jsonResponse1);
		
		const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/2');
		const jsonResponse2 = await response2.json();
		console.log('jsonResponse2', jsonResponse2);
	} catch(error) {
		console.log(error);
	} finally {
		console.log('---모든 작업 끝---');
	}	
}

makeRequests();
```
