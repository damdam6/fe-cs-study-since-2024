# 1. 지연 평가와 엄격한 평가

## 1) 지연 평가(Lazy Evaluation)란?

지연 평가는 계산하는 시점을 늦추어 불필요한 계산을 방지하고 시스템의 성능을 향상시킬 수 있다. 즉, 어떤 값을 선언하는 즉시 평가하는 것이 아닌 해당 값을 사용할 때 평가하는 것을 의미한다. 이를 통해, 메모리 사용량이 감소하고 프로그램의 반응성이 향상된다.

### 지연 평가의 장점

1️⃣ 불필요한 계산을 하지 않기 때문에 빠른 계산이 가능하다. <br>
2️⃣ 무한 자료 구조를 사용할 수 있다. <br>
3️⃣ 복잡한 수식에서 오류 상태를 피할 수 있다. <br>

## 2) 엄격한 평가(Strict Evaluation)란?

대부분의 전통적인 프로그래밍 언어에서 사용하는 계산 방식으로 지연평가와는 반대의 개념이다. 즉, 값이 선언됨과 동시에 평가하는 방식을 의미한다.

<br>
<br>

# 2. 동작 방식 비교

아래와 같은 예시 코드가 있다고 할 때, ES6와 Lodash 에서 어떤 방식으로 평가되는지 알아보자.

```javascript
const arr = [0, 1, 2, 3, 4, 5];

const result = arr
  .map((num) => num + 10)
  .filter((num) => num % 2)
  .slice(0, 2);

console.log(result);
```

## 1) ES6: 엄격한 평가의 동작 방식

```javascript
const arr = [0, 1, 2, 3, 4, 5];

const result = arr
  .map((num) => num + 10) // 1. 모든 배열원소에 대해 10을 더한다 → [11, 12, 13, 14, 15]
  .filter((num) => num % 2) // 2. 모든 배열원소에 대해 홀수만 구한다 → [11, 13, 15]
  .slice(0, 2); // 3. 모든 배열원소에 대해 2개만 추출한다 → [11, 13]

console.log(result); // [11, 13]
```

![img](https://github.com/dolmeengii/fe-cs-study/blob/b552d605c5d98534a87d69080041fb45668ace1d/dolmeengii/Lazy%20Evaluation%20%EB%8F%99%EC%9E%91%20%EB%B0%A9%EC%8B%9D/images/strict.png)

> 위 코드에서는 map, filter, slice 고차함수들이 각각의 계산이 모두 종료되어야 다음 단계를 수행한다. 총 계산 횟수를 구하면 map에서 6번, filter에서 6번, slice에서 2번으로 총 14번이 된다.

엄격한 평가는 최종 결과물인 11과 13을 얻기 위해 배열의 모든 원소에 대해 map, filter 연산을 하였다. 하지만 11과 13을 얻기 위해 배열의 모든 원소가 평가될 필요는 없다. 불필요한 연산이 들어간 것이다.

## 2) Lodash : 지연 평가의 동작 방식

```javascript
const arr = [0, 1, 2, 3, 4, 5];

const result = _.chain(arr) // 일반배열을 lodash 체인 객체로 변환한다.
  .map((num) => num + 10)
  .filter((num) => num % 2)
  .take(2)
  .value(); // 지연 평가된 결과가 평가되어 실제값으로 변환

console.log(result); // [11, 13]
```

> Lodash 라이브러리에서는 `_.메소드` 의 방식으로 지연 평가를 구현할 수 있다.

> 위의 코드에서는 chain 함수의 인자로 사용할 데이터를 넘기면 해당 데이터를 lodash 객체로 감싸준다. 이후 lodash에서 제공되는 지연평가 메서드를 이용하여 원하는 결과로 가공한다. 마지막으로 value 함수를 통해 래핑된 결과를 실제 값으로 반환한다.

![img](https://github.com/dolmeengii/fe-cs-study/blob/b552d605c5d98534a87d69080041fb45668ace1d/dolmeengii/Lazy%20Evaluation%20%EB%8F%99%EC%9E%91%20%EB%B0%A9%EC%8B%9D/images/lazy.png)

위 그림에서 볼 수 있듯이 지연평가의 흐름은 배열 원소 3까지 평가가 완료되었을 때 이미 원하는 결과가 나왔기 때문에 그 이후 원소에 대한 연산은 하지 않는다. 따라서 총 계산 횟수를 구해보면 map 4번, filter 4번, slice 2번으로 총 10번이 된다. 즉, 지연 평가는 해당하는 값에 대해서만 연산을 수행하기 때문에 불필요한 연산이 줄어든다.

---

#### 참고한 사이트

- https://inpa.tistory.com/entry/LODASH-%F0%9F%93%9A-%EC%A7%80%EC%97%B0-%ED%8F%89%EA%B0%80-%EC%9B%90%EB%A6%AC-lodash%EB%8A%94-%EC%98%A4%ED%9E%88%EB%A0%A4-%EC%84%B1%EB%8A%A5%EC%9D%B4-%EC%A2%8B%EC%9D%84-%EC%88%98-%EC%9E%88%EB%8B%A4
- https://lodash.com/docs/4.17.15
- https://armadillo-dev.github.io/javascript/whit-is-lazy-evaluation/
- https://dororongju.tistory.com/137
