---
layout: post
title:  "[mongoDB] aws ec2 에서 mongoDB 세팅하기"
date:   2018-06-06 10:00:00 +0900
categories: database
tags: [aws, mongoDB, ec2]
---
#### mongodb 설치
1. root 권한으로 전환
```
$ sudo su
```
1. `vi /etc/yum.repos.d/mongodb-org-3.4.repo` 입력 후 아래 내용 저장
```
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```
1. yum 으로 설치
```
$ yum install -y mongodb-org
```

<br>

#### mongodb 서버시작 및 접속
1. 서비스 시작
```
$ sudo service mongod start
```
1. 서비스 중지
```
$ sudo service mongod stop
```
1. 서비스 재시작
```
$ sudo service mongod restart
```
1. 서버접속
```
$ mongo
```


<br>

#### mongodb 보안 설정
1. 설정을 수정하려면 root 권한이 필요하다.
```
$ sudo vi /etc/mongod.conf
```
    1. 외부에서 접근을 허용하려면 `net` 항목의 `bindIp` 항목을 아래와 같이 주석처리한다
    ```
    # network interfaces
    net:
      port: 27017
    #  bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.
    ```
    1. 익명 로그인을 제한하려면 `security` 항목에 `authorization: enabled` 를 추가한다
    ```
    security:
      authorization: enabled
    ```
1. 몽고DB 셀에서 admin 데이터베이스에 관리자계정 추가
```
> use admin
> db.createUser({user: "root", pwd: "xxxx", roles:["root"]})
```
1. 인증모드로 몽고DB 기동
```
$ sudo service mongod stop
Stopping mongod:                                           [  OK  ]
$ sudo service mongod start --auth
Starting mongod:                                           [  OK  ]
$ 
```
1. 방금 생성했던 관리자 계정으로 몽고DB 셀 접속
```
$ mongo admin --username "root" --password "xxxx"
```
1. 데이터베이스에 사용자계정 추가
```
> use dev
> db.createUser({user: "keating", pwd: "xxxx", roles:["dbOwner"]})
```
1. 데이터베이스의 사용자계정 삭제
```
> use testDB
> db.dropUser("testUser")
```




<br>

#### Ref.
- [ec2에 mongoDB설치](https://chichi.space/2017/05/12/한번에-끝내는-AWS-EC2에-MongoDB-설치하고-보안설정하기/)

