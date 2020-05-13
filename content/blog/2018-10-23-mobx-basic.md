---
layout: post
title: "[React] mobX를 이용하여 setState 없애기"
date: 2018-10-23 00:30
categories: react
tags: [react, mobx]
---

리액트에서 컴포넌트의 상태를 setState 를 이용해 변경하는 것은 functional 과 immutable 을 적극적으로 사용하는 리액트의 근간을 이루는 기본 개념이고 사용법이다.

이로 인해 리액트는 상태의 변이를 추적하고 관리하는 이점을 충분히 활용할 수 있었고 적절한 성능최적화를 이룰 수 있었다.

하지만 setState 사용시 반드시 객체의 불변성을 유지하는 것은 또 다른 어려움을 낳았고 비동기로 동작하는 setState 는 리액트 개발시 조심스럽게 다뤄야 하는 추가적인 부담을 낳았다.

그런데 mobX 를 이용하면 리액트 개발시 setState 자체를 안 사용해도 된다고 하여 내용들을 살펴보고 있다. 입력값을 받아들이는 간단한 입력폼 예제를 통하여 mobX가 기존 리액트 코드를 어떻게 변화시켜주는지 확인해 본다

<br>

#### setState 를 이용한 일반적인 입력폼 예제

[실행가능 예제링크](https://codepen.io/song-mingu/pen/NOLaGG)

```javascript
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: "" }
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        이름:{" "}
        <input
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

function Root() {
  return (
    <div>
      <Form />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
```

<br>

#### mobX 를 적용

[실행가능 예제링크](https://codepen.io/song-mingu/pen/bmxowV)

```javascript
const { observable, reaction, decorate } = mobx

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: "" }

    // 변이를 추적할 상태 지정
    decorate(this, { state: observable }) // or this.state = observable(this.state);

    // 변화에 따른 효과를 정의
    reaction(
      () => this.state.name,
      () => {
        this.forceUpdate()
      }
    )
  }

  handleChange(e) {
    this.state.name = e.target.value
  }

  render() {
    return (
      <div>
        이름:{" "}
        <input
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

function Root() {
  return (
    <div>
      <Form />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
```

reaction은 첫번째의 인자의 리턴값의 변화가 발생하면 두번째 인자로 전달되는 함수를 호출한다. 첫번째 인자의 변화를 deep하게 관찰하지는 않기 때문에 첫번째 인자를 아래와 같이 전달할 경우 `this.state.name` 값이 변경되는 것에 따라 두번째 인자(함수)가 호출되지는 않음에 주의해야 한다

```javascript
reaction(
  () => this.state,
  () => {
    this.forceUpdate()
  }
)
```

<br>

#### Ref.

<https://mobx.js.org/refguide/reaction.html>
