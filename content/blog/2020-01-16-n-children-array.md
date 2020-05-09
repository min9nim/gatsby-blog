---
layout: post
title: '0부터 99까지 배열을 만드는 가장 간단한 방법'
date: 2020-01-16 00:10
categories: vanillaJS
tags: [js, array]
---

0부터 99까지 배열을 만드는 방법(내가 아는 가장 간단한 방법)

```javascript
Array.from(Array(100)).map((v, i) => i)
/*
[0, 1, 2, 3, 4, ... , 99]
*/
```
