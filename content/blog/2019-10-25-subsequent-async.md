---
layout: post
title: '[js] 비동기 함수의 순차적 실행 보장'
date: 2019-10-25 00:10
categories: js
tags: [js, atomic, async]
---
async/await 를 이용하면 간단하게 비동기함수를 순차적으로 실행할 수 있다.

```javascript
async () => {
  await asyncFn()
  await asyncFn()
  await asyncFn()
}
```

하지만 이것은 caller 입장에서만 처리가 가능한 방법이다. `asyncFn` 함수를 제공하는 입장에서 `asyncFn` 이 순차적으로 실행됨을 보장하고자 하면 어떻게 함수를 정의해야 할까

예를 들면 `asyncFn` 을 사용하는 caller 는 아래와 같이 해당 함수를 막? 호출할 수도 있다. (이는 `asynFn` 함수를 제공하는 입장에서 통제할 수 있는 영역이 아니다)

```javascript
async () => {
  asyncFn()
  asyncFn()
  asyncFn()
}
```

위와 같이 `await` 없이 연속적으로 비동기함수를 호출하는 상황에서도 `asyncFn` 의 순차적 실행을 보장하고자 한다면 간단히 [atomicasync](https://www.npmjs.com/package/atomicasync) 모듈을 이용할 수 있다.

<br>

### Install
```
npm i atomicasync
```

<br>

### Usage
```javascript
const atomic = require('atomicasync')
 
function asyncFn(){
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('asyncFn called', new Date())
      resolve('done')
    }, 1000)
  })
}
 
const atomicAsyncFn = atomic(asyncFn)
/*
* atomicAsyncFn will be executed sequentially like using await
*/
atomicAsyncFn()   // 1s later call
atomicAsyncFn()   // 2s later call
atomicAsyncFn()   // 3s later call
```

