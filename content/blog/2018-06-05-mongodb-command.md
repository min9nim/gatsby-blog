---
layout: post
title: "[mongoDB] 명령어"
date: 2018-06-05 10:00:00 +0900
categories: database
tags: [mongodb, command]
---

#### 몽고디비 시작 및 접속(Linux)

- 서비스 시작

```
$ sudo service mongod start
```

- 서비스 중지

```
$ sudo service mongod stop
```

- 서비스 상태확인

```
$ sudo service mongod status
```

<br>

#### 몽고디비 시작 및 접속(Windows)

- 서비스 시작

```
C:\"Program Files"\MongoDB\Server\3.6\bin\mongod
```

몽고디비는 기본적으로 `C:\data\db` 경로를 바라보며 시작한다. 해당 경로가 없을 경우 정상적으로 서비스가 시작되지 않고 오류가 발생하므로 미리 해당 폴더를 만들어 두도록 한다.

- 디비서버 접속

```
C:\"Program Files"\MongoDB\Server\3.6\bin\mongo
```

<br>

#### mongo shell

- 원격 디비서버 접속  
  _mongo shell 버젼과 원격 몽고디비의 버젼이 다를 경우 접속이 안 될 수 있음_

```
$ mongo --username alice --password abc123 --host mongodb0.tutorials.com --port 28015
```

- 특정 DB로 접속

```
$ mongo ds239911.mlab.com:39911/anony -u <dbuser> -p <dbpassword>
```

<br>

#### 데이터베이스 관리

- 데이터베이스 생성

```
> use talkplace
switched to db talkplace
```

- 현재 데이터베이스 확인

```
> db
talkplace
```

- 데이터베이스 목록 확인

```
> show dbs
admin      0.000GB
config     0.000GB
local      0.000GB
talkplace  0.000GB
test       0.000GB
```

- 데이터베이스 삭제

```
> use talkplace
switched to db talkplace
> db.dropDatabase()
{ "dropped" : "talkplace", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
>
```

<br>

#### 콜렉션 관리

- 콜렉션 생성  
  기본 옵션으로 생성

```
> db.createCollection("posts")
{ "ok" : 1 }
```

- 콜렉션 목록 확인

```
> show collections
book
posts
```

- 콜렉션에 다큐먼트 추가

```
> db.posts.insert({"key" : "BJwttIGe7", "title" : "오늘은 왜케 잠잠하지.. 허허", "writer" : "송혜교", "conten
t" : "그러니 왠지 더욱 불안..\n", "date" : 1528093055313 })
WriteResult({ "nInserted" : 1 })
```

posts 콜렉션이 이미 생성되지 않은 경우에는 자동으로 생성된 후 다큐먼트가 추가된다. 아래와 같이 배열로 여러 건을 한꺼번에 추가할 수도 있다

```
> db.posts.insert([
... {"key" : "rJf4T8zlm", "title" : "이제 대략 정리가 된거 같다아", "writer" : "휴우", "content" : "정신 하나
도 없었엉~~", "date" : 1528093993879 },
... {"key" : "SyTvQvflX", "title" : "이제 나왔다", "writer" : "카카", "content" : "서버에서 돈다 이젠", "date
" : 1528095589017 }
... ])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 2,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})
>
```

- 콜렉션 삭제

```
> show collections
book
posts
> db.book.drop()
true
> show collections
posts
>
```

<br>

#### 다큐먼트 관리

- 전체 다큐먼트 목록 확인

```
> db.posts.find()
{ "_id" : ObjectId("5b15e27b8169daf6fd8c7366"), "key" : "BJwttIGe7", "title" : "오늘은 왜케 잠잠하지.. 허허",
 "writer" : "송혜교", "content" : "그러니 왠지 더욱 불안..\n", "date" : 1528093055313 }
{ "_id" : ObjectId("5b15e27b8169daf6fd8c7367"), "key" : "rJf4T8zlm", "title" : "이제 대략 정리가 된거 같다아"
, "writer" : "휴우", "content" : "정신 하나도 없었엉~~", "date" : 1528093993879 }
{ "_id" : ObjectId("5b15e27b8169daf6fd8c7368"), "key" : "SyTvQvflX", "title" : "이제 나왔다", "writer" : "카
카", "content" : "서버에서 돈다 이젠", "date" : 1528095589017 }
{ "_id" : ObjectId("5b15e27b8169daf6fd8c7369"), "key" : "SJblZ_Me7", "title" : "안녕", "writer" : "이것도", "
content" : "입력할때 좀 버벅 거리는 현상이 조금 있는거 같은디", "date" : 1528099049206 }
>
```

- 특정 속성의 값이 어떤 값이 아닌 다큐먼트 조회

```
db.posts.find({uuid : {"$ne" : "xxxxxx"}}).pretty()
```

- 다큐먼트 삭제

```
db.posts.remove({key : "BJwttIGe7"})
```

- 다큐먼트 수정

```
db.posts.update({uuid: "xxxx1"}, {"$set" : {uuid: "zzzz2"}}, {multi: true})
```

<br>
<br>

#### Ref.

- <https://velopert.com/594>
- <https://velopert.com/436>
- <https://docs.mongodb.com/tutorials/connect-to-mongodb-shell/>
- <https://docs.mongodb.com/manual/reference/operator/query/>
