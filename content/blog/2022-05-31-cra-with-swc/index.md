---
layout: post
title: '리액트 프로젝트에 SWC 적용하기'
date: 2022-05-31 00:01
tags: [swc, cra, react]
description:
draft: false
---

리액트 프로젝트에 SWC 를 적용하며 경험한 삽질을 공유한다.


## Background
지난 FEConf2021 에서 강동윤님의 발표를 통해서 SWC 에 대하여 처음 알게 되었다. https://min9nim.vercel.app/2021-11-01-feconf-2021-review/

swc 란 자바스크립트 컴파일러다. 기존에 Babel 이 하던 일의 대체제이다. 그런데 왜 swc 가 필요하냐? 바로 Babel 은 노드로 작성되었는데 CPU 자원을 많이 소모하는 컴파일과 같은 작업에서는 사실 노드를 사용하는 것이 적절하진 않기 때문이다. 반면에 swc 는 Rust 로 작성되어 있어서 컴파일러와 같은 녀석을 만들기에 적합하다. 여기서 더 적합하다고 판단하는 기준은 속도이다. 요즘 대다수의 프론트 개발에서 Babel 을 사용하고 있는데, 이렇게 무게감 있는 모듈과 작업을 왜 굳이 Node 기반으로 사용할까? 이 부분에 대한 의문에서부터 시작된 프로젝트라 할 수 있다. (비슷한 프로젝트로서 rome 도 있다. https://rome.tools )

아무튼, 나도 웹 빌드 시간이 너무 느리다는 지점에 크게 동의하고 있던 터라.. 빨라질 수 있다기에 (일반적으로 20배 이상) swc 를 사용해보고 싶었다.

Nextjs 로 유명한 Vercel 에서도 swc 프로젝트에 크게 공감을 했었는 지 swc 프로젝트의 오너?였던 강동윤님을 모셔갔고 작년에 Nextjs 새 버젼에 swc 를 기본 엔진으로 탑재시켰다. 실제로 사용해 보진 않았지만. 기회가 된다면 swc 때문에라도 Nextjs 를 꼭 힌번 사용해 보고 싶었다. 그러다 가만 생각을 해보니, 꼭 Nextjs 아니더라도 기본 CRA 프로젝트에 swc 를 적용할 수 있는 방법이 있지 않을까 해서 찾아 보았고 아래 포스트를 만났다.

https://jwchang0206.medium.com/make-create-react-app-faster-with-rust-6c75ffa8fdfd

위 글에서는 craco-swc 를 이용해서 손쉽게 CRA 프로젝트에 swc 를 사용하는 방법을 소개 하고 있다. 그래서 위 제시된 방법대로 craco 를 세팅하고.. (이걸 하느라 CRA 와 react 버젼까지 강제 업그레이드 되었다!) craco-swc 를 적용해 보았는데.. 빌드까지는 잘 되었지만 런타임에 `React is not defined` 오류가 발생했다.

짜증이 확 나서 이쯤에서 포기할까 하다가, 조금 더 관련 자료를 찾아보고 craco-swc 코드도 뒤져 보다가 다음과 같이 세팅을 해서 swc 적용에 성공하였다.

## swc 설치 방법
1. craco 설치 및 세팅
```
yarn add -D @craco/craco
```
craco 세팅방법은 craco 매뉴얼 참고. https://www.npmjs.com/package/@craco/craco

<br/>

2. swc 설치 
```
yarn add -D @swc/core @swc/helpers swc-loader
```

<br/>

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

_위 swcPlugin.js 코드는 [craco-swc 의 소스코드](https://github.com/pradel/create-react-app-swc/blob/main/packages/craco-swc/src/index.js)를 일부 수정한 것이다. 사실 craco-swc 는 위와 같은 설정들을 추상화시켜 놓은 것에 불과하다._

_보다 자세한 swc 설정은 해당 문서 참고. https://swc.rs/docs/configuration/compilation_

<br/>

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

위와 같이 설정하니 제대로 동작이 되었다!
그런데 뭔가 빌드속도가 기대했던 것 만큼(20배 이상!) 빨라지진 않았다. 그래도 기존대비 50% 정도는 줄어든 것 같다!

<br/>

## SWC 적용 결과

AWS Amplify 환경에서 빌드 소요시간이 기존 114s 에서 59s 로 줄어듬.


swc 적용 전)
```{71}
2022-05-30T02:38:11.794Z [INFO]: $ CI=false craco build
2022-05-30T02:38:13.180Z [INFO]: Creating an optimized production build...
2022-05-30T02:40:05.568Z [INFO]: Compiled with warnings.
2022-05-30T02:40:05.572Z [INFO]: Module not found: Error: Can't resolve './mock-data.local' in '/codebuild/output/src620371399/src/aurora-web/src/api'
                                 src/views/basic/channels/MediaTitleSection.tsx
                                 Line 16:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
                                 src/views/basic/extract/ExtractData/Methods.tsx
                                 Line 6:13:  'methods' is assigned a value but never used  no-unused-vars
                                 Line 6:13:  'methods' is assigned a value but never used  @typescript-eslint/no-unused-vars
                                 Line 6:22:  'set' is assigned a value but never used      no-unused-vars
                                 Line 6:22:  'set' is assigned a value but never used      @typescript-eslint/no-unused-vars
                                 src/views/basic/extract/ExtractStatus.tsx
                                 Line 18:9:  Expected { after 'if' condition  curly
                                 src/views/basic/settings/manage-member/DialogAllowRequest.tsx
                                 Line 7:8:  'NoticeIcon' is defined but never used  no-unused-vars
                                 Line 7:8:  'NoticeIcon' is defined but never used  @typescript-eslint/no-unused-vars
                                 Search for the keywords to learn more about each warning.
                                 To ignore, add // eslint-disable-next-line to the line before.
                                 File sizes after gzip:
2022-05-30T02:40:05.686Z [INFO]: 366.93 kB  build/static/js/main.60541054.js
                                 130.82 kB  build/static/js/735.db0611e8.chunk.js
2022-05-30T02:40:05.686Z [INFO]: 33.62 kB   build/static/js/44.6c567a22.chunk.js
                                 32.44 kB   build/static/js/17.ce93d508.chunk.js
                                 9.9 kB     build/static/js/834.71a00f40.chunk.js
                                 9.44 kB    build/static/js/343.269029be.chunk.js
                                 9.34 kB    build/static/js/87.a03e4915.chunk.js
                                 7.12 kB    build/static/js/249.f36068a1.chunk.js
                                 5.9 kB     build/static/js/22.f4b30e83.chunk.js
                                 5.41 kB    build/static/js/294.22630186.chunk.js
                                 5.03 kB    build/static/js/234.a17188e9.chunk.js
                                 4.74 kB    build/static/js/502.8c4c681f.chunk.js
                                 4.36 kB    build/static/js/792.953245fb.chunk.js
                                 4.34 kB    build/static/js/437.0423cb6e.chunk.js
                                 4.24 kB    build/static/js/728.5cf0ee71.chunk.js
                                 3.87 kB    build/static/js/244.be8b7ac9.chunk.js
                                 3.75 kB    build/static/js/523.c74a6b17.chunk.js
                                 3.74 kB    build/static/js/313.4fed6df2.chunk.js
                                 3.58 kB    build/static/js/131.ca7cc402.chunk.js
                                 3.55 kB    build/static/js/477.31912c72.chunk.js
                                 3.45 kB    build/static/js/165.211fa9bb.chunk.js
                                 3.2 kB     build/static/js/171.82b62e6c.chunk.js
                                 2.98 kB    build/static/css/44.54bb5762.chunk.css
2022-05-30T02:40:05.686Z [INFO]: 2.85 kB    build/static/js/170.8ee6c5a2.chunk.js
                                 2.68 kB    build/static/js/469.2d7ebb8e.chunk.js
                                 2.59 kB    build/static/js/667.7b45dc3f.chunk.js
                                 2.43 kB    build/static/js/966.4e58be79.chunk.js
                                 2.33 kB    build/static/js/867.54f256c2.chunk.js
                                 2.06 kB    build/static/js/664.08ef7faf.chunk.js
                                 2.01 kB    build/static/js/182.fa2cb8ed.chunk.js
                                 2.01 kB    build/static/js/319.65ef87a6.chunk.js
                                 1.91 kB    build/static/js/592.48207e9d.chunk.js
                                 1.8 kB     build/static/js/720.3d2710b5.chunk.js
                                 1.78 kB    build/static/js/787.88e3aee4.chunk.js
                                 1.66 kB    build/static/js/517.7b84126e.chunk.js
                                 1.41 kB    build/static/js/584.c1494bb2.chunk.js
                                 1.33 kB    build/static/js/74.fae9951c.chunk.js
                                 1.23 kB    build/static/css/main.8ae4e198.css
                                 1.22 kB    build/static/js/80.d5082c1a.chunk.js
                                 509 B      build/static/js/773.22552805.chunk.js
                                 308 B      build/static/js/683.2c3de2c4.chunk.js
2022-05-30T02:40:05.686Z [INFO]: 304 B      build/static/js/581.ff1bd043.chunk.js
                                 303 B      build/static/js/809.7651cc27.chunk.js
2022-05-30T02:40:05.687Z [INFO]: The project was built assuming it is hosted at /.
                                 You can control this with the homepage field in your package.json.
                                 The build folder is ready to be deployed.
                                 You may serve it with a static server:
                                 yarn global add serve
                                 serve -s build
                                 Find out more about deployment here:
                                 https://cra.link/deployment
2022-05-30T02:40:05.817Z [INFO]: Done in 114.06s.
```



swc 적용 후)
```{77}
2022-06-02T09:26:55.423Z [INFO]: $ CI=false craco build
2022-06-02T09:26:56.775Z [INFO]: Creating an optimized production build...
2022-06-02T09:27:54.841Z [INFO]: Compiled with warnings.
2022-06-02T09:27:54.846Z [INFO]: src/routes/MainRoutes.tsx
                                 Line 222:7:  'routesByPathList' is assigned a value but never used  no-unused-vars
                                 Line 222:7:  'routesByPathList' is assigned a value but never used  @typescript-eslint/no-unused-vars
                                 src/views/basic/channels/MediaTitleSection.tsx
                                 Line 16:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
                                 src/views/basic/extract/ExtractData/Methods.tsx
                                 Line 38:22:  'set' is assigned a value but never used  no-unused-vars
                                 Line 38:22:  'set' is assigned a value but never used  @typescript-eslint/no-unused-vars
                                 src/views/basic/extract/ExtractData/SelectMethod.tsx
                                 Line 7:26:  'propEq' is defined but never used  no-unused-vars
                                 Line 7:26:  'propEq' is defined but never used  @typescript-eslint/no-unused-vars
                                 src/views/basic/extract/ExtractStatus.tsx
                                 Line 18:9:  Expected { after 'if' condition  curly
                                 src/views/basic/settings/manage-member/DialogAllowRequest.tsx
                                 Line 7:8:  'NoticeIcon' is defined but never used  no-unused-vars
                                 Line 7:8:  'NoticeIcon' is defined but never used  @typescript-eslint/no-unused-vars
                                 Search for the keywords to learn more about each warning.
                                 To ignore, add // eslint-disable-next-line to the line before.
                                 File sizes after gzip:
2022-06-02T09:27:54.968Z [INFO]: 360.41 kB  build/static/js/main.473cfe57.js
                                 130.77 kB  build/static/js/725.b9efa704.chunk.js
                                 33.63 kB   build/static/js/687.63a2d6a0.chunk.js
2022-06-02T09:27:54.968Z [INFO]: 29.35 kB   build/static/js/91.85086a9b.chunk.js
                                 11.02 kB   build/static/js/482.65711103.chunk.js
                                 9.13 kB    build/static/js/293.981cb83c.chunk.js
                                 8.54 kB    build/static/js/846.4bc26085.chunk.js
                                 5.43 kB    build/static/js/641.ec7669e9.chunk.js
                                 5.13 kB    build/static/js/145.255bb907.chunk.js
                                 4.83 kB    build/static/js/664.a2075eb2.chunk.js
                                 4.48 kB    build/static/js/307.637bd275.chunk.js
                                 4.26 kB    build/static/js/10.dd7d2c34.chunk.js
                                 4.14 kB    build/static/js/715.7f3c8bc5.chunk.js
                                 4.1 kB     build/static/js/175.aa467066.chunk.js
                                 3.77 kB    build/static/js/243.00df0cb1.chunk.js
                                 3.48 kB    build/static/js/400.c0959118.chunk.js
                                 3.48 kB    build/static/js/597.330a5a81.chunk.js
                                 3.46 kB    build/static/js/552.0e839635.chunk.js
                                 3.45 kB    build/static/js/861.15e8097b.chunk.js
                                 3.23 kB    build/static/js/154.ffc2599f.chunk.js
                                 3.1 kB     build/static/js/241.9ff8ae86.chunk.js
                                 2.98 kB    build/static/css/687.5f1a8b0c.chunk.css
                                 2.77 kB    build/static/js/941.5c8fd99a.chunk.js
                                 2.6 kB     build/static/js/759.adf4f0b1.chunk.js
                                 2.56 kB    build/static/js/389.1b7c997f.chunk.js
                                 2.38 kB    build/static/js/944.1c1c4844.chunk.js
                                 2.35 kB    build/static/js/339.aad914f3.chunk.js
                                 2.33 kB    build/static/js/180.772f40ff.chunk.js
                                 2.32 kB    build/static/js/345.0f05bfdb.chunk.js
                                 2.22 kB    build/static/js/435.5b0f49f5.chunk.js
                                 2.07 kB    build/static/js/694.aa920cb3.chunk.js
                                 2.06 kB    build/static/js/182.15eed613.chunk.js
                                 2.04 kB    build/static/js/891.659e25da.chunk.js
2022-06-02T09:27:54.969Z [INFO]: 2.02 kB    build/static/js/313.68b0a254.chunk.js
                                 1.87 kB    build/static/js/242.70fbec6a.chunk.js
                                 1.78 kB    build/static/js/791.20392bd0.chunk.js
                                 1.7 kB     build/static/js/945.73b44d1d.chunk.js
                                 1.49 kB    build/static/js/700.e59b34b2.chunk.js
                                 1.3 kB     build/static/js/379.7add2a32.chunk.js
                                 1.29 kB    build/static/js/176.81af69fd.chunk.js
                                 1.28 kB    build/static/js/790.5402e8fd.chunk.js
                                 1.23 kB    build/static/css/main.8ae4e198.css
                                 759 B      build/static/js/500.d141322f.chunk.js
                                 309 B      build/static/js/754.01824e8a.chunk.js
                                 304 B      build/static/js/483.1f79a3ae.chunk.js
                                 303 B      build/static/js/288.55e0fd15.chunk.js
2022-06-02T09:27:54.973Z [INFO]: The project was built assuming it is hosted at /.
2022-06-02T09:27:54.973Z [INFO]: You can control this with the homepage field in your package.json.
                                 The build folder is ready to be deployed.
                                 You may serve it with a static server:
                                 yarn global add serve
                                 serve -s build
                                 Find out more about deployment here:
                                 https://cra.link/deployment
2022-06-02T09:27:55.075Z [INFO]: Done in 59.69s.
```
