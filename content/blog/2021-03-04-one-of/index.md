---
layout: post
title: 'oneOf 유틸'
date: 2021-03-04 00:10
tags: [js]
description: 내가 애정하는 함수 `oneOf`
draft: false
---

내가 애정하는 함수 `oneOf`

```ts
type Fn<T> = () => T

export default function oneOf<T>(
  items: Array<[boolean | Fn<boolean>, T | Fn<T>]>,
  defaultValue?: T | Fn<T>,
): T | undefined => {
  const matched = items.find(item =>
    typeof item[0] === 'function' ? item[0]() : item[0],
  )
  const result = matched ? matched[1] : defaultValue
  return typeof result === 'function' ? (result as Fn<T>)() : result
}
```

여러가지 조건에 따라 선택해야 하는 값이 달라질 경우 유용하게 사용할 수 있다.

<br/>

아래와 같은 코드를
```js
const value = A ? 1 : B ? 2 : C ? 3 : D ? 4 : 5
```

이렇게 가독성 높은 코드로 작성할 수 있다. 
```js
const value = oneOf(
  [
    [A, 1],
    [B, 2],
    [C, 3],
    [D, 4],
  ],
  5,
)
```

해당 함수는 [@madup-inc/utils](https://www.npmjs.com/package/@madup-inc/utils) 패키지에 포함되어 있어 아래와 같이 사용할 수 있다.

### Install
```
yarn add @madup-inc/utils
```

### Usage
```js
import { oneOf } from '@madup-inc/utils'

oneOf([[true, 2]])  // 2
oneOf([
  [false, 1],
  [false, 2],
  [true, 3],
])  // 3
oneOf([
  [false, 1],
  [true, 2],
])  // 2
oneOf([[false, 1]]) // undefined
oneOf([[false, 1]], 'zzz')  // 'zzz'

// Lazy evaluation
oneOf([() => true, 1])  // 1
oneOf([true, () => 2])  // 2
oneOf([() => true, () => 3])  // 3
oneOf([false, 1], () => 4)  // 4
``` 


