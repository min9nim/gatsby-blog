---
layout: post
title: '[react] CRA앱 런타임에 마지막 커밋 정보 표시'
date: 2020-11-11 00:10
tags: [react, commit, craco, child_process]
description: CRA 앱 런타임에서 해당 앱의 정확한 버젼을 확인하여 비교해 보아야할 필요가 있었다. 간단하게 현재 런타임의 커밋정보를 로그상에 표시하려면 어떻게 해야할까. 런타임 중에 동적으로 커밋버젼을 확인하는 것은 불가능하므로 웹팩 컴파일타임을 커밋정보를 확인하고 이를 환경변수로 전달하는 방법이면 가능하다.

draft: false
---

CRA 앱 런타임에서 해당 앱의 정확한 버젼을 확인하여 비교해 보아야할 필요가 있을 수 았다.
 
간단하게 현재 런타임의 커밋정보를 로그상에 표시하려면 어떻게 해야할까. 런타임 중에 동적으로 커밋버젼을 확인하는 것은 불가능하므로 웹팩 컴파일 타임에 커밋정보를 확인하고 이를 환경변수로 전달하는 방법이면 가능하다.

아래와 같은 컨셉을 꼭 기억하자

1. 컴파일 타임에 얻을 수 있는 어떤 값을 런타임으로 전달하고자 할때는 환경변수(`process.env`) 를 이용해야 한다.
1. `process.env` 에 추가적인 정보를 세팅하기 위해서는 `webpack.DefinePlugin` 을 이용해야 한다.
1. CRA 프로젝트에서 `eject` 없이 웹팩 설정을 수정하려면 [craco](https://www.npmjs.com/package/@craco/craco) 또는 [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) 모듈을 이용할 수 있다
1. 현재 커밋에 대한 정보는 `git` 명령어를 이용해 얻을 수 있다.
1. 웹팩 컴파일타임에 `git` 명령어를 동적으로 수행하고 결과를 얻기 위해서는 `child_process` 모듈을 이용한다.

### 구현 방법  

커밋 정보를 리턴하는 함수 모듈 구현 commit-info.js
```js
const childProcess = require('child_process')

const [commitHash, commitDate] = childProcess
  .execSync(
    `git rev-parse --short HEAD && git --no-pager log -1 --date=format:"%Y/%m/%d %T" --format="%ad"`,
  )
  .toString()
  .trim()
  .split('\n')

module.exports = {
  commitHash,
  commitDate,
}
```

craco 를 사용중이라면 craco.config.js 에 아래와 같이 설정을 추가한다.

```js{12-18}
const webpack = require('webpack')
const {commitHash, commitDate} = require('./commit-info')

module.exports = function ({ env }) {
  return {
    eslint: {
      // blabla~
    },
    plugins: [
      // blabla~
    ],
    webpack: {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.COMMITHASHDATE": JSON.stringify(commitHash + ' - ' + commitDate),
        }),
      ],
    },
  }
}
```

App.js 에서 아래와 같이 접근할 수 있다
```js
export default function App(){
  return (
    <div>{process.env.COMMITHASHDATE}</div>
  )
}
```

### Ref.
- https://stackoverflow.com/questions/9483757/how-to-exit-git-log-or-git-diff
- https://github.com/gsoft-inc/craco/issues/55

