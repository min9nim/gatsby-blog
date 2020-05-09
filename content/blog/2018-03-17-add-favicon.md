---
layout: post
title:  "jekyll 사이트 favicon 추가하기"
date:   2018-03-17 17:00:00 +0900
categories: memo
tags : [favicon]
---

#### jekyll 테마 변경 가이드  
<https://jekyllrb.com/docs/themes/#overriding-theme-defaults>{:target="_blank"}  
<br>

#### 기본테마 경로  
```
$ bundle show minima
/Library/Ruby/Gems/2.3.0/gems/minima-2.1.1
```
해당 테마의 기본 템플릿 자원(아래 4개 폴더)을 서비스 할 jekyll 경로로 복사한다
```
/assets  
/_layouts  
/_includes  
/_sass
```
<br>

#### 파비콘 업로드
* 파비콘 이미지를 /assets/ 경로에 업로드  
* 파비콘 이미지가 준비되어 있지 않다면 직접 만들어 볼 수 도 있다  
  <http://www.degraeve.com/favicon/>{:target="_blank"}


<br>


#### 수정파일
1. */_config.yml* 에 `asset_url: /assets` 추가  
![코드](/images/config.yml.png)
1. */_include/head.html* 12라인 favicon 설정 추가
  <script src="https://gist.github.com/min9nim/b61230296c6b9d755a77cf0fc4639fbe.js"></script>
