---
layout: post
title:  "[GIT] 여러가지 .gitignore 설정 옵션"
date:   2018-11-29 00:10
categories: git
tags: [gitignore]
---
git에서 특정 폴더나 파일을 추적하지 않고자 할때 `.gitignore` 파일을 프로젝트 루트 경로에 넣어둔다. 하지만 다양한 요건에 대한 `.gitignore` 의 디테일한 설정은 다소 까다롭고 기억하기에 어려움이 있다.

본 문서는 `.gitignore` 설정 관련해서 주요 내용을 경험할 때마다 지속적으로 업데이트할 예정이다.

```
# 파일이름을 넣으면 모든 디렉토리에서 해당 파일 무시
ignore-file.txt

# /로 끝나면 해당 디렉토리 전체를 무시
ignore-dir/

# 와일드카드도 사용가능
ignore-file*
*.log
```


<br>

#### Ref.
- <http://trend21c.tistory.com/1471>
- <https://hyeonseok.com/soojung/dev/2016/07/12/797.html>
