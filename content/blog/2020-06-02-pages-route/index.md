---
layout: post
title: '[create-react-app] pages 폴더 구조대로 라우팅'
date: 2020-06-02 00:10
tags: [create-react-app, CRA, pages, route]
description:
---

[Nextjs](https://nextjs.org/) 를 사용할 때 라우팅은 기본적으로 `src/pages` 폴더 구조를 그대로 따른다. CRA 만을 이용해서 리액트 프로젝트를 생성하면 라우팅을 직접 하나씩 설정해 주어야 하는데 path 에 따라 해당 화면을 일일이 매핑하는 일은 귀찮은 일이 아닐 수 없다.

pages 폴더 구조대로 라우팅을 조금 더 편하게 할 수는 없을까 고민하다가 [Nextjs 에서의 라우팅 동작](https://nextjs.org/docs/basic-features/pages)과 비슷하게 구현을 해보았다.

<br>

### Basic concept

> [dynamic import](https://javascript.info/modules-dynamic-imports) 를 이용해 라우팅 path 에 따라 해당 화면을 동적으로 로드하여 렌더링한다.

<br>

### 폴더구조

```
src/
  pages/
    login/
      sign-in.js
      sing-up.js
    my-info.js
  PageRoute.js
  AsyncComponent.js
  Routes.js
```

### 라우팅 테이블

라우팅 대상은 아래와 같고 이는 `Routes.js` 에서 정의한다.

| path           | component                   |
| -------------- | --------------------------- |
| /login/sign-in | /src/pages/login/sign-in.js |
| /login/sign-up | /src/pages/login/sign-up.js |
| /my-info       | /src/pages/my-info.js       |

<br>

### Goal

before) 일반적인 라우팅 정의

```js{5-7, 13-15}
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import SignIn from './pages/login/sign-in'
import SignUp from './pages/login/sign-up'
import MyInfo from './pages/my-info'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path='/login/sign-in' component={SignIn} />
      <Route exact path='/login/sign-up' component={SignUp} />
      <Route exact path='/my-info' component={MyInfo} />
    </BrowserRouter>
  )
}
```

after) 라우팅 path 에 따라 동적으로 컴포넌트를 매핑

```js{11-13}
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import PageRoute from './PageRoute'

export default function Routes() {
  return (
    <BrowserRouter>
      <PageRoute exact path={window.location.pathname} />
    </BrowserRouter>
  )
}
```

<br>

### 구현방법

1. 동적으로 컴포넌트를 로드하는 `AsyncComponent` 를 정의

```js
// AsyncComponent.js

import React, {useEffect, useState} from 'react'

export default function AsyncComponent(props) {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    let cleanedUp = false
    import('./pages' + props.path).then(module => {
      if (cleanedUp) {
        return
      }
      setComponent(() => module.default)
    })
    return () => {
      cleanedUp = true
    }
  }, [props.path])

  return Component ? <Component {...props} /> : 'Loading..'
}
```

> 1. 위 `AsyncComponent` 컴포넌트는 동적으로 로드할 리액트 컴포넌트 자체를 상태로서 정의하여 사용하고 있다.
> 2. hook을 이용할 때 함수 자체를 상태로 사용하고자 할 경우에는 해당 함수를 리턴하는 함수를 `setComponent` 에 인자로 전달해야만 의도했던 데로 동적으로 로드된 리액트 컴포넌트가 `Component` 상태에 세팅된다.
> 3. `setComponent` 는 함수를 인자로 받을 경우 내부적으로 해당 함수를 호출하고 해당 함수의 리턴값을 상태로서 사용하기 때문이다(`useState` 의 인자로 전달되는 초기상태도 마찬가지).
> 4. 그리고 이는 클래스 컴포넌트를 로드하는 경우에도 마찬가지이다. 자바스크립트에서 클래스의 typeof 결과는 `'function'` 으로 평가되기 때문이다. `useState`, `setComponet` 는 아마 내부적으로 전달된 인자의 타입 확인을 위해서 `typeof` 연산을 이용하는 것 같다.
> 5. `import()` 는 동적으로 한번 로드한 컴포넌트를 내부적으로 캐시하기 때문에 이후 동적 모듈 로드시 네트워크 요청이 다시 발생하지는 않는다.

<br>

2. 라우팅 path 에 따라 해당 컴포넌트를 동적으로 로드

```js{13}
// PageRoute.js

import React from 'react'
import { Route } from 'react-router-dom'
import AsyncComponent from './AsyncComponent'

export default function PageRoute(props) {
  return <Route {...props} render={asyncRender(props)} />
}

export function asyncRender(props) {
  return ({ location }) => {
    return (<AsyncComponent {...props} path={location.pathname} />)
}
```

> Note) `PageRoute` 가 필요에 따라 `children` 을 전달받는 경우에는 정적으로 해당 `children` 이 렌더링된다. (`children` 과 `render` [프롭이 함께 전달될 때 우선순위](/2020-06-02-route-priority/)는 `children` 프롭에 있음)

<br>

### Ref.

https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
