---
layout: post
title: '[js] buildErrorHandler'
date: 2019-12-27 00:10
categories: error
tags: [js, error]
---
프로젝트 공통에서 계층 구조적으로 에러를 핸들링하고자 하고자 한다면 `buildErrorHandler` 함수를 이용할 수 있다

```javascript
import {find, path} from 'ramda'

export interface ErrorHandler {
  pred: (error: any) => boolean | any
  handler: ((error: any) => any) | any
}

export function buildErrorHandler(handlers: () => ErrorHandler[], pathArr: any[] = []){
  return (e) => {
    if(!handlers()){
      console.log({...e})
      console.error(e)
      console.log(handlers.toString())
      throw Error('handlers() return undefined')
    }
    const errHandler: ErrorHandler = find(({pred}) => pred(path(pathArr, e)))(handlers())
    if(!errHandler){
      console.log('[buildErrorHandler] Matched error handler not found')
      throw e
    }
    return errHandler.handler(e)
  }
}
```

구체적인 설명은 귀찮아서 생략한다.

