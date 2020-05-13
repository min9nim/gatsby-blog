---
layout: post
title: "초간단 숨김 애니메이션 처리"
date: 2018-11-02 00:10
categories: frontend
tags: [animation]
---

포스트의 삭제 처리시 이용할 수 있는 초간단 애니메이션 처리 예제

#### 스크린샷

<img src="/images/removeAnimation.gif">

<br>

#### 소소코드

```javascript
function removeAnimation(dom, delay) {
  return new Promise(function (resolve) {
    dom.style.transition = `transform ${delay}s ease-in-out`
    dom.style.transform = "scaleY(0)"
    setTimeout(resolve, delay * 1000)
  })
}

const remove = async (post, dom) => {
  if (!confirm("삭제합니다")) {
    return
  }

  // 애니메이션 시작
  await removeAnimation(dom, 1) // 초단위

  // 1초 후 DB 삭제처리
  await app.api.deleteLink(post.id)
}
```
