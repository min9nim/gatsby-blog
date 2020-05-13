---
layout: post
title: "[js] mutable vs immutable"
date: 2018-08-28 01:00
categories: vanillaJS
tags: [immutable, js, array, function]
---

자바스크립트에서 제공하는 배열 함수는 original 배열의 상태를 변경시키는(mutable) 함수도 있고 기존 상태를 변경시키지 않고(immutable) 연산결과를 리턴하는 함수도 있다. 그 둘을 정확히 구별해서 사용해야 하는 경우가 참 많지만 함수 이름만 가지고는 관련 힌트를 얻을 수 없기에 이 부분은 안타깝게도 암기?가 필요하지 않겠나 싶다.

자주 사용되는 array 관련 함수들을 중심으로 정리해 보았다.

<br>

### immutable 함수

- filter
- map
- slice

<br>

### mutable 함수

- splice
- reverse
- sort
- push / pop
- shift / unshift
