# 0. 들어가며

바쁜 날들을 보내고 있는 요즘, 새로운 주제를 찾기보단 이전에 구매했던 책에서 아이디어를 얻고자 했다. 이전에 엄청 쉬운 자바 스크립트 책을 친구에게 선물 받았었다. 뒤적거리던 중 예외처리에 대한 항목을 발견했다. 오늘은 예외처리에 대해서 다뤄본다.

학습 목표 
1) 구문 오류와 예외를 구분할 수 있다.
2) 기본 예외 처리와 고급 예외 처리를 이해한다.
3) 예외를 왜 발생시켜야하는지 이해한다.
4) 예외를 강제로 발생시키는 방법을 이해한다.

# 1. 예외처리
예외를 처리하는 것.

오류의 종류에는 프로그램 실행 전과 실행 중에 발생하는 오류로 구분된다.

구문 오류 : 잘못 입력한 오류로, 코드가 실행조차 되지 않는 오류. 구문오류는 단순하다. 괄호를 닫지 않는 행위로 발생할 수 있다. 이러한 오류를 출력하게 되면

```js
Uncaught SyntaxError: missing ) after argument list
```
와 같이 표시된다.

이를 제외한 코드 실행 중간에 발생하는 오류를 예외라고 한다. 예외 또는 런타임 오류는 실행 중에 발생하는 오류를 의미한다. 예를 들어 console.log 를 console.rog 로 잘못 입력했을 때 발생한다. 이러한 상황에서 아래와 같은 오류 메세지를 출력하게 된다.

```js
Uncaught TypeError: console.rog is not a function
```
이처럼 실행 중에 발생하는 오류가 예외이다. SyntaxError 외의 (TypeError, ReferenceError, RangeError) 등이 존재한다.

# 2. 기본 예외 처리
조건문을 사용해서 예외가 발생하지 않게 만드는 것을 기본 예외 처리라고 부른다.

querySelector() 메소드로 추출된 문서 객체가 없는 경우
```js
<body>
</body>

<script>
    document.addEventListener('DOMContentLoaded', () => {
    const.h1 = document.quertSelector('h1');
    h1.textContent = '안녕하세요'
})
</script>

// Uncaught TyoeError : Cannot set property 'textContent' of null at HTMLDocument.<anonymous> (test.html:7)
```
위 코드는 querySelector() 메소드로 문서 객체를 추출한 뒤 textContent 속성에 글자를 할당하는 코드입니다. 그러나 body 태그 내부에 h1 태그가 없기 때문에 위와 같은 예외가 발생합니다. 이를 해결하기 위해서는 아래와 같은 처리를 하면 됩니다.

```js
<body>
</body>

<script>
    document.addEventListener('DOMContentLoaded', () => {
    const.h1 = document.quertSelector('h1');
    if(h1) {
    h1.textContent = '안녕하세요';
    }
    else {
        console.log('에러 발생');
}    
})
</script>
```

# 3. 고급 예외 처리
try catch finally 구문을 사용해서 예외를 처리하는 방법

```js
try{
    // 예외가 발생할 가능성이 있는 코드
} catch {
    // 예외가 발생했을 때 실행한 코드
} finally {
    // 무조건 실행할 코드
} // finally 구분은 필요한 경우에만 사용합니다.
```

강제로 예외를 발생시켜보겠습니다.

```js
<script>
    try{
    willExcept.byeBye();
    } catch(exception){
    console.log('에러가 발생했습니다.')
    }
}
</script>
// 에러가 발생했습니다.
```
많이 보던 구조여서 익숙하시듯이, try 구문 안의 willExcept 라는 변수나 byeBye()라는 메소드는 존재하지도 않기 때문에 catch 구문으로 넘어가 console.log()의 내용을 출력합니다. 밑의 구문에서도  finally 까지 닿게 됩니다.

```js
<script>
    try{
    willExcept.byeBye();
    } catch(exception){
    console.log('에러가 발생했습니다.');
    } finally {
    console.log('또 에러는 발생합니다.');
}
</script>
// 에러가 발생했습니다.
// 또 에러는 발생합니다.
```

이렇듯 finally 구문은 예외 발생 여부와 상관없이 실행해야 하는 작업이 있을 때 사용합니다.

# 4. 예외 객체
try catch 구문을 사용할 때 catch의 괄호 안에 입력하는 식별자가 바로 예외 객체입니다. 보통 e 나 exception 이라는 식별자를 사용합니다. 위의 구문에서도 확인 가능합니다.

상황에 따라 예외를 강제로 발생시켜야 하는 경우도 있습니다. 예외를 강제로 발생시킬 때는 **throw** 키워드를 사용합니다. throw 구문은 다음과 같은 형태로 사용합니다.

```js
// 단순하게 예외를 발생시킵니다.
throw 문자열
// -> Uncaught 문자열

// 조금 더 자세하게 예외를 발생시킵니다.
throw new Error(문자열)
// -> Uncaught Error : 문자열 
//      at 파일 이름 : 줄 번호        
```

예외를 강제로 발생시키는 이유는 자신이 만든 함수를 다른 사람이 사용할 때 의도치 않은 형태로 코드를 사용할 수 있기 때문에 예외를 강제로 발생시킨다면 사용자에게 주의를 줄 수 있습니다. 자바스크립트에는 undefined 와 NaN 이라는 값이 있어서 다른 프로그래밍 언어에 비해서 예외를 많이 발생하지는 않습니다. 그렇기 때문에 이런 throw를 사용하여 함수를 잘못 사용했다는 것을 강제로라도 인지시켜줄 필요가 있다는 것입니다.
