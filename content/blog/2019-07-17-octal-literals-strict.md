---
layout: post
title:  "[js] Octal literals are not allowed in strict mode"
date:   2019-07-17 00:10
categories: vanillajs
tags: [es6, strict]
---
```
Octal literals are not allowed in strict mode
```
`010` 과 같은 리터럴을 사용할 때 만날 수 있는 오류이다. 관련 디테일을 들여다 보자

<br>

1. 원래 `010` 과 같이 `0`으로 시작하면 8진수, `0x10` 같이 `0x` 로 시작하면 16진수 표기가 맞다.
1. js스펙이 원래 이랬는데.. ES6부터는 8진수 표기를 `0o10`, 16진수는 `0x10`, 2진수는 `0b10` 과 같이 좀 더 세련되게 사용할 수 있게 되었다
1. es6 모듈을 정의하는 경우 모듈의 스코프는 자동으로 strict 모드가 되는데 특별히 strict 모드에서는 이전의 010 과 같은 8진수 표기법을 애매한 표기법으로 규정해 사용하지 못하게 했다.
1. 그러므로 strict 모드에서 `eval(‘010’)` 과 같은 표기법은 사용이 불가(eval 에서 `'010'` 을 `010`으로 평가하기 때문에)
1. 약간의 꼼수를 사용해 `eval(‘000’*1)` 와 같이 하면 오류없이 10진수 변환이 됨