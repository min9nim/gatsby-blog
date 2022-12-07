---
layout: post
title: 'yarn berry 사용 설정 롤백 방법'
date: 2022-12-07 00:01
tags: [yarn, berry]
description: yarn berry 전역 설정을 변경하려면 ~/.yarnrc.yml 파일에서 yarnPath 설정 부분의 라인을 제거한다
draft: false
---

yarn berry 를 사용하려면 아래와 같이 사용설정이 필요하다.

```js
yarn
set
version
berry
```

하지만,
위 명령은 yarn 의 전역 설정을 바꾸기 때문에,
기존 yarn 버젼을 사용하던 레포들에서는 이후 yarn 관련 명령 수행시 오류가 발생하게 된다.

yarn berry 전역 설정을 변경하려면 `~/.yarnrc.yml` 파일에서 `yarnPath` 설정 부분의 라인을 제거한다

```
➜  xxx-repo git:(develop) cat ~/.yarnrc.yml
nodeLinker: node-modules

yarnPath: .yarn/releases/yarn-3.3.0.cjs
```

yarnPath 설정을 제거하여 아래와 같이 yarn 설정파일을 변경한다!

```
➜  xxx-repo git:(develop) cat ~/.yarnrc.yml
nodeLinker: node-modules

➜  xpert-monorepo git:(develop)
```

Ref)
https://stackoverflow.com/questions/63797527/how-do-i-downgrade-from-yarn2-to-yarn1
