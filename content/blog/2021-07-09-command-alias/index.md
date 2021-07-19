---
layout: post
title: '자주 사용하는 터미널 명령어 별칭'
date: 2021-07-09 00:01
tags: [command, alias]
description: 자주 사용하는 터미널 명령어들에 별칭을 생성해서 사용하면 손가락 건강에 이롭다.
draft: false
---

자주 사용하는 터미널 명령어들에 별칭을 생성해서 사용하면 손가락 건강에 이롭다.


자신이 사용하는 셀 설정 파일에서

> `~/.bash_profile` or `~/.zprofile`


아래와 같이 자주 사용하는 터미널 명령들은 별칭을 셍성하여 생산성을 한단계 높여보자!

```shell script
alias gpushud="git push upstream develop"
alias gpullud="git pull upstream develop"

alias gpushus="git push upstream staging"
alias gpullus="git pull upstream staging"

alias gpushum="git push upstream master"
alias gpullum="git pull upstream master"

alias gpushod="git push origin develop"
alias gpullod="git pull origin develop"

alias gcde="git checkout develop"
alias gcma="git checkout master"
alias gcst="git checkout staging"
```
