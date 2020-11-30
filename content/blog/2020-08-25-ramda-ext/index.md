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
export const go = (value, ...fns) => {
  return R.pipe(...fns)(value)
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

### OR
```js
export const OR = (pred1, pred2) => {
  return value => R.or(pred1(value), pred2(value))
}
```

### AND
```js
export const AND = (pred1, pred2) => {
  return value => R.and(pred1(value), pred2(value))
}
```

### isNotNil
```js
export const isNotNil = R.complement(R.isNil)
```

### peek
`R.pipe` 사용시 중간에 전달되는 값을 로그로 찍어서 확인할 때 필요한 함수
```js
export const peek = (...args) => {
  return value => {
    if (!args.length) {
      console.log('peek', value)
    } else {
      console.log(...args, value)
    }
    return value
  }
}
```

### hasProps
```js
export const hasProps = R.curry((arr, obj) => R.all(R.has(R.__, obj), arr))
```
