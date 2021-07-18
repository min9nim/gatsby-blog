---
layout: post
title: 'PWA 를 만드는 방법'
date: 2020-06-26 00:10
tags: [pwa]
description: 웹앱이지만 앱처럼 디바이스에 설치가능 모바일장비 & 데스크탑 장비 모두 설치가능 앱처럼 설치 가능하지만 앱스토어나 플레이스토어에 등록할 필요가 없다
draft: false
---

### PWA의 장점

- 웹앱이지만 앱처럼 디바이스에 설치가능
  - 모바일장비 & 데스크탑 장비 모두 설치가능
  - 앱처럼 설치 가능하지만 앱스토어나 플레이스토어에 등록할 필요가 없다
- 웹이기 때문에 앱 업데이트가 필요없다
- 세팅이 간단하다
  - 하지만 네이티브앱의 유려함을 따라가기에는 아직 많이 부족

<br>

### PWA 세팅의 2가지 조건

1. index.html 에서 manifest 설정 파일 연결
   - 앱으로 설치시 아이콘 이미지들에 대한 설정
2. serviceWorker.js 등록
   - 오프라인 모드 동작을 보장

<br>

### 설치가능한 웹앱 설정
설치가능한 웹앱을 만들려면 아래와 같은 조건이 충족되어야 한다

- 먼저 해당 앱이 디바이스에 이미 설치되어 있지 않은 상태여야 한다.
- Be served over HTTPS 
- manifest.json 에 아래 설정 필요
    - `short_name` or `name`
    - `icons`
        - must include a 192px (and a 512px icon)
            - (*but, it works when no 512x icon*)
    - `start_url`
    - `display`
        - must be one of `fullscreen`, `standalone`, or `minimal-ui`
    - `prefer_related_applications`
        - must not be present, or be `false`
- Registers a service worker with a fetch handler        

<br>

### 화면에 PWA 앱 설치 버튼 추가하기

https://www.pwabuilder.com 에서 도움을 받을 수 있음

- 모바일 장비에 설치된 PWA앱을 삭제하는 경우
  - 홈에서 앱을 꾹 눌러서 삭제시 깨끗하게 삭제되지는 않으므로(이 경우 강제종료 상태로만 변경) 완전 제거하고자 할 경우에는 설정-앱관리 메뉴로 들어가서 직접 삭제하여야 한다.
  - 그렇지 않으면 동일한 앱을 다시 설치할 수 없는 문제가 발생할 수 있다.



### Ref
- https://web.dev/install-criteria/
