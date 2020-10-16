---
layout: post
title: "[js] 배열의 마지막에 여러 요소 추가"
date: 2018-11-04 00:10
categories: vanillaJS
tags: [array, js]
---

배열의 마지막에 2개 이상의 원소를 추가하는 방법

<br>
하나, `splice`

```js
let arr1 = [1,2];
let arr2 = [3,4];
arr1.splice(arr1.length, 0, ...arr2)
```

<br>
둘, `concat`

```js
let arr1 = [1,2];
let arr2 = [3,4];
arr1 = arr1.concat(arr2);
```

<br>
셋, `push`

```js
let arr1 = [1,2];
let arr2 = [3,4];
arr1.push(...arr2);
```

<br>
넷, `spread operator`

```js
let arr1 = [1,2];
let arr2 = [3,4];
arr1 = [...arr1, ...arr2]
```

<br>

#### 결론

4번이 가장 직관적으로 이해하기 쉽다고 생각한다.
