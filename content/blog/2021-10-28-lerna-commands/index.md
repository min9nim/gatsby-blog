---
layout: post
title: 'lerna 명령어'
date: 2021-10-28 00:01
tags: [command, lerna]
description: 
draft: false
---

지주 사용되는 lerna 주요 명령어들을 살펴본다.

## 패키지별 명령 실행

package.json 의 scripts 설정에 a 명령어가 있는 모든 패키지들의 a 명령을 수행
```
lerna run a
```

특정 scope 에 속한 a 명령어만 실행. 이 때 scope 은 package.json 에 정의된 패키지의 이름입니다. 
```
lerna add a --scope=b  
```


## 의존성 설치
```
lerna add a --scope=b

# add package "a" to multiple packages
lerna add a --scope=b --scope=c --scope=d  
```


## Ref.
- https://futurestud.io/tutorials/lerna-install-dependencies-for-a-specific-package
