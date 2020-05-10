---
layout: post
title: "[알고리즘] 이진 검색"
date: 2018-08-30 15:00
categories: algorithm
tags: [algorithm, binary-search]
---

#### 퀴즈

<https://www.hackerrank.com/challenges/ctci-ice-cream-parlor/problem>

<br>

#### 퀴즈풀이

- 단순하게 이중루프를 사용하여 문제를 풀 경우 O(n^2) 시간복잡도로 인해 특정 테스트케이스에서 정해진 시간내 결과를 얻을 수 없다
- 한개의 아스크림 선택 후 비용을 정확히 맞추기 위한 값을 가진 나머지 아이스크림을 찾아 내는 것이 포인트
- 나머지 아이스크림의 위치를 찾기 위해 binary-search 가 사용된다.

<br>

#### 이진검색이란

일반적으로 정렬된 배열에서 특정 값을 찾을 때 인간이 사용하는 방법을 그대로 로직으로 구현한다.

1. 배열의 중간값과 찾고자하는 값을 비교
1. 운좋게 같으면 그 값의 위치를 리턴
1. 찾고자 하는 값이 중간값보다 작으면 왼쪽 배열에서 다시 이진검색 수행
1. 찾고자 하는 값이 중간값보다 크면 오른쪽 배열에서 다시 이진검색 수행

<br>

#### 이진검색 특징

- 이미 정렬된 자료구조가 필요하다
- 시간복잡도: O(Logn)

<br>

#### 풀이

<script src="https://gist.github.com/min9nim/42e33306341c02889a8c33ffe9da0661.js"></script>

[코드 데모](https://repl.it/@min9nim/binary-search)

<br>

#### 코드리뷰

- 정렬 후에도 아이스크림의 아이디값 정보를 유지하기 위해 16라인이 반드시? 필요
- `binarySearch` 함수에서 `s`가 `e` 보다 커지는 경우에 대한 예외처리 필수. 없으면 무한루프에 빠질 수 있음.

<br>

#### Ref.

- <https://ko.wikipedia.org/wiki/이진_검색_알고리즘>
