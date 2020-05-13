---
layout: post
title: "[js] use strict 를 왜 사용하는가"
date: 2018-07-27 01:00
categories: vanillaJS
tags: [strict, js]
---

#### 충분한 설계없이 만들어진 자바스크립트

자바스크립트는 1995년 Brendan Eich 에 의해 처음 이 세상에 모습을 드러냈다. 초기 자바스크립트의 요건은 정적인 웹페이지에 동적인 요소를 가미하는 정도였다. 초기 요건은 매우 단순했기 때문에 Brendan Eich 는 자바스크립트 초안을 일주일? 만에 만들었다고 한다. 그만큼 자바스크립트는 다른 언어들에 비하여 설계가 탄탄하지 않았다.

<br>

#### 웹의 대중화에 편승하여 함께 성장

하지만 최근 20년간 웹이 급성장하면서 그 인기에 힘입어 자바스크립트는 함께 대중화되기 시작했으며 많은 이용자들의 요구에 따라 이후 버젼들에서 계속해서 새로운 기능들이 탑재되었다. 하지만 이전 버젼에 대한 하위호환성을 지원해야 하는 SW의 운명론적 의무사항 때문에 기존의 스펙들은 그대로 보존되어야 했다. 설계 시 충분한 고민을 하지 못한 흔적들은 계속해서 고스란히 남아 이후 버젼에 영향을 미치게 되었다.

<br>

#### 이제는 미흡햇던 부분들을 버려야 할 때

2009년 ES5 가 출시되었을 때, 이전 버젼의 잘못된 모습들이 많이 수정되었지만 하위호환성 지원을 위해 변경된 스펙대로 동작하게 할 수는 없었다. 하지만 신규 프로젝트에서 새롭게 개발을 할 때에는 굳이 하위호환성을 지원해야할 이유가 없다. 새술은 새부대에 담으라고 했다. 이 새부대를 마련하는 방법을 이때부터 제공했는데, 그것이 바로 "use strict" 이다

<br>

#### "use strict" 사용 방법

스크립트의 **최상단에** 아래와 같이 `"use strict"`를 명시한다.

```
"use strict";

// this code works the modern way
...
```

스크립트 중간에 사용할 경우는 무시된다

```
alert("some code");
// "use strict" below is ignored, must be on the top

"use strict";

// strict mode is not activated
```

함수 별로 다르게 적용될 수 있다.

```javascript
function strict() {
  // Function-level strict mode syntax
  "use strict"
  function nested() {
    return "And so am I!"
  }
  return "Hi!  I'm a strict mode function!  " + nested()
}
function notStrict() {
  return "I'm not strict."
}
```

ES6에서 모듈을 정의하는 경우 자동으로 strict 모드 적용

```javascript
function strict() {
  // because this is a module, I'm strict by default
}
export default strict
```

ES6에서 클래스를 정의하는 경우도 자동으로 strict 모드 적용

```javascript
class User {
  // automatically strict mode in class definition
  constructor(name) {
    this.name = name
  }

  sayHi() {
    alert(this.name)
  }
}

let user = new User("John")
user.sayHi()
```

<br>

#### use strict 사용이 필요한 이유

1. 좀 더 수월하게 안전한 코드를 작성할 수 있다
1. 기존의 js의 애매한 문법요소들에 대하여 오류를 던지기 때문에 좀 더 정확한 코드를 작성할 수 있다
1. 더 빨라질 수 있다(strict 모드로 작성된 코드들에 대하여 자바스크립트 엔진이 자동으로 최적화를 수행)
1. ECMAScript의 향후 버전에서 정의 될 가능성이 있는 구문들에 대하여 사용이 제한된다

<br>

#### use strict 를 사용할 때 일반적인 변화

1. 이전에는 발생하지 않던 오류를 발생시킬 수 있다
1. ECMAScript의 향후 버전에서 정의 될 가능성이 있는 구문들에 대하여 사용이 제한된다

<br>

#### Not Allowed in Strict Mode

선언되지 않은 변수는 사용할 수 없다

```javascript
"use strict"
x = 3.14 // This will cause an error
```

변수를 제거할 수 없다

```javascript
"use strict"
var x = 3.14
delete x // This will cause an error
```

함수를 제거할 수 없다

```javascript
"use strict"
function x(p1, p2) {}
delete x // This will cause an error
```

Octal numeric literals are not allowed:

```javascript
"use strict"
var x = 010 // This will cause an error
```

Writing to a read-only property is not allowed:

```javascript
"use strict"
var obj = {}
Object.defineProperty(obj, "x", { value: 0, writable: false })
obj.x = 3.14 // This will cause an error
```

Writing to a get-only property is not allowed:

```javascript
"use strict"
var obj = {
  get x() {
    return 0
  },
}

obj.x = 3.14 // This will cause an error
```

Deleting an undeletable property is not allowed:

```javascript
"use strict"
delete Object.prototype // This will cause an error
```

The string "eval" cannot be used as a variable:

```javascript
"use strict"
var eval = 3.14 // This will cause an error
```

The string "arguments" cannot be used as a variable:

```javascript
"use strict"
var arguments = 3.14 // This will cause an error
```

The with statement is not allowed:

```javascript
"use strict"
with (Math) {
  x = cos(2)
} // This will cause an error
```

For security reasons, eval() is not allowed to create variables in the scope from which it was called:

```javascript
"use strict"
eval("var x = 2")
alert(x) // This will cause an error
```

<br>

**In function calls like f(), the this value was the global object. In strict mode, it is now undefined.**

```javascript
function fn() {
  "use strict"
  return this
}
fn() // return undefined
```

non strict mode

```javascript
var aa = 11
function pfn() {
  var aa = 22
  function fn() {
    console.log(this.aa) // print 11
  }
  fn()
}
pfn()
```

strict mode

```javascript
"use strict"
var aa = 11
function pfn(){
  var aa = 22
  function fn(){
    console.log(this.aa) // this is undefined
  }
  fn()
}
pfn()
VM543:6 Uncaught TypeError: Cannot read property 'aa' of undefined
    at fn (<anonymous>:6:22)
    at pfn (<anonymous>:8:3)
    at <anonymous>:10:1
```

<br>

#### Ref

- <https://javascript.info/strict-mode>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode>
- <https://www.w3schools.com/js/js_strict.asp>
