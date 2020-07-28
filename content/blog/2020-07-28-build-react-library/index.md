---
layout: post
title: '리액트 컴포넌트 npm 패키지 만들기'
date: 2020-07-28 00:10
tags: [react-library]
description:
draft: false
---

리액트 라이브러리를 만들고 배포하는 작업 진행시 참고한다.

1. 리액트 컴포넌트는 결국 순수한 자바스크립트 객체이기(함수는 [일급객체](https://en.wikipedia.org/wiki/First-class_citizen)) 때문에 일반적인 npm 모듈을 만드는 과정과 동일하다.
2. 한가지 특이할 점은 리액트 컴포넌트 내부에서 jsx 를 사용한다면 npm모듈로 배포하기 전에 jsx 코드를 모두 순수 js코드로 변환해 주어야 한다.
    - 따라서 바벨설정과 배포 전 빌드과정이 선행되어야 한다
    - 실제로 jsx 대신 `React.createElement` 만을 이용하여 리액트 컴포넌트를 정의한다면 바벨 설정없이 npm 모듈로서 사용이 가능하다.  
3. 일반적으로 리액트 컴포넌트를 정의할 때는 jsx 문법을 이용하므로 리액트 컴포넌트를 npm모듈로 만들기 위해서는 관련 바벨설정이 필요하다.
4. 웹앱을 만드는 과정은 아니기 때문에 웹팩 기반의 CRA가 필요하지는 않다.

관련 리액트 라이브러리 프로젝트를 설정하는 방법을 알아보자

### 바벨설정
```
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
```

.babelrc 바벨 설정 추가
```
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

<br>

### package.json
- 빌드 명령(`build`)을 추가
- 모듈의 시작점을(`main`) 알맞게 설정
- peerDependencies 설정
    - 리액트 라이브러리는 당연히 `react` 에 대한 의존성을 가지지만 어짜피 리액트 프로젝트에서 사용될 것이고 해당 부모 프로젝트는 `react` 를 포함할 것이기 때문에 `react` 모듈을 `peerDependencies` 로 설치한다 

```json
{
  "main": "dist/index.js",
  "scripts": {
    "build": "./node_modules/.bin/babel src --out-dir dist"
  },
  "peerDependencies": {
    "react": "^16.13.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.10.5",
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "@babel/preset-react": "^7.10.4"
  }
}
```

<br>

### Test
배포 전 로컬 리액트 프로젝트에서 직접 로컬의 리액트 라이브러리를 설치하여 테스트해 볼 수 있다.

리액트 라이브러리 프로젝트의 절대경로(`pwd`)를 이용해 아래와 같이 설치 가능
```
yarn add /Users/mac9/project/side-p/react-dynamic-route
``` 

### TL;DR;
CRA와 같이 리액트 라이브러리 프로젝트 템플릿을 자동으로 만들어주는 create-react-library 도 있는데 사용해 보지는 않았다.

https://www.npmjs.com/package/create-react-library

<br>

### Ref
https://medium.com/recraftrelic/building-a-react-component-as-a-npm-module-18308d4ccde9
