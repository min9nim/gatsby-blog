---
layout: post
title: '리액트 프로젝트에서 빌드타임에 환경변수 검증하기'
date: 2022-06-15 00:01
tags: [dotenv-validator, env, react, cra]
description: CRA 프로젝트의 환경변수는 `.env`, `.env.production`, `.env.development` 등의 파일로 정의할 수 있다. 환경변수의 개수가 적지 않을 때는 문제가 없겠지만 보통 애플리케이션의 규모가 커짐에 따라 환경변수의 개수도 함께 증가하게 된다.
draft: false
---

[CRA 프로젝트의 환경변수는](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) `.env`, `.env.production`, `.env.development` 등의 파일로 정의할 수 있다. 환경변수의 개수가 적지 않을 때는 문제가 없겠지만 보통 애플리케이션의 규모가 커짐에 따라 환경변수의 개수도 함께 증가하게 된다.

관리하는 환경변수가 10개 이상 정도 되다 보면, 특별히 특정 환경변수의 누락이나 잘못된 값으로 애플리케이션이 오동작하는 경우가 있을 수 있다. 이러한 경우를 대비하여 빌드타임에 환경변수들을 사전 검증하여 설정된 환경변수가 유효하지 않을 경우 빌드타임 부터 오류를 뱉어버리면 불필요한 오류 대응으로 인한 시간을 아낄 수 있다.

이번 글에서는 간단히 CRA 프로젝트에서 빌드타임에 [dotenv-validator](https://www.npmjs.com/package/dotenv-validator) 를 이용해 환경변수의 유효여부를 검증하는 방법을 공유한다.

<br/>

## 1. dotenv-validator 설치
런타임에 필요한 모듈은 아니기 때문에 -D 옵션으로 설치한다.

```
yarn add -D dotenv-validator
```

<br/>

## 2. validate-env.js

아래와 같이 환경변수 별 필수여부 및 유효성 체크 함수를 정의한다.

```js{11-19}
const dotenv = require('dotenv')  // dotenv 는 CRA 에 기본으로 포함되어 있기 때문에 추가 설치없이 바로 사용 가능
const validate = require('dotenv-validator').default

module.exports = function validateEnv(env){
    const envDefault = dotenv.config({ path: '.env' }).parsed
    const envParsed = {
        ...dotenv.config({ path: `.env.${env}` }).parsed,
        ...dotenv.config({ path: '.env.development.local' }).parsed,
    }

    const envRules = {
        REACT_APP_MOCK_DATA_PATH: {
            required: true,
        },
        REACT_APP_API_SERVER_URL: {
            required: true,
            validator: value => /^http(s?):\/\/.*\.[a-z]{2}/.test(value),
        },
    }

    // set env variables
    process.env = {...process.env, ...envDefault, ...envParsed }

    // validate process.env
    validate({
        envDefault,
        envParsed,
        envRules,
    })
}
```

<br/>

## 3. Invoke `validateEnv` before build
필자가 관리하는 프로젝트의 경우는 [CRACO](https://www.npmjs.com/package/@craco/craco) 를 사용하고 있어서, craco.config.js 내에서 환경변수 검증이 필수로 이루어지도록 세팅하였다.

```js{4}
const validateEnv = require('./validate-env')

module.exports = function ({ env }) {
    validateEnv(env)
    return {}
}
```

<br/>


여기까지 하면 설정 끝,

만약 위 설정에서 환경변수 `REACT_APP_API_SERVER_URL` 가 아래와 같이 유효하지 않다면, 
```{1}
REACT_APP_API_SERVER_URL = https://blabla
REACT_APP_MOCK_DATA_PATH = api/mock-data
```


`validateEnv` 함수가 실행될 때, 아래와 같이 빌드 전 오류를 뱉는다.

```{7}
yarn run v1.22.18
$ craco start
/Users/project/test/node_modules/dotenv-validator/dist/index.js:43
                throw Error("'" + key + "' is not valid in .env");
                      ^

Error: 'REACT_APP_API_SERVER_URL' is not valid in .env
    at /Users/project/test/node_modules/dotenv-validator/dist/index.js:43:23
    at Array.forEach (<anonymous>)
    at validate (/Users/project/test/node_modules/dotenv-validator/dist/index.js:30:29)
    at module.exports (/Users/project/test/validate-env.js:38:5)
    at Object.module.exports [as config] (/Users/project/test/craco.config.js:8:5)
    at getConfigAsObject (/Users/project/test/node_modules/@craco/craco/lib/config.js:97:63)
    at loadCracoConfigAsync (/Users/project/test/node_modules/@craco/craco/lib/config.js:119:34)
    at Object.<anonymous> (/Users/project/test/node_modules/@craco/craco/scripts/start.js:22:1)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

Process finished with exit code 1
```
