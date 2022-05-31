---
layout: post
title: '리액트 프로젝트에 SWC 적용하기'
date: 2022-05-31 00:01
tags: [husky, macos-updated]
description:
draft: false
---

리액트 프로젝트에 SWC 를 적용하며 경험한 삽질을 공유한다.


## Background
지난 FEConf2021 에서 강동윤님의 발표를 통해서 SWC 에 대하여 처음 알게 되었다. https://min9nim.vercel.app/2021-11-01-feconf-2021-review/

swc 란 자바스크립트 컴파일러다. 기존에 Babel 이 하던 일을 동일하게 해준다. 그런데 왜 swc 가 필요하냐? 바로 Babel 은 노드로 작성되었는데 CPU 자원을 많이 소모하는 컴파일과 같은 작업에서는 사실 노드를 사용하는 것이 적절하진 않기 때문이다. 반면에 swc 는 Rust 로 작성되어 있어서 컴파일러와 같은 녀석을 만들기에 적합하다. 더 적합하다고 판단하는 기준은 속도 때문이다. 요즘 대다수의 프론트 개발에서 Babel 을 사용하고 있는데, 이 부분에 대한 의문에서부터 시작된 프로젝트라 할 수 있다.

아무튼, 나도 웹 빌드 시간이 너무 느리다는 지점에 크게 동의하고 있던 터라.. 빨라질 수 있다기에 (일반적으로 20배 이상) swc 를 사용해보고 싶었다.

Nextjs 로 유명한 Vercel 에서도 swc 프로젝트에 크게 공감을 했었는 지 swc 프로젝트의 오너?였던 강동윤님을 모셔갔고 작년에 Nextjs 새 버젼에 swc 를 기본 엔진으로 탑재시켰다. 실제로 사용해 보진 않았지만. 기회가 된다면 swc 때문에라도 Nextjs 를 꼭 힌번 사용해 보고 싶었다. 그러다 가만 생각을 해보니, 꼭 Nextjs 아니더라도 기본 CRA 프로젝트에 swc 를 적용할 수 있는 방법이 있지 않을까 해서 찾아 보았고 아래 포스트를 만났다.

https://jwchang0206.medium.com/make-create-react-app-faster-with-rust-6c75ffa8fdfd

위 글에서는 craco-swc 를 이용해서 손쉽게 CRA 프로젝트에 swc 를 사용하는 방법을 소개 하고 있다. 그래서 위 제시된 방법대로 craco 를 세팅하고.. (이걸 하느라 CRA 와 react 버젼까지 강제 업그레이드 되었다!) craco-swc 를 적용해 보았는데.. 빌드까지는 잘 되었지만(속도가 빨리졌다고 체감할 수는 없었다)

런타임에 `React is not defined` 오류가 발생했다.

짜증이 확 나서 이쯤에서 포기할까 하다가, 조금 더 관련 자료를 찾아보고 craco-swc 코드를 뒤져 보다가 다음과 같이 세팅을 해서 swc 적용에 성공하였다.

## swc 설치 방법
1. craco 설치 및 세팅
```
yarn add -D @craco/craco
```

2. swc 설치 
```
yarn add -D @swc/core @swc/helpers swc-loader
```


3. swcPlugin.js
```js
const { addAfterLoader, loaderByName, removeLoaders } = require('@craco/craco')

module.exports = {
    plugin: {
        overrideWebpackConfig: ({
            webpackConfig,
            pluginOptions,
            context: { paths },
        }) => {
            addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: paths.appSrc,
                loader: require.resolve('swc-loader'),
                options: pluginOptions,
            })
            removeLoaders(webpackConfig, loaderByName('babel-loader'))

            return webpackConfig
        },
    },
    options: {
        jsc: {
            target: 'es2015',
            externalHelpers: true,
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
            parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: true,
            },
        },
    },
}
```

4. craco.config.js

```js
const swcPlugin = require('./swcPlugin')

module.exports = function ({ env }) {
    return {
        plugins: [
            swcPlugin,
        ],
    }
}
```


위와 같이 설정하니 제대로 동작이 되었다.
그런데 뭔가 빌드속도가 기대했던 것 만큼 빨라지진 않았지만, 기존대비 30~50% 정도는 줄어든 것 같다! 기분 탓인가!?


