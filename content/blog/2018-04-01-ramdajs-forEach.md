---
layout: post
title:  "ramdajs 라이브러리 forEach 버그"
date:   2018-04-01 00:35:00 +0900
categories: ramdajs
tags: [ramdajs, forEach]
---
#### 예시
<script src="https://gist.github.com/min9nim/11a2369a18f41c09ebc39c4991da78b0.js"></script>
<br>

#### 결과
```
arguments.length = 3
```
<br>


#### 질문
[forEach 매뉴얼](http://ramdajs.com/docs/#forEach){:target="_blank"} 을 보면
첫번째 인자 함수가 패러미터를 1개만 받는다고 나와있는데.. 저 경우에는 왜 3개를 받는 걸가?
버그라고 봐야하지 않을까
