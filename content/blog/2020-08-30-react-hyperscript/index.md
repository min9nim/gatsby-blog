---
layout: post
title: '[리액트] jsx 없이 js 만으로 html 작성하기 '
date: 2020-08-30 00:10
tags: [react, react-hyperscript, jsx]
description:
draft: false
---

리액트에서 JSX 는 컴포넌트가 렌더링하는 dom 구조를 정의할 때 사용된다. 순수 JS에서 html 을 마크업하는 것은 여간 귀찮 일이 아니기 때문에 JSX 는 리액트에서 정말 유용하다.

필자는 개인적으로 XML(HTML) 문법을 선호하지 않는데, 이는 XML 문법이 너무나 verbose 하게 느껴지기 때문이다. 특별히 매번 닫는 태그를 마지막에 빠짐없이 넣어줘야 하는 모양이 늘 마음 한켠을 무겁게 한다.

나와 같은 minimalist 에게 좋은 대안이 있어 소개하고자 한다. 바로 [react-hyperscript]() ! 
> TMI) `react-hyperscript` 는 리액트 공식문서에서도 소개되고 있다. https://reactjs.org/docs/react-without-jsx.html

<br>

우선 일반적으로 사용되는 JSX를 이용한 마크업을 보자
```js
import React from 'react'
import AnotherComponent from './another-component'

export default () => (
  <div className='.example'>
    <h1 id="heading">This is hyperscript</h1>
    <h2>creating React.js markup</h2>
    <AnotherComponent foo="bar">
      <li>
        <a href={'http://whatever.com'}>One list item</a>
      </li>
      <li>
        Another list item
      </li>
    </AnotherComponent>
  </div>
)
```

react-hyperscript 를 이용하면 아래와 같이 dom 을 정의할 수 있다.
```js
import h from 'react-hyperscript'
import AnotherComponent from './another-component'

export default () =>
  h('div.example', [
    h('h1#heading', 'This is hyperscript'),
    h('h2', 'creating React.js markup'),
    h(AnotherComponent, { foo: 'bar' }, [
      h('li', [h('a', { href: 'http://whatever.com' }, 'One list item')]),
      h('li', 'Another list item'),
    ]),
  ])
```

훨씬 간결하지 않은가!

눈치가 빠른 독자라면 `h` 함수가 `React.createElement` 와 뭐가 다른가 의문이 들 수도 있다. 단지 함수를 간단한 변수명에 담은 것에 지나지 않은가 생각할 수 있다. `const h = React.createElement` 와 같이 말이다. 하지만 여기에는 중요한 차이가 있다.

1. 우선 첫번째 인자를 이용해 태그와 실렉터를 함께 정의할 수 있게 해준다는 것.
1. `React.createElement` 는 인자의 순서가 매우 중요하지만. `react-hyperscript` 는 인자의 타입에 따라 유연하게 attr 과 children 을 전달할 수 있다는 것
    - 첫번째 인자는 반드시 type 이 오게 될 것이고, 두번째 인자가 `{}` 와 같은 객체일 경우에는 attr 로 인식되며 `[]` 와 같은 배열이나 단순 문자열인 경우에는 children 으로 처리가 됨
    - `React.createElement`는 attr 없이 children 만 전달하려면 두번째 인자로 반드시 `null` 을 명시해야 하는 불편함이 있지만, `react-hyperscript` 는 attr 을 생략하고 두번째 인자로서 바로 children 을 직접 전달할 수가 있다. 
    
    
더 나아가 [hyperscript-helpers](https://www.npmjs.com/package/hyperscript-helpers) 와 함께 사용하면 아래와 같이 보다 가독성 높은 마크업이 가능하다.

```js
import h from 'react-hyperscript'
import helper from 'hyperscript-helpers'
import AnotherComponent from './another-component'

const {div, h1, h2, li, a} = helper(h)

export default () =>
  div('.example', [
    h1('#heading', 'This is hyperscript'),
    h2('creating React.js markup'),
    h(AnotherComponent, { foo: 'bar' }, [
      li(a({ href: 'http://whatever.com' }, 'One list item')),
      li('Another list item'),
    ]),
  ])
```

<br>

`hyperscript-helpers` 팁
- 태그명 함수의 첫번째 인자로 주어지는 값이 문자열일 경우
    - `.` 으로 시작하면 클래스명, `#`으로 시작하는 문자열은 아이디가 된다
    - 두번째 세번째 인자 없이, 첫번째 인자가 `.` or `#` 으로 시작하지 않는 문자열일 경우 children 이 된다
    - `.` or `#` 으로 시작되지 않는 문자열이 첫번째 인자이고, 두번째 인자가 문자열인 경우 첫번째 인자는 무시되고 두번째 문자열 인자가 children 이 된다.
- 여러 개의 children 은 배열(`[]`)로 묶는다.
- 이런 특성 말고도 아무튼 전달되는 인자들을 알아서 적절하게 type, attr, children 값으로 사용해 준다.
