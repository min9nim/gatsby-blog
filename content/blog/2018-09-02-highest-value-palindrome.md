---
layout: post
title: "Highest Value Palindrome"
date: 2018-09-02 17:00
categories: algorithm
tags: [palindrome]
---

흔한 팰린드롬(좌우대칭 문자열) 관련 문제이지만 이틀 동안 너무 고생했던 문제ㅠ
<https://www.hackerrank.com/challenges/richie-rich/problem>

<br>

### 문제

0~9 까지 숫자로 이루어진 문자열과 자연수 k가 입력으로 주어진다. 주어진 문자열을 팰린드롬으로 변환하기 위하여 변경작업이 k번까지 허용된다고 할 때 만들 수 있는 팰린드롬 문자열 중 가장 큰 값의 팰린드롬 문자열을 리턴하는 함수를 작성하라.(단, k번 만에 팰린드롬 문자열을 만들 수 없을 경우에는 -1을 리턴한다)

입력 예)

```
6 3
092282
```

출력 예

```
992299
```

<br>

### js코드

```javascript
function highestValuePalindrome(s, n, k) {
  function getMincnt(s) {
    var cnt = 0
    for (var i = 0; i < s.length / 2; i++) {
      if (s[i] !== s[s.length - 1 - i]) {
        cnt++
      }
    }
    return cnt
  }

  var m = getMincnt(s) // palindrome 만들기 위한 필요 변경 개수
  if (k < m) {
    return -1
  }

  var rest = k - m // 여윳돈(m번의 변경작업을 제외하고 남는 추가 변경작업 기회)
  var sarr = s.split("")

  for (var i = 0; i < n / 2 && k > 0; i++) {
    if (i === n - 1 - i) {
      // 정가운데까지 도착했으면
      sarr[i] = "9"
      break
    }
    if (sarr[i] === sarr[n - 1 - i]) {
      if (sarr[i] === "9") {
        // 양끝이 모두 9인 경우
        continue
      } else {
        // 양끝이 모두 9가 아닌 경우
        if (rest >= 2) {
          // 양끝 값이 이미 같기 때문에 굳이 변경을 하지 않아도 되지만 여윳돈이 있다면 최대값을 만들기 위해 9로 치환하도록 한다
          sarr[i] = "9"
          sarr[n - 1 - i] = "9"
          k -= 2 // 변경작업 2회 사용
          rest -= 2 // 추가작업 찬스 2회 사용(여윳돈 사용))
        } else {
          continue
        }
      }
    } else {
      if (sarr[i] === "9" || sarr[n - 1 - i] === "9") {
        // 양끝 중 하나가 9라면 무조건 9로 세팅
        sarr[i] = "9"
        sarr[n - 1 - i] = "9"
        k-- // 변경작업 1회 사용
      } else {
        if (rest >= 1) {
          // 여윳돈이 있으면 양끝 두개모두 9로 세팅
          sarr[i] = "9"
          sarr[n - 1 - i] = "9"
          k -= 2 // 변경작업 2회 사용
          rest-- // 추가작업 찬스 1회 사용(어짜피 1회는 사용했어야 하는 경우이므로)
        } else {
          // 여윳돈이 없다면 그냥 짝만 맞추고 다음으로
          var max = Math.max(sarr[i], sarr[n - 1 - i])
          sarr[i] = max
          sarr[n - 1 - i] = max
          k-- // 변경작업 1회 사용
        }
      }
    }
  }

  return sarr.join("")
}
```

<br>

### 풀이 리뷰

짧은 입력값이 주어질 경우 사람이 풀기에는 어렵지 않은 문제지만 그 풀이방법을 로직으로 꼼꼼히 작성하기가 상당히 까다로웠다. 그냥 처음부터 찬찬히 풀이과정을 꼼꼼히 분기조건으로 나타내면서 풀어냈으면 이리 오래 걸리진 않았을 터인데 대충 때려 맞추려다가 오히려 훨씬 더 많은 시간을 소비하고 말았다.
