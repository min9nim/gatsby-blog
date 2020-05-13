---
layout: post
title: "[알고리즘] 선택정렬"
date: 2018-08-29 01:00:00 +0100
categories: algorithm
tags: [algorithm, selection-sort]
---

선택정렬은 아래와 같은 절차로 수행된다.

1. 주어진 배열의 최소값을 찾는다
1. 그 값을 맨 앞에 위치한 값과 교체한다.
1. 맨 처음 위치를 뺀 나머지 리스트들에 대하여 위 과정을 반복한다

한줄요약

> 남은 배열의 최소값을 찾아서(**선택하여**) 앞자리부터 채워 넣는다.

<br>

### 특징

- [Not stable sort](https://zetawiki.com/wiki/안정정렬,_불안정정렬)
- 시간복잡도: O(n^2)

<br>

### 자바스크립트 코드

```javascript
function selectionSort(a) {
  for (var i = 0; i < a.length - 1; i++) {
    console.log(a)
    var minIdx = i
    for (var j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) {
        minIdx = j
      }
    }
    var tmp = a[minIdx]
    a[minIdx] = a[i]
    a[i] = tmp
  }
  return a
}

selectionSort([7, 4, 2, 1, 9, 3])
/*
[7, 4, 2, 1, 9, 3]
[1, 4, 2, 7, 9, 3]
[1, 2, 4, 7, 9, 3]
[1, 2, 3, 7, 9, 4]
[1, 2, 3, 4, 9, 7]
[1, 2, 3, 4, 7, 9]
*/
```

<br>

### 선택정렬이 불안정정렬인 이유

간단히 아래 코드를 돌려보면 알 수 있다. 결과를 보면 James 와 Marry 의 위치가 처음과 다르게 바꼇다.

```javascript
var arr = [
  { name: "James", score: 30 },
  { name: "Marry", score: 30 },
  { name: "Keating", score: 10 },
  { name: "John", score: 50 },
]

function selectionSort(a, compareFunc) {
  // compareFunc 스펙은 아래와 같다
  // compareFunc(a,b) 와 같이 비교할 배열의 두 요소를 인자로 전달하며 호출
  // a < b 이면 음수를 리턴 => a .. b .. 순으로 정렬됨(a 가 b 보다 앞으로 옴)
  // a > b 이면 양수를 리턴 => 위와 반대로 정렬됨
  // a == b 이면 0을 리턴한다

  for (var i = 0; i < a.length - 1; i++) {
    console.log(i + ") " + JSON.stringify(a))
    var minIdx = i
    for (var j = i + 1; j < a.length; j++) {
      if (compareFunc(a[j], a[minIdx]) < 0) {
        minIdx = j
      }
    }
    var tmp = a[minIdx]
    a[minIdx] = a[i]
    a[i] = tmp
  }
  return a
}

selectionSort(arr, (a, b) => a.score - b.score)
/* 결과
0) [{"name":"James","score":30},{"name":"Marry","score":30},{"name":"Keating","score":10},{"name":"John","score":50}]
1) [{"name":"Keating","score":10},{"name":"Marry","score":30},{"name":"James","score":30},{"name":"John","score":50}]
2) [{"name":"Keating","score":10},{"name":"Marry","score":30},{"name":"James","score":30},{"name":"John","score":50}]
*/
```

<br>

### Ref.

- <https://ko.wikipedia.org/wiki/선택_정렬>
- [Why is Selection Sort not stable?](https://stackoverflow.com/questions/4601057/why-is-selection-sort-not-stable)
- <http://mygumi.tistory.com/94>
