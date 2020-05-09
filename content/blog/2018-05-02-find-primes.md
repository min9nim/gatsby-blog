---
layout: post
title:  "[알고리즘] 소수 찾기"
date:   2018-05-02 14:00:00 +0900
categories: algorithm
tags: [prime]
---
Problem
---
* 1부터 n까지 모든 소수를 찾는 알고리즘


<br/>

Concept
---
1. 2부터 n까지 자연수를 요소로 갖는 배열 `arr` 생성 `[2, 3, 4, ..., n]`
1. 빈 배열 `primes` 를 생성
1. `arr` 배열의 첫번째 요소(`arr[0]`)를 `primes` 배열에 추가
1. `arr` 배열에서 `arr[0]` 의 배수를 모두 제거
1. 위 3~4과정을 `arr[0]` 이 `n/2` 보다 커지기 전까지 반복
1. 위 과정이 끝나고 `primes` 배열과 `arr` 배열을 합치면, 1부터 n까지의 모든 소수를 얻게됨


<br/>


JS Code
---
<script src="https://gist.github.com/min9nim/1818bf6fe935e99cb9677227a1e8919f.js"></script>

<br>

Ref.
---
<https://programmers.co.kr/learn/challenge_codes/21>





[1]: https://hackernoon.com/5-technology-trends-to-learn-in-2018-if-you-want-a-great-career-caf2e2318abb