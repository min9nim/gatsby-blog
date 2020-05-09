---
layout: post
title: 'bind, apply, call 중복 사용시 this 바인딩의 우선순위'
date: 2020-04-09 00:10
categories: js
tags: [js, bind, apply, call]
---

함수 스코프 안에서 `this` 는 해당 함수가 호출되는 형태에 따라서 동적으로 바인딩이 된다. `this` 바인딩을 개발자가 직접 제어하고자 할 때는 `bind`, `apply`, `call` 함수를 사용할 수 있다. 해당 함수들의 용법은 [이 글](/2018/06/apply-call-bind/)을 참고하기 바란다.

본 포스트에서는 특별히 해당 함수들을 중복으로 사용할 경우 `this` 바인딩의 결과(우선순위)를 확인하고자 한다.

<br>
아래 예제코드의 퀴즈를 맞춰보자.

```javascript
function fn() {
  return this.num
}

fn = fn.bind({ num: 1 })
fn() // 1. 리턴값은 ?
fn.apply({ num: 2 }) // 2. 리턴값은 ?
fn.call({ num: 2 }) // 3. 리턴값은 ?
```

<br>

1번의 리턴값은 `1` 임을 쉽게 맞출 수 있을 것이다. 하지만 2번, 3번 문제부터는 조금 헤깔릴 수가 있다.

<br>

`fn` 함수의 `this`에 `{num: 2}` 객체를 새롭게 바인딩하며 호출하므로 `2` 가 될 것 같지만 결과는 `1` 이 된다. `bind` 를 이용한 `this` 바인딩이 `apply` 나 `call` 보다 강함?을 알 수 있다.

<br>

그렇다면 다음 퀴즈도 풀어보자

```javascript
function fn() {
  return this.num
}

fn = fn.bind({ num: 1 })
fn = fn.bind({ num: 2 })
fn() // 리턴값은 ?
```

센놈 둘이 붙었다. 결과는 `1`이 될까 `2`가 될까. 모든 것이 동적으로 결정되는 JavaScript 의 특성상 `2`가 나올 법 같은데 정답은 1이다.

<br>

> "`bind` 함수로 한 번 바인딩된 `this` 는 결코? 다시 풀어지지 않는다." 라고 기억하면 되겠다

<br>

(그런데 혹시 아닐지도😅.. 반례가 있다면 제보 바랍니다)

<br>

실제 개발시 이런 상황을 만나면 알쏭달쏭 헤깔릴 수 있으니 이렇게 한번 기억해 주고 넘어가면 나중에 고민할 시간을 줄일 수 있다.
