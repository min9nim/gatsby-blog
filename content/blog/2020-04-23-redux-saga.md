---
layout: post
title: 'redux-saga 가 해결하는 문제'
date: 2020-04-23 00:10
categories: react
tags: [react, redux-saga, generator]
---

<p align="center">
<img src="/images/redux-saga.png" />
</p>

본 글에서는 [redux-saga](https://redux-saga.js.org/) 를 알고 싶지만 왠지 높아 보이는 진입장벽으로 마음이 불편한 개발자들을 위해 작성되었다. redux-saga 가 필요한 이유와 redux-saga 가 어떤 문제를 해결하는 지에 대한 이해를 돕고자 한다.

redux-saga 를 충분히 이해하려면 redux-saga 가 등장하게 된 배경부터 차근차근 짚어 봐야할 것 같다. 그리고 [react](https://reactjs.org/), [redux](https://redux.js.org/), [redux middleware](https://redux.js.org/advanced/middleware), [redux-thunk](https://github.com/reduxjs/redux-thunk), [ES6 generator](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/) 에 대한 기본적인 선행 지식이 필요한데 본 글에서 해당 내용들을 자세히 다루지는 않는다. redux-saga 를 사용하는 구체적인 방법도 따로 설명하지는 않는다. 다만 해당 기술들이 해결하는 문제들이 무엇인지 대해서만 집중하여 이야기를 풀어가고자 한다.

<br>

### Intro.

모든 컴퓨터 프로그램은 [상태머신](https://ko.wikipedia.org/wiki/튜링_기계)으로 추상화된다. 프로그램이 구동되면 초기상태를 가지며 이후 입력이 들어오면 상태가 변하고 그에 따른 출력을 내보낸다. 프로그래밍이란 초기상태를 정의하고 입력에 따른 상태변이와 출력을 어떻게 제어할 지를 정의하는 작업의 연속이다. 웹애플리케이션도 마찬가지다. 지금부터는 이 관점을 지속적으로 유념해 주기 바란다.

<p align="center">
<img src="/images/turing-machine.gif" alt="튜링머신 이미지" />
<br>
&lt;<a href="http://www.aistudy.co.kr/logic/logic_rucker.htm">그림1: www.aistudy.co.kr</a>&gt;
</p>

<br>

### React

SPA 웹프로젝트가 유행하면서 컴포넌트 기반의 라이브러리들이 많이 생겨났다. 대표적인 예로 Vue, React 등이 있겠다. 사용방법은 다르지만 이 들의 기본적인 관심은 화면을 컴포넌트 단위로 구조화 하고 애플리케이션의 상태를 효과적으로 화면에 렌더링 하는데에 있다. 리액트를 이용해 UI를 컴포넌트 기반으로 제작하고 애플리케이션의 상태를 화면으로 렌더링하는 것은 어렵지 않게 할 수 있다. 하지만 애플리케이션 개발시에는 화면을 그려내는 것 외에도 외부 입력을 받아서(사용자 입력 등) 이에 따른 적절한 비즈니스 로직을 처리하고 그 결과를 애플리케이션 상태에 반영하며 필요한 사이드이펙트들을 잘 처리하는 작업이 필요한데 리액트는 이에 대한 훌륭한 방법을 제공하지는 않는다.(이는 리액트의 관심사가 아니다.)

우리는 앞으로 리액트가 도움을 주지 않는 2가지, 즉 애플리케이션의 상태관리와 사이드이펙트관리 이렇게 2가지 문제를 리액트 생태계에서 어떻게 해결해 왔는 지를 살펴볼 것이다. 😐

<br>

상태관리의 문제를 먼저 살펴 보자.

아래 간단한 카운터 예제에서 Count1, Count2 컴포넌트는 애플리케이션의 상태를 공유하기 위해 부모컴포넌트로부터 상태를 prop으로 전달받고 있다.

App.js

```jsx
import React from 'react'
import Counter1 from './Counter1'
import Counter2 from './Counter2'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.setCount = this.setCount.bind(this)
    this.state = {
      count: 0,
    }
  }
  setCount(value) {
    this.setState({
      count: value,
    })
  }
  render() {
    return (
      <div className='App'>
        <Counter1 count={this.state.count} setCount={this.setCount} />
        <Counter2 count={this.state.count} setCount={this.setCount} />
      </div>
    )
  }
}
```

Counter1.js

```jsx
import React from 'react'

export default function Count1({count, setCount}) {
  return (
    <div className='App'>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

Counter2.js

```jsx
import React from 'react'

export default function Count2({count, setCount}) {
  return (
    <div className='App'>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 2)}>+2</button>
      <button onClick={() => setCount(count - 2)}>-2</button>
    </div>
  )
}
```

<iframe
     src="https://codesandbox.io/embed/redux-saga-1-f140i?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-saga-1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

지금과 같은 간단한 구조에서는 크게 문제가 될 것이 없어 보이지만 컴포넌트의 depth 가 깊어지면 계속해서 상태를 자식컴포넌트의 prop으로 전달해 줘야 하는 불편함이 있다. (Context API 를 사용하면 prop으로 전달하지 않고도 처리가 가능하지만 Context API 사용할 때 따르는 또 다른 불편함에 대한 설명은 생략한다)

<br>

### Redux

애플리케이션의 전역 상태를 효과적으로 공유하고 관리하기 위해 redux 가 등장한다. 리덕스가 이야기 하는 리듀서와 액션의 개념을 익혀서 우리는 아름답게(?) 상태를 변화시키고 그에 따른 상태변화를 구독해서 적절한 화면을 렌더링할 수 있게 되었다. 리덕스는 상태를 변화시키는 방법과 상태의 변이를 구독하는 멋진 방법을 우리에게 제공한다.

아래 예제는 위 예제의 App 컴포넌트에 포함되어 있던 전역 상태를 Redux 를 이용해 store.js 로 분리한다.

store.js

```jsx
import {createStore} from 'redux'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.value
    default:
      return state
  }
}

