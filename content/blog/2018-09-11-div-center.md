---
layout: post
title: "div 를 화면 정중앙에 위치시키는 방법"
date: 2018-09-11 09:00
categories: FrontEnd
tags: [css, scss]
---
레이어를 정 중앙에 위치시키는 css

```css
position: fixed;
top: 50%;
left: 50%;
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
-moz-transform: translate(-50%, -50%);
-o-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
```

<br>
데모) <https://codepen.io/min9nim/pen/QVmKWR>
<p data-height="265" data-theme-id="0" data-slug-hash="QVmKWR" data-default-tab="css,result" data-user="min9nim" data-pen-title="modal_alert" class="codepen">See the Pen <a href="https://codepen.io/min9nim/pen/QVmKWR/">modal_alert</a> by Song, MinGu (<a href="https://codepen.io/min9nim">@min9nim</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>