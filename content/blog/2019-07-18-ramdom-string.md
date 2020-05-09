---
layout: post
title:  "[js] 랜덤 문자열 생성함수"
date:   2019-07-18 00:10
categories: vinillajs
tags: [vinillajs]
---
간단하게 랜덤문자열을 생성하는 함수

```javascript
function createRandomString(length = 5) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    Array(length).forEach(() => {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    })
    return text
}
```

<br>
그런데 정말 이상한 것이.. 어제까지만 해도 잘 동작하던 코드였는데

오늘 갑자기 테스트코드에서 오류가 발생해서 봤더니.. forEach 루프 안으로 들어오지 않는 문제가 있었다. 잘 돌던 코드가 갑자기 왜 안 된거지..??? 갑자기 js 스펙이 바뀔리는 없는데.. 모르겠다.

일단 아래와 같이 workarround 처리
```javascript
Array.from(Array(length)).forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
})
```

<br>

덧) 그냥 for 문을 써도 되는데.. 굳이 저렇게 하는 이유는.. 그냥 괜히 코드가 이쁘고 요즘 함수형프로그래밍을 공부하면서 if문 for문과 작별을 하는 중이기 때문에..