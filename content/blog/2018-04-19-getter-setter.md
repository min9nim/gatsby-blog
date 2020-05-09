---
layout: post
title:  "[js] getter와 setter 를 설정하는 방법"
date:   2018-04-19 10:00:00 +0900
categories: vanillaJS
tags: [getter, setter]
---
getter와 setter 를 이용하면 객체의 속성값을 읽고 쓰는 방법을 새롭게 정의할 수 있다
아래 코드를 먼저 보자
```js
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
```
`o` 객체는 아래 3가지 속성을 갖는다

* `o.a` — 숫자값
* `o.b` — `o.a` 에 1을 더한 값을 리턴하는 getter
* `o.c` — `o.a` 에 할당된 값의 절반을 세팅하는 setter

getter와 setter를 정의할 때  `[gs]et propertyName(){ ~~ }` 문법을 사용하고 있음을 주목하기 바란다. 이 문법은 사람(사용자)에게는 혼돈스러움을 줄 수 있지만 기계(프로그램)적으로는 다른 문법요소(ex, 함수정의)와 구별하여 정확하게 getter와 setter 설정을 가능하게 한다.

아래 코드는 이미 생성된 객체에 getter 와 setter 를 설정하는 방법을 보여준다.
```js
var d = Date.prototype;
Object.defineProperty(d, 'year', {
  get: function() { return this.getFullYear(); },
  set: function(y) { this.setFullYear(y); }
});
```


실행결과는 아래와 같다
```js
var now = new Date();
console.log(now.year); // 2000
now.year = 2001; // 987617605170
console.log(now);
// Wed Apr 18 11:13:25 GMT-0700 (Pacific Daylight Time) 2001
```

원칙적으로 getter와 setter를 설정하는 방법은 아래 2가지 방법만 가능하다.
- 객체리터럴을 이용해 객체를 생성할 때
- `Object.defineProperty`, `Object.defineProperties` 를 이용한 동적 설정


아래 예와 같이 객체생성자를 이용할 때 당신이 해야할 일은 단지 속성명으로된 함수 정의 앞에 get 이나 set을 적어주는 것 뿐이다. 물론 getter 는 패러미터를 가지지 말아야 하며, setter는 정확히 단 한 개의 패러미터만 가질 수 있다.

```js
var o = {
  a: 7,
  get b() { return this.a + 1; },
  set c(x) { this.a = x / 2; }
};
```

Object.defineProperties 를 이용하면 getter와 setter는 객체생성 이후 어느 시점에서든 추가될 수 있다. 첫번째 인자는 getter/setter 를 추가할 객체를, 두번째 인자로는 getter/setter를 추가할 속성명과 getter/setter 함수가 정의된 객체를 전달한다. 앞선 예제와 동일한 기능을 하는 아래 예시를 보자

```js
var o = { a: 0 };
Object.defineProperties(o, {
    'b': { get: function() { return this.a + 1; } },
    'c': { set: function(x) { this.a = x / 2; } }
});
o.c = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.b); // Runs the getter, which yields a + 1 or 6
```

당신은 당신의 코드스타일이나 처리할 문제 유형에 따라 위 둘 중 어느 형태든 선택을 할 수 있다. 객체의 prototype을 직접 정의하는 경우라면 대부분 첫번째 방법을 사용할 것이다. 이 방법은 훨씬 간결하고 자연스럽기 때문이다. 하지만 당신이 직접 객체의 prototype을 정의하는 경우가 아니라면 두번째 방법만이 유일한 선택지가 된다. 두번째 방법은 동적 언어로서의 자바스크립트 특성을 멋지게 잘 보여준다. 하지만 이런 방법은 코드의 가독성을 떨어뜨려 코드를 이해하기 어렵게 하는 요인이 될 수 있다.
<br>
<br>

### Ref.
이 글은 getter와 setter에 관한 [MDN 기술문서의 일부][1]를 번역한 글이다. 글읽기에 어려움이 없도록 충분한 의역을 포함하였다.


[1]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters
