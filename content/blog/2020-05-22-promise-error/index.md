---
layout: post
title: 'Promise 에서 에러 핸들링'
date: 2020-05-22 00:10
tags: [promise, error]
description: Promise 의 then 에서 오류가 발생할 경우 오류 처리 방법
---

Promise 의 then 에서 오류가 발생할 경우 오류 처리 방법을 간단하게 정리한다.

프라미스의 결과를 처리하다가 예외가 발생한다면 당연히 try ~ catch 문을 이용해 아래와 같이 해당 에러를 처리할 수 있다

```js
Promise.resolve().then(() => {
  try {
    throw Error('error1')
  } catch (e) {
    console.log('handling Error1', e)
  }
})
/*
  handling Error1 Error: error1
    at <anonymous>:3:11
*/
```

위 코드는 아래와 같이 `.catch` 함수를 이용하여 동일하게 처리할 수 있다.

```js
Promise.resolve()
  .then(() => {
    throw Error('error1')
  })
  .catch(e => {
    console.log('handling Error1', e)
  })
/*
  handling Error1 Error: error1
    at <anonymous>:3:11
*/
```

`catch` 에서 에러 처리 중 다시 예외가 발생하면 뒤에 따르는 `catch` 에서 해당 예외를 다시 잡아서 처리할 수 있다.

```js
Promise.resolve()
  .then(() => {
    throw Error('error1')
  })
  .catch(e => {
    console.log('handling Error1', e)
    throw Error('error2')
  })
  .catch(e => {
    console.log('handling Error2', e)
  })

/*
handling Error1 Error: error1
    at <anonymous>:3:11
handling Error2 Error: error2
    at <anonymous>:7:11
*/
```
