---
layout: post
title: "[scss] 주요 문법 정리"
date: 2018-08-11 01:00:00 +0900
categories: FrontEnd
tags: [scss, syntax]
---

### 변수 사용

scss

```scss
$jb-font: "Times New Roman";
$jb-size: 20px;
$jb-color: #444444;
h1 {
  font-family: $jb-font;
  font-size: $jb-size;
  color: $jb-color;
}
```

css

```css
h1 {
  font-family: "Times New Roman";
  font-size: 20px;
  color: #444444;
}
```

<br>

### &

현재 적용 중인 실렉터 참조

scss

```scss
a {
  text-decoration: none
  &:hover { text-decroation: underline; }
}
```

css

```css
a {
  text-decoration: none;
}
a:hover {
  text-decoratino: underline;
}
```

<br>

### @mixin

재사용 가능한 css 블럭을 설정

scss

```scss
@mixin flex {
  // write the css here
  display: -webkit-flex;
  display: flex;
}

.row {
  @include flex;
}
```

css

```
.row {
    display: -webkit-flex;
    display: flex;
}
```

<br>

### @content

@mixin 구문 안에서 사용되며, @include 문의 중괄호 안에 정의된 내용을 참조

scss

```scss
@mixin media($width) {
  @media only screen and (max-width: $width) {
    @content;
  }
}

@include media(320px) {
  background: red;
}
```

css

```css
@media only screen and (max-width: 320px) {
  background: red;
}
```

<br>

### @import

다른 scss 파일을 현재 코드 영역으로 가져온다.

scss

```scss
@import "whiteglass/base", "whiteglass/layout", "whiteglass/syntax-highlighting";
```

<br>

### @extend

특정 실렉터의 css정의를 상속받는다

scss

```scss
// 베이스 클래스
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}
```

css

```css
.message,
.success,
.error {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.message {
  border-color: green;
}
.error {
  border-color: red;
}
```

<br>

### Ref.

- <https://soooprmx.com/archives/7948>
- <https://www.codingfactory.net/10107>
