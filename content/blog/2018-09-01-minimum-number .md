---
layout: post
title: "안전한 비밀번호 체크"
date: 2018-09-01 15:00
categories: algorithm
tags: [string]
---

### 문제

비밀번호 문자열이 주어질 때 안전한 비밀번호를 만들기 위해 추가로 입력해야 할 문자의 최소 개수를 구하라
<https://www.hackerrank.com/challenges/strong-password/problem>

안전한 비밀번호 조건

- 6글자 이상
- 숫자 1개 이상 포함
- 소문사 1개 이상 포함
- 대문자 1개 이상 포함
- 특수문자 1개 이상 포함

각 문자범위는 아래와 같다

```
numbers = "0123456789"
lower_case = "abcdefghijklmnopqrstuvwxyz"
upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
special_characters = "!@#$%^&*()-+"
```

<br>

### 해결 컨셉

1. 주어진 문자열에 포함된 숫자, 대문자, 소문자, 특수문자의 개수를 모두 체크한다.
1. 문자열의 길이와 빠진 필수 문자의 개수에 따라 추가로 입력이 필요한 문자 개수를 결정할 수 있다

<br>

### js코드

```javascript
function minimumNumber(n, password) {
  var numbers = "0123456789"
  var lower_case = "abcdefghijklmnopqrstuvwxyz"
  var upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var special_characters = "!@#$%^&*()-+"

  var nlus = [0, 0, 0, 0]
  password.split("").forEach(v => {
    if (numbers.includes(v)) {
      nlus[0]++
    } else if (lower_case.includes(v)) {
      nlus[1]++
    } else if (upper_case.includes(v)) {
      nlus[2]++
    } else if (special_characters.includes(v)) {
      nlus[3]++
    } else {
      throw Error("input error")
    }
  })

  var zeroCnt = nlus.reduce((a, c) => a + (c === 0 ? 1 : 0), 0)

  if (zeroCnt === 0) {
    if (n >= 6) {
      return 0
    } else {
      return 6 - n
    }
  } else if (zeroCnt > 0) {
    if (n >= 6) {
      return zeroCnt
    } else {
      if (zeroCnt + n >= 6) {
        return zeroCnt
      } else {
        return 6 - n
      }
    }
  } else {
    throw Error("zeroCnt < 0")
  }
}
```

<br>

### 코드 리뷰

- 문자열을 배열로 변환할 때는 `split("")`를 사용
- 문자열에 사용된 숫자/대문자/소문자/특수문자 개수를 카운트하기 위해 `for`루프 대신 `forEach` 를 활용
- `nlus` 는 NumberLowerUpperSpecial 이름의 축약형
- `nlus`배열에서 `0`의 개수를 카운트하기 위해 `reduce` 를 활용함
- `includes` 함수는 배열 뿐만 아니라 문자열에서도 사용 가능
- 런타임에 로직 상 도달할 수 없는 분기에 들어올 경우 오류를 빨리 찾을 수 있도록 예외를 발생시킴
