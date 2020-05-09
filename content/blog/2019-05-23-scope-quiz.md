---
layout: post
title:  "[js] 자바스크립트 scope 퀴즈"
date:   2019-05-23 00:10
categories: js
tags: [js]
---
자바스크립트의 함수단위 스코프, 동적 this 바인딩, lexical scope 등 자바스크립트에서 scope 에 대한 개념을 정확히 이해하기 위해 알아야 할 사항들은 상당히 많다.

특별히 아래 퀴즈들을 통해 나는 자바스크립트 scope 에 대하 정확한 이해를 하고 있는가 점검해 보도록 하자

```javascript
var name = 'global'

function fn(){
  console.log(this.name)
}    

class Outer {
  name = 'object property'
  inner(){
    var name = 'inner of local'
    console.log(this.name)
    fn()
  }
}

new Outer().inner()
```
실행결과는?

아래와 같다
```
object property
global
```

`this` 는 해당 함수가 실행되는 모양?에 따라 동적으로 바인딩된다. 객체의 메소드로서 호출될 때 `this` 는 해당 객체가 되고 함수로서 직접 호출될 때는 글로벌객체에 바인딩된다.

<br>

fn 함수가 inner 안에서 정의되면 어떨까
```javascript
var name = 'global'

class Outer {
  name = 'object property'
  inner(){
    var name = 'inner of local'
    console.log(this.name)
    function fn(){
      console.log(this.name)
    }    
    fn()
  }
}

new Outer().inner()
```

```
object property
Uncaught TypeError: Cannot read property 'name' of undefined
    at fn (<anonymous>:9:24)
    at Outer.inner (<anonymous>:11:5)
    at <anonymous>:15:13
```
클래스의 body는 자동으로 strict 모드로 실행된다.
strict 모드에서는 함수로 호출될 때 내부 `this` 가 글로벌객체에 바인딩되지 않고 `undefined` 가 되기 때문에 오류가 발생한다.

<br>

Outer 를 함수로 바꾸면 어떻게 될까
```javascript
var name = 'global'

function Outer() {
  var name = 'object property'
  function inner(){
    var name = 'inner of local'
    console.log(this.name)
    function fn(){
      console.log(this.name)
    }    
    fn()
  }
  inner()
}

Outer()
```

```
global
global
```
`fn`과 `inner` 가 모두 함수로서 호출되었기 때문에 `this` 는 글로벌객체에 바인딩된다(strict mode 라면 undefined)

<br>

inner 를 화살표함수로 변경하면??
```javascript
var name = 'global'

function Outer() {
  var name = 'object property'
  var inner = () => {
    var name = 'inner of local'
    console.log(this.name)
    function fn(){
      console.log(this.name)
    }    
    fn()
  }
  inner()
}

Outer()
```

```
global
global
```
화살표함수를 사용하더라도 마찬가지로 `inner` 와 `fn` 이 함수로서 호출되었기 때문에 `this` 는 전역객체에 바인딩 된다

<br>

그럼 이제 화살표함수와 function함수의 차이점을 설명하는 아래 예제를 보자
```javascript
var name = 'global'

function Outer() {
  this.name = 'object property'
  this.inner = () => {
    var name = 'inner of local'
    console.log(this.name)
    function fn(){
      console.log(this.name)
    }    
    fn()
  }
}
var o = new Outer()
var fn2 = o.inner
fn2()
```
위 결과는 어떻게 될까?

```
object property
global
```

`inner` 함수가 최종적으로는 함수 단독으로 호출되었지만 `this`가 글로벌에 바인딩되지 않고 앞서 생성되었던 객체(`o`)에 바인딩이 되었다.

반드시 기억해야할 것은 화살표함수의 this는 함수 호출시점에 바인딩되는 것이 아니라 함수가 생성되는 시점에(이를 lexical scope 라고 한다) 바인딩된다. 즉 `inner` 함수가(객체) 실제로 생성되는 시점은 `Outer` 가 생성자함수로서 호출될 때 즉 `inner` 속성에 해당 함수를 할당하는 순간이다. 그 시점에(해당 시점의 scope) this는 `o` 객체가 된다. 그러므로 `inner` 화살표함수에서 사용된 this는 이후 재바인딩 없이 계속 `o`객체를 바라보게 된다.

위 예제에서 `inner` 를 `function` 함수로 변경하면 아래와 같이 `this`는 호출시점에 전역객체로 다시 바인딩이 된다.

```javascript
var name = 'global'

function Outer() {
  this.name = 'object property'
  this.inner = function() {
    var name = 'inner of local'
    console.log(this.name)
    function fn(){
      console.log(this.name)
    }    
    fn()
  }
}
var o = new Outer()
var fn2 = o.inner
fn2()
```

```
global
global
```
