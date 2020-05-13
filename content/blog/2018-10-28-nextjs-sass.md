---
layout: post
title: "Next.js + Sass"
date: 2018-10-28 00:30
categories: nextjs
tags: [nextjs, sass]
---

Next.js 에서 scss를 사용하려면 next-sass 플러그인을 추가로 설치해야 한다. next-sass 플러그인을 설치하고 사용하는 방법은 다음과 같다.

<br>

### next-sass 세팅

모듈 설치

```
npm install --save @zeit/next-sass node-sass
```

<br>
프로젝트 루트 경로에 `next.config.js` 파일 생성
```javascript
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass()
```

<br>

### 사용방법

`/style.scss` 파일 생성

```
$font-size: 50px;
.example {
  font-size: $font-size;
}
```

<br>
`pages/index.js` 파일 생성
```javascript
import "../styles.scss"

export default () => <div className="example">Hello World!</div>

```

<br>

#### Ref.
<https://github.com/zeit/next-plugins/tree/master/packages/next-sass>
```
