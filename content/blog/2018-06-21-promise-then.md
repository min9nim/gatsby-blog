---
layout: post
title:  "[js] 프라미스 then 함수가 프라미스를 리턴할 때"
date:   2018-06-20 09:00
categories: vanillaJS
tags: [promise, then]
---
프라미스 체이닝에서 프라미스를 리턴하고 전달받을 경우에 대한 동작에 대해서 알아본다
<br>
<br>

#### CASE1) then 함수에서 문자열을 리턴하는 경우
앞서 리턴한 값을 다음 then 함수에서 인자로 받는다
```javascript
new Promise(resolve => {
    resolve("리턴값1");
}).then(res1 => {
    console.log("res1 = " + res1)
    return "리턴값2";
}).then(res2 => {
    console.log("res2 = " + res2)
})
```
실행결과)
```
  res1 = 리턴값1
  res2 = 리턴값2
< Promise {<resolved>: undefined}
```
<br>

#### CASE2) then 에서 프라미스를 리턴하는 경우
then 에서 프라미스를 리턴하면 해당 프라미스가 resolved 될 때 다음 then 함수가 호출되며 resolve에 전달 된 값이 다음 then 함수에 전달된다
```javascript
new Promise(resolve => {
    resolve("리턴값1");
}).then(res1 => {
    console.log("res1 = " + res1)
    return new Promise(resolve => {
        setTimeout(()=>resolve("리턴값2"), 3000);
    });
}).then(res2 => {
    console.log("res2 = " + res2)
})
```
실행결과)
```
  res1 = 리턴값1
< Promise {<pending>}
  res2 = 리턴값2
```

<br>

#### CASE3) 첫번째 프라미스가 resolve 함수에 프라미스를 전달하는 경우
1번째 프라미스가 리턴한 프라미스가 resolved될 때(3초후) 다음 then 함수가 호출되며, 해당 프라미스가 resolved된 값을 인자로 전달받는다
```javascript
new Promise(resolve => {
    resolve(new Promise(resolve => {
        setTimeout(() => resolve("리턴값1"), 3000);
    }));
}).then(res1 => {
    console.log("res1 = " + res1)
    return "리턴값2";
}).then(res2 => {
    console.log("res2 = " + res2)
})
```
실행결과)
```
< Promise {<pending>}
  res1 = 리턴값1
  res2 = 리턴값2
```

<br>

#### 결론
then 함수 앞에서 프라미스를 리턴하는 경우에는 해당 프라미스가 resolved 된 값을 인자로 전달받는다