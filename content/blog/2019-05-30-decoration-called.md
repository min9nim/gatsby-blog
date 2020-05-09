---
layout: post
title:  "[js] 클래스 decorator의 호출시점에 대하여"
date:   2019-05-30 00:10
categories: js
tags: [js]
---
decorator를 이용하면 클래스 정의를 보다 예쁘게 할 수 있다. 그렇다면 decorator가 호출되는 시점은 정확히 언제일까? 다음 예제를 통해서 확인해 보자.

<br>

```javascript
const readonly = (target, property) => {
  console.log('decorator')
  Object.defineProperty(target, property, {
    writable: false,
  })
}

export class Car {
  @readonly manufacturer = (() => {console.log('assign'); return 'hyundai'})()
  constructor(){
    console.log('constructor called')
  }
}

const myCar = new Car()
```

결과는 아래와 같다.
```
decorator
assign
TypeError) Cannot assign to read only property 'manufacturer' of object '#<Car>'
```

<br>

### 결론
객체가 생성될 때
1. 가장 먼저 decorator가 호출되고
1. 클래스 속성의 값 할당이 이루어지며
1. 마지막으로 생성자가 호출된다.