export function addCount(value) {
  return {
    type: 'ADD',
    value,
  }
}

export const store = createStore(reducer, 0)
```

<iframe
     src="https://codesandbox.io/embed/redux-saga-2-f2e8u?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-saga-2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

Redux 덕분에 리액트 컴포넌트와 별개로 애플리케이션의 상태를 관리할 수 있게 되었다.

리덕스는 리듀서와 액션을 통해 상태를 어떻게 변이시킬 것인지에 대해서만 관심이 있다. 최종적으로 상태를 변이시키기 전에 외부 입력(사용자 이벤트)을 어떻게 처리해야할 지 그 중간 과정에 대해서는 관여하지 않는다. 사용자의 입력을 받아서 적절한 처리를 하고 최종적으로 상태변화까지 처리를 하는 것은 대부분 비즈니스 로직의 영역이며 대부분 네트워크 통신등의 여러가지 비동기처리를 포함할 수 있다.

버튼 클릭시 api를 통해 네트워크로부터 랜덤 값을 가지고 온 후 그 값을 더한다고 가정해보자. 어떻게 해야 할까.

고민할 것 없이 자연스럽게 onClick 이벤트 핸들러에서 비동기 로직을 처리하면 된다.

```jsx
import React from 'react'
import {store, addCount} from './store'
import {fetchNumber} from './api'

export default class Counter1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      count: store.getState(),
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({
        count: store.getState(),
      })
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  async increment() {
    this.setState({loading: true})
    const random = await fetchNumber()
    this.setState({loading: false})
    store.dispatch(addCount(random))
  }
  render() {
    return (
      <div className='App'>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.increment()}>add random number</button>
        <h3>{this.state.loading && 'loading..'}</h3>
      </div>
    )
  }
}
```

<iframe
     src="https://codesandbox.io/embed/redux-saga-3-6505p?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-saga-3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

비동기 로직이 컴포넌트의 클릭이벤트 핸들러에 포함되었다. 지금과 같이 간단한 예제에서는 역시 별 문제가 될 것 같지 않다. 하지만 위와 같은 비동기 로직들(비즈니스로직)은 충분히 복잡해지고 길어 질 수 있다. 그러면 리액트 컴포넌트는 상태에 따른 화면을 정의하는 본래의 의도를 벗어나서 비즈니스 로직이 잔뜩 포함된 모습의 코드가 될 것이다.

원래 리액트가 다루고자 했던 문제는 애플리케이션의 상태를 어떻게 렌더링할 것인가에 대한 영역이었다. **리액트 컴포넌트는 비즈니스 로직의 컨테이너가 아니다.** 😥

그럼 위와 같은 비즈니스 로직들을 어떻게 다루어야 할까. 그래서 등장하는 것이 리덕스 미들웨어 redux-thunk 이다.

<br>

### redux-thunk

redux-thunk 를 이용해 리액트 컴포넌트에 포함된 비동기 로직들을 아래와 같이 분리할 수 있다.

Counter1.js

```jsx
import React from 'react'
import {store, addCountAsync} from './store'

