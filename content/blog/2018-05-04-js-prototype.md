---
layout: post
title: "[js] 객체와 prototype 의 이해"
date: 2018-05-04 13:00
categories: vanillaJS
tags: [prototype, 객체상속]
---

이 글은 _Douglas Crockford_ 의 [The Good Parts][1] 에서 prototype 관련 내용을 정리한 것이다.

### Intro

- 자바스크립트는 prototype 을 이용해 완전하지는 않지만 그럴듯하게 객체지향프로그래밍을 흉내낼 수 있다. 기존 자바의 클래스 기반 객체생성 및 상속에 익숙해져 있는 사람이라면 자바스크립트의 객체 생성 및 상속의 개념이 상당히 이질적으로 느껴질 수 있다. 하지만 자바스크립트를 이용해 객체지향 프로그래밍을 하려면 prototype 에 대한 정확한 이해는 무엇보다 중요하다.
- 이 글은 자바스크립트의 객체 상속에 대하여 충분한 이해없이 자바스크립트를 습관적으로 사용해 오던 개발자에게 prototype 의 정확한 이해를 돕고자 한다.

<br/>

### 자바스크립트의 객체

- 자바스크립트의 primitive 데이터타입 5가지가 있다
  - 숫자, 문자열, 불리언(`true`/`false`), `null`, `undefined`
  - 숫자/문자열/불리언은 메소드를 가지고 있기 때문에 객체처럼 보일 수 있지만 일반적인 객체와 달리 이 값들은 한번 정해지면 변경이 불가하다(immutable)
  - primitive 타입을 제외한 모든 값은 객체이다.
- 자바스크립트에서 **객체란 변경 가능한 속성들의 집합**을 의미한다
  - ex) 배열, 함수, 정규표현식, 등..
  - 속성의 이름은 문자열이면 모두 가능하며 빈문자열도 허용한다
  - 속성의 값으로는 자바스크립트의 모든 값이 가능하다
    - Douglas Crockford 의 [The Good Parts][1] 에서 `undefined` 는 속성의 값으로 사용할 수 없다고 되어있는데 책집필 당시에서 그랬었는지 모르겠지만 최근에는 `undefined` 도 속성의 값으로 세팅이 가능하다.
  - 자바스크립트에서 객체 생성시에는 클래스가 없다.(함수를 이용해 객체를 생성한다)
  - 자바스크립트는 prototype을 이용해 특정 객체에 있는 속성들을 다른 객체로 상속할 수 있다
  - 객체는 참조방식으로만 전달되고 결코 복사되지 않는다
  - 객체 리터럴로 생성되는 모든 객체는 `Object.prototype` 객체에 연결된다.
  - 객체를 생성할 때 해당 객체의 프로토타입이 될 객체를 선택할 수 있다

<br>

### 객체 생성 방법

prototype 을 선택하여 객체를 생성하는 방법은 2가지가 있다

#### 1. new 연산자를 이용하는 방법

- 생성자 함수를 정의하고 new 연산자와 함께 생성자 함수를 호출하면 생성자함수의 `prototype` 속성에 연결을 갖는(생성자함수의 `prototype` 을 원형으로 하는) 새로운 객체가 생성되고 생성자 함수에 의해 새로운 객체의 속성이 초기화 된다

```javascript
function a() {
  this.a1 = "aa"
  this.b1 = "bb"
}
var o = new a()
console.log(o.a1) // "aa"
```

- 이 방법은 자바의 클래스 기반 객체생성 표현법을 닮았다. (아마 당시 자바의 인기에 편승하여 흉내를 낸 것이 아닌가 싶다). 이 방법이 자바스크립트가 인기를 끄는데는 조금이나마 기여했을 지도 모르겠지만 프로토타입을 기반으로 객체 상속을 지원하는 자바스크립트의 내부 동작을 숨겼기 때문에 자바스크립트를 배우는 사람들에게 여러가지 혼란을 가져오고 오해를 불러 일으키게 되었다.
- new 연산자의 동작을 Function의 메소드로 정의 한다면 아래와 같을 것이다

