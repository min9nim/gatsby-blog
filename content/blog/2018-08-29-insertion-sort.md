---
layout: post
title: "[알고리즘] 삽입정렬"
date: 2018-08-29 01:00:00 +0100
categories: algorithm
tags: [algorithm, insertion-sort]
---

삽입정렬은 배열을 양분하고 왼쪽은 정렬상태, 오른쪽은 비정렬상태를 유지해 나가며 오른쪽(비정렬상태) 첫번째 요소를 왼쪽 정렬상태의 적절한 위치에 삽입하는 방법으로 요소들을 정렬한다

한줄요약

> 정렬된 왼쪽 배열에 새 것을(비정렬된 배열의 요소중 하나) 하나씩 끼워넣기(삽입) 한다.

<br>

### 특징

- [stable sort](https://zetawiki.com/wiki/안정정렬,_불안정정렬)
- 시간복잡도: O(n^2)

<br>

### 자바스크립트 코드

```javascript
function insertionSort(a) {
  for (var i = 1; i < a.length; i++) {
    console.log(a)
    var tmp = a[i]
    for (var j = i - 1; j >= 0 && a[j] > tmp; j--) {
      a[j + 1] = a[j]
    }
    a[j + 1] = tmp
  }
  return a
}

insertionSort([7, 4, 2, 1, 9, 3])
/*
[7, 4, 2, 1, 9, 3]
[4, 7, 2, 1, 9, 3]
[2, 4, 7, 1, 9, 3]
[1, 2, 4, 7, 9, 3]
[1, 2, 4, 7, 9, 3]
[1, 2, 3, 4, 7, 9]
*/
```

<br>

### Ref.

<https://ko.wikipedia.org/wiki/삽입_정렬>
