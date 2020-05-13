---
layout: post
title: "Fuction.prototype.apply, call, bind 차이점"
date: 2018-06-28 17:00:00 +0900
categories: vanillaJS
tags: [apply, call, bind]
---

### Function.prototype.apply

문법

```javascript
function.apply(thisArg, [argsArray])
```

<br>
설명
1. `thisArg` 를 `this` 객체에 바인딩하고 전달 받은 인자를 `arguments` 에 설정한 후 해당 함수를 호출한다
1. `arguments` 를 **배열로** 전달한다

<br>
예시
```javascript
Math.max(5, 6, 2, 3, 7);    // 7

// 아래와 같이 배열을 인자로 전달해서 사용할 수 있다
var numbers = [5, 6, 2, 3, 7];
Math.max.apply(null, numbers); // 7

````


<br>

### Function.prototype.call
문법
```javascript
function.call(thisArg, arg1, arg2, ...)
````

<br>
설명
1. `thisArg` 를 `this` 객체에 바인딩하고 전달 받은 인자를 `arguments` 에 설정한 후 해당 함수를 호출한다
1. `arguments` 를 **순서대로** 전달한다

<br>

### Function.prototype.bind

문법

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

<br>
설명
1. 첫번째 인자를 this 에 바인딩하고, 두번째 인자부터 arguments 를 **순서대로** 전달한다. 전달된 arguments 를 미리 부분적용한 **함수를 리턴**한다.
1. 이후 함수 호출 시 인자를 추가로 전달할 경우 미리 전달받은 arguments 뒤에 concat 된다

<br>
예시
```javascript
function test(a, b){
    return [this.a, a, b];
}

var a = 1
test(); // [1, undefined, undefined] // 전역변수 a를 리턴

var obj = {a:2};
obj.func = test;
obj.func(); // [2, undefined, undefined] // obj의 a속성을 리턴

obj.func = test.bind({a:3});
obj.func(); // [3, undefined, undefined] // 앞서 bind 호출시 인자로 받은 객체의 a속성을 리턴

var func2 = test.bind(this, 2)
func2() // [1, 2, undefined] // 앞서 부분적용된 인자가 출력
func2(3) //  [1, 2, 3] // 전달된 인자가 앞서 부분적용되었던 인자 뒤에 append 된다

```



<br>

### Ref.
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind>
```
