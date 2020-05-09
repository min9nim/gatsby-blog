---
layout: post
title: '[react] mobx 개발환경 설정'
date: 2020-04-19 00:10
categories: react
tags: [js, react, mobx]
---

create-react-app 으로 시작해서 mobx 를 사용하기 위한 기본적인 세팅방법 기록해 둠

<br>

1\. 앱생성

```
npx create-react-app toy-mobx
cd toy-mobx
```

<br>

2\. CRA 기본 앱 설정 추출

```
yarn eject
```

<br>

3\. mobx, mobx-react 설치

```
yarn add mobx mobx-react
```

<br>

4\. 데코레이터 사용 설정 preset 설치

```
yarn add -D babel-preset-mobx
```

package.json 에 mobx 프리셋 추가

```json
"babel": {
    "presets": [
      "react-app",
      "mobx"
    ]
  },
```

<br>

예시) https://github.com/min9nim/toy-mobx

<br>

### Ref.

- https://velog.io/@velopert/MobX-2-리액트-프로젝트에서-MobX-사용하기-oejltas52z
- https://www.npmjs.com/package/babel-preset-mobx
