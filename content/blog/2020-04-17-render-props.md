---
layout: post
title: '[react] render props'
date: 2020-04-17 00:10
categories: react
tags: [js, react, render-props]
---

react 에서 코드 재사용을 위해 적극적으로 권장하는 방법 **Render Props**.

리액트는 prop 을 통해서 primitive 데이터 뿐 아니라 무엇이든(자바스크립트 객체) 동적으로 전달받을 수 있다. 그러므로 리액트 컴포넌트 내에 필요한 어떤 요소든 간에 prop 을 통해 동적으로 전달받을 수 있음을 기억하자.

아래 예제는 마우스 포인트가 특정영역을 지나갈 때 포인터의 위치를 추적하여 리턴하는 기능을 `Mouse` 컴포넌트로 추상화하고 포인터의 위치를 따라 다니는 고양이를 표시할 수 있는 `Cat` 컴포넌트를 `Mouse` 컴포넌트에게 prop 으로 전달한다.

<iframe
  style="width: 100%; height: 500px"
  src="https://stackblitz.com/edit/react-render-props-9?embed=1&file=Mouse.js" >
</iframe>
