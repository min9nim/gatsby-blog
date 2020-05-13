---
layout: post
title: "iOS 에서 입력컨트롤 테두리 그림자 제거"
date: 2018-06-11 09:00:00 +0900
categories: FrontEnd
tags: [border, shadow, ios]
---

#### 문제

입력 컨트롤의 테두리를 보시면(border-top) 어두운 그림자가 드리어져 있다

![이후](/images/ios-asis.jpg){: width="300"}

<br>

#### 해결책

아래 스타일을 사용

```
input, textarea {
    -webkit-appearance: none;
}
```

<br>

#### 결과

그림자가 사라지고 훨씬 깔끔해 졌다

![이후](/images/ios-tobe.jpg){: width="300"}

<br>

#### Ref.

<https://webisfree.com/2016-03-22/ios-아이폰-input-태그에-기본-둥근-테두리-및-그림자-제거-방법>
