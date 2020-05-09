---
layout: post
title:  "Srting.prototype.replace 에서 function 활용"
date:   2018-05-04 00:00:00 +0900
categories: vanillaJS
tags: [replace]
---
Problem
---
어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.
A를 3만큼 밀면 D가 되고 z를 1만큼 밀면 a가 됩니다. 공백은 수정하지 않습니다.
보낼 문자열 s와 얼마나 밀지 알려주는 n을 입력받아 암호문을 만드는 caesar 함수를 완성해 보세요.

ex) "a B z",4를 입력받았다면 "e F d"를 리턴합니다.
* 문제출처 : <https://programmers.co.kr/learn/challenge_codes/24>


<br/>
<br/>


Solution
---
#### 풀이1
```js
function caesar(s, n) {
  function replacer1(m) {
    return String.fromCharCode((m.charCodeAt(0) -97 + n)%26 +97)
  }
  function replacer2(m) {
    return String.fromCharCode((m.charCodeAt(0) -65 + n)%26 +65)
  }  
  return s.replace(/[a-z]/g, replacer1).replace(/[A-Z]/g, replacer2)
}

// 실행을 위한 테스트코드입니다.
console.log('s는 "a B z", n은 4인 경우: ' + caesar("a B z", 4));
```

#### 풀이2
```js
function caesar(s, n) {
  function enc(c, offset, n){
    return (c.charCodeAt(0) - offset + n)%26 + offset;
  }
  function replacer(m) {
    return String.fromCharCode(m.charCodeAt(0) > 90 ? enc(m, 97, n) : enc(m, 65, n));
  }
  return s.replace(/[A-Za-z]/g, replacer);
}

// 실행을 위한 테스트코드입니다.
console.log('s는 "a B z", n은 4인 경우: ' + caesar("a B z", 4));
```

<br/>
<br/>



Ref.
---
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace>
