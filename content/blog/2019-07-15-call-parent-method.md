---
layout: post
title: "[vue] 부모 뷰인스턴스의 메소드 호출"
date: 2019-07-15 00:10
categories: vue
tags: [vue, vue-class-component, vue-property-decorator, mixins, typescript]
---

타입스크립트를 이용해 뷰 개발을 하고자 한다면 당신은 아마 [vue-class-component](https://www.npmjs.com/package/vue-class-component) 를 사용하고 있을 것이다. 그리고 이보다 더 많은 기능을 포함한 [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator) 를 사용하고 있을 수도 있다.

vue-class-component 의 `mixins` 를 이용하면 뷰인스턴스를 손쉽게 확장할 수 있다.

본 글에서는 특별히 `mixins` 를 이용해 뷰인스턴스 상속을 구현한 경우 하위 뷰인스턴스에서 부모 뷰인스턴스의 메소드를 호출하는 방법을 소개한다.

<br>

#### super 를 이용한 부모 메소드 호출

일반적으로 부모클래스의 메소드 호출은 아래와 같이 `super`를 이용할 수 있다.

```javascript
class Animal {
  name = "동물"
  speed = 10
  stop() {
    this.speed = 0
    console.log(`${this.name} stopped.`)
  }
}

class Rabbit extends Animal {
  name = "토끼"
  speed = 20
  stop() {
    super.stop() // call parent stop
    this.hide() // and then hide
  }
  hide() {
    console.log(`${this.name} hides!`)
  }
}
```

<br>

#### 문제

하지만 mixins 를 이용한 뷰인스턴스 상속에서는 super 를 사용해서 원하는 결과를 얻을 수 없다

```javascript
// Animal.vue
import Component from "vue-class-component"

@Component
class Animal {
  name = "동물"
  speed = 10
  stop() {
    this.speed = 0
    console.log(`${this.name} stopped.`)
  }
}

// Rabbit.vue
import Component, { mixins } from "vue-class-component"
import Animal from "~/mixins/Animal.vue"

@Component
class Rabbit extends mixins(Animal) {
  name = "토끼"
  speed = 20
  stop() {
    super.stop() // error 발생
    this.hide()
  }
  hide() {
    console.log(`${this.name} hides!`)
  }
}
```

<br>

#### 해결방법

자식 뷰인스턴스에서 부모 뷰인스턴스의 메소드 호출은 `Animal.options.methods.stop.call(this)` 와 같이 처리할 수 있다.

```javascript
// Animal.vue
import Component from "vue-class-component"

@Component
export default class Animal {
  name = "동물"
  speed = 10
  stop() {
    this.speed = 0
    console.log(`${this.name} stopped.`)
  }
}

// Rabbit.vue
import Component, { mixins } from "vue-class-component"
import Animal from "~/mixins/Animal.vue"

@Component
class Rabbit extends mixins(Animal) {
  name = "토끼"
  speed = 20
  stop() {
    Animal.options.methods.stop.call(this) // it works!
    this.hide()
  }
  hide() {
    console.log(`${this.name} hides!`)
  }
}
```

<br>

#### 기타

mounted 함수는 아래와 같이 접근할 수 있다.

```javascript
Animal.options.mounted[0].call(this)
```

<br>

#### Ref.

- https://javascript.info/class-inheritance
- https://stackoverflow.com/questions/45654170/vue-js-mixins-call-parent-method-in-overridden-implementation
