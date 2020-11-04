---
layout: post
title: '[react] useEffect 사용시 로직의 흐름'
date: 2020-06-04
tags: [react, hook, useEffect, order]
description:
draft: false
---

useEffect hook 을 사용할 때 호출순서를 확인한다.

```js
import React, {useState, useEffect} from 'react'
import {render} from 'react-dom'

function App() {
  const [msg, setMsg] = useState('xxx')
  console.log('App render, ' + msg)

  useEffect(() => {
    console.log('[effect] start')
    setTimeout(() => {
      console.log('[setMsg] before')
      setMsg('hello')
      console.log('[setMsg] after')
    }, 0)
    return () => {
      console.log('[effect] clear')
    }
  })

  return <div>{msg}</div>
}

render(<App />, document.getElementById('root'))
```

출력 결과는??

```
App render, xxx
[effect] start
[setMsg] before
App render, hello
[setMsg] after
[effect] clear
[effect] start
[setMsg] before
App render, hello
[setMsg] after
```

> Note)
>
> 1. `setMsg` 호출 이후 즉시 `App` 은 다시 렌더링된다
>    - `msg` 값이 변경되지 않을지라도 `App` 은 `setMsg` 호출과 동시에 렌더링된다.
>    - 하지만, Virtual dom 에 의해 dom 렌더링이 다시 일어나지는 않을 것이다.
>    - dom 이 업데이트 되지 않는다면 `[effect] start` 도 호출되지 않는다. 따라서 `[effect] clear` 도 호출되지 않는다.
> 1. `[effect] clear` 는 `[effect] start` 보다 앞서 한번 호출됨이 보장된다.

<br>

<iframe style="width: 100%; height: 500px;" src="https://stackblitz.com/edit/react-use-effect-529?embed=1&file=index.js" />
