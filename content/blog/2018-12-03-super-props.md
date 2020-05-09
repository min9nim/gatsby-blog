---
layout: post
title:  "[React] super(props) 를 써야하는 이유"
date:   2018-12-03 00:10
categories: react
tags: [super, props]
---
이 글은 Dan Abramov의 [Why Do We Write super(props)?](https://overreacted.io/why-do-we-write-super-props/) 글을 충분한 의역으로 번역한 것입니다. 번역이 일부 자연스럽지 않은 부분이 있을 수도 있습니다. 정확한 내용은 원문을 참고하기 바랍니다
<br>

- - - - -
<br>

최근 [Hooks](https://reactjs.org/docs/hooks-intro.html) 가 매우 핫하다는 것을 압니다. 하지만 저는 클래스 컴포넌트의 재미있는 사실들을 알리기 위해 이 블로그를 시작하고자 합니다. 

이 내용들은 리액트 개발시 꼭 알아야할 내용은 아닙니다. 하지만 당신이 내부 동작에 대하여 호기심을 가지고 있다면 아마 재미있게 내용을 보실 수 있으실 것입니다.

<br>
- - - - -
<br>

리액트 컴포넌트를 작성할 때 우리는 늘 생성자의 시작부분에 `super(props)` 를 습관적으로 사용해 왔습니다.
```javascript
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

물론, [class fields proposal](https://github.com/tc39/proposal-class-fields) 을 사용할 수 있다면 위 코드는 아래와 같이 간단하게 작성이 가능합니다.
```javascript
class Checkbox extends React.Component {
  state = { isOn: true };
  // ...
}
```

하지만 class fields proposal 를 편히 사용할 수 있기 전까지 우리들은 임시적으로 `super(props)` 를 사용해야만 합니다. 앞서 제시된 ES2015 코드를 다시 봅시다.

```javascript
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```
`super`를 왜 호출해야만 하는 걸까요? 호출하지 않으면 어떻게 될까요? `super`를 호출은 하되 `props` 인자를 전달하지 않는다면 어떻게 될까요? 전달 가능한 다른 인자는 없을까요?

<br>
- - - - -
<br>

자바스크립트에서 `super` 는 부모클래스 생성자의 참조입니다. 그리고 자바스크립트는 언어적 제약사항으로서 생성자에서 `super` 를 호출하기 전에는 `this` 를 사용할 수 없습니다.
```javascript
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```
자바스크립트가 이런 제약사항을 강제하는 데에는 사실 합리적인 이유가 있습니다. 아래와 같은 코드를 생각해 봅시다.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 This is disallowed, read below why
    super(name);
  }
  greetColleagues() {
    alert('Good morning folks!');
  }
}
```
super 호출 전에도 `this` 를 사용하는 것이 가능하다고 가정해 봅시다. 아직까지는 문제가 없어 보입니다. 하지만 몇달 후에 `greetColleagues` 함수가 아래와 같이 `this.name` 을 사용하도록 변경되었다고 해봅시다
```javascript
greetColleagues() {
    alert('Good morning folks!');
    alert('My name is ' + this.name + ', nice to meet you!');
}
```
`this.name` 이 초기화되기 전에 `this.greetColleagues`가 호출되었습니다. 코드를 이해하기가 상당히 어려워 졌습니다. 이 코드를 어떻게 받아들여야 할까요? 이렇게 애매한 경우를 허용하지 않기 위해 자바스크립트는 언어 차원에서 `this` 사용 전에 `super` 호출을 강제하는 것입니다. 그리고 이 사항이 클래스 기반의 리액트 컴포넌트를 작성하는 데에도 동일하게 반영된 것입니다.

```javascript
constructor(props) {
    super(props);
    // ✅ Okay to use `this` now
    this.state = { isOn: true };
  }
```

`super` 를 반드시 호출해야 하는 이유는 설명이 되었지만 아직 해결되지 않은 질문이 하나 남았습니다.

왜 `props` 를 인자로 전달해야 할까요?
<br>
- - - - 
<br>
아마도 당신은 `React.Component` 객체가 생성될 때 `props` 속성을 초기화하기 위해 부모 컴포넌트에게 `props` 를 전달하는 것이구나 라고 쉽게 예상할 수 있을 것입니다
```javascript
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```
그 예상은 틀리지 않습니다. 그리고 [실제로 그렇게 동작](https://github.com/facebook/react/blob/1d25aa5787d4e19704c049c3cfa985d3b5190e0d/packages/react/src/ReactBaseClasses.js#L22)합니다.

그러나 `props` 전달 없이 `super()` 를 호출하더라도 `render` 함수 및 기타 메소드에서 여전히 `this.props` 를 사용할 수 있습니다(믿기지 않는다면 직접 한번 해보세요)

어떻게 그것이 가능할까요? 리액트는 당신이 작성한 컴포넌트의 생성자 호출 이후 해당 객체에 `props` 속성을 세팅해 줍니다.

```javascript
// Inside React
  const instance = new YourComponent(props);
  instance.props = props;
```
그래서 리액트는 `props` 를 `super`의 인자로 전달하는 것을 실수로 빠뜨리더라도 정상적으로 동작되는 것을 보장해 줍니다.

리액트가 처음 클래스를 지원하기로 했을 때 단지 ES6의 클래스만 지원하기로 했던 것은 아니었습니다. 최대한 범용적으로 여러가지 클래스 형태를 지원하고자 했습니다. 정확하지는 않지만 ClojureScript, CoffeeScript, ES6, Fable, Scala.js, TypeScript 등에서 사용하기에도 문제가 없도록 하고자 했습니다. 그래서 리액트는 의도적으로 super를 사용하는 데 주저하지 않았습니다.

그렇다면 이것이 `super()` 를 사용하기 보다 `super(props)` 를 사용해야하는 충분한 이유가 될까요?

아마도 그렇지 않을 것입니다. 여전히 충분히 납득이 안 되시는 분들이 있을 것입니다. 맞습니다. 리액트는 여러분이 작성한 생성자 호출 이후에 `props` 를 세팅해 줍니다. 생성자 내부에서 `super()` 가 호출되고 생성자가 끝나기 전까지 `this.props` 는 `undefined` 가 될 것입니다.

```javascript
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 undefined 
  }
  // ...
}
```
이렇게 `this.props`가 `undefined` 인 생성자 내부에서 다른 함수를 또 호출하는 경우에 이로 인해 발생하는 문제들을 디버깅하는 일은 매우 흥미진진한 일이 되겠군요!

이 것이 바로 `super(props)` 를 꼭 호출해야만 하는 이유입니다. 심지어 `this.props` 를 굳이 사용하지 않는 경우라도 말이죠.
```javascript
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props);      // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```
이렇게 `super(props)` 를 호출하는 것은 생성자 내부에서도 `this.props` 를 정상적으로 사용할 수 있도록 보장해 줍니다.
<br>
- - - - - 
<br>
아직 리액트 개발자들이 오랫동안 궁금해 했던 것이 아직 하나 남았습니다.

당신은 Context API 를 사용할 경우 context 가 생성자의 두번째 인자로 전달된다는 것을 알고 있었을 것입니다. 그렇다면 왜 `super(props, context)` 와 같이 사용하지는 않을까요? 그렇게 해도 됩니다. 그러나 context 는 많이 사용되지 않기 때문에 이로 인한 문제는 별로 발생되지 않을 것입니다. 

어째튼 class fields proposal 를 공식적으로 사용할 수 있을 때가 되면 `super(props)` 에 대한 복잡한 사항들은 더 이상 고민하지 않아도 될 것입니다. 그때에는 명시적인 생성자 선언 없이도 모든 인자를 편하게 사용할 수 있을 것입니다.

This is what allows an expression like state = {} to include references to this.props or this.context if necessary.

Hooks 를 사용한다면 우리는 `super` 나 `this` 에 대해 고민하지 않아도 됩니다. 하지만 그것은 나중에 다루어야 할 주제입니다.
