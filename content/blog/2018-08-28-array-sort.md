---
layout: post
title: "[js] Array.prototype.sort"
date: 2018-08-28 01:00
categories: vanillaJS
tags: [array, sort]
---

자바스크립트는 Array.prototype.sort 를 통해 언어 차원에서 기본적인 정렬 기능을 제공한다. 배열의 sort 함수는 특별히 정확한 사용법을 익혀두는 것이 중요하다

sort 함수의 아래 몇가지 특징들은 기억을 해두자

- 안정정렬이 아닐 수 있다
- immutable 하지 않다.(original 배열의 상태를 변경한다)
- 정렬속도와 복잡도는 브라우져의 구현에 따라 다를 수 있다

<br>

#### 기본적으로 가나다 순 정렬

```javascript
var fruit = ["cherries", "apples", "bananas"]
fruit.sort() // ['apples', 'bananas', 'cherries']
```

<br>

#### 숫자 배열의 경우 숫자를 문자열로 변환후 가나다 순으로 정렬

```javascript
var scores = [1, 10, 21, 2]
scores.sort() // [1, 10, 2, 21]
```

<br>

#### 숫자 배열을 오름차순 정렬 하려면 이렇게

```javascript
var scores = [1, 10, 21, 2]
scores.sort((a, b) => a - b) // [1, 2, 10, 21]
```

<br>

#### 비교함수의 리턴값

sort함수에 인자로 전달되는 비교함수를 `compareFunction` 라고 할 때

- `compareFunction(a,b)` 값이 0보다 작으면 `a`, `b` 순으로 정렬
- `compareFunction(a,b)` 값이 0보다 크면 `b`, `a` 순으로 정렬
- `compareFunction(a,b)` 값이 0이면 `a` 와 `b` 에 대해 순서를 변경하지 않음
- `compareFunction(a,b)` 는 요소 `a`와 `b`의 특정 쌍이 두 개의 인수로 주어질 때 항상 동일한 값을 반환해야 함. 일치하지 않는 결과가 반환되면 정렬 순서는 보장되지 않음

<br>

#### Ref.

<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>
