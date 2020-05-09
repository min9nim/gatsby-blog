---
layout: post
title: '[js] optional-chaining 사용설정 방법'
date: 2019-01-31 00:10
categories: vanillaJS
tags: [js]
---

#### 설치

```
npm install --save-dev @babel/plugin-proposal-optional-chaining
```

<br>

#### .babelrc 에 아래 설정 추가

```
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

<br>

#### vscode 에서 문법오류

optional-chaining 사용 설정을 완료하고 VSCODE에서 해당 문법을 사용하려고 하면 문법오류라고 지적을 해준다.

![](/images/syntax-error.png)

물론 현단계에서 optional-chaining 이 문법오류가 맞기는 하지만 해당 문법만 유효성체크에서 제외하는 설정은 찾을 수가 없었다.
극단적인 방법이지만 아래와 같이 JavaScript 유효성검사 기능 자체를 꺼버리는 것이 효과가 있었다.

![](/images/js-validate.png)

<br>

#### Ref.

- [optional chaining 이란](https://dev-momo.tistory.com/entry/Javascript-Optional-Chaining)
- [설정방법](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [vscode 문법오류](https://github.com/Microsoft/vscode-eslint/issues/535)
