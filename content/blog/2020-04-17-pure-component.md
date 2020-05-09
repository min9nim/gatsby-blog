---
layout: post
title: '[react] PureComponent'
date: 2020-04-17 00:10
categories: react
tags: [js, react, PureComponent]
---

일반적인 리액트 클래스 컴포넌트는 React.Component 를 확장하여 정의한다.

React.Component 는 `setState` 가 호출될 때 항상 `render` 함수가 호출된다. 렌더링 여부를 제어하기 위해 `shouldComponentUpdate` 함수를 이용할 수 있지만 `shouldComponentUpdate` 함수를 정확하게 정의하지 못하는 경우 렌더링 되어야 하는 상황에 렌더링이 되지 않는 버그를 만들어 내는 실수를 하기 쉽다.

이럴 경우 PureComponent 를 이용할 수 있다. `React.PureComponent` 를 상속받아 정의된 리액트 컴포넌트는 `props` 나 `state` 가 변경될 경우에만(얕은 비교) 다시 렌더링을 수행한다.

`props` 와 `state` 가 동일하다면(얕은 비교) 언제나 동일한 UI가 보장되는 컴포넌트인 경우에는 PureComponent 로 정의하여 성능향상을 기대할 수 있다.

아래 예제는 `React.Component` 와 `React.PureComponent` 의 차이를 시연한다.

<iframe
  style="width: 100%; height: 500px"
  src="https://stackblitz.com/edit/react-pure-component-9?embed=1&file=index.js" >
</iframe>

<br>

### Ref.

https://ko.reactjs.org/docs/react-api.html#reactpurecomponent
