---
layout: post
title: "삼항연산자 사용시 주의사항"
date: 2018-08-31 15:00
categories: etc
tags: [ternary-operator]
---

주어진 배열에서 양수의 개수를 구하고자 할 때 reduce를 이용하여 아래와 같이 양수의 누적값을 카운트할 수 있다.

```javascript
;[-1, 2, 3].reduce((a, c) => (a + c > 0 ? 1 : 0), 0)
```

`reduce()` 함수의 결과값을 잠시 예측해보자.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
혹시 결과값이 2라고 예측하신 분만 계속 보세요..

<br>
<br>
<br>

양수의 개수는 2가 맞지만  
위 코드의 실행결과는 1이 된다.

<br>

### 왜 일까?

문제는 `a + c>0 ? 1 : 0` 표현에 있다. a 변수에 삼항연산자의 값을 더하고자 했던 표현이지만, 실제 연산은 `(a + c)>0 ? 1 : 0` 와 같이 수행이 되기 때문이다

<br>

### 결론은

삼항연산자를 사용할 땐 꼭 괄호로 묶어주는 습관을 갖자

```
a + (c>0 ? 1 : 0)
```
