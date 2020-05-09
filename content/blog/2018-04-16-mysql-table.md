---
layout: post
title:  "[mySQL] 테이블 수정 쿼리"
date:   2018-04-16 11:00:00 +0900
categories: database
tags: [mysql, query]
---
#### 이름 바꾸기
```sql
ALTER TABLE tablename RENAME bbs;
```
<br/>

#### 컬럼 속성 수정
```sql
ALTER TABLE tablename MODIFY colname INT NOT NULL AUTO_INCREMENT PRIMARY KEY;
```

<br/>


#### 특정 컬럼 인코딩 수정
```sql
ALTER TABLE HUMSD02 MODIFY orgFilename varchar(100) character set utf8 default NULL;
ALTER TABLE HUMSD02 MODIFY orgFilename varchar(100) character set euckr default NULL;
```

<br/>

#### 컬럼 이름 바꾸기
```sql
ALTER TABLE tablename CHANGE colname newcolname INT NOT NULL AUTO_INCREMENT;
```
* CHANGE는 컬럼 속성뿐아니라 이름도 바꿔준다
<br/>
<br/>

#### 컬럼 추가
```sql
ALTER TABLE bbs ADD name VARCHAR(10);
```
* ALTER TABLE tablename ADD 컬럼이름 컬럼속성  

<br/>

#### 특정 컬럼 뒤에 새로운 컬럼 추가
```sql
ALTER TABLE bbs ADD newcol VARCHAR(10) AFTER num;
```
* num 컬럼 뒤에 newcol 컬럼 추가

<br/>

#### 외래키 추가
```sql
ALTER TABLE HUMSD02 ADD FOREIGN KEY (resNo) REFERENCES HUMSD03(resNo) ON DELETE CASCADE;
```
* 타 테이블의 참조 당하는 키는 반드시 유일 키이어야 함

<br/>





#### 컬럼 삭제
```sql
ALTER TABLE bbs DROP colname;
```
<br/>




#### 기존 컬럼을 지우고 맨 앞에 컬럼 추가
```sql
ALTER TABLE bbs DROP newcol, ADD newcol VARCHAR(10) FIRST;
```
* 맨 앞에 추가하려면 FIRST를 사용한다
<br/>
<br>

#### PRIMARY KEY 속성 삭제
```sql
ALTER TABLE test DROP PRIMARY KEY;
```
<br/>

#### 이미 PRIMARY KEY인 컬럼의 속성을 바꿀 때
```sql
ALTER TABLE test MODIFY a CHAR(1) NOT NULL;
```
* PRIMARY KEY 속성은 지정하지 말고, NOT NULL 속성을 함께 지정해 주면 기존 PRIMARY KEY 속성은 그대로 남은 상태로 컬럼의 속성을 변경할 수 있다.
<br/>
<br/>

#### Ref.
<http://kwonnam.pe.kr/wiki/database/mysql/alter_table>
