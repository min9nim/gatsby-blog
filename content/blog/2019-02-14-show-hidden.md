---
layout: post
title:  "[mac] Finder에서 숨김파일 보기"
date:   2019-02-14 00:10
categories: mac
tags: [mac]
---
맥의 파일탐색기인 Finder 에서는 기본적으로 숨김파일이 보이지 않는다. 숨김파일을 Finder에서 볼 수 있는 방법은 다음과 같다


#### 숨김파일 보기 단축키
아래 단축키를 이용하면 임시적으로 숨김파일을 볼 수 있다. (토글방식)
```
Command + Shift + .
```

<br>

#### 숨김파일 보여주기 설정 변경
터미널에서 아래 명령을 실행하면 Finder의 숨김파일 숨김 기본설정을 변경할 수 있다
```
$ defaults write com.apple.Finder AppleShowAllFiles true
```

<br>

#### Ref
- https://macnews.tistory.com/5286
 -https://www.macworld.co.uk/how-to/mac-software/show-hidden-files-mac-3520878
