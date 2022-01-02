---
layout: post
title:  "[css] 레이어 중첩 구조에서 z-index"
date:   2019-07-19 00:10
categories: css
tags: [css, z-index]
---
`z-index` 는 상위 요소에서 정의된 값이 우선한다.

예를 들면, 마크업이 아래와 같을 때 parent2 가 parent1 의 child 보다 위로 올라온다
```html
<div class='parent1' style='z-index:100; position: fixed'>
  <div class='child' style='z-index:200; position: fixed'></div>
</div>
<div class='parent2' style='z-index:150; position: fixed'>
</div>
```
