---
layout: post
title: 'Github packages 활용'
date: 2021-05-16 00:10
tags: [github, npm, package]
description: 여러 프로젝트에서 반복적으로 사용되는 공통모듈이 있다면 Don't repeat your code 원칙에 따라
draft: false
---

여러 프로젝트에서 반복적으로 사용되는 공통모듈이 있다면 Don't repeat your code 원칙에 따라 npm 모듈로 빌드해서 배포하고 싶을 것이다. npmjs 를 통해 패키지를 만들고 배포할 수 있지만 npmjs 는 비공개 레포의 패키지 지원에 대해서는 유료 플랜을 제공하고 있다.

이에 따른 대안으로 Github pagkages 가 좋은 대안이 될 수 있다.

 이 글에서는 Github package 를 통해 패키지를 빌드하고 배포하며 알게된 실질적인 내용들을 공유하고자 한다. 

Github package 를 통해 배포를 진행하더라도 npm 패키지를 빌드하는 방법이 달라지지는 않는다. 다만 해당 모듈을 배포하는 방법만 달라질 뿐이다.

모듈의 배포는 Github action 을 이용해 배포하거나, 로컬PC에서 직접 `npm publish` 명령을 이용해 배포하는 2가지 방법이 있겠다.


### npm 패키지 빌드
필자는 npm 패키지를 빌드할 때 https://www.npmjs.com/package/microbundle 를 애용한다. microbundle 과 같은 빌드모듈을 따로 이용하는 이유는 빌드된 결과물이 여러가지 모듈시스템 환경(commonjs, esm, 등)에서 동작할 수 있도록 하기 위함이다.


### npm 패키지 배포
npm 패키지를 배포할 때는 간단히 아래와 같은 Github action 을 정의할 수 있다.

```yaml
name: on release

on:
  release:
    types: [created]

jobs:
  publish-npm-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm run build
      - run: npm run test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
``` 

### Github package 로 배포
아래와 같이 registry-url 과 NODE_AUTH_TOKEN 만 살짝 변경해 준다.

```
name: on release

on:
  release:
    types: [created]

jobs:
  publish-github-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://npm.pkg.github.com/
      - run: npm install
      - run: npm run build
      - run: npm run test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

Github action 이 GITHUB_TOKEN 환경변수값을 참조하도록 되어 있지만, 깃헙 레포에 해당 환경변수를 별도로 세팅할 필요는 없다. (아마도 해당 레포의 푸시권한이 있다면 배포권한도 가질 수 있다고 암묵적으로 판단하는 듯)

1. Github packages 는 해당 레포가 공개레포이면 공개모듈로 비공개레포면 비공개모듈로 배포가 된다.
1. package.json 의 모듈명은 아래와 같이 네임스페이스 사용이 필요하다.
1. private 을 true 로 설정할 경우 배포 오류가 발생한다. 단 공개모듈일 경우 false 로 설정하는 것은 문제가 되지 않는다.

```json
{
  "name": "@keating/goodutils",
  "private": false
}
```

### Local PC 에서 배포
Github action 이 아닌 로컬 PC에서 배포를 진행하려면 Github package 로 접근할 수 있는 키발급이 필요하다.

아래와 같은 절차로 Github package 배포를 위한 키발급을 진행한다

![](https://telegra.ph/file/9a222a2c48d237d9cb410.png)

![](https://telegra.ph/file/0d71ca3bf3818e64d33a5.png)


pacakage.json 에 publishConfig 설정을 추가
```
"publishConfig": {
  "registry": "https://npm.pkg.github.com/"
}
```

그리고
```
npm login
```

또,
~/.npmrc 설정

```
//npm.pkg.github.com/:_authToken=blabla
```

### Github package 로 접근하려면
Github package 에 등록된 모듈을 사용하려는 프로젝트 루트에 .npmrc 파일을 생성

```
@keating:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_xxxxxx
```

위와 같이 설정하면 @keating 스코프 안에 정의된 모듈들은 모두 npm.pkg.github.com 에서 찾게 됩니다.



### @keating 스코프의 특정 모듈은 registry.npmjs.org 에 등록되어 있는 경우
해당 프로젝트에서 @keating/a-module, @keating/b-module 을 모두 사용하는데, @keating/a-module 는 공개 모듈로서 npm 저장소에, @keating/b-module 은 비공개 모듈로서 깃헙 저장소에 등록 되어 있다면 어떻게 될까요.

프로젝트 루트의 .npmrc 에서 @keating 스코프는 깃헙저장소에서만 찾도록 설정이 되어 있기 때문에 @keating/a-module 은 npm.pkg.github.com 에 등록되어 있지 않아 오류가 발생합니다.

특정 모듈 별로 모듈 저장소를 설정할 수 있으면 좋겠다는 생각이 들었지만 그렇게까지 세밀한 설정은 지원되지 않는 것 같습니다.

제가 찾은 대안은 @keating/a-module 을 배포할 때  npm.pkg.github.com 와 registry.npmjs.org 양쪽 모두로 배포를 하는 것입니다. (나름 최선인 것 같고 만족스러움)

```yaml
name: on release

on:
  release:
    types: [created]

jobs:
  publish-npm-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm run build
      - run: npm run test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
  publish-github-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://npm.pkg.github.com/
      - run: npm install
      - run: npm run build
      - run: npm run test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

그렇게 되면, 해당 모듈의 같은 버젼을 registry.npmjs.org 에서도 npm.pkg.github.com 동일하게 찾을 수 있기 때문에 어떤 프로젝트에서든 사용이 가능해 집니다.
