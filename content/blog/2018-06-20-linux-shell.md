---
layout: post
title: "[linux] 셀스크립트 작성 방법"
date: 2018-06-20 09:00:00 +0900
categories: linux
tags: [shell, linux]
---

### 초간단 hello.sh 예제

1. 첫번째 줄에 `#!/bin/sh` 입력하고 2번째 라인부터 스크립트 작성

```
#!/bin/sh
echo "Hello Word!!"
```

2. 실행권한을 부여한 후

```
chmod 700 hello.sh
```

3. 아래와 같이 실행

```
./hello.sh
```

<br>

### if 조건문 사용예제

`if [ ~~ ];then` 에서 공백문자 유무가 엄격함

<div id="deploy"></div>
```bash
#!/bin/sh
cd /home/min9nim/src/anony
git stash
str=`git pull`
if [ "$str" != "Already up-to-date." ];then
    cp ../dbConfig.js .
    gcloud app deploy --quiet
else
    echo "AppDeploy is not required caz it's up-tp-date"
fi
git stash drop
```

<br>

### Ref.

<http://blog.naver.com/PostView.nhn?blogId=bestheroz&logNo=66975657&categoryNo=4&viewDate=&currentPage=1&listtype=0>
