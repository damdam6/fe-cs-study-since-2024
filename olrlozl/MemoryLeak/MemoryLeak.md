## 메모리 누수 (Memory Leak)

더이상 필요하지 않은 데이터가 해제되지 못하고 메모리를 계속 차지하는 현상

## 메모리 누수가 발생할 수 있는 대표적 사례 4가지

메모리 누수가 발생할 수 있는 상황이 누적되면 프로젝트의 성능이 떨어짐. 직접적으로 메모리를 관리할 수 있는 개념은 아니지만, 코드 작성 시 메모리가 누수될 수 있는 상황을 최대한 방어하자

### 1. 불필요한 전역 변수 사용

```jsx
window.hello = 'Hello world'
window.olrlozl = { name: 'olrlozl', age: 25 }
```

- 전역 객체에 등록된 속성들은 실제로 사용하지 않는다고 하더라도, window라는 전역객체는 항상 브라우저에 존재해야하기 때문에, 이렇게 등록된 각각의 데이터들은 garbage collection을 통해서 발견이 되더라도 사용이 되고 있다고 판단하고 메모리 상에서 해제되지 않는다.
- 데이터 등록시 꼭 필요한 경우가 아니라면 window라는 전역객체의 속성으로 해당 내용 등록을 피하는 것이 좋다

### 2. 분리된 노드 참조

```html
<body>
	<button>Remove</button>
	<div class="parent">
		<div class="child">1</div>
		<div class="child">2</div>
	</div>
</body>
```

```jsx
const btn = document.querySelector('button')
const parent = document.querySelector('parent')

btn.addEventListner('click', () => {
	consol.log(parent)
	parent.remove()
}) 
```

- Remove 버튼 첫번째 클릭 시 `<div class="parent">…</div>` 출력 후, html 구조에서 parent라는 클래스 이름의 요소는 제거됨
- Remove 버튼 두번째 클릭 시, 실제로 요소가 제거됐음에도 불구하고 `<div class="parent">…</div>` 가 계속해서 출력됨.
    - parent라는 변수에는 계속 querySelector로 찾아 놓은 요소가 들어있음
    - 그 요소가 가지고 있는 메모리 주소는 실제로 제거된 것이 아님
    
    ⇒ 분리된 노드를 계속해서 참조하고 있기 때문에 발생하는 대표적인 메모리 누수의 예제
    

```jsx
// 메모리 누수 방지법
const btn = document.querySelector('button')

btn.addEventListner('click', () => {
	const parent = document.querySelector('parent')
	consol.log(parent)
	parent && parent.remove()
})
```

- 메모리 누수가 발생하지 않게 하기 위해서 이렇게 하면 됨.
- 두 번째 클릭 이후 부터는 `null`이 출력됨
- parent라는 데이터는 한 번 사용된 후 사용되지 않고 있어서 garbage collection을 통해 특정한 순간에 메모리에서 해제될 수 있다

### 3. 해제하지 않은 타이머

```jsx
let a = 0
setInterval(() => {
	a += 1
}, 100)

setTimeout(() => {
	console.log(a)
}, 1000)
```

- 0.1초마다 a가 1씩 증가 되고, 1초 뒤에 10이 출력됨
- setInterval 은 계속해서 동작하면서 메모리 누수가 발생하게 됨

```jsx
// 메모리 누수 방지법
let a = 0
const intervalId = setInterval(() => {
	a += 1
}, 100)

setTimeout(() => {
	console.log(a)
	clearInterval(intervalId)
}, 1000)
```

- 1초 뒤 `clearInterval`로 `setInterval` 함수 해제하여 메모리 누수 방지

### 4. 잘못된 클로저 사용

```jsx
const getFn = () => {
  let a = 0
  return name => {
	  a += 1
	  consol.log(a)
	  return `Hello ${name}~`
  }
}

const fn = getFn()
console.log(fn('dolmeengii'))
console.log(fn('bloblog'))
console.log(fn('damdam6'))
console.log(fn('gardener'))

// 출력결과
// 1
// Hello dolmeengii~
// 2
// Hello bloblog~
// 3
// Hello damdam6~
// 4
// Hello gardener~
```

- fn이라는 변수에 익명함수가 할당됨
- fn을 호출할 때 인수로 각 name을 넣어주면, name이라는 이름의 매개변수로
- 반환되는 내부의 함수는 자신이 선언된 유효범위를 기억하고 있다가, 자신이 호출될 때 그 유효범위에 특정한 변수(여기서는 a)의 값을 실제로 참조해서 쓸 수 있음
- 클로저에서 사용하는 참조변수는 값이 누적되는 특징이 있어서, `fn(’something’)`이 호출될때마다 a에 1씩 누적됨
- 사실 `a += 1; consol.log(a);` 이 부분은 불필요한 코드임. 이 코드를 통해 a라는 이름의 변수가 계속해서 누적될 수 있는 클로저 개념이 만들어졌기 때문에 그만큼 메모리가 낭비되고 있는 상황임. 불필요하게 클로저가 발생하는 상황을 만들지 말자.

```jsx
const getFn = () => {
  let a = 0
  return name => {
	  return `Hello ${name}~`
  }
}

const fn = getFn()
console.log(fn('dolmeengii'))
console.log(fn('bloblog'))
console.log(fn('damdam6'))
console.log(fn('gardener'))
```

- getFn()가 처음 호출돼서 결과를 반환하고 나면 더이상 a라는 변수는 사용되지 않기 때문에 garbage collection을 통해 메모리에서 해제될 수 있다.
