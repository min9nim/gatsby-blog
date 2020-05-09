---
layout: post
title:  "[partialjs] webpack 빌드시 use strict 오류"
date:   2018-04-01 19:20:00 +0900
categories: FrontEnd
tags: [partialjs, webpack]
---
#### Benefits to
webpack 빌드 환경에서 [partialjs](https://github.com/marpple/partial.js) 를 모듈로 사용하고자 할 경우
<br>
<br>
<br>


#### Problem
```js
const _ = require('./ext/partial.js');
```
위와 같이 사용하고자 할 경우 webpack 빌드 시도시 아래와 같은 문제가 발생할 수 있다
<script src="https://gist.github.com/min9nim/b9813bbdaf8367ee34aba1bc14742168.js"></script>
<br>

#### Cause
`patial.js` 1146L 에서 정의된 아래 함수가 동일한 패러미터 네이밍 `X, X` 을 사용하기 때문
```js
_.find_i = _.findIndex = collf(function(data, iter, X, X, i, l) {
  while (++i < l) if (iter(data[i], i, data)) return i;
  return -1;
});
```
<br>


#### Solution
아래와 같이 패러미터 네이밍(`X, X2`)을 달리 한다. 동일 패턴으로 문제되는 소스를 모두 수정하도록 한다.
```js
_.find_i = _.findIndex = collf(function(data, iter, X, X2, i, l) {
  while (++i < l) if (iter(data[i], i, data)) return i;
  return -1;
});
```
<br>


#### es6와 "use strict"
- es6 모듈은 모듈 안에서 "use strict"; 를 사용하지 않아도 자동으로 strict 모드로 처리된다고 함
- 해당 문제로 patial.js는 es6에서 모듈로 사용 불가
<br>
<br>
<br>

#### Ref.
<http://hacks.mozilla.or.kr/2016/05/es6-in-depth-modules/>
