---
layout: post
title: '[mobx] enforceActions'
date: 2020-04-17 00:10
categories: mobx
tags: [js, mobx]
---

mobx 는 우리를 `setState` 의 늪에서 꺼내 주었다. 충분한 자유함과 유연함은 좋지만 그 것이 좋은 것이 되려면 언제나 책임을 전제로 해야한다.

observalbe 로 관리되는 상태는 정말 특별히 관리되어질 필요가 있다. 상태의 변화는 곧 사이드이펙트를 수반하기 때문이다.

obsarvable 상태를 변화시키는 로직들을 특별하게 관리하기 위해 우리는 mobx 의 `action` 을 이용할 수 있다.

<br>

기본적으로 mobx 에서 상태는 아래와 같이 간단하게 변화를 줄 수 있다.

```jsx
import {observable, autorun, action} from 'mobx'

class Store {
  @observable state = {num: 0}
  @action
  incNum() {
    this.state.num++
  }
}

const store = new Store()

autorun(() => {
  console.log(store.state.num)
})

store.incNum()
```

하지만 `state.num` 의 변화가 가져올 사이드이펙트에 대한 위화감?을 조장하고 싶다.

`state.num` 이 사이드이펙트를 불러올 수 있다!라는 것을 명시적으로 표현하기 위해 아래와 같이 코드를 작성할 수 있다.

```jsx
import {observable, autorun, action} from 'mobx'

class Store {
  @observable state = {num: 0}
  @action
  incNum() {
    this.state.num++
  }
}

const store = new Store()

autorun(() => {
  console.log(store.state.num)
})

store.incNum()
```

이제 조금 마음에 편안함이 전해진다.

<br>

하지만 코딩 컨벤션에만 의존하기엔 역시나 아직 개운치 않다. 이를 강제하기 위한 방법을 mobx 는 제공한다.

```jsx
import {observable, autorun, action, configure} from 'mobx'

configure({enforceActions: 'observed'})

class Store {
  @observable state = {num: 0}
  @action
  incNum() {
    this.state.num++
  }
}

const store = new Store()

autorun(() => {
  console.log(store.state.num)
})

store.incNum()
```

이제 action 을 사용하지 않고 직접 상태를 변경할 경우에는 아래와 같은 오류를 만나게 될 것이다.

> [mobx] Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended

<br>

Note)

1. `configuare` 를 이용한 설정은 mobx 를 사용하는 프로젝트 전체에 영향을 주기 때문에 전역에서 한번만 호출한다.
1. `action` 은 해당 함수내에서 변경이 여러 번 발생할 경우 하나의 트랜잭션으로 처리하며 reaction 이 한번만 발생하도록 처리한다.
1. 여러 개의 action 을 하나의 트랜잭션으로 처리하기 위해서는 mobx의 `transaction` 을 사용한다

<br>

#### Ref.

https://mobx.js.org/refguide/api.html#enforceactions
