---
layout: post
title:  "[js] 함수내에서 자신의 이름 참조하기"
date:   2019-08-23 00:10
categories: js
tags: [js]
---
디버깅용 로그를 남길 때 실행 중인 함수스코프 내의 해당 함수 이름을 참조하고 싶을 때가 있다.

함수 스코프 내에서 해당 함수의 이름을 참조하려면 어떻게 해야할까?

아래 방법이 가능하다

```javascript
function test(){
  console.log(arguments.callee.name)
}
test()
```

함수의 name 속성은 ES6부터 지원하지만 strict 모드에서는 `arguments.callee` 에 접근을 제한한다.

그럼 권장되는 방법은 무엇일까?
<br>

???..

<br>

#### Ref.
https://stackoverflow.com/questions/2648293/how-to-get-the-function-name-from-within-that-function