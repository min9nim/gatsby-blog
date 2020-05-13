---
layout: post
title: "사용 중이던 npm 패키지 버젼 업그레이드"
date: 2018-09-06 09:00
categories: nodejs
tags: [nodejs, npm]
---

`npm init` 으로 npm 프로젝트를 생성한 후 처음으로 필요한 npm 패키지를 설치할 때 `npm i -S {패키지명}` 를 사용하면 기본적으로 최신 버젼의 패키지가 설치된다. 하지만 시간이 흘러 사용 중이던 모듈을 최신버젼으로 업그레이드하고자 할 때 `npm i -S {패키지명}` 를 사용하면 _package.json_ 에서 정의된 버젼으로 다시 설치가 될 뿐 최신버젼이 설치되지는 않는다.

<br>

### npm info {패키지명}

최신 버젼으로 업그레이드를 하려면 `npm i -S react@15.6.2` 와 같이 버젼명을 명시적으로 적어주어야 한다. 버젼명을 명시하려면 먼저 해당 패키지의 최신 버젼 확인이 필요한데 이 때는 `npm info {패키지명}` 명령을 사용한다

```bash
$ npm info react

react@16.4.2 | MIT | deps: 4 | versions: 151
React is a JavaScript library for building user interfaces.
https://reactjs.org/

keywords: react

dist
.tarball: https://registry.npmjs.org/react/-/react-16.4.2.tgz
.shasum: 2cd90154e3a9d9dd8da2991149fdca3c260e129f
.integrity: sha512-dMv7YrbxO4y2aqnvA7f/ik9ibeLSHQJTI6TrYAenPSaQ6OXfb+Oti+oJiy8WBxgRzlKatYqtCjphTgDSCEiWFg==
.unpackedSize: 124.3 kB

dependencies:
fbjs: ^0.8.16         loose-envify: ^1.1.0  object-assign: ^4.1.1 prop-types: ^15.6.0

maintainers:
- brianvaughn <briandavidvaughn@gmail.com>
- fb <opensource+npm@fb.com>
- flarnie <flarnie.npm@gmail.com>
- gaearon <dan.abramov@gmail.com>
- sophiebits <npm@sophiebits.com>
- trueadm <dg@domgan.com>

dist-tags:
canary: 16.4.0-alpha.0911da3  latest: 16.4.2                next: 16.4.1

published a month ago by gaearon <dan.abramov@gmail.com>
$
```

특정 패키지를 버젼업하고 나면 모듈간 의존성으로 인해 오류가 발생할 수 있다. 이런 경우 다시 추가 버젼업이 필요한 모듈을 확인하고 마찬가지 과정을 되풀이 하여 문제되는 패키지를 버젼업 해야 한다.

<br>

### npm outdated

`npm outdated` 명령을 이용하면 해당 프로젝트에서 사용하던 npm 패키지의 오래된 버젼을 한 눈에 확인할 수 있다

```bash
$ npm outdated
Package             Current   Wanted  Latest  Location
babel-loader          7.1.5    7.1.5   8.0.2  anony
css-loader          0.28.11  0.28.11   1.0.0  anony
mongoose              5.1.4   5.2.13  5.2.13  anony
node-sass             4.9.0    4.9.3   4.9.3  anony
nodemon              1.17.5   1.18.4  1.18.4  anony
react                15.6.2   15.6.2  16.4.2  anony
react-bootstrap      0.32.1   0.32.3  0.32.3  anony
react-dom            15.6.2   15.6.2  16.4.2  anony
react-hot-loader      3.1.3    3.1.3   4.3.6  anony
sass-loader           7.0.3    7.1.0   7.1.0  anony
shortid               2.2.8   2.2.13  2.2.13  anony
style-loader         0.21.0   0.21.0  0.23.0  anony
webpack              4.16.2   4.17.2  4.17.2  anony
webpack-cli           2.1.5    2.1.5   3.1.0  anony
webpack-dev-server    3.1.5    3.1.7   3.1.7  anony
$
```

위 내용을 참고하여 업그레이드하고자 하는 버젼을 package.json 에 반영하고 `npm install` 을 이용하면 일괄적으로 오래된 패키지 버젼을 업그레이드할 수 있다.

<br>

### Ref.

- <https://docs.npmjs.com/cli/outdated>
- <https://blog.outsider.ne.kr/757>
