---
layout: post
title:  "[crossBrowsing] safari 에서 가로스크롤 막기"
date:   2018-03-22 13:18:00 +0900
categories: FrontEnd
tags: [ios, safari, x-scroll]
---
#### 문제
```css
body {
    overflow-x: hidden;
}
```
위와 같이 `body` 태그에 `overflow-x: hidden;` 를 적용하면 가로스크롤이 동작하지 않아야 하지만 사파리에서는 아래와 같이 여전히 가로스크롤이 동작하는 문제
<br>
![iOS safari 에서 가로스크롤 문제](/images/safari.gif)
- 데스크탑&모바일 사파리 모두 동일한 문제 발생
- 크롬&파폭은 정상
<br>
<br>
<br>

#### 해결책
아래와 같이 `html` 태그에도 `overflow-x: hidden;` 를 추가하니 해결 됨
```css
html {
    overflow-x: hidden;
}
```
<br>
<br>
<br>

#### Ref.
<https://www.thewordcracker.com/miscellaneous/모바일-기기에서-수평-스크롤-없애기>{:target="_blank"}
