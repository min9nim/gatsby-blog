---
layout: post
title:  "[python] SimpleHTTPServer"
date:   2018-04-20 13:00:00 +0900
categories: memo
tags: [SimpleHTTPServer, python]
---
#### Problem
로컬에 서버가 설치되어 있지 않지만 간단하게(3초 안에) 웹서버를 띄우고 싶다
<br>
<br>

#### Solution
1. python 이 설치되어 있다면,  _DOCUMENT_ROOT_ 경로에서 `$ python -m SimpleHTTPServer` 를 실행한다.
2. 브라우져에서 `http://127.0.0.1:8000` 로 붙어 본다.
<br>
<br>

#### Ref.
<http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/>{:target="_blank"}
