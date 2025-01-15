## React 의 불변성
### 불변성이란?
리액트 컴포넌트에서 상태관리를 할 때에 불변성을 지키는 것이 매우 중요하다. 여기서 불변성이란 값이나 상태가 변하지 않는 것을 의미한다.
   

#### 예시로 보는 불변성
자바스크립트의 타입을 예시로 봐보자. 자바스크립트에는 원시타입인 Boolean, Number, String, null, undefined, Symbol 이 있고, 객체타입인 Object 도 있다.

아래 예시로 바로 들어가보자.
```js
let string = 'variable1'
string = 'variable2'
```
위 코드를 봐보자. 변수 string의 값은 variable1 에서 variable2로 값이 변경된 것처럼 보인다. 하지만 실제 메모리 영역에는 variable1과 variable2가 둘 다 존재한다.

이를 이해하려면 자바스크립트의 변수 선언과 데이터 할당 방식에 대해 알아야 하는데, 이에 대해 간단 요약 하자면 자바스크립트에서는 변수에 대한 데이터 영역이 존재하여, 변수에 데이터를 할당하면 그 데이터 영역안에서 값이 여러개 저장될 수 있다. (이는 참고 사항에 있는 gardener의 글을 읽어보면 도움이 될 것이다.)

정리해보자면 위 예시에는 메모리 영역을 2개를 사용한 것이다. 변수 string에 대한 두가지의 데이터 variable1, variable2에 대한 각각의 메모리 영역이 존재한다. 자바스크립트의 원시타입은 불변성을 유지하기 때문에 이러한 결과가 나오게 된다.

반대로 객체타입인 Object는 어떨까?  
```js
let array=[1, 2, 3, 4]
array.push(5) 
array=[1, 2, 3, 4]
```
변수 array에 대한 데이터 메모리 영역 1에 처음 선언한 [1,2,3,4]가 존재한다. 그 곳에 `5` 라는 수를 push 하여 해당 데이터는 [1,2,3,4,5] 가 되어 불변성이 지켜지지 않았다.   
위 예시의 가장 마지막 코드인 `array=[1,2,3,4]` 에서는 변수 array에 대한 데이터 메모리 영역 2가 새로 생겨 불변성이 지켜졌다.   

**불변성이라함은 메모리 영역에서의 데이터 값이 변경될 수 없다는 것을 의미한다.**

<br>
<br>

### React의 불변성
리액트에서 상태 업데이트를 하려면 불변성이 중요하다고 한다. 왜 불변성이 중요할까? 그것은 바로 리액트에서 상태 업데이트를 하는 원리 때문이다.   

리액트에서 상태를 업데이트 할 때에는 얕은 비교를 수행하는데, 이는 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다. 리액트에서는 객체의 참조값만을 비교하여 상태 변화를 감지하기 때문에 객체타입에서 속성이나 값을 추가하고 삭제하는 불변성이 지켜지지 않은 변경은 상태가 바뀌었지만, 리액트에서 파악을 하지 못한다.
   
예시로 더 알아보자. 
##### 예시 코드 1
```js
const array=[1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킨다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사한다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
    foo: 'bar',
    value: 1
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킨다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
    ...object, // 기존에 있었던 내용을 모두 복사해서 넣는다.
    value: object.value +1 // 새로운 값을 덮어 쓴다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```
> 전개 연산자를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사를 하기 때문에 내부의 값이 객체 혹은 배열이라면 내부의 값 똫나 따로 복사해주어야 한다. 

##### 예시 코드 2
```js
const todos = [{id: 1, checked: true}, {id: 2, checked: true}];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
    ...nextTodos[0],
    checked: false
};

console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해주었기 때문에 false
```
<br>

만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야하므로 다음과 같이 해주어야 한다.
##### 예시 코드 3
```js
const nextComplexObject = {
    ...complexObject,
    objectInside: {
        ...complexObject.objectInside,
        enabled: false
    }
};

console.log(complexObject === nextComplexObject); //false
console.log(complexObject.objectInside === nextComplexObject.objectInside); // false
```
<br>
이렇게 리액트에서 불변성을 지키는 것을 예시를 통해 알아보았다. 하지만 이보다 배열 혹은 객체의 구조가 복잡해진다면 불변성을 유지하면서 업데이트 하는 것이 상당히 까다로워질 것이다. 이럴 때에는 immer라는 라이브러리의 도움을 받으면 편하게 작업할 수 있다고 하는데 이에 대해서는 추후에 다뤄보도록 하겠다.


---
#### 🔖 참고
- 리액트를 다루는 기술 - 김민준 지음
- [[velog] 리액트에서 불변성이란](https://velog.io/@jma1020/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EB%B6%88%EB%B3%80%EC%84%B1%EC%9D%B4%EB%9E%80)
- [[velog] 자바스크립트 메모리 상에서 데이터 관리](https://velog.io/@chldntjr0425/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%83%81%EC%97%90%EC%84%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC)
- [[github] js-DataType - gardener](https://github.com/dolmeengii/fe-cs-study/tree/main/gardener/js-DataType)
