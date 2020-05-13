---
layout: post
title: "[알고리즘] Merge sort"
date: 2018-09-02 23:00
categories: algorithm
tags: [algorithm, merge-sort]
---

정렬된 2개의 배열이 주어 진다면 정렬상태를 유지하며 병합하는 것은 참 쉽다. 이 점에 착안하여 임의의 주어진 배열을 가운데 기준으로 양분한 뒤 정렬된 상태를 유지하며 다시 병합하는 방법. 나뉘어진 두 부분의 배열에 대해서도 재귀적으로 병합정렬을 수행.

한줄요약,

> 2개로 나누고 정렬된 2개의 배열을 병합. 나누어진 배열에 재귀호출

<br>

### 특징

- 분할&정복
- 시간복잡도: O(nLogn)
- 공간복잡도: O(n)
- 안정정렬

<br>

### js코드

```javascript
function merge(arr1, arr2) {
  var res = []
  while (arr1.length > 0 || arr2.length > 0) {
    if (arr1.length === 0) {
      res.push(arr2.shift())
    } else if (arr2.length === 0) {
      res.push(arr1.shift())
    } else if (arr1[0] <= arr2[0]) {
      // 여기서 = 를 빼면 불안정정렬이 된다
      res.push(arr1.shift())
    } else {
      res.push(arr2.shift())
    }
  }
  return res
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr // 배열의 길이가 0 or 1이면 정렬된 상태로 간주하고 그대로 리턴
  }
  var pivot = Math.floor(arr.length / 2)
  var left = arr.slice(0, pivot)
  var right = arr.slice(pivot, arr.length)
  return merge(mergeSort(left), mergeSort(right))
}

var arr = [7, 4, 9, 8, 5, 3, 2, 1, 9, 3]
// mergeSort는 arr의 상태는 변화시키지 않고 정렬된 새로운 배열을 리턴함
mergeSort(arr) // [1, 2, 3, 3, 4, 5, 7, 8, 9, 9]
```

<br>

### 재귀 대신 루프 사용도 가능

배열을 한방에 잘개 분할하고 루프를 이용해 한꺼번에 병합하는 것도 가능

```javascript
function merge(arr1, arr2) {
  if (arr1 === undefined || arr2 === undefined) {
    // 아래 mergeSort 의 인자로 주어지는 배열 arr의 길이가 홀수인 경우, 루프 안에서 chunks[i+1] 의 인덱스가 배열의 길이를 오버하여 arr2가 undefined 로 들어올 수 있다
    return arr1 || arr2
  }
  var res = []
  while (arr1.length > 0 || arr2.length > 0) {
    if (arr1.length === 0) {
      res.push(arr2.shift())
    } else if (arr2.length === 0) {
      res.push(arr1.shift())
    } else if (arr1[0] <= arr2[0]) {
      // 여기서 = 를 빼면 불안정정렬이 된다
      res.push(arr1.shift())
    } else {
      res.push(arr2.shift())
    }
  }
  return res
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var chunks = arr.map(v => [v])
  while (chunks.length > 1) {
    var newChunks = []
    for (var i = 0; i < chunks.length; i += 2) {
      newChunks.push(merge(chunks[i], chunks[i + 1]))
    }
    chunks = newChunks
  }
  return chunks.pop()
}

var arr = [7, 4, 9, 8, 5, 3, 2, 1, 9, 3]
// mergeSort는 arr의 상태는 변화시키지 않고 정렬된 새로운 배열을 리턴함
mergeSort(arr) // [1, 2, 3, 3, 4, 5, 7, 8, 9, 9]
```
