---
layout: post
title:  "git 명령어 요약"
date:   2018-04-01 01:00
categories: git
tags: [git, command]
---
### 브랜치
* 브랜치 생성
```
$ git branch iss53
```
* 브랜치 이동
```
$ git checkout iss53
```
* 로컬 브랜치 목록 보기
```console
$ git branch
  iss53
> master
  testing
```
  * 원격 저장소 브랜치 목록 보기
  ```console
  $ git branch -r
    origin/HEAD -> origin/master
    origin/express
    origin/master
  ```
  * 로컬과 원격 저장소 브랜치 목록 모두 보기
  ```console
  $ git branch -a
  > express
    master
    remotes/origin/HEAD -> origin/master
    remotes/origin/express
    remotes/origin/master
  ```
* 원격 저장소 브랜치 내용 업데이트
```console
git remote update
```
* 원격 저장소의 브랜치를 내려받기
```console
git checkout -t origin/express
```
  * 원격저장소의 브랜치를 새이름으로 내려받기
  ```console
  git checkout -b [생성할 branch 이름] [원격 저장소의 branch 이름]
  ```
* 브랜치를 만들면서 Checkout까지 한 번에
```
$ git checkout -b iss53
```
위 명령은 아래 명령을 줄여놓은 것
```
$ git branch iss53
$ git checkout iss53
```
* master 브랜치에서 hotfix 브랜치를 merge 하고자 한다면
```
$ git checkout master
$ git merge hotfix
```
* merge 된 브랜치 목록
```
$ git branch --merged
```
* 아직 merge 안 된 브랜치 목록
```
$ git branch --no-merged
```
* iss53 브랜치를 삭제
```
$ git branch -d iss53
```
* 원격저장소의 iss53 브랜치를 삭제
```
$ git push origin :iss53
```

<br>

### 커밋
* `git add *` + `git commit -m update` 한번에 하기  
(단, 신규 파일들이 스테이징 영역에 추가되지는 않는다)
```
git commit -a -m update
```
* 최신 커밋 취소하기
```
git reset HEAD^
```
* 마지막 2개의 commit을 취소
```
git reset HEAD~2
```


<br>

### 태그
* Annotated 태그 만들기
```
$ git tag -a v1.0.0 -m "Official version 1.0.0"
```
* 태그 목록 확인
```
$ git tag
```
* 태그 정보 확인
```
$ git tag -v v1.0.0
```
* 태그 포함하여 원격저장소 push
```
$ git push --tags
```
* 태그 삭제
```
$ git tag -d v1.0.0
```
* 원격 저장소에 올라간 태그를 삭제
```
$ git push origin :v1.0.0
```
* 특정 태그로 체크아웃
```
$ git checkout tagname
```

<br>

### 로그
* commit 메세지만 한줄로 & 그래프로 보이기
```
$ git log --oneline --graph
```
* commit 의 diff 결과를 최근 2개만 보이기
```
$ git log -p -2
```
<br>

### 파일삭제
* workingDirectory & staging 영역에서 파일 삭제
```
$ git rm test.html
```
* staging 영역에서만 파일 삭제
```
$ git rm --cached test.html
```
* 특정 파일을 tracked 상태에서 제거
```
rm .DS_Strore
git add -u    --> -u 옵션의 의미는 update tracked files
git commit -m "delete .DS_Strore"
```
* 트래킹 파일 리스트
```
git ls-files
```

<br>
### stash
* 스테이징과 워킹디렉토리를 잠시 따로 저장
```
$ git stash save
```
또는
```
$ git stash
```
* stash 목록보기
```
$ git stash list
```
* 가장 최근 stash 삭제
```
$ git stash drop
```
* 가장 최근 stash 로 복원
```
$ git stash apply
```
* 가장 최근 stash 복원하고 해당 stash 삭제
```
$ git stash pop
```

<br>
###  global 설정 변경
```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```


<br>

### 원격저장소
* 원격저장소 확인
```
$ git remote -v
origin  git://github.com/schacon/ticgit.git (fetch)
origin  git://github.com/schacon/ticgit.git (push)
```
* 원격저장소 추가하기
```
git remote add [단축이름] [url]
```
* 원격저장소 삭제하기
```
$ git remote rm [단축이름]
```
* 원격저장소 이름변경
```
$ git remote rename [현재이름] [바꿀이름]
```


<br>

### Ref.
* <https://git-scm.com/book/ko/v2/Git-브랜치-브랜치와-Merge-의-기초>
* <https://git-scm.com/book/ko/v1/Git의-기초-커밋-히스토리-조회하기>
* <https://backlog.com/git-tutorial/kr/stepup/stepup1_1.html>
* <https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html>
