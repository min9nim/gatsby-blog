---
layout: post
title:  "[crossBrowsing] 이벤트 처리시 주의사항"
date:   2018-03-21 10:20:36 +0900
categories: FrontEnd
tags: [event]
---
#### 문제
* 아래와 같이 event객체를 직접 참조하면 firefox에서 오류 발생
  * 크롬에서는 정상

<script src="https://gist.github.com/min9nim/7f69402de6a6079a3e2936d266347a2c.js"></script>
<br />

#### 해결책
* 아래와 같이 패러미터로 전달된 이벤트 객체를 사용해야 한다
  * chrome & firefox 외 브라우져는 테스트 안 해봄

<script src="https://gist.github.com/min9nim/82014d7854357088dab5083eb7fbedb7.js"></script>
