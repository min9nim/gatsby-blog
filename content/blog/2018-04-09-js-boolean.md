---
layout: post
title: '[js] boolean 결과 값이 false 인 값들'
date: 2018-04-09 14:00:00 +0900
categories: vanillaJS
tags: [boolean]
---

#### 조건문에서 boolean 값으로 형변환 시,

1. false를 리턴하는 값들

```
false
null
undefined
''
0
NaN
```

2. true를 리턴하는 것

```js
// 위 1번외 모든 값
// !!Infinity 도 true 리턴
```
