---
layout: post
title: "Forming a Magic Square"
date: 2018-09-01 17:00
categories: algorithm
tags: [array, magic-square-forming]
---

### 문제

아래와 같이 가로/세로/대각선의 합계가 모두 같은 행렬을 magic-square 라고 한다.

```
8 3 4
1 5 9
6 7 2
```

특정 3x3 행렬이 주어질 때 아래와 같이 magic-square 로 변환할 수 있다.

```
5 3 4      8 3 4
1 5 8  =>  1 5 9
6 4 2      6 7 2
```

이 경우 변경이 필요한 숫자는 5,8,4 뿐이며 변경에 발생한 비용은 아래와 같이 계산할 수 있다.

```
|5-8| + |8-9| + |4-7| = 7
```

위 예제의 변환 비용은 `7`이 된다.

<br>
미션) 1~9의 자연수를 요소로 같는 임의의 3x3 행렬이 주어질 때 이를 magic-square 로 변환하기 위한 최소 비용을 구하는 함수를 작성하라

<br>

### 풀이 컨셉

3x3 행렬에서 magic-square 의 종류는 8의 위치와 방향에 따라 아래 8가지로 분류된다.

```
8 3 4   8 1 6
1 5 9   3 5 7
6 7 2   4 9 2

4 3 8   6 1 8
9 5 1   7 5 3
2 7 6   2 9 4

2 7 6   2 9 4
9 5 1   7 5 3
4 3 8   6 1 8

6 7 2   4 9 2
1 5 9   3 5 7
8 3 4   8 1 6
```

주어진 3x3 행렬에 대하여 위 8가지 경우에 대한 비용을 각각 계산하고 그 중 최소값을 리턴한다

<br>

### js코드

```javascript
function formingMagicSquare(s) {
  var ms = [
    [8, 3, 4, 1, 5, 9, 6, 7, 2],
    [8, 1, 6, 3, 5, 7, 4, 9, 2],
    [4, 3, 8, 9, 5, 1, 2, 7, 6],
    [6, 1, 8, 7, 5, 3, 2, 9, 4],
    [2, 7, 6, 9, 5, 1, 4, 3, 8],
    [2, 9, 4, 7, 5, 3, 6, 1, 8],
    [6, 7, 2, 1, 5, 9, 8, 3, 4],
    [4, 9, 2, 3, 5, 7, 8, 1, 6],
  ]

  var arr = []
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      arr.push(s[i][j])
    }
  }

  var minsum = 1000000 // 충분히 큰값 임의 세팅

  ms.forEach(msarr => {
    var sum = msarr.reduce((a, v, i) => a + Math.abs(v - arr[i]), 0)
    if (sum < minsum) {
      minsum = sum
    }
  })

  return minsum
}

formingMagicSquare([
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 5],
])
```

<br>

### 코드 리뷰

- 비용 계산을 쉽게 하기 위해 2차원 배열을 1차원 배열로 serialize 하였다
- 보다 스마트한 방법이 있을 것 같지만 경우의 수가 많지 않은 예제라 하드코딩된 데이터를 이용했다. 하지만 마음이 편치 않다.
- `forEach` 안에서 인자와 변수들의 구별을 명확히 하지 않으면 오류가 발생할 수 있으니 주의한다
  - 실제 코딩시 `msarr` 대신 `arr`이름을 사용했다가 앞서 정의된 `arr` 변수와의 충돌로 잘못된 결과가 나왔었다.

<br>

### Ref.

<https://www.hackerrank.com/challenges/magic-square-forming/problem>
