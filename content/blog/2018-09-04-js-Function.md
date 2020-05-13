---
layout: post
title: '[js] The "new Function" syntax'
date: 2018-09-04 09:00
categories: vanillaJS
tags: [Function]
---

함수를 정의할 때 일반적으로 사용하는 방법은 아니지만 자바스크립트는 함수를 동적으로 정의하는 방법을 제공한다. 어짜피 함수의 동작이라는 것이 입력으로 받아들이는 패러미터와 (외부변수를 사용할 경우엔) 함수가 정의될 당시의([Lexical Environment](https://javascript.info/closure#lexical-environment)) 컨텍스트에 따라 동적으로 동작이 달라지게 할 수 있기 때문에 굳이 함수 정의 자체를 동적으로 정의해야 할 필요가 있을까 하는 생각이 들 수도 있다. 하지만 이 문법이 반드시 필요한 경우도 있을 수 있다.

<br>

### Syntax

자바스크립트에서 모든 것은 객체이다. 함수도 객체이기 때문에 다른 객체를 생성하는 것과 마찬가지로 `new` 생성자함수를 통해 객체(함수) 생성이 가능하다. `new` 연산자를 이용한 함수객체 생성 문법은 아래와 같다

```javascript
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

패러미터는 순서대로 생성될 함수의 인자로 적용되고 마지막 인자는 생성될 함수의 몸통이 된다. 모두 함수 정의가 가능한 형태의 스트링이어야 한다.

패러미터는 차례대로 쉼표를 이용해 구분하는 것도 허용된다

```javascript
var sum1 = new Function("a", "b", "return a + b") // basic syntax
var sum2 = new Function("a,b", "return a + b") // comma-separated
var sum3 = new Function("a , b", "return a + b") // comma-separated with spaces
console.log(sum1(2, 6)) // 8
console.log(sum2(2, 6)) // 8
console.log(sum3(2, 6)) // 8
```

인자가 필요없다면 몸통만 정의하면 된다.

```javascript
let sayHi = new Function('alert("Hello")')
sayHi() // Hello
```

`new` 를 이용해 객체(함수)를 생성했기 때문에 임의 함수의 `contructor` 속성은 `Function` 과 일치하고 `__proto__` 속성은 `Function.prototype` 과 일치한다

```javascript
;(function () {}.constructor === Function) // true
;(function () {}.__proto__ === Function.prototype) // true
```

`Function.prototype` 에는 이미 `apply`, `call`, `bind` 등의 메소드들이 정의 되어있기 때문에 모든 함수에서 해당 함수들을 사용할 수 있다.

<br>

### 함수 serialization

`new Function()` 문법은 스트링을 이용해 함수를 생성하는 방법이다. 이 말은 함수를 _serialization_ 할 수 있다는 것을 의미한다. 이를 응용하면 원격지로부터 함수 코드를 전달 받아서 스크립트내에서 동적으로 해당 함수를 생성해 호출하는 것이 가능하다.

```javascript
let str = `... receive the code from a server dynamically ...`
let func = new Function(str)
func()
```

물론 함수를 _serialize_ 하여 전달하고 객체화 하는 것은 `eval` 로도 가능하다.

<br>

### Not closure

1. 일반적으로 내부함수가 외부변수를 사용하고 해당 함수가 정의된 영역이 아닌 다른 영역으로 전달될 때 해당 함수는 클로져가 되고 결국 정의될 당시의 _Lexical scope_ 를 기억한다
1. 하지만 예외적으로 내부 함수가 외부변수를 사용하지만 실행될 당시의 _context_ 에 접근 하고자 할 경우에는 어떻게 해야할까.
1. 이런 경우에 `new Function` 문법을 활용할 수 있다.
   - `new Function` 으로 생성되는 함수는 _Lexical_ 스코프가 아닌 _Global_ 스코프를 참조하기 때문이다.

클로져 예제,

```javascript
function getFunc() {
  let value = "test"
  let func = function () {
    alert(value)
  }
  return func
}

var value = "hello world"
getFunc()() // "test", from the Lexical Environment of getFunc
```

`new Function` 예제,

```javascript
function getFunc() {
  let value = "test"
  let func = new Function("alert(value)")
  return func
}

var value = "hello world"
getFunc()() // "hello world", from Global scope
```

<br>

### _new Function_ with minifier

운영환경에서는 일반적으로 js를 minify 하여 배포한다. 난독화 과정을 거치면서 지역스코프의 모든 변수명들은 간단한 이름으로 치환이 된다. 하지만 `new Function` 의 인자로 전달되는 문자열은 난독화 대상이 아니기 때문에 해당 문자열에서 사용하는 변수가 외부변수일 경우 실제 운영환경에서 문제가 발생할 수 있다.

이러한 문제를 해결하려면 우리는 `new Function` 으로 생성되는 함수 내에서 최대한 외부변수 사용을 자제하고 필요하다면 반드시 명시적인 패러미터로 전달해야 한다

```javascript
let sum = new Function("a", "b", "extVal", "return a + b + extVal")

let a = 1,
  b = 2
let extVal = 3

// outer values are passed as arguments
alert(sum(a, b, extVal)) // 6
```

<br>

### Ref.

- <https://javascript.info/new-function>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function>
