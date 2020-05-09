---
layout: post
title:  "[js] await 뒤에 동기함수가 오면?"
date:   2019-09-05 00:10
categories: js
tags: [js]
---
async/await 를 사용할 때, 일반적으로 프라미스를 리턴하는 비동기함수의 응답을 기다릴 때 비동기 함수 앞에 await 를 사용한다.

하지만, await 다음 함수가 프라미스를 리턴할 지 일반적인 value 를 리턴할 지가 동적으로 바뀔 수 있다고 하자. 그럼 await 다음 위치하는 함수가 일반적인 값을 리턴하는 경우 결과값은 어떻게 될까?

다음 예시를 통해 결과를 예측해 보자

```javascript
function syncFn(){
  return 1
}

async function asyncFn(){
  const result = await fn()
  console.log(result)   // print 1
}

asyncFn()
```

<br>

await 는 await 뒤에서 호출되는 함수의 결과값을 무조건? `Promise.resolve` 로 감싼다(필자의 예상). 따라서 `result` 변수에는 `fn()`이 프라미스를 리턴하지 않더라도 그냥 `fn()` 이 리턴하는 값이 그대로 담긴다.

(그러므로) `fn()`이 `Promise.resolve(1)` 을 리턴하더라도 결과는 동일하게 된다

`Promise.resolve` 결과를 `Promise.resolve` 한 결과는 처음 `Promise.resolve` 의 결과와 같기 때문이다

```javascript
const a = Promise.resolve(1)
const b = Promise.resolve(a)
console.log(a === b)  // print true
```