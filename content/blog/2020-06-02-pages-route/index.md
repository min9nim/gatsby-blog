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
  dynamicImport.js
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

```js
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignIn from './pages/login/sign-in'
import SignUp from './pages/login/sign-up'
import MyInfo from './pages/my-info'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login/sign-in' component={SignIn} />
        <Route exact path='/login/sign-up' component={SignUp} />
        <Route exact path='/my-info' component={MyInfo} />
      </Switch>
    </Router>
  )
}
```

after) 라우팅 path 에 따라 동적으로 컴포넌트를 매핑

```js
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import PageRoute from './PageRoute'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PageRoute exact path='/login/sign-in' />
        <PageRoute exact path='/login/sign-up' />
        <PageRoute exact path='/my-info' />
      </Switch>
    </Router>
  )
}
```

### 구현방법

1. 동적으로 컴포넌트를 로드하는 `asyncComponent` 를 정의

```js
// dynamicImport.js
import React from 'react'

// const PAGES_PATH = '../pages'  // not works when used; 🤔
const cache = {} // 비동기 컴포넌트 캐시

// Ref) https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
export function asyncComponent(path) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {Component: cache[path]}
    }

    async componentDidMount() {
      if (this.state.Component) {
        // console.log('[asyncComponent] cache hit [' + path + ']')
        return
      }
      const module = await import('../pages' + path)
      cache[path] = module.default
      this.setState({Component: module.default})
    }
    render() {
      const {Component} = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return <div>Loading.. [{path}]</div>
    }
  }
}
```

2. 라우팅 path 에 따라 해당 컴포넌트를 동적으로 로드

```js
// PageRoute.js

import React from 'react'
import { Route } from 'react-router-dom'
import { asyncComponent } from './dynamicImport'

export default function PageRoute(props) {
  return <Route {...props} render={asyncRender(props)} />
}

export function asyncRender(props) {
  return ({ location }) => {
    const Component = asyncComponent(location.pathname)
    return (<Component {...props} />)
}
```

(단, `PageRoute` 가 필요에 따라 `children` 을 전달받는 경우에는 정적으로 해당 `children` 이 렌더링된다.)

라우팅테이블을 별도로 정의해야 하는 불편함은 여전히 남아 있는데.. 이 마저도 자동화를 한다면 추상화 단계가 너무 높아져서 오히려 디버깅하는데 어려움이 있을 것 같아서 더 진행하지는 않았다. 😊
