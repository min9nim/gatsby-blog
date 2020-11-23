---
layout: post
title: '[react-router-dom] 라우트 우선순위'
date: 2020-06-02 00:10
tags: [react-router-dom]
description:
---

`Route` 컴포넌트에서 `render`, `component`, `children` 가 함께 사용될 때 우선순위는 아래와 같다.

> children > component > render

예) 아래와 같이 라우트가 정의될 때 우선순위는 C > B > A

```js
import React from 'react'
import {Route} from 'react-router-dom'

const A = () => <div>A</div>
const B = () => <div>B</div>
const C = () => <div>C</div>

export default function () {
  return (
    <Route render={() => <A />} component={B}>
      <C />
    </Route>
  )
}
```
