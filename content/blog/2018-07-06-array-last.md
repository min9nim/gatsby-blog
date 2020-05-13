---
layout: post
title: "[js] 배열의 마지막 요소 참조"
date: 2018-07-06 16:00:00 +0900
categories: vanillaJS
tags: [js]
---

일반적으로 배열의 마지막 요소를 아래와 같이 인덱스 참조로 접근할 수 있지만,

```javascript
let arr = [1, 2, 3]
arr[arr.length - 1]
```

<br>

배열이 특정 객체의 속성으로 depth 가 깊어지면 코딩이 불편해 진다.

```javascript
tech.user.post.comment = ["a", "b", "c"]
tech.user.post.comment[tech.user.post.comment.length - 1]
```

<br>

이럴 때 활용할 수 있는 좀 더 깔끔한 표현을 찾아보았다. (es5 방식이 좀 더 보기 좋은거 같다)

```javascript
// es5
let arr = [1, 2, 3]
arr.slice().pop() // or arr.slice(-1)[0];

// es6
let arr = [1, 2, 3]
;[...arr].pop()
```

마찬가지로 아래와 같이 배열의 첫번째 요소를 참조하는 것도 가능하다. 하지만, 이 경우에는 `arr[0]` 이 훨씬 낫다.

```javascript
// es5
let arr = [1, 2, 3]
arr.slice().shift()

// es6
let arr = [1, 2, 3]
;[...arr].shift()
```

<br>

개인적으로 배열의 첫번째 요소에 접근하기 위한 방법이 `arr[0]` 뿐인 것이 참 아쉽다. `arr.first`, `arr.last` 와 같은 문법이 제공된다면 더할나위 없이 좋겠다.

물론 아래와 같이 getter 를 세팅하면 배열에서 `first`, `last` 속성을 사용할 수는 있다. 그렇지만 또 굳이 이렇게 까지해서 사용하고 싶은 욕심은 없다.

```javascript
Object.defineProperties(Array.prototype, {
  first: {
    get: function () {
      return this[0]
    },
  },
  last: {
    get: function () {
      return this[this.length - 1]
    },
  },
})

let arr = [4, 7, 5, 2]
console.log(arr.first) // 4
console.log(arr.last) // 2
```
