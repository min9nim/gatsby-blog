---
layout: post
title: "[js] generator 의 yield* 문법"
date: 2020-06-03 00:10
tags: [generator, yield]
description:
draft: false
---

generator 에서 `yield*` 문법의 의미를 알아보자.

아래와 같이 제너레이터 안에서 for ~ of 를 이용해 이터레이터의 요소를 반복적으로 `yield` 해야 할 경우

```js{3-5}
function* gen() {
  const arr = [1, 2, 3, 4, 5]
  for (const v of arr) {
    yield v
  }
}

conssole.log([...gen()]) // [1, 2, 3, 4, 5]
```

<br>

아래와 같이 `yield*` 로 축약하여 사용할 수 있다.

```js{3}
function* gen() {
  const arr = [1, 2, 3, 4, 5]
  yield* arr
}

console.log([...gen()]) // [1, 2, 3, 4, 5]
```
