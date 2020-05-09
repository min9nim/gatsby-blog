---
layout: post
title:  "[crossBrowsing] Firefox 에서 contenteditable 안의 checkbox 가 선택되지 않는 문제"
date:   2018-03-17 01:43:36 +0900
categories: FrontEnd
tags: [firefox, checkbox]
---
### 문제
파이어폭스에서는 아래와 같이 contenteditable 영역 안의 checkbox는 선택도 클릭 이벤트도 정상동작 되지 않는다
<script src="https://gist.github.com/min9nim/868bafbd51bcb671355d88b1574e0db8.js"></script>
<br />

### 해결책
아래와 같이 해당 checkbox 를 span으로 감싼다
<script src="https://gist.github.com/min9nim/d4d664a3e07c4a68f341e014cd038ad4.js"></script>
<br />

### 출처
<https://stackoverflow.com/questions/37106151/using-form-elements-checkboxes-inside-contenteditable-div>{:target="_blank"}
