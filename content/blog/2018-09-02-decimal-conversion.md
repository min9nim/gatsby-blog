---
layout: post
title: "js 진수변환"
date: 2018-09-02 17:00
categories: vanillaJS
tags: [진수변환]
---

10진수 -> 16진수

```javascript
var dec = 123
var hex = dec.toString(16) // === "7b"
```

<br>
10진수 -> 2진수
```javascript
var dec = 123;
var bin = dec.toString(2); // === "1111011"

// 아래와 같이 리터럴에서 직접 사용도 가능
(123).toString(2); // === "1111011"

````

<br>
10진수 -> 8진수
```javascript
var dec = 123;
var oct = dec.toString(8); // === "173"
````

<br>
16진수 -> 10진수
```javascript
var hex = "7b";
var dec = parseInt(hex, 16); // === "123"
```

<br>
16진수 -> 2진수 (* 10진수로 바꿨다가 다시 2진수로 바꾼다)
```javascript
var hex = "7b";
var bin = parseInt(hex, 16).toString(2); // === "1111011"
```

<br>
2진수 -> 10진수
```javascript
var bin = "1111011";
var dec = parseInt(bin, 2); // === "123"
```

<br>
2진수 -> 16진수 (* 10진수로 바꿨다가 다시 2진수로 바꾼다)
```javascript
var bin = "1111011";
var hex = parseInt(bin, 2).toString(16); // === "7b"
```

<br>

### Ref

<http://unikys.tistory.com/334>
