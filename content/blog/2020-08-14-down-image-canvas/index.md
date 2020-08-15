---
layout: post
title: 'canvas 이미지 다운로드'
date: 2020-08-14 00:10
tags: [js, download, canvas]
description:
draft: false
---

canvas 의 이미지를 클라이언트에서 바로 다운로드 하는 방법

dom 구조가 아래와 같을 때,
```html
<a id="download">
    <button type="button" onClick="download()">Download</button>
</a>
    
<canvas id="myCanvas" width="720" height="450">
    Your browser does not support Canvas.
</canvas>
```

이렇게 처리한다.
```js
function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("myCanvas")
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    download.setAttribute("download","image-name.png");
}
```

> a 태그의 `download` 속성을 이용하는 것이 포인트!
<br>

### Ref
https://stackoverflow.com/questions/8126623/downloading-canvas-element-to-an-image