```javascript
Function.prototype["new"] = function () {
  // 생성자의 프로토타입올 상속받는 새로운 객체 생성
  var that = Object.create(this.prototype)

  // this를 새로운 객체애 바인딩하면서 생성자 호출
  var other = this.apply(that, arguments)

  // 반환값이 객체가 아니면， 새로운 객체로 대체
  return (typeof other === "Object" && other) || that
}
```

<!--script src="https://gist.github.com/min9nim/72fd726a2ff9f6b8d61ad8c534a4a756.js"></script-->

- 자바스크립트에서 객체를 생성하는 원리에 부합하는 조금 더 직관적인 객체 생성 방법은 Object.create 를 이용하는 것이다

<br>

#### 2. `Object.create` 를 이용하는 방법

- 이 방법은 앞서 설명한 1번의 방법보다 `prototype` 을 기반으로 객체상속이 구현되는 자바스크립트의 객체 상속 특성을 더 잘 드러내기 때문에 자바스크립트의 객체상속을 이해하기에 더욱 수월하다.
- `Object.create` 는 ES5부터 지원된다
- `prototype` 으로 사용할 객체를 인자로 전달하면 인자로 전달 된 객체를 원형으로 하는 새로운 객체(`o`)가 생성된다. `o.__proto__ === a` 는 `true`

```javascript
var a = { a1: "aa", b1: "bb" }
var o = Object.create(a)
console.log(o.a1) // "aa"
```

<!--script src="https://gist.github.com/min9nim/5cf5cd11463c79bc3de2f9039c8b2e76.js"></script-->

- `Object.create` 가 지원되지 않는다면(ie8이하) 아래와 같이 간단하게 polyfill 을 구현할 수 있다.

```javascript
Object.create = function (o) {
  var F = function () {}
  F.prototype = o
  return new F()
}
```

<!--script src="https://gist.github.com/min9nim/02f40a241014c6f13e0337cac84cb9f0.js"></script-->

- 참고로 위 구현은 두번째 인자를 사용할 수 없고, 첫번째 인자로 null을 이용한 순수객체를 만들 수 없다는 점에서 네이티브 Object.create와 다르다. 해당 예외처리를 포함한 [Polyfill 참고][2]

<br>

#### 3. 2가지 방식의 차이점

`new` 생성자를 통해 세팅된 속성들은 열거 가능하지만, `Object.create` 를 이용해 생성된 속성들은 열거 가능하지 않다. (보다 구체적으로 설명하자면 `new` 생성자에서 `this`에 설정된 속성들은 새로 생성된 객체에 직접 설정된 속성이기 때문에 열거가 가능하지만 `prototype` 체인에 의해 추가된 속성들은 열거가능하지 않기 때문이다)

1. 1번 방법으로 생성된 객체

```javascript
for (var a in o) {
  o.hasOwnProperty(a)
    ? console.log(a + " 열거가능")
    : console.log(a + " 열거불가")
}
// a1 열거가능
// b1 열거가능
```

  <!--script src="https://gist.github.com/min9nim/a6ab5bd9563bca5dd35671f64b67a258.js"></script-->

2. 2번 방법으로 생성된 객체

```javascript
for (var a in o) {
  o.hasOwnProperty(a)
    ? console.log(a + " 열거가능")
    : console.log(a + " 열거불가")
}
// a1 열거불가
// b1 열거불가
```

<!--script src="https://gist.github.com/min9nim/6eb131fd72ec002edfa075e7e2154aea.js"></script-->

<br>

### Ref.

<https://7chan.org/pr/src/OReilly_JavaScript_The_Good_Parts_May_2008.pdf>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create>

[1]: https://7chan.org/pr/src/OReilly_JavaScript_The_Good_Parts_May_2008.pdf
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
