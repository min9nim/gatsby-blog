---
layout: post
title: '[mac] 기본 shell 변경'
date: 2019-11-22 00:10
categories: mac
tags: [mac, shell]
---
실수로 잘 사용하던 기본 shell 을 바꿔먹어서 이상한 shell 이 나타나 무척 당황했었다;

맥에서 기본 shell을 변경하는 방법을 간단히 정리하고 넘어간다.

<br>

맥 기본 bash 사용
```
chsh -s /bin/bash
```

<br>

기본 설치된 shell 목록 확인
```
cat /etc/shells
```

<br>

#### Ref.
- https://www.howtogeek.com/444596/how-to-change-the-default-shell-to-bash-in-macos-catalina/