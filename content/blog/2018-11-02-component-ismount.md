---
layout: post
title: "[react] 컴포넌트의 mount 여부 체크"
date: 2018-11-02 00:10
categories: react
tags: [react]
---

아직 mount 되지 않은 혹은 unmount 된 컴포넌트에 `forceUpdate` 나 `setState` 를 수행하려고 하면 아래와 같은 오류가 발생한다

```
Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in List (created by App)
```

<br>

`setState` 난 `forceUpdate` 전에 해당 컴포넌트의 mount 여부를 체크할 수 있으면 좋겠다. 어떻게 해야할까. 관련 내용을 좀 찾아봤는데 아래와 같은 방법이 있었다.

```javascript
componentDidMount() {
  this._ismounted = true;
}

componentWillUnmount() {
   this._ismounted = false;
}
```

과거 `isMounted()` 함수가 있었는데.. 메모릭 문제가 있어서 공식적으로 deprectated 되었다고 한다.

<br>

### Ref.

- <https://stackoverflow.com/questions/39767482/is-there-a-way-to-check-if-the-react-component-is-unmounted/39767963>
- <https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html>
