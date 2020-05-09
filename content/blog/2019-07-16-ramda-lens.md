---
layout: post
title:  "[funtional] ramdajs 의 렌즈(lens)"
date:   2019-07-16 00:10
categories: ramdajs
tags: [ramdajs, funtional]
---
ramdajs 에서 제공하는 lens 에 대한 개념을 소개한다.

lens 는 복잡한 객체(특별히 depth가 깊은 구조)를 다룰 때 아주 유용하다. 다음과 같은 객체의 내부 y속성 값을 6으로 변경해야 한다고 가정해 보자
```javascript
const complecated = {
  x: [
    {
      y: 2,
      z: 3
    },
    {
      y: 4,
      z: 5
    }
  ]
}
```

<br>

명령형 프로그래밍에서는 `complecated.x[0].y = 6` 과 같이 처리할 수 있다. 하지만 이 간단한 것을 함수형 프로그래밍으로 처리하려고 일단 `complicated` 의 복사본을 만드는 것부터 시작해서 간단치가 않다.

<br>

이럴 때에 lens 를 이용하면 아래와 같이 처리할 수 있다.
```javascript
const xHeadYLens = R.lensPath(['x', 0, 'y'])
R.set(xHeadYLens, 6, complecated)
```

<br>

lens 는 이름 그대로 어떤 객체의 내부 속성을 들여다보고 있는 돋보기 정도의 개념으로 이해하면 좋다. 그 렌즈를 이용해 해당 값을 조회(`R.view`) 및 세팅(`R.set`, `R.over`)할 수 있다.

lens 를 생성하는 함수는 4가지가 있다

<br>

#### lens
특정 속성에 대한 getter 와 setter 를 인자로 받아서 렌즈를 생성한다. `lens` 함수는 아마 렌즈의 개념이 처음 제안되던 때에 만들어졌던 함수가 아닌가 싶다. 아래에서 생성한 `xLens` 는 그냥 `R.lensProp`를 이용해 보다 쉽게 만들 수 있다(아래 `R.lensProp` 예제를 보라). 현장?에서 굳이 `lens` 함수를 이용해야 할 필요를 필자는 아직 경험하지 못했다.
```javascript
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, {x: 1, y: 2});            //=> 1
R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
```

<br>

#### lensIndex
인덱스 기반의 배열을 대상으로 하는 렌즈를 생성한다
```javascript
const headLens = R.lensIndex(0);

R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
```

<br>

#### lensPath
depth 가 깊은 객체의 내부 속성을 바라보는 lens 를 만들 수 있다
```javascript
const xHeadYLens = R.lensPath(['x', 0, 'y']);

R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> 2
R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
```

<br>

#### lensProp
(depth 가 없는) 특정 속성에 대한 lens를 생성한다. `R.lensProp` 는 `R.lens` 보다 좀 더 간편하게 렌즈를 생성할 수 있게 해준다.

```javascript
const xLens = R.lensProp('x');

R.view(xLens, {x: 1, y: 2});            //=> 1
R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
```

<br>

#### 주의사항
`R.lensProp` 대신 `R.assoc` 를, `R.lensPath` 대신에 `R.assocPath`를 이용하면 좀 더 간단히 동일한 작업(`R.set`)을 수행할 수 있다. 하지만 `R.assoc` 와 `R.assocPath` 는 ~~객체를 shallow copy 한다는 점에 주의한다~~
    - [19/07/17 업데이트] ramdajs v0.26.1 에서 `R.assocPath` 는 깊은 복사를 하는 것 같다.

<br>

#### Ref.
https://ramdajs.com/docs