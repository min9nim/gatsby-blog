---
layout: post
title:  "[Frontend] 파일 다운로드 downloadWithFetch"
date:   2019-09-04 00:10
categories: frontend
tags: [frontend]
---
별도 서버의 도움없이 클라이언트에서 파일 다운로드를 처리하는 함수를 찾아 보았다. downloadWithAxios 는 있는데 downloadWithFetch 가 없어서 하나 만들어 보았다.

```javascript
function forceFileDownload(blob, name) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
}

async function downloadWithFetch({uri, name}) {
  const response = await fetch(uri)
  const blob = await response.blob()
  forceFileDownload(blob, name)
}
```

파일 다운을 실행할 때마다 document.body 에 anchor 태그가 추가되는 것이 좀 거슬리긴 하지만 특별히 문제가 될 것 같지는 않다. (혹 문제가 된다면 추가로 해당 anchor 요소를 remove 하면 그만이다.)

<br>

#### Ref.
https://codepen.io/nigamshirish/pen/ZMpvRa