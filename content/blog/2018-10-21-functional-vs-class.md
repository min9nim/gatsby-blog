---
layout: post
title: "[React] 함수형 컴포넌트와 클래스기반 컴포넌트의 차이점"
date: 2018-10-21 00:30
categories: react
tags: [react]
---

#### 함수형 컴포넌트

순수 자바스크립트 함수를 이용하여 컴포넌트를 정의한 것

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

<br>

#### 클래스기반 컴포넌트

`React.Component` 를 상속받은 클래스를 이용하여 컴포넌트를 정의한 것

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

<br>

#### 차이점

| 구분 | 함수형 컴포넌트                                                            | 클래스기반 컴포넌트 |
| ---- | -------------------------------------------------------------------------- | ------------------- |
| 장점 | 코드를 간결하게 작성할 수 있다.                                            | N/A                 |
| 단점 | state를 갖지 못하므로 setState 사용불가<br> [life-cycle 함수][1] 사용 불가 | N/A                 |

<br>

#### 결론

1. 괜히 고민하지 말고 그냥 다 클래스기반 컴포넌트로 작성하면 속 편하다.
1. stateless 컴포넌트로 한정하여(제약적으로) 사용하거나 stateless 함을 명시적으로 표현하고자 하는 경우에는 함수형 컴포넌트를 사용할 수 있다.
1. ~~함수형 컴포넌트는 리액트 차기 버젼에서 (지금은 아닌 듯) 더 나은 성능을 낼 수 있을 지도 모른다.~~
1. 그 외 굳이 함수형 컴포넌트를 써야 할 이유는 없을 것 같다.

<br>

#### 업데이트

1. 20/02/02
   - closure 와 this 관련 socpe 문제) https://overreacted.io/ko/how-are-function-components-different-from-classes/

<br>

#### Ref.

<https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108>

[1]: https://min9nim.github.io/2018/07/react-lifecycle/
