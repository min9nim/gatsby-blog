---
layout: post
title:  "[js] spread operator 에 의해 열거되지 않는 속성이 있다?"
date:   2019-05-31 00:10
categories: js
tags: [js]
---
[ES6에서 도입된 spread operator][1] 는 객체를 다룰 때 상당히 유용하게 쓰인다. 하지만 정확히 알고 사용하지 않으면 오류를 발생시킬 수 있다.

특별히 프레임웍으로부터 전달받은 이벤트객체를 spread operator 를 이용해 전개할 경우 속성 전개가 안 되는 경우가 있을 수 있다. 예시를 통해 구체적인 차이점을 이해한다.

<br>

아래와 같이 객체 상속을 정의한 경우에는 date가 출력된다.
```javascript
class Event {
  date = Date.now()
}

class ClickEvent extends Event {
  constructor(x,y){
    super()
    this.x = x
    this.y = y
  }
}

const event = new ClickEvent(100, 200)
console.log(JSON.stringify({...event}))
```

결과)
```
{"date":1559273437090,"x":100,"y":200}
```

<br>

하지만 아래와 같이 상속을 정의한 경우에는 date가 출력되지 않는다
```javascript
function Event() {
  this.date = Date.now()
}

function ClickEvent(x, y) {
  this.x = x
  this.y = y
}

ClickEvent.prototype = new Event()

const event = new ClickEvent(100, 200)
console.log(JSON.stringify({...event}))
```

결과)
```
{"x":100,"y":200}
```

차이점을 눈치 챘는가?


<br>

### 결론
spread operator 는 객체 자신이 소유한 속성만 열거 가능하며 상속받은 속성은 열거되지 않는다는 것을 꼭 기억하자

<br>

### 기타
객체 소유의 속성만 접근하는 것
- `Object.keys`, `Object.assign`

<br>

상속받은 속성까지 나열 하는 것
- `for ~ in`


[1]:https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax