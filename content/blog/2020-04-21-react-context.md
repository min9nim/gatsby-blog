---
layout: post
title: '[react] Context api 사용 방법'
date: 2020-04-21 00:10
categories: react
tags: [js, react, context]
---

Context api 를 이용하면 mobx, redux 없이도 애플리케이션 상태를 전역으로 관리할 수가 있다. 외부 도움없이 전역으로 상태관리를 할 수 있다는 것이 매력적이지만 mobx, redux 와 비교해서 사용방법이 뭔가 좀 직관적이지는 않은 것 같다.

- React.createContext 로 컨텍스트를 생성할 때 전달하는 상태의 기본값은 실질적으로 별로 쓸데가 없는 것 같다.
  - 하지만 컴포넌트를 독립적으로 테스트할 때는 필요하다고 한다.
- Context 객체를 각 파일마다 공유하기 하기 위해 `import` 로 가져와야 한다
- 상태 변경 메소드를 함께 공유하기 위해서는 최상위 컴포넌트에서 메소드를 포함한 상태를 context 로 공유해야만 하는 제약이 있다.
- 컨텍스트의 상태가 변경될 때마다 해당 컨텍스트를 구독?하는 컴포넌트들은 re-render 된다
  - 상태의 변경 체크는 얕은 비교를 수행하는데 단순히 `===` 연산자가 사용되는 것은 아니고 [Object.is](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 와 동일한 알고리즘이 사용된다.
- 함수형컴포넌트와 클래스 컴포넌트의 컨텍스트 구독 처리하는 코드가 살짝 다르니 유의한다.

아래 예시는 Context api 를 이용하여 컴포넌트간 상태를 공유하는 모습을 시연한다.

<br>

<iframe
     src="https://codesandbox.io/embed/github/min9nim/react-context-sample/tree/master/?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-context-api-9"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>

### Ref.

https://ko.reactjs.org/docs/context.html
