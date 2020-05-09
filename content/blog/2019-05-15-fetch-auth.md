---
layout: post
title:  "[js] https 에 사용자 인증을 설정할 때 문제"
date:   2019-05-15 00:10
categories: js
tags: [js]
---
크로스도메인 요청을 보낼 https 서버가 인증정보(id/pw)를 요구하는 경우에 필자가 경험했던 문제를 정리한다.

<br>

#### 시나리오
현재 화면(`http://localhost:3000`)에서 특정 데이터를 가져오기 위해 `https://data.xxxx.io/_search` 로 요청을 보내야 한다고 가정하자. 그리고 프론트에서는 fetch 명령을 사용하고자 한다.

curl 명령을 이용하면 아래와 같이 간단히 데이터를 가져올 수 있다

```
$ curl -iL -u 'dev:dev1234' https://data.xxxx.io/_search -H 'Origin: http://localhost'
HTTP/1.1 200 OK
Server: nginx/1.16.0
Date: Wed, 15 May 2019 01:12:33 GMT
Content-Type: application/json; charset=UTF-8
Content-Length: 91333
Connection: keep-alive
access-control-allow-origin: *
Access-Control-Allow-Methods: GET,POST,OPTIONS,PUT,DELETE,PATCH,CONNECT

{"took":1,"timed_out":false,"_shards":{"total":1,"successful":1,"skipped":0,"failed":0},"hits":{"total":{"value":10000,"relation":"gte"},"max_score":1.0,"hits":[{"_index":"precedentinfos","_type":"precedentinfo","_id":"5cc56ea9c659c6003dddc600","_score":1.0,"_source":{...
```

<br>

#### 그러면 frontend 에서 fetch 명령을 이용할 땐 인증정보를 어떻게 담아야 할까?

이렇게 하면 된다
```javascript
fetch('https://data.xxxx.io/_search', {
  method: 'POST',
  headers: new Headers({
    'content-type': 'application/json',
    'Authorization': 'Basic ' + btoa('dev:dev1234'),
  }),
  body: JSON.stringify({
    // blabla~
  }),
}).then(res => res.text()).then(console.log)
```

하지만, 위 스크립트를 크롬 개발자도구 console탭에 넣고 실행해 보면 아래와 같은 오류를 만나게 될 것이다
```
Access to fetch at 'https://data.xxxx.io/_search' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

<br>

#### 이유가 무엇일까
오류의 내용은 preflight 요청의 응답에 응답에 `access-control-allow-origin: *` 헤더가 없다는 것이다.

하지만 이상한 점은 위에서 curl 명령으로 테스트할 때 우리는 `access-control-allow-origin: *` 가 잘 내려오고 있음을 확인했다.

왜 curl은 되고 크롬은 안 되었던걸까?

핵심은 크롬이 내부적으로 fetch이전에 보내는 preflight 요청에 있다.

크로스도메인 요청이기 때문에 크롬은 해당 요청을 실행하기 전에 서버가 CORS 접근을 허용하는 지 여부를 확인하기 위해 preflight 요청을 내부적으로 먼저 보낸다. 하지만 크롬이 내부적으로 발생시키는 preflight 요청에는 인증정보가 담겨져 있지 않기 때문에 필자가 경험했던 환경에서는 서버에서 `access-control-allow-origin: *` 헤더 없이 그냥 인증오류(401)를 뱉었던 것이다.

```bash
$ curl -iL -X OPTIONS https://data.xxxx.io/_search -H 'Origin: http://localhost:3000'
HTTP/1.1 401 Unauthorized
Server: nginx/1.16.0
Date: Wed, 15 May 2019 00:26:44 GMT
Content-Type: text/html
Content-Length: 179
Connection: keep-alive
WWW-Authenticate: Basic realm="server auth"

<html>
<head><title>401 Authorization Required</title></head>
<body>
<center><h1>401 Authorization Required</h1></center>
<hr><center>nginx/1.16.0</center>
</body>
</html>
```

물론 서버 설정에 따라 preflight 요청(OPTIONS)일 경우에는 인증을 요구하지 않도록 설정하는 것도 가능은 하겠지만, http(s) 접근 자체에 인증정보를 요구하는 것은 좋은 방법은 아닌 것 같다. 프론트엔드(js) 소스코드에 인증정보를 담는다는 것은 보안에 취약할 수 있기 때문이다.

<br>

#### fetch의 mode 옵션
특별히 아래와 같이 `mode: 'no-cors'` 옵션을(default: `'cors'`) 사용하면 크롬에서 preflight 확인요청을 보내지 않게 할 수는 있다. 하지만 이 옵션을 사용할 경우에도 정상적인 응답을 가져오지는 않았다.(내부적으로 요청정보가 뭔가 달라지는 것 같은데.. 구체적인 내용까지 확인하지는 않았다)
```javascript
fetch('https://data.xxxx.io/_search', {
  method: 'POST',
  headers: new Headers({
    'content-type': 'application/json',
    'Authorization': 'Basic ' + btoa('dev:dev1234'),
  }),
  mode: 'no-cors',
  body: JSON.stringify({
    // blabla~
  }),
}).then(res => res.text()).then(console.log)
```

오류)
```
POST https://data.xxxx.io/_search 406 (Not Acceptable)
```