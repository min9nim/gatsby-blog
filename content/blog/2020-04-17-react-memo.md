---
layout: post
title: '[react] React.memo'
date: 2020-04-17 00:10
categories: react
tags: [js, react, memo]
---

함수형 컴포넌트는 부모 컴포넌트가 렌더링될 때 무조건 함께 같이 렌더링이 됩니다.

하지만 함수컴포넌트의 경우 props 가 다르지 않다면 항상 같은 결과를 리턴하므로 부모 컴포넌트가 re-render 되더라도 함수 컴포넌트의 props 가 변경되지 않는 경우라면 굳이 함수컴포넌트까지 re-render 할 필요는 없을 것입니다

<br>

이럴 때 성능 최적화를 위해 사용할 수 있는 것이 `React.memo` 입니다.

`React.memo` 는 `React.PureComponent` 의 함수 컴포넌트 버젼이라고 생각해 볼 수 있습니다.

<br>

아래 예제는 `React.memo` 의 효과를 시연합니다. `setInterval` 에 의해서 2초에 한번씩 부모 컴포넌트는 re-render 되지만 자식인 함수 컴포넌트는 `React.memo` 에 의하여 전달되는 props 값이 변경될 경우에만 re-render 됩니다. (console 탭을 열고 결과를 확인해 주세요)

<iframe
  style="width: 100%; height: 500px"
  src="https://stackblitz.com/edit/react-memo-9?embed=1&file=Hello.js" >
</iframe>

<br>

Note)

- React.memo 는 오직 성능 최적화 문제를 해결하기 위한 방법으로 사용됩니다.
- props 에 대한 얕은 비교만 수행합니다
- props 에 대한 깊은 비교가 필요하다면 React.memo의 2번째 인자를 활용할 수 있습니다.

React.memo의 2번째 인자 사용방법

```javascript
function MyComponent(props) {
  /* props를 사용하여 렌더링 */
}
function areEqual(prevProps, nextProps) {
  /*
  nextProp가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
  */
}
export default React.memo(MyComponent, areEqual)
```

<br>

### Ref.

https://reactjs.org/docs/react-api.html#reactmemo
