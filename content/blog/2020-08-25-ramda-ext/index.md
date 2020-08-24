---
layout: post
title: '유용한 ramda 확장 함수들'
date: 2020-08-14 00:10
tags: [ramda, js, function-programming]
description:
draft: false
---

ramda 를 응용한 몇가지 유용한 확장함수들


### go
```js
export const go = (...args) => {
  return R.pipe(...args.slice(1))(args[0])
}
```

### noop
```js
export const noop = () => {}
```

### except
```js
export const except = R.pipe(R.complement, R.filter)
```

### propNotEq
```js
export const propNotEq = R.complement(R.propEq)
```
