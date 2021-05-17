---
layout: post
title: 'Github packages 로 npm 패키지 배포'
date: 2021-05-17 00:10
tags: [github, npm, package]
description: 여러 프로젝트에서 반복적으로 사용되는 공통모듈이 있다면 Don't repeat your code 원칙에 따라 npm 모듈로 배포해서 사용하고 싶어진다. npmjs 를 통해 패키지를 만들고 배포할 수 있지만 npmjs 는 비공개 레포의 패키지 지원에 대해서는 유료 플랜을 사용해야 한다.
draft: false
---

여러 프로젝트에서 반복적으로 사용되는 공통모듈이 있다면 Don't repeat your code 원칙에 따라 npm 모듈로 배포해서 사용하고 싶어진다. npmjs 를 통해 패키지를 만들고 배포할 수 있지만 npmjs 는 비공개 레포의 패키지 지원에 대해서는 유료 플랜을 사용해야 하는 아쉬움이 있다.

이에 따른 대안으로 [Github pagkages](https://github.com/features/packages) 는 좋은 대안이 될 수 있다.

이 글에서는 Github packages 로 npm 패키지을 배포할 때 필요한 기본적인 사항들을 설명한다. 

### Prerequisite

Github packages 를 통해 배포를 진행한다고 npm 패키지를 빌드하는 방법이 달라지는 것은 아니다. 다만 해당 **모듈을 배포하는 방법만 달라질 뿐이다**. 패키지의 배포는 Github action 을 이용해 배포하거나, 로컬PC에서 직접 `npm publish` 명령을 이용해 배포하는 2가지 방법이 있다.


### npm 패키지 빌드
필자는 npm 패키지를 빌드할 때 [microbundle](https://www.npmjs.com/package/microbundle) 를 애용한다. microbundle 과 같은 빌드모듈을 따로 이용하는 이유는 빌드된 결과물이 여러가지 모듈시스템 환경(commonjs, esm, 등)에서 동작할 수 있도록 간편하게 지원하기 위함이다.


### npm 패키지 배포
일반적으로 npm 패키지를 배포할 때는 간단히 아래와 같은 Github action 설정을 이용할 수 있다. 이와 같이 모듈을 배포할 때 해당 모듈은 npmjs 에서 제공하는 공식적인 모듈 저장소인 `registry.npmjs.org` 에 등록이 된다.

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

물론 Local PC에서 배포를 진행하고자 할 때는 `npm publish` 명령어를 이용할 수도 있다.

### Github packages 로 배포
이제 해당 모듈을 Github packages(`npm.pkg.github.com`) 로 배포하기 위해서는 기존 설정에서 `registry-url` 과 `NODE_AUTH_TOKEN` 만 살짝 변경해 주면 된다.

```yaml{15,21}
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

위 설정에서 Github action 이 `GITHUB_TOKEN` 환경변수값을 참조하도록 되어 있지만, 깃헙 레포에 해당 환경변수를 별도로 세팅할 필요는 없다. (아마도 Github packages 가 해당 레포의 푸시권한이 있다면 배포권한도 가질 수 있다고 암묵적으로 판단하는 듯)

1. Github packages 는 해당 레포가 공개레포이면 공개모듈로 비공개레포면 비공개모듈로 배포가 된다.
1. package.json 의 모듈명은 아래와 같이 네임스페이스 사용이 필요하다.
1. 비공개 레포의 경우 private 을 true 로 설정하면 배포시 오류가 발생하므로 해당 설정을 제거한다.(단 공개모듈일 경우 false 로 설정하는 것은 문제가 되지 않는다.)

```json
{
  "name": "@keating/a-module",
  "private": false
}
```

### Local PC 에서 Github packages 로 배포
Github action 을 이용하지 않고 로컬 PC에서 바로 배포를 진행하려면 우선 Github packages 로 접근할 수 있는 키발급이 필요하다.(이는 npm 저장소에 패키지를 배포하려면 우선 npmjs.com 에서 액세스키 발급이 필요한 것과 비슷하다)

아래와 같은 절차로 Github packages 배포를 위한 키발급을 진행한다

![](https://telegra.ph/file/9a222a2c48d237d9cb410.png)

![](https://telegra.ph/file/0d71ca3bf3818e64d33a5.png)


그리고 해당 스코프에 대하여 Github packages 로 로그인(비밀번호로 위에서 발급받은 토큰을 입력)
```
npm login --scope=@keating --registry=https://npm.pkg.github.com
```

발급받은 키값을 직접 터미널에서 타이핑하기에는 어려움이 있으므로 아래와 같이 간단하게 `~/.npmrc` 파일을 작성해도 된다.

```
@keating:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_xxxxxxs
```

그리고 해당 프로젝트의 pacakage.json 에 publishConfig 설정을 추가한다.
```yaml
"publishConfig": {
  "registry": "https://npm.pkg.github.com/"
}
```

이후 `npm publish` 를 수행하면 해당 패키지는 `npm.pkg.github.com` 로 배포가 진행된다.


### Github packages 로 접근하려면
기본적으로 npm 프로젝트는 `registry.npmjs.org` 에서 npm 패키지 모듈들을 찾기 때문에 `registry.npmjs.org` 에서 해당 이름의 모듈이 없으면 오류가 발생한다. 따라서 Github packages 에 등록된 모듈을 사용하고자 한다면 해당 프로젝트에 관련 설정을 추가해야 한다.

프로젝트 루트에 아래와 같이 `.npmrc` 파일을 생성한다.

```
@keating:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_xxxxxxs
```

위와 같이 설정하면 `@keating` 스코프 안에 정의된 모듈들은 모두 `npm.pkg.github.com` 에서 찾게 된다.



### @keating 스코프의 특정 모듈이 registry.npmjs.org 에 등록되어 있는 경우

만약 해당 프로젝트에서 `@keating/a-module`, `@keating/b-module` 을 모두 사용하는데, `@keating/a-module` 는 공개 모듈로서 `registry.npmjs.org` 에, `@keating/b-module` 은 비공개 모듈로서 `npm.pkg.github.com` 에 등록 되어 있다면 어떻게 될까.

프로젝트 루트의 `.npmrc` 에서 `@keating` 스코프는 깃헙 저장소에서만 찾도록 설정이 되어 있기 때문에 `@keating/a-module` 은 `npm.pkg.github.com` 에 등록되어 있지 않아 오류가 발생한다.

특정 모듈 별로 모듈 저장소를 설정할 수 있으면 좋겠다는 생각이 들었지만 그렇게까지 세밀한 설정은 아직 지원되지 않는 것 같다.

필자가 찾은 해결방법은 Github action 을 이용해 **`@keating/a-module` 을 배포할 때  `npm.pkg.github.com` 와 `registry.npmjs.org` 양쪽 모두로 배포를 하는 것이다. (나름 최선인 것 같고 만족스러움)**

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

이렇게 하면 해당 모듈의 같은 버젼을 `registry.npmjs.org` 에서도 `npm.pkg.github.com` 동일하게 찾을 수 있기 때문에 어떤 프로젝트에서든 사용이 가능해 진다. 🙂
