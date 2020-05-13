---
layout: post
title: "npm 최신버젼으로 업그레이드"
date: 2018-10-13 00:30
categories: nodejs
tags: [npm]
---

오랜 만에 create-react-app을 이용해 react 개발을 시작하려고 하는데 시작부터 npx 가 갑자기 나온다. 근데 내 windows 머신에는 npx를 사용할 수 없었다. npm5.2 부터 사용이 가능 하다고 한다. 로컬의 npm 버젼은 3.10이었다. 귀찮지만 npm 을 최신 버젼으로 업그레이드 하기로 했다.

현재 npm 버젼확인

```
npm -v
3.10.10
```

<br>
최신 npm 설치

linux or mac

```
sudo npm i -g npm
```

windows(관리자권한으로 터미널 실행 필요)

```
npm i -g npm
```

<br>
다시 버젼 확인
```
npm -v
6.4.1
```

<br>

#### Ref.

- <https://reactjs.org/docs/create-a-new-react-app.html>
- <https://velopert.com/1351>
