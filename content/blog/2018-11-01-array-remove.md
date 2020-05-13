---
layout: post
title: "[js] 배열에서 특정 요소 제거"
date: 2018-11-01 00:10
categories: vanillaJS
tags: [array, js]
---

배열의 특정 요소를 제거하는 2가지 방법

<br>
하나,
```javascript
let idx = arr.indexOf(ele);
arr.splice(idx, 1);
```

<br>
둘,
```javascript
arr = arr.filter(v => v !== ele);
```

<br>

#### 결론

2번째 방법은 조건에 따라 여러 개를 한꺼번에 삭제하는 것도 가능하다. 읽기도 쉽고 코드도 더 짧다. `filter` 를 이용하자
