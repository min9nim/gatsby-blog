---
layout: post
title: "remote 호스트의 mac address 얻어오는 방법"
date: 2018-06-11 09:00:00 +0900
categories: network
tags: [macaddress, ARP]
---

#### 문제

서버에서 클라이언트의 mac address 를 알아낼 수 있을까

<br>

#### 결론

같은 네트웍망에 물려있다면 가능하지만, 서로 다른 네트웍망에 속해 있다면 불가

<br>

#### 배경지식

- ARP란? Address Resolution Protocol
  - IP 주소에 대응되는 이더넷카드의 하드웨어 주소(MAC주소)를 알아내는 프로토콜
- MAC adress란? Media Access Control address
  - 앞 3자리는 네트웍카드 제조회사 고유 코드, 뒤 3자리는 네트웍카드 고유 번호
- ARP 테이블 조회 명령

```console
$ arp -a
? (169.254.143.159) at b8:44:d9:56:6f:92 on en0 [ethernet]
? (169.254.197.202) at ac:e0:10:60:71:d on en0 [ethernet]
? (169.254.214.31) at e4:70:b8:ee:4e:d1 on en0 [ethernet]
```

<br>

#### 노드에서 mac-address 조회 방법

[node-arp](https://www.npmjs.com/package/node-arp) 를 설치하고 아래와 같이 처리

```javascript
var arp = require("node-arp")

arp.getMAC("192.168.0.1", function (err, mac) {
  if (!err) {
    console.log(mac)
  }
})
```

(단, 로컬의 arp table 을 조회하기 때문에 동일한 네트웍이 아닐 경우에는 활용 불가)

<br>

#### Ref.

<https://m.blog.naver.com/sbd38/50191972929>
