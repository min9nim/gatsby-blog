---
layout: post
title:  "[js] 맥 크롬 검색창(input)에서 enter키 입력시 요청이 2번 올라가는 문제"
date:   2019-06-07 00:10
categories: js
tags: [generator, iterator]
---
Vuejs 로 검색화면을 개발 중이었는데 **한글** 검색어 입력 후 엔터키를 입력하면 동일한 요청이 2번 올라가는 문제가 있었다.

<br>

재현조건
1. MacOS Mojave 10.14.5(18F132)
1. 크롬: 현 시점 최신버젼, 74.0.3729.169(공식 빌드) (64비트)

기타 윈도우의 크롬이나 맥의 파이어폭스 등에서는 해당 문제가 발생되지 않았다.

한글을 입력할 경우 발생하는 문제라 외국의 비슷한 사례를 찾기도 쉽지가 않았다. 관련해서 자세히 뜯어 보았는데 vuejs 없이 html & js 만으로도 문제가 재현되는 것을 확인했다.

<video src='/images/keyup_problem.mov' width="600" controls="true" ></video>

소스코드)
```html
<input id='word' onkeyup='handleKeyup(event)'>

<script>
function handleKeyup(e){
  if(e.keyCode === 13){
    search(document.getElementById('word').value)
  }
}

function search(word){
  console.log(Date.now(), word + '검색!')
}
</script>
```

<br>

그냥 크롬의 버그라고 보고 아래와 같이 해결(workaround)하였다

```html
<input id='word' onkeyup='handleKeyup(event)'>

<script>
const intervalCall1000 = intervalCall(1000)

function handleKeyup(e){
  console.log(new Date(), e.keyCode)
  if(e.keyCode === 13){
    intervalCall1000(() => {
      search(document.getElementById('word').value)
    })
  }
}

function search(word){
  console.log(word + '검색!')
}

function intervalCall(interval){
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true
  return (fn) => {
    if(!elapsed){
      return    // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false
    fn()
    setTimeout(() => {elapsed = true}, interval)
  }
}
</script>
```

<br>
<br>

### npm 모듈 이용
[interval-call](https://www.npmjs.com/package/interval-call) 모듈을 이용해 아래와 같이 사용할 수도 있다.

#### Install
```
npm i interval-call
```

<br>

#### How to use
```javascript
const intervalCall = require('interval-call')

const interval1s = intervalCall(1000)

function handleKeyup(e){
  if(e.keyCode === 13){
    search(document.getElementById('word').value)
  }
}
handleKeyup = interval1s(handleKeyup)   // handleKeyup 은 1초 내에 여러 번 호출되더라도 최초 1번만 실행되는 함수가 된다.
```
