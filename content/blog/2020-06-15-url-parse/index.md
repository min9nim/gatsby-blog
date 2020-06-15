---
layout: post
title: "[js] parse url"
date: 2020-06-15 00:10
tags: [js, URL, url-parse]
description:
draft: false
---

URL 스트링 파싱할 때 옛날엔 [url-parse](https://www.npmjs.com/package/url-parse) 모듈을 이용했었는데..

요즘은 [URL](https://javascript.info/url) 객체가 기본적으로 지원이 되는구나! 브라우져와 노드 모두 사용가능하구나! 👍

```js
new URL("https://news.v.daum.net/v/20200615030427043")

/*
URL {
  href: 'https://news.v.daum.net/v/20200615030427043',
  origin: 'https://news.v.daum.net',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'news.v.daum.net',
  hostname: 'news.v.daum.net',
  port: '',
  pathname: '/v/20200615030427043',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
*/
```
