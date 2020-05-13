---
layout: post
title: "[js] How reduce() works"
date: 2018-08-31 09:00
categories: vanillaJS
tags: [array, reduce]
---

### 초기값 없는 경우

다음 예제를 보자

```javascript
var arr = [0, 1, 2, 3, 4]
arr.reduce(function (accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue
})
```

첫번째 인자로 주어진 콜백함수는 총 4번 호출되며 이때 콜백함수에게 전달되는 인자와 결과값은 아래와 같다.(참고로 콜백함수를 호출할 때 3,4번째 인자는 생략가능하다)

| callback    | accumulator | currentValue | currentIndex | array           | return value |
| ----------- | ----------- | ------------ | ------------ | --------------- | ------------ |
| first call  | 0           | 1            | 1            | [0, 1, 2, 3, 4] | 1            |
| second call | 1           | 2            | 2            | [0, 1, 2, 3, 4] | 3            |
| third call  | 3           | 3            | 3            | [0, 1, 2, 3, 4] | 6            |
| fourth call | 6           | 4            | 4            | [0, 1, 2, 3, 4] | 10           |

(초기값이 전달되지 않을 경우) **currendIndex의 값이 1부터 시작**함을 유의한다. `reduce()` 함수의 리턴값은 마지막 콜백함수의 리턴값인 `10`이 된다.

ES6를 사용할 수 있다면 콜백함수로 아래와 같이 화살표함수를 사용할 수도 있다.

```javascript
var arr = [0, 1, 2, 3, 4]
arr.reduce(
  (accumulator, currentValue, currentIndex, array) => accumulator + currentValue
)
```

<br>

### 초기값 있는 경우

`reduce()` 함수의 두번째 인자로 초기값을 전달할 경우 콜백함수의 호출시 인자 값은 아래와 같다

```javascript
var arr = [0, 1, 2, 3, 4]
arr.reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator + currentValue
}, 10)
```

| callback    | accumulator | currentValue | currentIndex | array           | return value |
| ----------- | ----------- | ------------ | ------------ | --------------- | ------------ |
| first call  | 10          | 0            | 0            | [0, 1, 2, 3, 4] | 10           |
| second call | 10          | 1            | 1            | [0, 1, 2, 3, 4] | 11           |
| third call  | 11          | 2            | 2            | [0, 1, 2, 3, 4] | 13           |
| fourth call | 13          | 3            | 3            | [0, 1, 2, 3, 4] | 16           |
| fifth call  | 16          | 4            | 4            | [0, 1, 2, 3, 4] | 20           |

**초기값이 전달될 경우 currentIndex 는 0부터 시작**한다. reduce() 의 리턴값은 `20`이 된다

<br>
<br>

### Ref.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
