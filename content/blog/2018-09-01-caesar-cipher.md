---
layout: post
title: "Caesar Cipher"
date: 2018-09-01 15:00
categories: algorithm
tags: [string, encrypt]
---

### 문제

caesar 암호화 방법은 아래와 같다.

숫자 3이 주어 진다면 먼저 아래와 같이 알파벳의 순서를 3칸 rotation 시킨 알파벳 배열을 준비하고

```
Original alphabet:      abcdefghijklmnopqrstuvwxyz
Alphabet rotated +3:    defghijklmnopqrstuvwxyzabc
```

평문 문자열에 대하여 각 문자들을 위의 새로운 알파벳 순서 배열의 해당 위치 문자로 변환시킨다.

예) "hello WORLD!"

```
"hello WORLD!" => "khoor ZRUOG!"
```

<br>
rotation 크기가 k로 주어질 때, 임의 문자열을 암호화하는 caesar 암호화 함수를 완성하라.

<br>

### js코드

```javascript
function caesarCipher(s, k) {
  function enc(k) {
    var lower = "abcdefghijklmnopqrstuvwxyz"
    var upper = lower.toUpperCase()

    var encLower = lower.slice(k % 26) + lower.slice(0, k % 26)
    var encUpper = upper.slice(k % 26) + upper.slice(0, k % 26)

    return function encK(c) {
      if (lower.includes(c)) {
        return encLower[lower.indexOf(c)]
      } else if (upper.includes(c)) {
        return encUpper[upper.indexOf(c)]
      } else {
        return c
      }
    }
  }
  var encK = enc(k)
  return s
    .split("")
    .map(c => encK(c))
    .join("")
}

caesarCipher("hello world!", 3)
```

<br>

### 코드 리뷰

- 문자열의 일부를 잘라낼 때 `slice` 함수를 적절히 활용
- 굳이 그럴 필요는 없었지만 `encK` 함수를 만들기 위해 `enc` 고차함수를 활용

<br>

### Ref.

<https://www.hackerrank.com/challenges/caesar-cipher-1/problem>
