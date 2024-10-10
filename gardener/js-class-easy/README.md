# Class
이전에 클래스를 한 번 다뤘는데, 코어 자바스크립트 도서에서 너무 어려운 개념들을 설명해서, 이번에는 다른 쉬운 교재의 Class 편으로 준비해보았다.

## 1.클래스의 기본 기능
객체 지향 : 객체를 우선적으로 생각해서 프로그램을 만든다는 방법론. 이 언어들은 클래스라는 문법으로 객체를 효율적이고 안전하게 만들어 객체 지향을 쉽게 프로그래밍에 적용할 수 있도록 도와준다.

추상화 : 프로그램에 필요한 요소만 사용해서 객체를 표현하는 것.

객체를 처음부터 만들어보고, 기능을 하나씩 추가해보며 흐름을 따라가보자. 먼저 객체를 만들어보고 성적의 총합과 평균을 구하는 기능을 추가해보자.


```js
<script>
// 객체를 선언
    const students = []
    students.push({이름: '구름', 국어 : '91' , 영어:'85', 수학 : '92', 과학: '90' });
    students.push({이름: '나비', 국어 : '92' , 영어:'75', 수학 : '94', 과학: '87' });
    students.push({이름: '겨울', 국어 : '85' , 영어:'95', 수학 : '91', 과학: '89' });
    students.push({이름: '바다', 국어 : '100' , 영어:'98', 수학 : '93', 과학: '92' });
    
    let ouuput ='이름\t총점\t평균\n';
    for(const s in students){
        const sum = s.국어 + s.영어 + s.수학 + s.과학;
        const average = sum/4;
        output += `${s.이름}\t${sum}점\t${average}점\n`;
    }
    console.log(output);
</script>
```
이렇게 작성한 기능은 여러 프로그램에서 활용될 수 있다. 그렇기에 단순히 위와 같이 제작하는 것보다 getSumOf() 과 getAverageOf() 라는 이름으로 함수를 만들고, 매개변수로 학생 객체를 받아 총합과 평균을 구하는 프로그램을 만들어보자.
```js
<script>
// 객체를 선언
    const students = []
    students.push({이름: '구름', 국어 : '91' , 영어:'85', 수학 : '92', 과학: '90' });
    students.push({이름: '나비', 국어 : '92' , 영어:'75', 수학 : '94', 과학: '87' });
    students.push({이름: '겨울', 국어 : '85' , 영어:'95', 수학 : '91', 과학: '89' });
    students.push({이름: '바다', 국어 : '100' , 영어:'98', 수학 : '93', 과학: '92' });
    
    function getSumOf(student) {
        return student.국어 + student.영어 + student.수학 + student.과학;
    }
    
    funtion getAverageOf(student) {
        return getSumOf(student)/4;
    }

    let ouuput ='이름\t총점\t평균\n';
    for(const s in students){
        output += `${s.이름}\t${getSumOf(s)}점\t${getAverageOf(s)}점\n`;
    }
    console.log(output);
</script>
```

코드는 길어졌지만, 객체를 만드는 부분과 객체를 활용하는 부분으로 나누었다. 코드가 길어졌지만, 객체에 더 많은 기능을 추가하게 되었을 때 객체를 쉽게 유지보수 할 수 있으며, 객체를 활용할 때도 더 간단하게 코드를 작성할 수 있다.

위에서 객체를 처리하는 함수에 대해서 다뤘다면 아래에서는 위의 예시 그대로 객체를 생성하는 함수 방법의 예시에 대해서 알아본다.

```js
<script>
    function createStudent(이름, 국어, 영어, 수학, 과학) {
        return {
            이름: 이름,
            국어: 국어,
            영어: 영어,
            수학: 수학,
            과학: 과학,
    
            getSum() {
                return this.국어 + this.영어 + this.수학 + this.과학
            },
            getAverage() {
                return this.getSuum() / 4
            },
            toString() {
                return `${this.이름}\t${this.getSum()}점\t${this.getAverage()}점\n`   
            }
        }
    };

    const students = []
    students.push({이름: '구름', 국어 : '91' , 영어:'85', 수학 : '92', 과학: '90' });
    students.push({이름: '나비', 국어 : '92' , 영어:'75', 수학 : '94', 과학: '87' });
    students.push({이름: '겨울', 국어 : '85' , 영어:'95', 수학 : '91', 과학: '89' });
    students.push({이름: '바다', 국어 : '100' , 영어:'98', 수학 : '93', 과학: '92' });

    let ouuput ='이름\t총점\t평균\n';
    for (const s of students) {
        output += s.toString();
    }
    console.log(output);
</script>
```

createStudent() 함수를 만들고, 여기에 객체를 만들어 return 하게 만들었습니다. 이렇게 객체를 만드는 함수를 만들면 여러가지 이득이 발생하는데, 오탈자의 위험이 줄어들고, 코드를 입력하는 양이 크게 줄어들고, 속성과 메소드를 한 함수 내부에서 관리할 수 있으므 객체를 더 손쉽게 유지보수할 수 있다.

## 2. 클래스 선언하기
객체 지향 프로그래밍 : 객체들을 정의하고 그러한 객체를 활용해서 프로그램을 만드는 것.

