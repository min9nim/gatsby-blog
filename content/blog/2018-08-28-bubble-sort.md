---
layout: post
title: "[알고리즘] 버블소트"
date: 2018-08-28 01:00:00 +0000
categories: algorithm
tags: [algorithm, bubble-sort]
---

거품정렬은 인접한 두 원소의 크기를 비교하며 배열의 가장 큰(또는 가장 작은) 값을 끝으로 하나씩 밀어낸다.
마치 거품이 위로 올라가는 듯한 이미지를 연상시키기 때문에 거품정렬이라는 이름이 붙었다.

한줄요약

> 앞에서부터 오른쪽 방향으로 이웃한 두 요소를 비교하여 큰값을 뒤로 밀어낸다

<br>

### 특징

- [stable sort](https://zetawiki.com/wiki/안정정렬,_불안정정렬)
- 시간복잡도: O(n^2)

<br>

### 자바스크립트 코드

```javascript
function bubbleSort(a) {
  for (var i = 0; i < a.length - 1; i++) {
    console.log(a)
    for (var j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        // 오름차순
        var tmp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = tmp
      }
    }
  }
  return a
}

bubbleSort([1, 4, 5, 2, 7, 8])
/*
[1, 4, 5, 2, 7, 8]
[1, 4, 2, 5, 7, 8]
[1, 2, 4, 5, 7, 8]
[1, 2, 4, 5, 7, 8]
[1, 2, 4, 5, 7, 8]
[1, 2, 4, 5, 7, 8]
*/
```

<br>

### Ref.

- <https://ko.wikipedia.org/wiki/거품_정렬>
- <https://www.hackerrank.com/challenges/ctci-bubble-sort/problem>
