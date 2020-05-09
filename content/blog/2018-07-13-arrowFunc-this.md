---
layout: post
title:  "[js] 일반함수와 화살표함수에서 this 의 차이점"
date:   2018-07-13 10:00
categories: vanillaJS
tags: [this]
---
#### Point.
화살표 함수에서 사용된 this 참조는 해당 함수가 정의될 당시의 컨텍스트를 참조한다. function 함수에서 사용된 this는 해당 함수가 어떤 객체의 메소드로 호출되었느냐에 따라 해당 객체를 가르키는 참조가 된다.

<br>

기본 예제
```javascript
var num = 11;
var f1 = () => {console.log(this.num);}
var f2 = function(){console.log(this.num)};

var o = {num : 22};
o.f1 = f1;
o.f2 = f2;


f1();   // 11       // 함수가 정의될 때의 컨택스트에서 this 를 참조
f2();   // 11       // window.f2() 와 같으므로 this 에 window 가 바인딩됨

o.f1();     // 11       // 여전히 f1 함수가 정의될 당시의 this 를 참조
o.f2();     // 22       // 객체의 메소드로 호출되었기 때문에 this 에 o 객체가 바인딩됨
```
<br>

클로져 예제
```javascript
var num = 11;
var o = {num : 22};
o.getArrowFunc = function(){
    return () => this.num;
}
o.getFunc = function(){
    return function(){
        return this.num;
    }
}

var arrowFunc = o.getArrowFunc();
var getArrowFunc = o.getArrowFunc;
var arrowFunc2 = getArrowFunc();
var func = o.getFunc();


arroFunc();     // 22       // arrowFunc 함수가 정의될 당시의 컨텍스트에서 this 는 o 객체였음
arrowFunc2();   // 11       // arrowFunc 함수가 정의될 당시의 컨텍스트에서 this 는 window 객체 였음
func();         // 11       // window.func() 와 같으므로 this에 window가 바인딩됨
```

