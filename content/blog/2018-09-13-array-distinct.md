---
layout: post
title: "[js] 배열에서 중복 제거"
date: 2018-09-13 09:00
categories: vanillaJS
tags: [array, filter, indexOf]
---

filter 와 indexOf 를 이용한 중복제거 방법

```javascript
var a = ["a", 1, "a", 2, "1"]
var unique = a.filter((v, i, s) => s.indexOf(v) === i) // returns ['a', 1, 2, '1']
```

<br>

### Ref

<https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates>
