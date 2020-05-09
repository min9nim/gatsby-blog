---
layout: post
title:  "[mongoDB] 모니터링 툴"
date:   2018-06-28 15:00:00 +0900
categories: database
tags: [mongoDB, database, monitoring]
---
간단하게 몽고디비 상태를 모니터링할 수 있는 도구들

#### mongostat
```
$ mongostat
```
- 초당 쿼리 개수 확인
- Ref) <https://docs.mongodb.com/manual/reference/program/mongostat/>
<br>

#### mongotop
```
$ mongotop
```
- 초당 콜렉션 별 read/write 시간
- Ref) <https://docs.mongodb.com/manual/reference/program/mongotop/>