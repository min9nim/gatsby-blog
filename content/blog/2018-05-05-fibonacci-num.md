---
layout: post
title:  "[알고리즘] 피보나치 수"
date:   2018-05-04 13:00:00 +0900
categories: algorithm
tags: [피보나치수열, fibonacci]
---
Problem
---
효진이는 멀리 뛰기를 연습하고 있습니다. 효진이는 한번에 1칸, 또는 2칸을 뛸 수 있습니다. 칸이 총 4개 있을 때, 효진이는
(1칸, 1칸, 1칸, 1칸)
(1칸, 2칸, 1칸)
(1칸, 1칸, 2칸)
(2칸, 1칸, 1칸)
(2칸, 2칸)
의 5가지 방법으로 맨 끝 칸에 도달할 수 있습니다. 멀리뛰기에 사용될 칸의 수 n이 주어질 때, 효진이가 끝에 도달하는 방법이 몇 가지인지 출력하는 jumpCase 함수를 완성하세요. 예를 들어 4가 입력된다면, 5를 반환해 주면 됩니다.
- 문제출처: <https://programmers.co.kr/learn/challenge_codes/33>

<br/>

Solution
---
칸의 수가 n 개 주어졌을 때 총 멀리뛰기 방법의 수를 j(n)이라 하자. n칸을 멀리뛰기 하는 전체 방법의 수는 최초 1칸을 뛰었을 경우와 최초 2칸을 뛰었을 경우 2가지로 나누어 볼 수 있다.
첫번째 경우의 방법의 수는 남아있는 칸의 수가 n-1 개 이므로 j(n-1)이 되고 두번째 경우의 방법의 수는 남아있는 칸의 수가 n-2개 이므로 j(n-2)가 된다.
그러므로 j(n) = j(n-1) + j(n-2) 와 같이 표현될 수 있다.

<br/>

JS Code
---
<script src="https://gist.github.com/min9nim/efde65bfb9e1fbff36d427c5da551b0c.js"></script>

<br/>

Ref.
---
* <https://www.acmicpc.net/blog/view/28>
