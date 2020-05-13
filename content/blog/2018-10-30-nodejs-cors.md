---
layout: post
title: "Node.js CORS setting"
date: 2018-10-30 00:30
categories: nodejs
tags: [nodejs, cors]
---

Express 서버를 사용할 경우 [cors 미들웨어](https://github.com/expressjs/cors)를 이용해 간단하게 CORS 설정을 할 수 있다.

<br>

### 모든 요청에 대한 CORS 허용 설정

```javascript
var express = require("express")
var cors = require("cors")
var app = express()

app.use(cors())

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" })
})

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80")
})
```

위와 같이 설정할 경우 로컬환경에서 테스트용 서버를 띄우면 `localhost` 로는 접근이 안 되는 문제가 있다.

이럴 경우 그냥 아래와 같이 localhost 를 whitelist에 추가할 수 있다.

```javascript
const whitelist = [
  "http://localhost:3000",
  "https://sharelink-frontend.appspot.com",
  "http://sharelink-frontend.appspot.com",
]
var corsOptions = {
  origin: function (origin, callback) {
    console.log("@@@ " + origin)
    if (whitelist.indexOf(origin) >= 0 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}
app.use(cors(corsOptions))
```

<br>

#### Ref.

<https://github.com/expressjs/cors>
