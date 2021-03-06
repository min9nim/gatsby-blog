---
layout: post
title: '[js] `e` 를 이용한 숫자표기법이 필요한 이유'
date: 2020-11-11 00:10
tags: [js, number, float]
description: 자바스크립트는 문법적으로 여러가지 애매한 특징들을 가지고 있다. 특별히 소수점 처리가 범상치 않다는 것은 이미 대충은 알고 있을 것이다. 왜 유독 14 에 0.1 을 곱할 경우만 결과가 이상하게 떨어지는 걸까? 위 문제가 현실 세계에서 어떤 문제를 발생시킬 수 있을 지 직접 예시를 통해 확인해 보자.
draft: false
---

실제로 많이 사용되지는 않지만 자바스크립트에서 `e` 를 이용하여 숫자 리터럴을 표기하는 방법이 있습니다. `2000` 이란 숫자는 `2` 곱하기 `10`의 세제곱 이므로 `2e3` 이렇게 표기를 할 수 있습니다.

그런데, `e` 를 이용한 숫자표기법이 반드시 필요한 경우가 있다는 것도 아시나요?
(물론 오늘 소개할 이야기가 `e`를 이용한 표기법이 필요한 모든 이유는 결코 아닐 것입니다.🙅 )

이 글에서는 제가 경험했던 하나의 작은 사례를 소개할 뿐입니다. 물론 이 내용이 자바스크립트 개발자가 반드시 알아야 할 내용이라고 생각하지는 않습니다. 자바스크립트 개발시 만날 수 있는 수 많은 edge 케이스들 중 하나이겠지요.

하지만 이런 사소한 내용들에 흥미를 느끼시는 분이 있다면 재미삼아 한번 내용을 보고 가시는 것도 좋을 것 같습니다. 

자 그럼 이제 시작해 봅니다.

<br>

### 자바스크립트의 흔한 edge case

당신이 자바스크립트를 이용해 그럴듯한 애플리케이션을 만들어본 경험이 있다면 자바스크립트가 문법적으로 여러가지 애매한 특징들을 여럿 가지고 있다는 것을 경험적으로 아실 것 입니다. 대표적인 예로 소수점 처리가 그렇죠.

바로 아래와 같은 이상한 결과들 말이죠.

```html{4-5}
13 * 0.1
> 1.3

14 * 0.1
> 1.4000000000000001

15 * 0.1
> 1.5

14 / 10
> 1.4
```

왜 유독 `14` 에 `0.1` 을 곱할 경우만 결과가 이상하게 떨어지는 걸까요? (저는 정말 모르겠습니다. 설마 이것도 [ECMAScript 의 스펙](https://www.ecma-international.org/ecma-262/11.0/index.html#title)은 아니겠지요?)

그런데 위 문제가 현실 세계에서 정말로 어떤 문제를 발생시킬 수 있을까요? 당연히 그럴 수 있습니다!

<br>

### 현실 세계 문제
특정 소수점 자리에서 반올림하는 함수를 간단히 아래와 같이 정의했다고 해봅시다.

```js
function round(num, offset = 0){
  const mul = Math.pow(10, offset > 0 ? 1 - offset : -offset)
  return Math.round(num / mul) * mul
}
```

일반적인 경우에는 기대했던 데로 잘 동작하는 것 같습니다.

```
round(10.2)
> 10

round(10.257, 3)
> 10.26

round(10.257, 2)
> 10.3

round(10.2577424, 5)
> 10.2577

round(1324, -2)
> 1300
```

그런데 아래와 같은 예외 케이스가 곧 등장합니다.

```js
round(1.423, 2)
> 1.4000000000000001
```

내부적으로 `14 * 0.1` 연산이 수행되면서 앞서 소개되었던 에지 케이스에 정확히 걸려 들은 것이지요. 😱

`round` 함수가 위와 같은 경우에라도 정확하게 `1.4` 를 리턴하도록 하려면 어떻게 해야할까요? 🤔

<br>

### `e` 표기법의 등장

바로 이때 `e` 를 이용한 숫자표기법이 빛을 발합니다.

`e`는 영어로 exponential 을 의미합니다. 바로 10의 제곱수 인 것이죠. e를 사용한 숫자 리터럴은 아래와 같은 결과를 리턴합니다.

```js{10-11}
14e2
> 1400

14e1
> 140

14e0
> 14

14e-1
> 1.4
```

오잉? 마지막을 보세요. `14`를 `10`으로 나눈 결과인데 우리가 원하던 깔금한 `1.4`가 나왔어요. 그렇다면 바로 이 `e` 표기법을 사용해 왠지 우리의 문제를 해결할 수 있을 것 같다는 희망이 보입니다!

`e` 를 사용하여 `round` 함수를 아래와 같이 수정해 봅시다.

```js
function round(num, offset = 0){
  const e = (num, p) => Number(num + 'e' + p)
  const pos = offset > 0 ? offset - 1 : offset
  return e(Math.round(e(num, pos)), -pos)
}
```

그리고 결과를 봅시다.

```js
round(1.423, 2)
> 1.4
```

짜잔! 이제야 기대했던 결과가 정확히 떨어졌습니다.

오늘은 이렇게 자바스크립트에서 `e` 표기법이 필요한 한가지 이유를 알았습니다.🙂 (혹시 `e` 사용없이 기대했던 `round` 함수를 구현할 수 있는 분 계시다면 꼭 코멘트를 바랍니다 🙏)

사소하지만 이런 작은 깨달음이 만족스럽고 즐겁나요? 그렇다면 어쩌면 당신은 평생 코딩을 해야할 운명인지도 모르겠습니다. 👍 
