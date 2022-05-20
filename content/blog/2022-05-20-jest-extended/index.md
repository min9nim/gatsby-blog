---
layout: post
title: 'A함수가 B함수보다 반드시 먼저 호출되어야 하는 테스트'
date: 2022-05-20 00:01
tags: [jest-extended, react, test]
description: 
draft: false
---

## Background
특정 로직에서 A함수가 B함수보다 반드시 먼저 호출되어야 함을 보장하는 테스트케이스를 작성하고 싶다. 어떻게 작성할 수 있을까

<br/>

## Solution
간단하게는 jest 에서 제공하는 toHaveBeenCalledBefore 함수를 이용할 수 있다. 해당 함수의 사용법은 아래와 같다. 

```js
it('calls mock1 before mock2', () => {
  const mock1 = jest.fn();
  const mock2 = jest.fn();

  mock1();
  mock2();

  expect(mock1).toHaveBeenCalledBefore(mock2);
});
```

<br/>

## Problem
하지만 위 함수는 jest 에서 기본으로 지원하는 기능이 아니다. 해당 기능은 [jest-extended](https://github.com/jest-community/jest-extended#jest-extended) 라는 확장팩을 추가로 설치하여 사용할 수 있다.


<br/>

## How to set jest-extented
jest-extended 를 사용하기 위해서는 jest 27.2.5 이후 버젼이 필요하다. CRA를 사용할 경우에는 최신 CRA (현재 5.0.0) 로 업그레이드해야 한다.


<br/>

### react-scripts 최신 버젼으로 업그레이드
CRA 업그레이드는 단순히 react-scripts 만 버젼업 한다고 해결되지는 않는다. 무식한? 방법으로서 CRA 최신 버젼으로 샘플 프로젝트를 생성한 다음 해당 리소스들을 기존 프로젝트에 적절히 머지하여 기존 프로젝트의 react-scripts 를 업그레이드 할 수 있다.

<br/>

### `jest-extened` 설치 및 설정
```
yarn add -D jest-extended
```

```js
// src/setupTests.js
import * as matchers from 'jest-extended'
expect.extend(matchers)
```

<br/>

### Example
```js{22}
import { login } from 'biz/index'
import { noop } from 'utils/lib'
import { sStorage } from 'utils/s-storage'
import jwt from 'jwt-decode'
import { Auth } from 'api/index'

jest.mock('utils/s-storage')
jest.mock('jwt-decode')
jest.mock('api/index')

describe('login', () => {
    test('api 호출 전에 토큰을 세션스토리지에 저장해 주어야 한다.', async () => {
        jwt.mockReturnValue({ name: 'xx', email: 'xx', profile_img: 'xx' })
        await login({
            accessToken: 'xxx1',
            refreshToken: 'xxx2',
            navigate: noop,
            id_token: 'xxx',
            setUser: noop,
            code: 'xxxx',
        })
        expect(sStorage.set).toHaveBeenCalledBefore(Auth.me)
    })
})
```
