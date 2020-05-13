---
layout: post
title: "ie11 팝업창 로딩 중 닫을 때 crash 문제"
date: 2018-08-24 01:00:00 +0000
categories: FrontEnd
tags: [ie11, HangRecovery, crash, popup]
---

ie11 에서 팝업을(window.open) 사용할 때, 팝업창 로드가 끝나기 전에 브라우져의 닫기버튼을 클릭하면 ie11에서 crash 가 발생하며 부모창까지 닫혀 버리는 문제가 발생할 수 있다.

<br>

### 재현방법

1. 부모창에서 window.open 을 이용해 팝업창을 연다
1. 팝업창의 스크립트가 수행 중인 순간(무한루프)이나 sync통신으로 서버응답을 기다리고 있는 중에
1. 팝업창의 닫기버튼을 클릭해 강제로 닫으면
1. ie11 이 크래시 된다
1. 이때, _"인터넷옵션 - 고급 - 자동 크래시 복구 사용"_ 설정에 따라
   1. 해당 설정이 체크되어 있으면 ie11 크래시 이후 부모창이 자동으로 다시 열리고
   1. 체크 해제된 경우에는 자식창 부모창 모두 한꺼번에 닫힌다

<br>

### 재현샘플 sync통신 예제

1. 클라이언트

```javascript
var r = new XMLHttpRequest()
r.open("POST", "/delay.jsp", false) // 3번째 인자를 false로 세팅(sync)
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return
  alert("Success: " + r.responseText)
}
r.send("banana=yellow")
```

1. 서버

```java
<%@ page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"
%><%
try {
    Thread.sleep(3000);     // 3초 지연
} catch (InterruptedException e) {
    System.out.println(e.getMessage());
}
%>hello
```

<br>

### 재현샘플 무한루프 예제

클라이언트

```javascript
for(var i=0; i<100000000>; i++){}       // 루프횟수를 로컬PC 사양에 따라 적당히 조정한다
```

<br>

### 원인

해당 문제는 ie9부터 탑재된 HangRecovery 기능과 관련이 있다
<https://blogs.msdn.microsoft.com/ie/2011/04/19/hang-resistance-in-ie9/>

<br>

### 해결방법

아래와 같이 레지스트리를 수정하고 윈도우를 재기동하면 위와 같은 문제가 발생하지 않는다

```
Path: HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main
Name: HangRecovery
Type: REG_DWORD
Value: 0
```