클래스와 프로토타입이라는 2가지 문법으로 객체를 효율적으로 만들 수 있게 했다. 클래스는 다음과 같은 형태로 생성한다.
```js
<script>
class 클래스 이름 {
    // 클래스를 기반으로 만든 객체는 전문 용어로 인스턴스 라고 부릅니다. (객체라고 부르는 경우도 많습니다.)
    // 인스턴스는 다음과 같은 문법을 사용합니다.
    new 클래스 이름 ()
    
    // 객체가 생성될 때 호출되는 생성자. 생성자는 클래스를 기반으로 인스턴스를 생성할 때 처음 호출되는 메소드입니다.
    // 이 생성자에서는 속성을 추가하는 등 객체의 초기화 처리를 합니다.
    constructor() {
        /* 생성자 코드 */  
    }
    
}

</script>
```
## 3. 클래스의 고급 기능
1) 상속 : 클래스의 선언 코드를 중복해서 작성하지 않도록 함으로 코드의 생산 효율을 올리는 문법

```javascript
class 클래스 이름 extends 부모클래스 이름 {

}

// 간단하고 생략된 예시
// Square 클래스가 자식의 클래스
class Square extends Rectangle {
    constructor(length) {
        // 부모의 생성자 함수를 호출하는 코드.
        super(length, length);
    }
}
// Square 에서 선언된 메소드들을 사용 가능함.
```

2) Private 속성과 메소드
위에서의 Square 예시를 그대로 가져와보겠습니다. 만약에 사각형 객체를 만드는 메소드가 있다고 가정했을 때, 개발자의 실수로 예외 처리를 하지 않고 음수를 넣게 된다면 어떻게 될까요? 사각형이 만들어질 수 없겠죠.
이러한 문제를 막는 방법으로 조건문을 사용하는 방법도 있겠지만, 생성자로 객체를 생성한 이후에 사용자가 length 속성을 변경하는 것을 막을 수 없습니다. 아래 구문을 통해 확인해보시죵

```js
const square = new Square(10);
square.length = -10; // 이렇게 말이죠!
```

이처럼 클래스 사용자가 클래스 속성 (또는 메소드)을 의도하지 않은 방향으로 사용하는 것을 막아 클래스의 안정성을 확보하기 위해 나온 문법이 Private 속성과 메소드입니다. 아래와 같이 사용 가능합니다.
```js
class 클래스 이름 {
    #속성 이름
    #메소드 이름() {
        
    }
}
```
속성과 메소드 이름 앞에 #을 붙이기만 하면 된다. #이 붙어있는 속성과 메소드는 모두 private 속성과 메소드가 된다. 대신 이 private 속성은 사용하기 전에 미리 외부에 어떤 속성을 private 속성으로 사용하겠다고 선언해줘야한다는 것입니다.
```js
<script>
    class Square{
    #length // 이 위치에 해당 속성을 private 속성으로 사용하겠다고 미리 선언합니다.
    
    constructor (length) {
        if(length <= 0) {
            throw '길이는 0보다 커야 합니다.'
        }
        this.#length = length
    }
    
    ... // 만든 메소드들
}
</script>

const square = new Square(10);
square.#length = -10; // 클래스 내부의 #length 속성을 사용하여 변경합니다.
console.log(`정사각형의 둘레: ${square.getArea()}`) // 위에서 만든 메소드.

//실행 결과 : Uncaugt SyntaxError: Private field '#length' must be declared in an enclosing class 로 출력.
```

3) Getter와 Setter
위에서 살펴봤는 private 속성을 사용하면 외부에서는 #length 속성에 아예 접근할 수 없는 문제가 발생한다. 이 때문에 상황에 따라서 속성을 읽고 쓸 수 있는 메소드를 만들어서 제공할 필요가 생겼습니다.

```js
<script>
    class Square{
    #length
    
    constructor (length) {
    this.setLength = length
    }
    
    setLength(value) { // 함수를 사용하므로 내부에서 예외 처리 등을 할 수 있습니다.
        if(value <= 0) {
            throw '길이는 0보다 커야 합니다.'
        }
        this.#length = value
    }
    
    getLength(value) {
        return this.#length
    }
    ... // 만든 메소드들
}
</script>
```
위의 코드를 보면 Getter 와 Setter가 추가된 모습을 확인할 수 있습니다. 

4) static 속성과 메소드
static 속성과 메소드는 인스턴스를 만들지 않고 사용할 수 있는 속성과 메소드입니다. 일반적인 변수와 함수처럼 사용할 수 있습니다. 아래와 같이 사용합니다.
```js
class 클래스 이름 {
    static 속성 = 값
    static 메소드() {
        
    }
}

// 클래스 이름.속성
// 클래스 이름.메소드()
```
그러나 모든 변수를 static 으로 선언하는 것은 당연히 위험합니다. 변수와 함수를 클래스 내부에 작성했을 때의 장점은 어떤 속성과 함수가 클래스 내부에 귀속되어 있다는 것을 명시적으로 나타낼 수 있고, private 특성과 getter, setter를 부여해서 조금 더 안전한 변수와 함수로 사용할 수 있습니다.
