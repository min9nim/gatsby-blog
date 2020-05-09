---
layout: post
title:  "[js] getQueryParam"
date:   2019-07-03 00:10
categories: test
tags: [js, utils, replace]
---

[여기 소스](https://github.com/nuxt/example-auth0/blob/master/utils/auth.js#L4-L10) 살펴보다가 replace 를 이렇게 활용할 수도 있구나.. 인상적이어서 공유해 봅니다


쿼리스트링을 파싱하여 리턴하는 유틸함수(원본 소스를 일부 수정함)

```javascript
// const url = window.location.href
const getQueryParams = (url) => {
  const params = {}
  const idx = url.indexOf('?') + 1
  const fromIdx = url.slice(idx)
  fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}
```
<br>

URL이 아래와 같을 때

http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=2228972569&trTypeCd=22&trCtgrNo=895019

<br>

리턴 결과
```javascript
{
    method: "getSellerProductDetail",
    prdNo: "2228972569",
    trTypeCd: "22",
    trCtgrNo: "895019"
}
```


