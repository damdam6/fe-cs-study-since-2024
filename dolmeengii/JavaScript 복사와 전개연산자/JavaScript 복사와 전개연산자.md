# JavaScript 복사와 전개연산자

## 1. JavaScript의 복사

### 1) 얕은 복사(Shallow Copy)

얕은 복사는 객체의 최상위 속성만 복사하고, 중첩된 객체는 원본 객체와 같은 참조를 유지한다.

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

// copy의 b.c를 수정
copy.b.c = 3;

console.log(original.b.c); // 3 (원본도 변경됨)
```

위의 예에서 `copy`는 `original`의 얕은 복사본이다. copy의 b 속성은 original의 b 속성과 같은 객체를 참조하므로 copy.b.c를 수정하면 original.b.c도 영향을 받는다.

<br>

### 2) 깊은 복사(Deep Copy)

깊은 복사는 객체의 모든 중첩된 속성까지 복사하여 원본 객체와 완전히 독립적인 복사본을 생성한다. JavaScript에서 깊은 복사를 수행하려면 일반적으로 다음과 같은 방법을 사용한다.

<br>

**1️⃣ JSON 방법** <br>
객체를 JSON 문자열로 변환한 후 다시 객체로 변환하는 방법이다. 이 방법은 중첩된 객체를 포함한 깊은 복사를 수행하지만, 함수나 undefined, Symbol과 같은 특수한 값은 복사할 수 없다.

```javascript
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 3;

console.log(original.b.c); // 2 (원본은 변경되지 않음)
```

**2️⃣ 재귀 함수** <br>
객체의 모든 속성을 재귀적으로 복사하는 함수를 작성하여 깊은 복사를 수행할 수 있다. 이 방법은 객체의 타입을 확인하고, 중첩된 객체에 대해 재귀적으로 호출하여 복사한다.

```js
function deepCopy(obj) {
  // null 또는 원시 타입인 경우 그대로 반환
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 배열인지 확인
  if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let item of obj) {
      arrCopy.push(deepCopy(item)); // 재귀 호출
    }
    return arrCopy;
  }

  // 객체인 경우
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]); // 재귀 호출
    }
  }
  return copy;
}

// 사용 예시
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const deepCopyObj = deepCopy(original);

deepCopyObj.b.c = 3;
deepCopyObj.b.d[0] = 5;

console.log(original.b.c); // 2 (원본은 변경되지 않음)
console.log(original.b.d[0]); // 3 (원본은 변경되지 않음)
```

**3️⃣ 라이브러리 사용** <br>
Lodash와 같은 라이브러리에서 제공하는 cloneDeep 함수를 사용하여 깊은 복사를 수행할 수 있다. Lodash를 사용하면 복잡한 객체 구조도 간단하게 깊은 복사를 할 수 있다.

먼저 Lodash를 설치해야 한다. Node.js 환경에서는 다음과 같이 설치할 수 있다.

```bash
npm install lodash
```

그 다음, `cloneDeep` 함수를 사용하여 깊은 복사를 수행할 수 있다.

```javascript
const _ = require("lodash");

// 사용 예시
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const deepCopyObj = _.cloneDeep(original);

deepCopyObj.b.c = 3;
deepCopyObj.b.d[0] = 5;

console.log(original.b.c); // 2 (원본은 변경되지 않음)
console.log(original.b.d[0]); // 3 (원본은 변경되지 않음)
```

<br>
<br>

## 2. `...` 전개 연산자 (Spread Operator)

전개 연산자는 ECMAScript6(2015)에서 새롭게 추가됐으며, 특정 객체 또는 배열의 값을 다른 객체, 배열로 복제하거나 옮길 때 사용한다.
<br>
전개 연산자를 사용하면 기존 배열이나 객체를 변경하지 않고 새로운 배열이나 객체를 생성할 수 있어, 불변성을 유지할 수 있다. 또한, 배열이나 객체를 결합할 때 코드가 더 직관적으로 보인다는 장점이 있다.
<br>

### 1) 배열

#### 배열 복사

```js
const numbers = [1, 2, 3];

// 배열 복사 후 새로운 요소 추가
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers); // [1, 2, 3, 4, 5]
```

#### 배열 조합

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

const arrWrap1 = arr1.concat(arr2, arr3);
const arrWrap2 = [...arr1, ...arr2, ...arr3];

console.log(arrWrap1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arrWrap2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const arr1 = [1, 2, 3];
const arr2 = [4, 5];

// 전개 연산자를 사용하지 않았을 때
Array.prototype.push.apply(arr1, arr2);

// 전개 연산자를 사용했을 때
arr1.push(...arr2);

console.log(arr1); // [1, 2, 3, 4, 5]
```

#### 기존 배열을 보존

```js
// 원본 배열까지 역순으로 변경됨
const arr1 = [1, 2, 3];
const arr2 = arr1.reverse();

console.log(arr1); // [3, 2, 1]
console.log(arr2); // [3, 2, 1]

// 원본 배열 유지
const arr3 = [1, 2, 3];
const arr4 = [...arr3].reverse();

console.log(arr3); // [1, 2, 3];
console.log(arr4); // [3, 2, 1];
```

<br>

### 2) 객체

#### 객체의 속성 복사

```js
const original = { a: 1, b: 2, c: 3 };

// c 속성을 제외한 새로운 객체 생성
const { c, ...rest } = original;

console.log(rest); // { a: 1, b: 2 }
```

#### 객체 조합

```js
const obj1 = {
  a: "A",
  b: "B",
};

const obj2 = {
  c: "C",
  d: "D",
};

const objWrap1 = { obj1, obj2 };
console.log(objWrap1);

const objWrap2 = { ...obj1, ...obj2 };
console.log(objWrap2);

{ // objWrap1
	obj1: {
		a: 'A',
		b: 'B'
	},
	obj2: {
		c: 'C',
		d: 'D'
	}
}

{ // objWrap2
	a: 'A',
	b: 'B',
	c: 'C',
	d: 'D'
}
```

<br>

### 3) 함수 매개변수 전달

```js
const numbers = [1, 2, 3, 4, 5];

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

// 전개 연산자를 사용하여 배열의 요소를 인자로 전달
const result = sum(...numbers);

console.log(result); // 15
```

> 💡 전개 연산자(Spread Operator)의 복사 원리 <br>
> 전개 연산자는 얕은 복사(shallow copy)를 수행하는데, 이는 객체나 배열의 최상위 속성이나 요소만 복사하고, 중첩된 객체나 배열은 참조로 복사한다는 의미이다.

<br>
<br>

---

## 요약

- 전개 연산자는 얕은 복사를 수행하여 최상위 속성만 복사하고, 중첩된 객체는 참조로 복사한다.
- 깊은 복사를 원할 경우, JSON 방법, 재귀 함수, 또는 외부 라이브러리를 사용할 수 있다.

이러한 복사 원리를 이해하면, 객체나 배열을 다룰 때 의도치 않은 변경을 방지하고, 코드의 안정성을 높일 수 있다.
