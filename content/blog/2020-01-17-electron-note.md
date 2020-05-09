---
layout: post
title: "electron 시작하기"
date: 2020-01-17 00:10
categories: electron
tags: [electron]
---

### 엘렉트론 소개

- js 로 데스크탑 애플리케이션을 만들자!
- Nodejs + Chromium
  - 일렉트론은 기본적으로 Nodejs 프로젝트
- [2014년 github 에서 Atom 개발을 하다가 탄생](https://electronjs.org/docs/tutorial/about#about-electron)

<br>

### 일렉트론 설치

```
npm install --save-dev electron
```

<br>

### 프로젝트 시작

```
npm init
```

<br>

### 프로젝트 기본 구조

```
your-app/
├── package.json
├── main.js
└── index.html
```

<br>
`package.json`

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

<br>

`main.js`

```javascript
const { app, BrowserWindow } = require("electron")

// window 객체는 전역 변수로 유지. 이렇게 하지 않으면,
// 자바스크립트 객체가 가비지 콜렉트될 때 자동으로 창이 닫힐 것입니다.
let win

function createWindow() {
  // 브라우저 창을 생성합니다.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // 그리고 앱의 index.html를 로드합니다.
  win.loadFile("index.html")

  // 개발자 도구를 엽니다.
  // win.webContents.openDevTools()

  // 창이 닫힐 때 발생합니다
  win.on("closed", () => {
    // window 객체에 대한 참조해제. 여러 개의 창을 지원하는 앱이라면
    // 창을 배열에 저장할 수 있습니다. 이곳은 관련 요소를 삭제하기에 좋은 장소입니다.
    win = null
  })
}

// 이 메서드는 Electron이 초기화를 마치고
// 브라우저 창을 생성할 준비가 되었을 때  호출될 것입니다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.on("ready", createWindow)

// 모든 창이 닫혔을 때 종료.
app.on("window-all-closed", () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (win === null) {
    createWindow()
  }
})

// 이 파일 안에 당신 앱 특유의 메인 프로세스 코드를 추가할 수 있습니다. 별도의 파일에 추가할 수도 있으며 이 경우 require 구문이 필요합니다.
```

<br>

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta
      http-equiv="Content-Security-Policy"
      content="script-src 'self' 'unsafe-inline';"
    />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node
    <script>
      document.write(process.versions.node)
    </script>
    , Chrome
    <script>
      document.write(process.versions.chrome)
    </script>
    , and Electron
    <script>
      document.write(process.versions.electron)
    </script>
    .
  </body>
</html>
```

<br>

### 애플리케이션 시작

```
npm start
```

<br>

![애플리케이션 UI](/images/electron-hello-world.png)

<br>

### Ref.

https://electronjs.org/docs/tutorial/first-app
