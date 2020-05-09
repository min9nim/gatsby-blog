---
layout: post
title: '[mobx-react] 리액트 컴포넌트에 상태 주입'
date: 2020-04-19 00:10
categories: react
tags: [js, react, mobx]
---

mobx-react 를 이용해 리액트 컴포넌트에 상태를 주입하는 방법

<br>

1\. 함수형 컴포넌트

```jsx
import React from 'react'
import { observer, inject } from 'mobx-react'

function Counter(props) {
  const { counter } = props
  return (
    <div>
      <h1>{counter.number}</h1>
      <button onClick={counter.increase}>+1</button>
      <button onClick={counter.decrease}>-1</button>
    </div>
  )
}

export default inject('counter')(observer(Counter))
// export default observer(inject("counter")(Counter)); // not works
```

<br>

2\. 클래스 컴포넌트

```jsx
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('counter')
@observer
class Counter extends Component {
  render() {
    const { counter } = this.props
    return (
      <div>
        <h1>{counter.number}</h1>
        <button onClick={counter.increase}>+1</button>
        <button onClick={counter.decrease}>-1</button>
      </div>
    )
  }
}

export default Counter
```

<br>

<iframe
     src="https://codesandbox.io/embed/mobx-observer-function-p40zk?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="mobx-observer-function"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
