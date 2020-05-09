---
layout: post
title:  "OpenSSL Essentials: Working with SSL Certificates, Private Keys and CSRs"
date:   2018-05-15 13:00:00 +0900
categories: network
tags: [SSL, CSR]
---

CSR이 무엇입니까
---
CA로부터 SSL인증서를 발급 받으려면 먼저 CSR(Certificate Signing Requests) 이 필요합니다. CSR은 공개키와 몇가지 추가 정보로 구성되어있습니다. 그리고 그 정보들이 인증서 발급시 필요합니다.

CSR생성시 필요한 정보들은 아래와 같습니다
```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:New York
Locality Name (eg, city) []:Brooklyn
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example Brooklyn Company
Organizational Unit Name (eg, section) []:Technology Division
Common Name (e.g. server FQDN or YOUR name) []:examplebrooklyn.com
Email Address []:
```

<br/>

CSR 만들기
---
아래 명령은 2048비트 개인키(`domain.key`)를 만들고 CSR(`domain.csr`)을 생성합니다
```
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -out domain.csr
```
위 명령을 실핼하면 CSR생성에 필요한 추가 정보들을 차례대로 입력해야 합니다.

* `-newkey rsa:2048` 옵션 : 2048비트 RSA키를 생성합니다
* `-nodes` 옵션 : 개인키를 암호화하지 않습니다
* `-new` 옵션 : 명시하지는 않았지만 암묵적으로 적용되며 CSR이 새로 생성될 것임을 의미합니다

CSR생성에 필요한 정보들을 아래와 같이 명령어의 옵션으로 주는 것도 가능합니다
```
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -subj "/C=US/ST=New York/L=Brooklyn/O=Example Brooklyn Company/CN=examplebrooklyn.com" \
       -out domain.csr \
```

이미 생성된 개인키를 가지고 CSR을 생성하는 것도 가능합니다
```
openssl req \
       -key domain.key \
       -new -out domain.csr
```

<br>

self-signed 인증서
---
CA로부터 인증된 인증서가 아니더라도 당신은 셀프 서명된 인증서를 이용하여 HTTPS서버를 구성할 수 있습니다.

아래 명령은 2048비트 RSA키를 만들어 self-signed 인증서를 생성합니다.
```
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt
```
이후, CSR 정보들을 추가로 입력해 주어야 합니다

* -x509 옵션: 인증서에 셀프서명할 것을 의미합니다
* -days 365: 365일 동안만 유효함
* 인증서 생성을 위해 내부적으로 임시 CSR을 생성합니다


아래와 같이 이미 생성된 키를 이용하여 self-signed 인증서를 생성할 수도 있습니다
```
openssl req \
       -key domain.key \
       -new \
       -x509 -days 365 -out domain.crt
```

물론 이미 생성된 CSR과 개인키를 가지고 self-signed 인증서를 바로 만들 수도 있습니다
```
openssl x509 \
       -signkey domain.key \
       -in domain.csr \
       -req -days 365 -out domain.crt
```

<br>

인증서 검증
---
인증서와 CSR파일은 PEM포맷으로 인코딩 되어 있기 때문에 사람이 읽을 수가 없습니다.

* 아래 명령은 CSR파일의 내용을 확인합니다
```
openssl req -text -noout -verify -in domain.csr
```

* 다음은 인증서(.crt)파일의 내용을 확인합니다
```
openssl x509 -text -noout -in domain.crt
```

* CA로부터 인증된 인증서는 아래와 같이 내용 확인을 합니다
```
openssl verify -verbose -CAFile ca.crt domain.crt
```


<br>

개인키 검증
---
* 아래는 개인키의 유효성 여부를 검증합니다
```
openssl rsa -check -in domain.key
```

* 개인키를 암호화할 수 있습니다.(명령 실행 후 암호화를 위한 비밀번호 입력이 필요합니다)
```
openssl rsa -des3 \
       -in unencrypted.key \
       -out encrypted.key
```

* 암호화된 개인키를 복호화할 수 있습니다(복호화를 위한 비밀번호 입력이 필요합니다)
```
openssl rsa \
       -in encrypted.key \
       -out decrypted.key
```

<br>

Ref.
---
더 구체적인 내용은 아래 링크를 참고하세요

<https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs#about-certificate-signing-requests-(csrs)>


