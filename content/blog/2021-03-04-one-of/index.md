---
layout: post
title: 'oneOf 유틸'
date: 2021-03-04 00:10
tags: [js]
description: 내가 애정하는 함수 `oneOf`
draft: false
---

내가 애정하는 함수 `oneOf`

```js
const oneOf = (items, defaultValue) => {
  const matched = items.find(item => item[0])
  return matched ? matched[1] : defaultValue
}
```

여러가지 조건에 따라 선택해야 하는 값이 달라질 경우 유용하게 사용할 수 있다.

아래와 같은 코드를
```js
const value = A ? 1 : b ? 2 : C ? 3 : D ? 4 : 5
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
