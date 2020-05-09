---
layout: post
title: '[typescipt] error stack 에서 .ts 파일 매핑하기'
date: 2019-12-27 00:10
categories: source-map-support
tags: [typescript, source-map, source-map-support]
---
tsconfig.json 에 `"sourceMap": true` 설정이 되어 있다고 해서, 런타임의 오류스택에 .ts 매핑 정보가 바로 나오는 것은 아니다.

error stack 에서 직접 .ts 매핑 위치를 찾고 싶으면 아래와 같이 추가 설정이 필요하다

<br>

1\. [source-map-support](https://www.npmjs.com/package/source-map-support) 설치
```
$ npm install source-map-support
```

<br>

2\. index.ts 에 아래 코드 추가
```javascript
import 'source-map-support/register'
```

or, CLI usage
```
node -r source-map-support/register compiled.js
```


<br>

#### Ref.
- https://www.npmjs.com/package/source-map-support
- http://projectl33t.xyz/archives/50744