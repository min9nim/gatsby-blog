---
layout: post
title: "[js] 불변성을 유지하며 array 순서 뒤집기"
date: 2018-06-07 09:00:00 +0900
categories: vanillaJS
tags: [array, reverse, immutability, 불변성]
---

### 문제

배열의 순서를 뒤집기 위해 간단히 `arr.reverse()` 를 이용할 수 있지만 `Array.prototype.reverse` 는 불변성을 유지하지 못한다.

<br>

### 해결책

1. 불변성을 유지하는 slice() 를 이용한 방법

```
> const arr = [1,2,3];
  const newArr = arr.slice().reverse();
> newArr
< (3) [3, 2, 1]
> arr
< (3) [1, 2, 3]
```

2. ... (_spread operator_) 를 이용한 방법

```
> const arr = [1,2,3];
  const newArr = [...arr].reverse();
> newArr
< (3) [3, 2, 1]
> arr
< (3) [1, 2, 3]
```
