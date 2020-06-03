---
layout: post
title: '[CRA] create-react-app 프로젝트에 module-alias 적용하기'
date: 2020-04-21 00:10
categories: create-react-app
tags: [js, react, create-react-app, module-alias]
---

프로젝트의 폴더 구조를 개선해 나가다 보면 폴더 구조의 depth 가 깊어짐에 따라 `import xxx from '../../../../utils'` 와 같이 보기 싫은 코드가 만들어 질 수 있다.

프로젝트/src 폴더 기준으로 간단하게 `import xxx from '@/utils'` 와 같이 접근하여 사용할 수 있으면 참 좋겠다는 바램이 생긴다. (그리고 [module-alias](https://www.npmjs.com/package/module-alias) 모듈이 바로 우리의 바램을 만족시킨다)

특별히 [CRA](https://create-react-app.dev/)로 생성한 프로젝트에 module-alias 를 이용해 path 별칭을 세팅하는 방법을 공유한다.

현재(20년 6월) [모듈 사용시 path에 별칭을 부여하는 기능](https://github.com/facebook/create-react-app/issues/5645)이 CRA 4.0 의 마일스톤으로 등록되어 있는 중이다. 하지만 그 전에 별칭사용이 꼭 필요하다면 `yarn eject` 가 필요하다. (eject 없이 CRA의 설정을 오버라이드 하는 꼼수가 없는 것은 아니지만 굳이 그렇게 까지 할꺼면 그냥 eject 하는 것이 낫지 않겠나 싶다)

<br>

### CRA 앱 추출

(뭔가 세부적인 커스터마이징을 하려면 먼저 이렇게 해야함)

```
yarn eject
```

<br>

### module-alias 설치

(웹팩 빌드타임에만 사용될 것이므로 -D 로 설치)

```
yarn add -D module-alias
```

<br>

### package.json 루트 위치에 별칭 정의

```json
...
  "_moduleAliases": {
    "@": "src"
  }
...
```

<br>

### webpack.config.js 에 매핑 정보를 등록

웹팩에서 package.json 에 정의된 매핑 정보를 사용할 수 있도록 또 등록해 줘야 한다

config/webpack.config.js 에 별칭 매핑 정보(`appPackageJson._moduleAliases`)를 등록

```js
...
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
        ...(appPackageJson._moduleAliases || {}),
      },
...
```

`appPackageJson` 변수는 위쪽에 보면 `const appPackageJson = require(paths.appPackageJson)` 와 같이 package.json 파일 내용이 담겨 있음을 확인할 수 있다

<br>

### /scripts/start.js, build.js 에 module-alias 모듈 등록

코드 상단에 적절한 곳에 아래 코드를 삽입한다

```js
// set module-alias
require('module-alias/register')
```

<br>

끝~

<br>

### Ref.

https://www.npmjs.com/package/module-alias
