---
layout: post
title: 'JavaScript 세미콜론 사용'
date: 2020-05-07 00:10
description: '자바스크립트는 문장(statement)의 구분을 위해 세미콜론 `;` 을 사용한다. 일반적으로 코드의 가독성을 위해 한줄에 하나의 문장만 사용한다.'
tags: [js, semicolon]
---

자바스크립트는 문장(statement)의 구분을 위해 세미콜론 `;` 을 사용한다.

```
console.log('11'); console.log('22');
```

<br>

일반적으로 코드의 가독성을 위해 한줄에 하나의 문장만 사용한다.

```
console.log('11');
console.log('22');
```

이런 경우 아래와 같이 세미콜론 생략이 가능하다.

```js
console.log('11')
console.log('22')
```

생략이 가능한 이유는 자바스크립트가 처리될 때 내부적으로 [세미콜론을 자동으로 삽입](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)해 주기 때문이다.

<br>

그렇다면 굳이 줄바꿈시에는 세미콜론을 넣을 필요가 없다고 생각할 수 있겠지만 문제되는 경우가 있기 때문에 주의 해야 한다.

```
console.log("에러가 발생합니다.")
[1, 2].forEach(console.log)
```

위 예시는 세미콜론 자동삽입 규칙에 해당하지 않기 때문에 세미콜론 자동삽입이 일어나지 않는다. 결국 자바스크립트 실행 엔진은 아래와 같은 문장을 바라볼 것이고

```
console.log('에러가 발생합니다.')[1, 2].forEach(console.log)
```

코드 실행시 `Uncaught TypeError: Cannot read property '2' of undefined` 오류가 발생하게 된다.

> Note) `console.log('에러가 발생합니다.')` 는 `undefined` 로 평가됨. 그리고 `undefined[1,2]` 는 `undefined[(1,2)]` 와 같고 `(1,2)` 는 `2` 로 평가되기 때문에 `undefined[1,2]` 는 최종적으로 `undefined[2]` 로 평가되고 위 에러가 발생되는 것

<br>

그럼 이제 마음의 갈등이 일어나기 시작한다.

보다 안전한 코드 작성을 위해 세미콜론을 넣을 것인가. 코드의 간결함을 유지하기 위해 세미콜론을 사용하지 않는 것이 나을까. 이에 대해서 개발자들 사이에 많은 고민들이 있었던 것 같다. 개인의 취향에 따라 달리 결정된 문제일 것이다.

**필자는 세미콜론을 사용하지 않는 것을 선호한다**. 그동안의 경험에 비추어볼 때 세미콜론을 사용하지 않아 어떤 문제를 만난 적이 단 한 번도 없었다. 그도 그럴 것이 일단 IDE 자동포맷 기능이나 린트설정 등이 이에 대한 문제를 알아서 잘 처리해 주기 때문이다.

vscode 에서 세미콜론 관련 자동포맷 옵션을 적용하면 아래 코드는

```
console.log('에러가 발생합니다.')
[1, 2].forEach(console.log)
```

자동으로 아래와 같이 변환이 되기 때문에 쉽게 오류 발생지점을 확인할 수 있다.

```js
console.log('에러가 발생합니다.')[(1, 2)].forEach(console.log)
```

<br>

> "완벽함이란 더 이상 보탤 것이 남아 있지 않을 때가 아니라 더 이상 뺄 것이 없을 때 완성된다." - 생텍쥐페리

<br>

### Ref.

- https://ko.javascript.info/structure#semicolon
- https://feross.org/never-use-semicolons/
- https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html
