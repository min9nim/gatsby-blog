---
layout: post
title: "[웹팩4] tree shaking 적용 방법"
date: 2018-08-06 01:00:00 +0900
categories: webpack
tags: [tree-shaking, webpack, import]
---

### intro

웹 사이트의 성능 최적화를 위한 많은 시도가 있지만 특별히 tree shaking 은 무엇인지 알아보고 웹팩4에서 어떻게 이를 활용할 수 있는지에 대해 알아보자

<br>

### tree shaking 이란

프로젝트 진행시 누구나 필요한 어떤 모듈(라이브러리)들을 사용하게 된다. 하지만 그 모듈의 모든 기능을 100% 사용하는 경우는 거의 없을 것이다. tree shaking 이란 나무를 흔들어 죽은 낙엽과 가지들을 떨어뜨릴 수 있는 것과 같이 사용하는 모듈 중 내가 사용하지 않는 기능의 코드들을 빌드 시 제거하여 번들링 파일의 크기를 줄이는 최적화 기법이다.

<br>

### 웹팩4에서 tree shaking 활용 방법

웹팩4는 production 모드로 빌드시 자동으로 tree shaking 을 포함한 소스코드 최적화가 이루어진다. 하지만 정확히 어느 경우에 tree-shaking 이 적용되는지 알면 보다 적극적으로 해당 기능을 활용할 수 있다.

웹팩4에서 tree-shaking 효과를 보기 위해서는 다음 3가지 조건이 만족되어야 한다

1. ES2015의 import/export 구문 사용
1. 모듈의 일부만 사용
1. production 모드로 빌드

_Note) 사용하려는 js라이브러리가 import/export 구문을 사용하지 않는다면 해당 라이브러리는 tree shaking 이 적용되지 않는다_

<br>

### 실습 예제

노드 실행환경이 설치되어 있다고 가정하고 실행 가능한 간단한 예제를 만들어 보자

#### 실습을 위한 준비사항 세팅

1. tree-shaking 노드 프로젝트 생성

```
$ mkdir tree-shaking
$ cd tree-shaking
$ npm init
```

1. 웹팩과 익스프레스 설치

```
$ npm i -D webpack
$ npm i -S express
```

1. 서비스 구동을 위한 노드서버 serv/app.js

   ```javascript
   const express = require("express")
   const app = express()

   // 정적리소스 서비스
   const staticPath =
     process.platform.indexOf("win32") > -1
       ? __dirname + "\\..\\public"
       : __dirname + "/../public"
   app.use(express.static(staticPath))

   // 서비스 포트
   const PORT = 9999

   // HTTP 서비스 시작
   app.listen(PORT, function () {
     console.log(`express is listening on port ${PORT}`)
   })
   ```

1. 웹팩 빌드 설정 /webpack.config.js

   ```javascript
   const path = require("path")

   module.exports = {
     entry: "./src/index.js",
     output: {
       filename: "bundle.js",
       path: path.resolve(__dirname, "public"),
     },
     mode: "production",
   }
   ```

1. /public/index.html 에서 최종 번들링 파일을 사용

   ```
   <!DOCTYPE html>
   <html>
       <head>
       </head>
       <body>
           <script src="bundle.js"></script>
       </body>
   </html>
   ```

<br>

#### 실습 용 테스트 파일 작성

1.  우리가 사용하려는 /src/math.js 라는 모듈은 아래와 같다.  
    이 중 실제 개발시 cube 함수만 사용한다고 가정하면 square 함수는 필요없으므로 제거대상(tree-shaking)이 된다.

        ```javascript
        export function square(x) {
            console.log("square is called..")
            return Math.pow(x,2);
        }

        export function cube(x) {
            console.log("cube is called..")
            return Math.pow(x,3);
        }

        var math = {square, cube}
        export default math;
        ```

1.  웹팩 빌드시 entry point 가 될 /src/index.js 파일  
    index.js는 아래와 같이 math.js 모듈 중 cube함수만 사용을 한다

        ```javascript
        import { cube } from './math.js';

        function component() {
            var element = document.createElement('pre');
            element.innerHTML = [
                'Hello webpack!',
                '5 cubed is equal to ' + cube(5),
            ].join('\n\n');
            return element;
        }

        document.body.appendChild(component());
        ```

<br>

#### 빌드 & 테스트

1. 위 소스코드를 production 모드로 빌드

```
$ webpack
Hash: ad30f10e1b478a2bdf43
Version: webpack 4.0.0
Time: 168ms
Built at: 2018-8-6 15:49:37
    Asset       Size  Chunks             Chunk Names
bundle.js  774 bytes       0  [emitted]  main
Entrypoint main = bundle.js
   [0] ./src/index.js + 1 modules 592 bytes {0} [built]
       | ./src/index.js 358 bytes [built]
       | ./src/math.js 234 bytes [built]
$
```

1. 서버시작

```
$ node serv/app
express is listening on port 9999
```

1. bundle.js 의 내용을 보면 square 함수가 제거된 것을 확인할 수 있다
   ![result](/images/tree-shaking1.png)

1) index.js에서 필요한 함수만 import 하지 않고 아래와 같이 math 모듈 전체를 import 하여 사용할 경우에는

   ```javascript
   //import math, { cube, square } from './math.js';
   import math from "./math.js"

   function component() {
     var element = document.createElement("pre")
     element.innerHTML = [
       "Hello webpack!",
       //'5 cubed is equal to ' + cube(5),
       "5 cubed is equal to " + math.cube(5),
     ].join("\n\n")
     return element
   }

   document.body.appendChild(component())
   ```

1) square 함수까지 bundle.js 파일에 포함되어 빌드가 되는 것을 확인할 수 있다
   ![result](/images/tree-shaking2.png)

<br>

#### 실습에 사용된 파일 저장소

<https://github.com/min9nim/tree-shaking-example>

<br>

### Ref.

<https://webpack.js.org/guides/tree-shaking/>
