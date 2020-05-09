---
layout: post
title:  "[express] https 세팅"
date:   2018-07-06 16:00:00 +0900
categories: nodejs
tags: [express, https, SSL]
---
#### private key 생성
```console
$ openssl genrsa 1024 > key.pem
Generating RSA private key, 1024 bit long modulus
............................................++++++
............................................................++++++
e is 65537 (0x10001)
$ cat key.pem
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDyjJcALHArMrTK1j67ZjZhW55r9vxHKw7VmFWksYSGkXsiu4kA
V4Um9xDqGw3Ghpur4X9V1qU6qp83IcNSSQ4UES9HtTGjMTlSCeIugdPKB2KYOzz8
qVG/bRIoviVaqNdKNk4ICUttxdfxG7GsmA7fW+JEkDi2ZdtbUEkQYJ5YdQIDAQAB
AoGALm+SHTtkwjB0An1gBzq7YIpM2ziu9eUdcvE2PFCsIaNKosyqnwEigeI9P8Ss
L3zn4taKMqHkgkXWM5ToMyG/auKuIFeFqiStM6r9pOn99JVU84mmaqG4wfQFT1m/
pBpZ1ZbiWlTz14FrsK6PejvPA6qoJgNLL0SDHqJiuPJWoOECQQD9XXkWhRKZMgm3
obbFB4SDh3YE01yPXRyYkMvQbTRnq92gffXrprga/Jalhq2DPg+Hkl4xR6+1mKcb
209s7n0ZAkEA9RJSZDK5Jgx1OZkpqVs0iJ6UUNsvL9HqkpOyrrGaXqyOyW8r0VTh
9SQwMtGNeFFC3qkMbzfq0uW+WvaXfb6FvQJAd0IIP6FmL7Xd3RHBdfyT41Vft+XF
K7YoP6foR7Mfd6zuJR0lJEbVYd6CsAc0pRIRPT8oFwonKtMv1WzldeDMAQJBAIIv
T3FGuLALoiIMyOLcPlXs16D0Lmbavh9LMno2gmiUhe1fjwlObBILPUdhpiMqF7ms
V5yikbeir7ImmGcF1IkCQQChTL6TXGbPmQZQvT/mIygIeCF4JYR2G4tnDsdPkvRi
BduVNDzKkBk/8AvfqAxWEARL9QX5jVx3LsfmtpsABvqC
-----END RSA PRIVATE KEY-----
$ ls -al
total 80
drwxr-xr-x   9 sm  staff    288  7  9 12:40 .
drwxr-xr-x  20 sm  staff    640  7  4 11:08 ..
-rw-r--r--   1 sm  staff    887  7  9 12:39 key.pem
$ 
```

<br>

#### self-signed 인증서 생성
```console
$ openssl req -x509 -new -key key.pem > cert.pem 
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:KR
State or Province Name (full name) []:Seoul
Locality Name (eg, city) []:Seoul
Organization Name (eg, company) []:anony
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:
Email Address []:min9nim@gmail.com
$ ls -al
total 80
drwxr-xr-x   9 sm  staff    288  7  9 12:40 .
drwxr-xr-x  20 sm  staff    640  7  4 11:08 ..
-rw-r--r--   1 sm  staff    826  7  9 12:40 cert.pem
-rw-r--r--   1 sm  staff    887  7  9 12:39 key.pem
$ 
```

<br>

#### https 설정
```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const https = require("https");

const filepath = __dirname + path.sep; // __dirname 는 app.js 가 위치한 경로

// 익스프레스 앱생성
const app = express();


// https 옵션
const options = {  
    key: fs.readFileSync(filepath + 'key.pem'),
    cert: fs.readFileSync(filepath + 'cert.pem')
};

// 서비스 포트
const SSLPORT = 443;


// HTTPS 서비스 시작
https.createServer(options, app).listen(SSLPORT, function(){  
    console.log("Https server listening on port " + SSLPORT);
});
```

<br>

#### Ref.
<http://blog.saltfactory.net/implements-nodejs-based-https-server/>
