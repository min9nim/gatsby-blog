---
layout: post
title:  "[js] 함수 선언과 함수표현의 차이"
date:   2019-05-26 00:10
categories: js
tags: [js]
---

함수 선언은 호이스팅 된다.
```javascript
fn()
function fn(){console.log(111)}
```

결과)
```
111
```

<br>

하지만 함수표현식은 호이스팅되지 않는다.
```javascript
fn()
var test = function fn(){console.log(111)}
```

결과)
```
VM794:1 Uncaught ReferenceError: fn is not defined
    at <anonymous>:1:1
```