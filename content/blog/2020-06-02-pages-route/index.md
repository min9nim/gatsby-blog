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
    404.js
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
| /blablabla     | /src/pages/404.js           |

<br>

### Goal

before) 일반적인 라우팅 정의

```js{5-8, 13-18}
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignIn from './pages/login/sign-in'
import SignUp from './pages/login/sign-up'
import MyInfo from './pages/my-info'
import NotFound from './pages/404'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login/sign-in' component={SignIn} />
        <Route exact path='/login/sign-up' component={SignUp} />
        <Route exact path='/my-info' component={MyInfo} />
        <Route path='/' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
```

after) 라우팅 path 에 따라 동적으로 컴포넌트를 매핑

```js{9-14}
// Routes.js

import React, {useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route
        path='/'
        render={({history, location}) => (
          <AsyncComponent path={location.pathname} onNotFound={() => history.push('/404')} />
        )}
      />
    </BrowserRouter>
  )
}
```

<br>

### `AsyncComponent` 구현방법

동적으로 컴포넌트를 로드하는 `AsyncComponent` 를 정의

```js
// AsyncComponent.js

import React, {useEffect, useState} from 'react'

export default function AsyncComponent(props) {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    let cleanedUp = false
    import('./pages' + props.path)
      .then(module => {
        if (cleanedUp) {
          return
        }
        setComponent(() => module.default)
      })
      .catch(e => {
        if (cleanedUp) {
          return
        }
        setComponent(null)
        if (e.message.startsWith('Cannot find module')) {
          if (typeof props.onNotFound === 'function') {
            props.onNotFound()
          }
        }
      })
    return () => {
      setComponent(null)
      cleanedUp = true
    }
  }, [props.path])

  return Component ? <Component {...props} /> : props.loading || 'Loading..'
}
```

> 1. 위 `AsyncComponent` 컴포넌트는 동적으로 로드할 리액트 컴포넌트 자체를 상태로서 정의하여 사용하고 있다.
> 2. hook을 이용할 때 함수 자체를 상태로 사용하고자 할 경우에는 해당 함수를 리턴하는 함수를 `setComponent` 에 인자로 전달해야만 의도했던 데로 동적으로 로드된 리액트 컴포넌트가 `Component` 상태에 세팅된다.
> 3. `setComponent` 는 함수를 인자로 받을 경우 내부적으로 해당 함수를 호출하고 해당 함수의 리턴값을 상태로서 사용하기 때문이다(`useState` 의 인자로 전달되는 초기상태도 마찬가지).
> 4. 그리고 이는 클래스 컴포넌트를 로드하는 경우에도 마찬가지이다. 자바스크립트에서 클래스의 typeof 결과는 `'function'` 으로 평가되기 때문이다. `useState`, `setComponet` 는 아마 내부적으로 전달된 인자의 타입 확인을 위해서 `typeof` 연산을 이용하는 것 같다.
> 5. `import()` 는 동적으로 한번 로드한 컴포넌트를 내부적으로 캐시하기 때문에 이후 동적 모듈 로드시 네트워크 요청이 다시 발생하지는 않는다.

<br>


### TL;DR;
상세 내용은 관심없고 결과만 빠르게 적용하고 싶다면 아래 모듈을 이용한다.

https://www.npmjs.com/package/react-dynamic-route

<br>

### Ref.

- https://ko.reactjs.org/docs/code-splitting.html
- https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
- https://www.npmjs.com/package/react-async-component
