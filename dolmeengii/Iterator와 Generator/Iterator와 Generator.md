# 1. Iterator

## 1) Iterable 과 Iterator

### Iterable 란?

배열은 반복 가능한 객체이며, 반복이 가능하다는 것을 Iterable이라고 한다.    
for..of 를 이용할 수 있거나, `[Symbol.iterator]()` 이 값을 가지면 Iterable 한 것이다.   
Iterable 한 것 중에는 Set, Array, Map 등이 있다. 

### Iterator 란?

이터레이터는 이터러블에 `Symbol.iterator` 메소드를 호출했을 때 반환되는 값으로, 반복자는 next()를 호출하여 {value: , done: } 두 개의 속성을 가지는 객체를 반환하는 객체이다.

## 2) Iterator 직접 생성해보기

```jsx
function makeIterator(numbers) {
	let nextIndex = 0;
	
	return {
		nex: function() {
			return nextIndex < numbers.length ? 
						{value: numbers[nextIndex++], done: false} : 
						{value: undefined, done: true};
		}
	}
}

// 숫자 배열 생성
const numbersArr = [1, 2, 3];

// 이터레이터에 숫자 배열 넣어주기
const numbersIterator = makeIterator(numbersArr);

console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
```
#### 결과
![이미지](https://github.com/dolmeengii/fe-cs-study/blob/04b5ea7d5b61f0456451ac0b3bdb3f01ee682f0b/dolmeengii/Iterator%EC%99%80%20Generator/image/iter.png)


**Symbol 사용**
```jsx
function makeIterator(numbers) {
	let nextIndex = 0;
	
	return {
		nex: function() {
			return nextIndex < numbers.length ? 
						{value: numbers[nextIndex++], done: false} : 
						{value: undefined, done: true};
		}
	}
}

// 숫자 배열 생성
const numbersArr = [1, 2, 3];

// [Symbol.iterator]() 사용하면 반복 가능한 값을 반복기로 생성가능
const numbersIterator = numbersArray[Symbol.iterator]();

console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
```
#### 결과
![이미지](https://github.com/dolmeengii/fe-cs-study/blob/04b5ea7d5b61f0456451ac0b3bdb3f01ee682f0b/dolmeengii/Iterator%EC%99%80%20Generator/image/iter2.png)


# 2. Generator

---

## 1) Generator 란?
### Genrerator의 개념
Generator Function 은 사용자의 요구에 따라 다른 시간 간격으로 여러 값을 반환할 수 있다.

`일반 함수` : 단 한 번의 실행으로 함수 끝까지 실행된다.   
`제너레이터 함수` : 사용자의 요구에 따라 일시적으로 정지될 수도 있고, 다시 시작될 수도 있다.

### Gernerator 사용 시 주의 사항
- 제너레이터 함수는 `function*` 키워드를 사용한다. 
- 제너레이터 함수는 화살표 함수를  사용할 수 없다.
- 별표의 위치는 function 키워드와 함수 이름 사이 아무 곳이나 붙여도 되지만, function 키워드 바로 뒤에 붙이는 것이 권장된다. 

## 2) Generator 함수의 특징
#### 1️⃣ 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도(yield)할 수 있다.
> 함수 호출자는 함수 실행을 일시 중지시키거나 다시 시작하게 하도록 할 수 있다.

#### 2️⃣ 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
> 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고 받을 수 있다. 즉, 제너레이터 함수가 함수 호출자에게 자신의 상태를 전달할 수 있고 함수 호출자로부터 추가적으로 상태를 전달받을 수 있다는 것이다.

#### 3️⃣ 제너레이터 함수는 호출 시 제너레이터 객체를 생성해 반환한다.
> 제너레이터 함수는 코드 블록을 실행시키는 것이 아니라 제너레이터 객체를 생성해서 반환한다.

<br>

> **💡 Generator 객체란?** <br>
> 제너레이터 함수를 호출했을 때 리턴되는 객체로, 제너레이터 객체는 이터러블이면서 동시에 이터레이터이다.


## 3) Generator 직접 생성해보기

```jsx
// Generator Function
function* sayNumbers() {
	// yield* [1, 2, 3]; 아래 세 줄의 코드를 이 코드 한개로 쓸 수 있다.
	yield 1;
	yield 2;
	yield 3;
}

// generator 변수 number 선언, generator 함수로 초기화 하여 생성자 함수를 반환한다.
const number = sayNumbers();

console.log(number.next().value);
console.log(number.next().value);
console.log(number.next().value);

// return을 사용하면 값을 집어넣을 수 있다.
console.log(number.return(10));
```

> **💡 yield 란?**   
> 제너레이터 함수의 실행을 일시적으로 정지시킨다.
즉, 일반 함수의 return 과 매우 유사하다.


### Lazy Evaluation

계산의 결과값이 필요할 때까지 계산을 늦춰서 필요한 데이터를 필요한 순간에 생성하는 것

```jsx
function* createIds() {
	let index = 1;
	while (true) {
		yield index++;
	}
}

const gen = createIds();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
```