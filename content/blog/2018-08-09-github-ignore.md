---
layout: post
title: "github 공개저장소에 공개하고 싶지 않은 정보가 있을 때"
date: 2018-08-09 01:00:00 +0900
categories: git
tags: [github]
---

### Intro.

오픈소스 개발자에게 guthub 저장소는 주거래 은행만큼 소중하다. 당연하지만 한가지 아쉬운 점은 오픈하고 싶지 않은 파일을 공개저장소에 올려야만 하는 상황엔 어떻게 대처해야 할까.

이런 경우 가장 쉬운 방법은 비밀정보를 담은 파일 자체를 github에 올리지 않으면 되겠다. git은 .gitignore 를 이용하여 working directory의 특정 파일을 커밋에 포함시키지 않는 방법을 제공한다. 하지만 이렇게 시시한 경우를 다루려는 것은 아니고 어떤 파일이 반드시 커밋에 포함되어 있어야 하지만 해당 파일 내부의 어떤 특정 정보만은 감추고 싶은 경우에 대한 이야기를 하고자 한다.

가장 일반적인 예로 디비접속정보를 담은 설정파일의 경우, 분명히 프로젝트에서 꼭 필요한 리소스이지만 공개저장소에 공유하기는 꺼려지는 민감한 정보를 포함할 수 밖에 없다. 이런 파일을 관리하는 방법을 소개한다.

<br>

### 일단 가짜정보를 포함하여 커밋

dbConfig.js 파일이 디비접속정보를 가지고 있다고 하자. 우선은 아래와 같이 가짜 정보로 파일을 만든 후 커밋을 한다

```javascript
const config = {
  dev: "mongodb://가짜아이디:가짜비밀번호@ds239911.mlab.com:39911/dev",
}
module.exports = config
```

상태를 확인해 보면 당연히 모든 것이 최신상태다.

```bash
$ git status
On branch dev
Your branch is up-to-date with 'origin/dev'.

nothing to commit, working tree clean
$
```

이제 트릭을 쓸 준비가 끝났다. 준비치고는 참으로 간단하다:)

<br>

### 비밀 정보 입력

아래와 같이 진짜 계정 정보를 기입하고 저장한다.

```javascript
const config = {
  dev: "mongodb://진짜아이디:진짜비밀번호@ds239911.mlab.com:39911/dev",
}
module.exports = config
```

상태를 확인해 보면 당연히 아래와 같이 dbConfig.js 내용이 변경되었다고 나온다

```bash
$ git status
On branch dev
Your branch is up-to-date with 'origin/dev'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   dbConfig.js

no changes added to commit (use "git add" and/or "git commit -a")
$
```

이제부터가 중요하다. 우리는 저 민감한 정보를 현재 woking directory 에서만 관리를 하되 커밋으로 만들어지지는 않도록 하고 싶다

어떻게 해야할까?  
다행히 git 은 git이 관리 중인 파일 중 특정 파일에 대해서만 변경사항을 인지하지 않도록 설정하는 방법을 제공한다

아래 명령을 수행한다

```bash
$ git update-index --assume-unchanged dbConfig.js
```

그리고 상태를 확인해 본다.

```bash
$ git status
On branch dev
Your branch is up-to-date with 'origin/dev'.

nothing to commit, working tree clean
$
```

짜잔, git이 해당 파일의 변경사항을 눈치채지 못한다. 이제부터 dbConfig.js의 비밀정보는 woking directory 에만 존재하고 새로운 커밋을 만들 때 신규커밋에는 포함되지 않는다.

<p align="left"><img src="/images/noun_Happy.svg" width="150"/></p>

<br>

### 아쉬운 점

`git pull`을 수행하거나 브랜치를 이동할 때마다 커밋의 내용으로 다시 덮어쓰기가 되므로, working directory 내 변경내역(비밀정보)가 유실될 수 있다.

<p align="left"><img src="/images/noun_frustration.svg" width="150"/></p>
이에 대한 해결방법으로는 dbConfig.js 파일을 그냥 프로젝트 외부에 위치시키고 shell스크립트를 이용하여 앱을 배포하기 전에(비밀정보가 필요할 때마다) dbConfig.js 파일을 덮어쓰기 하는 방법을 사용할 수 있다

셀스크립트 참고)
<http://min9nim.github.io/2018/06/linux-shell#deploy>

<br>

### --assume-unchanged 설정된 파일 목록

을 확인하는 명령은 아쉽게도 git에서 제공되지 않는다

<!-- <p align="left"><img src="/images/noun_Sad.svg" width="150"/></p> -->

<br>
<br>

### --assume-unchanged 설정해제 방법

아래와 같이 해당 파일에 대한 assume-unchanged 설정을 해제할 수 있다

```bash
git update-index --no-assume-unchanged 파일명
```

assume-unchanged 설정된 모든 파일을 일괄로 설정 해제하려면 아래 명령을 사용한다

```bash
git update-index --really-refresh
```

<br>

### Ref.

- <https://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes>
- <https://blog.outsider.ne.kr/817>
