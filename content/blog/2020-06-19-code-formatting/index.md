---
layout: post
title: '자동 코드 포매팅'
date: 2020-06-19 00:10
tags: [standard]
description:
draft: false
---

프로젝트 코드의 포매팅 스타일을 일관되게 유지하면 코드 가독성을 높이는데 크게 도움이 된다.

자동 포매팅 도구들은 여러가지가 있다. eslint, prettier, [standard](https://standardjs.com/) 등 각 모둘들의 성격이 조금씩은 다르지만 이루고자 하는 목표는 동일하다. **규격화된 코딩스타일을 유지하는 것!**

eslint, prettier 등의 디테일한 설정이 귀찮다면 standard 를 이용할 수 있다. standard 는 자바스크립트의 표준화된 코드 스타일을 주장한다. 그래서 특별한 설정없이 제공하는 표준규격을 프로젝트에 바로 적용할 수 있다는 것이 가장 큰 장점이다.

간단하게 사용방법을 공유한다.

### 설치

```
yarn add -D standard
```

### 규격 검사

```
standard
```

### 자동 포매팅 수행

```
standard --fix
```

<br>

## [typescript 를 사용한다면](https://standardjs.com/#can-i-use-a-javascript-language-variant-like-flow-or-typescript)

### 설치

```
yarn add -D standardx @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 검사

```
standardx --parser @typescript-eslint/parser --plugin @typescript-eslint/eslint-plugin **/*.ts
```

<br>
<br>

> Note)
>
> 1. 웹스톰의 경우 standard 를 설치하면 IDE가 자동으로 해당 모듈을 인식하고 해당 프로젝트의 포매팅 설정을 standard 로 설정해 준다
> 1. React 프로젝트의 jsx 인식을 위해서는 별도 설정이 필요한 것 같다(리액트 프로젝트라면 그냥 prettier 사용을 권장한다)
