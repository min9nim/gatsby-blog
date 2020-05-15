---
layout: post
title: '[react] Context api 사용 방법'
date: 2020-04-21 00:10
description: 'Context api 를 이용하면 mobx, redux 없이도 애플리케이션 상태를 공유할 수가 있다. 하지만 상태를 업데이트하기 위해서는 공유되는 컨텍스트 안에 상태 변경 메소드까지 포함하여야 하는데 이를 통해 애플리케이션의 전체 상태를 관리하기가 불편할 수 있다.
'
tags: [js, react, context]
---

Context api 를 이용하면 mobx, redux 없이도 애플리케이션 상태를 공유할 수가 있다. 하지만 상태를 업데이트하기 위해서는 공유되는 컨텍스트 안에 상태 변경 메소드까지 포함하여야 하는데 이를 통해 애플리케이션의 전체 상태를 관리하기가 불편할 수 있다.

- React.createContext 로 컨텍스트를 생성할 때 전달하는 상태의 기본값은 실질적으로 별로 쓸데가 없는 것 같다.
  - 하지만 컴포넌트를 독립적으로 테스트할 때는 필요하다고 한다.
- Context 객체를 각 파일마다 공유하기 하기 위해 `import` 로 가져와야 한다
- 상태 변경 메소드를 함께 공유하기 위해서는 최상위 컴포넌트에서 메소드를 포함한 상태를 context 로 정의해야 한다.
- 컨텍스트의 상태가 변경될 때마다 해당 컨텍스트를 구독?하는 컴포넌트들은 re-render 된다
  - 상태의 변경 체크는 얕은 비교를 수행하는데 단순히 `===` 연산자가 사용되는 것은 아니고 [Object.is](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 와 동일한 알고리즘이 사용된다.
- 함수형컴포넌트와 클래스 컴포넌트의 컨텍스트 구독 처리하는 코드가 살짝 다르니 유의한다.
- Context API 를 적용하기 전에 반드시 Context API 로 해결해야할 문제인 지 여부를 먼저 고민해 보는 것이 좋다. Context API 를 사용하는 순간 해당 컴포넌트는 컨텍스트에 의존성을 가지게 되기 때문이다.
- 변화되지 않는 설정값 들을 컨텍스트로 공유하는 것은 좋은 방법이 아닐 것 같다. 컨텍스트에 접근이 필요할 때마다 `SomeContext.Consumer`(or `useContext`) 를 사용해야 하는 것은 번거로운 일이 될 것이다.

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
