---
layout: post
title: '리액트 디자인시스템 시작하기'
date: 2021-06-04 00:10
tags: [react, design-system, creat-react-library, docz]
description: 팀 단위로 화면을 개발하는 프로젝트를 진행을 할 경우, 통일감 있는 디자인을 만들기 위해 디자인 표준은 꼭 필요한 요소이다. 이를 보통 디자인시스템이라고 하는데, 디자인시스템을 준비하고 갖추어 가는 과정은 힘들고 고되지만 UI의 품질을 높이고 개발생산성을 위해 더 이상 늦출 일이 아닐 것이다. 이 글에서는 디자인시스템을 새롭게 시작하고자 할 경우 해당 보일러플레이트 프로젝트를 구성하는 방법을 간단히 소개한다.
draft: false
---

팀 단위로 화면을 개발하는 프로젝트를 진행을 할 경우, 통일감 있는 디자인을 만들기 위해 디자인 표준은 꼭 필요한 요소이다. 이를 보통 디자인시스템이라고 하는데, 디자인시스템을 준비하고 갖추어 가는 과정은 힘들고 고되지만 UI의 품질을 높이고 개발생산성을 높이기 원한다면 하루 빨리 디자인시스템 개발을 시작하길 바란다.

이 글에서는 디자인시스템을 새롭게 시작하고자 할 경우 해당 보일러플레이트 프로젝트를 구성하는 간단한 방법을 안내한다.

<br/>

### 디자인시스템 프로젝트의 요건
디자인시스템 프로젝트가 갖추어야할 기본 요건들은 아래와 같다

1. npm 패키지 빌드 설정
    - 디자인시스템을 UI프로젝트의 하위 프로젝트로 구성(모노레포)하는 방법도 가능하겠지만, 크로스 프로젝트에서 활용도를 높이기 위해서 별도 프로젝트로 구성하고 npm 패키지로서 디자인시스템을 설치하여 사용하기를 권장한다.
1. 컴포넌트 개발 및 테스틀 위한 테스트 환경
    - 개발 중인 컴포넌트를 프로젝트 내에서 테스트할 수 있는 환경이 제공되어야 한다
1. 내용 공유를 위한 문서 개발 및 공유 기능
    - 개발된 디자인시스템은 여러 개발자들 간에 문서로서 쉽게 공유될 수 있어야 한다.


### 프로젝트 구성 방법

리액트 컴포넌트를 npm 패키지로 빌드하는 프로젝트 구성은 사실 따로 표준이라고 정해진 바가 없다. 서울에서 부산 가는 방법이 너무나 많고 다양한 것과 같다. 하지만 처음 부산으로 가고자 하는 여행자에게는 여러가지 길 중 하나를 고민하고 결정하는 일이 큰 부담이 될 수 있다. 이 글에서는 가장 쉽고 빠르게 목적지에 도착하는 방법으로서 [create-react-library](https://www.npmjs.com/package/create-react-library) 과 [docz](https://www.docz.site/) 를 이용한 방법을 소개하고자 한다.

create-react-library(이하 CRL) 는 앞서 디자인시스템 프로젝트 요건으로 제시되었던 1,2 번을 docz 는 3번 요건을 해결하는데 최적화된 npm 모듈이다. 이 글에서는 2가지 모듈을 조합하여 디자인시스템 프로젝트를 구성하는 방법을 간단히 공유한다.


#### 1. 프로젝트 생성

아래 명령을 통해 간단히 CRL 프로젝트를 생성할 수 있다. 질문에 따라 프로젝트의 기본 정보들을 입력한 후 잠시 기다리면 프로젝트가 자동으로 생성된다.
```
npx create-react-library
```

예시)
```

➜  ~ npx create-react-library
npx: 150개의 패키지를 12.789초만에 설치했습니다.
? Package Name my-design-system
? Package Description react design system
? Author's GitHub Handle keating
? GitHub Repo Path keating/my-design-system
? License MIT
? Package Manager yarn
? Template typescript
⠋ Copying typescript template to /Users/mac9/my-design-system

== 중략 ==

✔ Running yarn install in root directory
✔ Running yarn install in example directory
✔ Initializing git repo


Your module has been created at /Users/mac9/my-design-system.

To get started, in one tab, run:
$ cd my-design-system && yarn start

And in another tab, run the create-react-app dev server:
$ cd my-design-system/example && yarn start

➜  ~
```

이렇게 프로젝트를 생성하면 간단하게 위 요건 1,2 를 충족한다. 



#### 2. docz 문서도구 설치
docz 문서도구는 앞서 생성한 프로젝트에 하위 프로젝트로 설치를 진행한다.

위에서 생성한 프로젝트의 루트 경로에서 아래 명령을 실행한다.

```
yarn create docz-app docz
```

타입스크립트를 사용하고자 한다면 `--example typescript` 옵션을 추가한다.

```
yarn create docz-app docz --example typescript
```


#### 3. css 모듈 설정
CRL 는 기본적으로 [css 모듈 스콥을 사용하도록 설정](https://www.npmjs.com/package/microbundle-crl#using-css-modules)되어 있다. 하지만 디자인시스템의 특성 상 css 모듈 스콥을 이용하면 외부에서 스타일을 커스터마이징하기가 어려워지므로 css 모듈 설정은 off 하길 추천한다

해당 설정을 오프하려면 CRL 프로젝트 package.json 파일에서 빌드 명령에 `--css-modules false` 옵션을 추가한다.

```json
{
  "scripts": {
    "build": "microbundle-crl --css-modules false --no-compress --format modern,cjs",
    "start": "microbundle-crl watch --css-modules false --no-compress --format modern,cjs"
  }
}
```


#### 4. docz 에서 부모프로젝트의 컴포넌트 연결
docz 프로젝트가 부모프로젝트(CRL)의 빌드된 패키지를 바라보도록 docz 프로젝트의 package.json 을 아래와 같이 설정한다.

```json{6}
{
  "dependencies": {
    "@emotion/react": "^11.1.1",
    "@emotion/styled": "^11.0.0",
    "docz": "latest",
    "thispackage": "link:..",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
}
```

위와 같이 설정을 완료하면, docz 의 mdx 문서에서는 아래와 같이 직접 부모프로젝트(CRL)의 컴포넌트를 참조할 수 있다.

```markdown{7}
---
name: Button
menu: Components
---

import { Playground, Props } from 'docz'
import { Button } from 'thispackage'

# Button

## Properties

<Props of={Button} />

## Basic usage

<Playground>
  <Button >hello world</Button>
</Playground>
```


<br/>

### 명령어 활용
디자인시스템 개발시에는 먼저 부모 프로젝트(CRL)에서 빌드 명령어를 watch 모드로 백그라운드로 실행한다. 그러면 변경사항이 발생할 때마다 변경 내역이 개발서버에 즉각 반영된다.
```
yarn start
```

컴포넌트 테스트를 위해 example 프로젝트에서 개발서버를 실행한다
```
cd example
yarn start
```

문서개발을 위해 docz 프로젝트에서도 개발서버를 실행한다.
```
cd docz
yarn docz:dev
```

필자는 기억하기 쉽도록 docz 의 개발서버 시작 명령어도 위 2가지 프로젝트와 동일하게 `yarn start` 로 변경하여 사용 중이다. 또는 셀스크립트를 이용하여 위 3가지 명령을 한번에 실행시킬 수 있도록 하면 더욱 편리할 수 있겠다. 🙂


