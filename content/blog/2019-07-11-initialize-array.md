---
layout: post
title:  "[js] array 를 초기화하는 방법"
date:   2019-07-11 00:10
categories: test
tags: [js, array, initilaize]
---
배열을 초기화하는 가장 쉬운 방법은 다음과 같다.
```
let arr = [1, 2, 3]
arr = []
```

<br>

arr 가 const 로 선언되어 있다면 아래와 같이 처리할 수 있다.
```
const arr = [1, 2, 3]
arr.length = 0
```

<br>

그런데 뷰에서는 length 를 초기화하는 방법으로 인한 변이가 reactive 하지 않기 때문에 splice를 사용해야 한다. https://vuejs.org/v2/guide/list.html#Caveats
```
arr.splice(0)
```

하지만 위 방법은 readable 하지 않기 때문에 그냥 arr 을 let 으로 선언하고 `arr = []` 로 사용하는 것이 더 낫겠다.