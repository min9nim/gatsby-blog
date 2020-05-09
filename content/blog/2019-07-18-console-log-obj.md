---
layout: post
title:  "[js] console.log 를 이용한 디버깅시 주의사항"
date:   2019-07-18 00:10
categories: js
tags: [js]
---
웹개발시 일반적으로 디버깅시 `console.log` 를 많이 사용하는데 주의해야 할 사항이 있다.

아래 코드를 보자

```javascript
let obj = {a: 1}
console.log(obj)
obj.a = 2
console.log(obj)
```
<br>

위와 같이 객체 자체를 직접 콘솔에 찍을 경우 브라우져(크롬)는 `obj`에 대한 참조를 이용해 console 에 값을 찍어 주기 때문에 스크립트 실행이 끝난 후에 아래와 같은 최종 결과만을 보게 된다.(Node 환경에서는 이런 문제가 없음!)

![](/images/console.png)

<br>

더 나은 방법이 있을 지 모르겠지만, 아래와 같은 방법을 추천한다.
<br>
```javascript
global.log = (...args: any[]): void => {
  const serialized = args.map((arg) => {
    if(typeof arg === 'object'){
      return JSON.stringify(arg, null, 2)
    }else if(typeof arg === 'function'){
      return arg.toString()
    }else{
      return arg
    }
  })
  console.log(...serialized)
}
```
