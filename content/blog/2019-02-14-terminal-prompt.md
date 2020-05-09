---
layout: post
title:  "[mac] 터미널 프롬프트 포맷 변경"
date:   2019-02-14 00:10
categories: mac
tags: [mac]
---
터미널 프롬프트의 포맷을 변경하려면 `~/.bash_profile` 파일을 만진다.

<br>

~/.bash_profile 에 아래 내용 추가
```
# Git branch in prompt.
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\w\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```

<br>

위와 같이 설정을 하면 아래와 같은 프롬프트를 얻을 수 있다
<br>

<img src="/images/prompt.png" style="width: 500px">

프롬프트 설정시 아래와 같은 값을 사용할 수 있다
```
\d – Current date
\t – Current time
\h – Host name
\# – Command number
\u – User name
\W – Current working directory (ie: Desktop/)
\w – Current working directory with full path (ie: /Users/Admin/Desktop/)
```

<br>

#### Ref
<http://osxdaily.com/2006/12/11/how-to-customize-your-terminal-prompt/>
