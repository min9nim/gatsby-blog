---
layout: post
title: "nprogress 소개"
date: 2018-11-02 00:10
categories: memo
tags: [nprogress]
---

프론트엔드 개발할 때 언제나 필요한 기능 중 하나가 서버의 응답을 기다리는 동안에 보여줄 진행중 표시이다. 특별히 개발 프레임웍에 종속적이지 않고 모든 웹개발 프로젝트에서 간단히 사용 가능한 [nprogress](https://github.com/rstacruz/nprogress) 모듈 사용법을 소개한다.

#### 스크린샷

<img src="/images/nprogress.gif">

간단한 사용법은 아래와 같다.

<br>

#### 소스코드

```html
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
    />
    <script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>
    <style>
      /* spinner 가 디폴트로 오른쪽 상단에 위치하기 때문에 중앙으로 정렬해 준다*/
      #nprogress .spinner {
        top: 50%;
        right: 50%;
      }
    </style>
  </head>
  <body>
    <button id="start">시작</button>
    <button id="end">끝</button>
    <script>
      document.getElementById("start").onclick = function () {
        NProgress.start()
      }
      document.getElementById("end").onclick = function () {
        NProgress.done()
      }
    </script>
  </body>
</html>
```

\* 실행예제: <https://nprogress-rrfckeeegt.now.sh/>

<br>

#### Ref.

<https://github.com/rstacruz/nprogress>