export default class Counter1 extends React.Component {
  constructor(props) {
    super(props)
    this.setLoading = this.setLoading.bind(this)
    this.state = {
      loading: false,
      count: store.getState(),
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({
        count: store.getState(),
      })
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  setLoading(loading) {
    this.setState({loading})
  }
  increment() {
    store.dispatch(addCountAsync(this.setLoading))
  }
  render() {
    return (
      <div className='App'>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.increment()}>add random number</button>
        <h3>{this.state.loading && 'loading..'}</h3>
      </div>
    )
  }
}
```

store.js

```jsx
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {fetchNumber} from './api'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.value
    default:
      return state
  }
}

export function addCount(value) {
  return {
    type: 'ADD',
    value,
  }
}

export function addCountAsync(setLoading) {
  return async dispatch => {
    setLoading(true)
    const random = await fetchNumber()
    setLoading(false)
    dispatch(addCount(random))
  }
}

export const store = createStore(reducer, 0, applyMiddleware(thunk))
```

[![Edit redux-saga-4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/redux-saga-4-h69ub?fontsize=14&hidenavigation=1&theme=dark)

onClick 이벤트 핸들러에 포함되었던 비동기 로직이 addCountAsync 액션으로 넘어왔다.

thunk 는 dispatch 를 품은 액션이다. redux-thunk 의 도움으로 우리는 액션을 원하는 시점에 리듀서에게 던질 수 있게 되었다. 이제 비동기처리는 모두 이 thunk 가 처리를 한다. 리액트 컴포넌트를 순수하게 만들 수 있게 되었다(비동기 로직들이 리액트 컴포넌트에 포함되지 않게 되었다)

그런데 기쁨도 잠시.. 😤

thunk 내부에서 여러개의 액션을 디스패치해야할 필요가 생겼다고 가정해 보자.

예로 들자면 랜덤숫자 2개를 차례대로 생성해서 첫번째 랜덤숫자는 더한 값으로 상태에 반영하고 그 다음은 곱한 값으로 상태를 반영해야 하는 요건이 새로 발생했다고 해보자(조금 억지스러운 상황이지만 양해를 바란다)

그럼 아래와 같이 코딩을 하게 될 것이다.

store.js

```javascript
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {fetchNumber} from './api'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.value
    case 'MUL':
      return state * action.value
    default:
      return state
  }
}

export function addCount(value) {
  return {
    type: 'ADD',
    value,
  }
}

export function mulCount(value) {
  return {
    type: 'MUL',
    value,
  }
}

export function addCountAsync(setLoading) {
  return async dispatch => {
    setLoading(true)
    const random1 = await fetchNumber()
    dispatch(addCount(random1))
    const random2 = await fetchNumber()
    dispatch(mulCount(random2))
    setLoading(false)
  }
}

