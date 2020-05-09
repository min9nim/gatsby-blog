---
layout: post
title: '[js] custom Error'
date: 2019-12-27 00:10
categories: error
tags: [js, error]
---
js 에서 제공하는 `Error` 클래스는 기본적으로 아래와 같이 문자열을 인자로 받는다
```javascript
try{
  throw new Error('error message')
}catch(e){
  console.error(e)
}
/* result is
Error: error message
    at <anonymous>:2:9
*/
```

<br>

객체타입을 사용해 에러메세지를 입체적으로 정의하고자 한다면 `Error` 클래스를 아래와 같이 확장하여 사용한다.
```javascript
class Err extends Error {
  constructor(args, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if(Error.captureStackTrace){
      Error.captureStackTrace(this, Err)
    }
    Object.assign(this, args)
  }
}

try{
  throw new Err({
    code: 1001,
    message: 'some title',
    description: 'blabla',
  })
}catch(e){
  console.log({...e})
  console.error(e)
}
/*
{code: 1001, message: "some title", description: "blabla"}
Error: some title
    at <anonymous>:15:9
*/
```

