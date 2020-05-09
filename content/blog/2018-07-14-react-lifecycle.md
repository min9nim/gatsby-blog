---
layout: post
title:  "[React] life-cycle method"
date:   2018-07-14 01:00:00 +0900
categories: react
tags: [react, life-cycle]
---
#### life-cycle 메소드 순서
컴포넌트를 생성 할 때
```
constructor -> componentWillMount -> render -> componentDidMount
```

컴포넌트를 제거 할 때
```
componentWillUnmount 메소드만 실행
```
컴포넌트의 prop이 변경될 때
```
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
```
state가 변경될 떄
```
shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
```

<br>

#### 도식
![](/images/react-lifecycle.png)

<br>

#### Ref.
<https://velopert.com/1130>