export const store = createStore(reducer, 0, applyMiddleware(thunk))
```

<iframe
     src="https://codesandbox.io/embed/redux-saga-5-30bgp?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-saga-5"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

그런데 뭔가 이상하다. 원래 액션이란 상태를 변경하는 단위로서 하나의 액션은 하나의 상태를 변화시키는 것이어야 하는데 이제는 하나의 액션이 여러가지 액션을 포함한 모양이 되었다. 뭔가 마음이 불편해진다. 이렇게 되면 우리는 앞으로 어떤 액션을 만날 때 이 액션이 하나의 액션인 지 아니면 그 안에 다른 액션들을 품고있는 액션인지 알 수 없게 되었다. 또한 이 액션이 리듀서에게 던져지는 시점이 언제인지 그리고 정말 리듀서까지 잘 도달을 할 수 있을 지 등을 미리 예측하기 어려워진다. 액션 이름만 가지고서는 상태변화를 미리 예측하기가 어렵게 되었다는 이야기다. (이것이 redux-thunk 의 한계)

리액트 컴포넌트처럼 액션도 순수하게 유지할 수 있으면 좋겠다는 바램이 생긴다.

리액트 컴포넌트와 액션을 모두 순수하게 유지하면서 비즈니스로직(비동기처리)만 별도로 관리할 수는 없을까.

<br>

### redux-saga

이 지점에서 redux-saga 가 혜성처럼? 등장한다. redux-saga 는 제너레이터를 이용해 액션의 순수성이 보장되도록 해준다. 제너레이터는 싱글쓰레드 기반 자바스크립트에서 별도의 쓰레드를 fork 하는 마법을 부린다(실제로 별도 쓰레드가 생성되는 것은 아니다. 제너레이터도 싱글쓰레드로 수행이 된다. 다만 별도 쓰레드가 생성된다고 상상해 보는 것이 saga 의 동작을 이해하는데에 도움이 된다).

saga 는 특별히 비동기 처리가 필요한 액션이 발생할 때를 기다리다가 해당 액션이 dispatch 되면 새로운 쓰레드를 fork 하고 새로운 쓰레드에서 필요한 비즈니스 로직들을 순서대로 처리해 나간다.

필요한 비동기 처리들은 이렇게 모두 saga 에서 작성되고 수행된다. 드디어 리액트 컴포넌트와 리덕스의 액션을 모두 순수하게 유지하면서 비즈니스로직만 따로 처리가 가능하게 된 것이다. 아래 예시를 통해 사가의 위용을 감상할 수 있다.

Counter1.js

```jsx
import React from 'react'
import {store} from './store'

export default class Counter1 extends React.Component {
  constructor(props) {
    super(props)
    this.setLoading = this.setLoading.bind(this)
    this.state = {
      loading: false,
      count: store.getState(),
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({
        count: store.getState(),
      })
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  setLoading(loading) {
    this.setState({loading})
  }
  increment() {
    // COMPUTE 액션을 dispatch 한다
    // COMPUTE 액션이 dispatch 되면 computeCount 제너레이터의 yield 구문들이 순차적으로 실행된다
    store.dispatch({type: 'COMPUTE', setLoading: this.setLoading})
  }
  render() {
    return (
      <div className='App'>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.increment()}>add random number</button>
        <h3>{this.state.loading && 'loading..'}</h3>
      </div>
    )
  }
}
```

saga.js

```jsx
import {fetchNumber} from './api'
import {call, put, takeEvery} from 'redux-saga/effects'
import {addCount, mulCount} from './store'

function* computeCount(action) {
  yield call(action.setLoading, true) // true 를 인자로 action.setLoading 호출
  const random1 = yield call(fetchNumber) // fetchNumber 호출
  yield put(addCount(random1)) // addCount(random1) 액션을 dispatch
  const random2 = yield call(fetchNumber) // fetchNumber 호출
  yield put(mulCount(random2)) // mulCount(random2) 액션을 dispatch
  yield call(action.setLoading, false) // false 를 인자로 action.setLoading 호출
}

export default function*() {
  // COMPUTE 타임 액션이 dispatch 되면 computeCount 제너레이터를 실행한다
  yield takeEvery('COMPUTE', computeCount)
}
```

<iframe
     src="https://codesandbox.io/embed/redux-saga-6-e3e17?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-saga-6"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

무슨 일이 일어났는가?

모든 액션은 순수한 자바스크립트 객체가 되었다. 😆 리액트 컴포넌트에서는 특정 이벤트가 발생할 때 단순히 액션을 dispatch 할 뿐이다.

우리들의 비동기 로직들만 saga.js 로 분리되었다.

드디어 다 이루었다! 😀

<br>

글의 서두에서 모든 컴퓨터 프로그램은 상태머신으로 추상화 된다고 했었다. 이제 웹애플리케이션에서 상태를 모니터 화면으로 출력하는 것은 온전히 리액트가 담당한다. 애플리케이션의 상태관리는 리덕스가 담당한다. 나머지 외부 입력(사용자 입력 및 기타 이벤트들)을 받아서 어떻게 처리할 지에 대한 모든 복잡한 과정들은(비동기 비즈니스 로직 처리) saga 에서 온전히 담당을 하게 된다.

redux-saga 를 통해서 react 와 redux 의 순수성을 유지하며 각자의 역할을 분명하게 분리할 수 있게 된 것이다. 👍
