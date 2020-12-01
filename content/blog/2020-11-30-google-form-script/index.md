---
layout: post
title: '구글설문지 제출시 결과를 DB로 자동 수집하기'
date: 2020-11-30 00:10
tags: [google-form]
description: 
draft: true
---

요즘 시장 조사 및 서비스 만족도 조사등을 위해 구글 폼을 많이 사용합니다. 구글 폼을 이용하면 손쉽게 설문양식을 생성할 수 있고 배포할 수 있으며 실시간으로 취합된 응답결과를 확인할 수 있어 편리합니다. 하지만 많은 경우에 설문 결과를 취합하는 것만으로 관련 일이 끝나지는 않을 것 같습니다. 설문조사를 시작했다면 그 응답 결과를 활용할 목적이 있었을 것이고 해당 결과들을 이용한 다양한 이후 처리 작업들이 기다리고 있을 것입니다. 

이 글에서는 특별히 구글 설문지 양식이 제출될 때의 이벤트를 이용해 설문지 응답결과를 api 호출을 통해 DB에 자동으로 적재하는 방법에 대한 방법을 안내합니다.

<br>

### Google Apps Script
제가 소개하고자 하는 내용은 사실 [Google Apps Script](https://developers.google.com/apps-script) (이하 `구글스크립트`) 라는 도구의 아주 작은 일부 사용 사례입니다. 구글스크립트 를 이용하면 구글설문지 뿐만 아니라 모든 구글문서 도구의 반복적인 작업들을 자동화할 수 있습니다.

본 글에서는 특별히 구글 설문지 양식의 제출 이벤트를 처리하는 방법에 대해서만 소개를 하고자 합니다.

<br>

### 사전 준비사항
- 준비된 설문지
- 호출 가능한 RESTful API 엔드포인트

설문지 양식 제출시 스크립트를 추가하기 위해 아래 절차대로 진행을 합니다

### 1. 설문지에 스크립트 추가하기
설문지 관리 화면에서 `스크립트 편집기` 메뉴를 선택합니다
![](https://telegra.ph/file/6e7b995b4de85f93e6bcc.png)

### 2. 스크립트 코드 삽입
아래 코드를 삽입하고 저장 버튼을 클릭합니다.

```js
function onSubmit(e) {
  const items = e.response.getItemResponses()

  const results = items.map(item => ({
    id: item.getItem().getId(),
    type: item.getItem().getType(),
    title: item.getItem().getTitle(),
    response: item.getResponse(),
  }))

  UrlFetchApp.fetch('https://echo-api.vercel.app/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      formId: e.source.getId(),
      formTitle: e.source.getTitle(),
      results: results,
    }),
  })
}
```
![](https://telegra.ph/file/c99c5007967c3dd0c2070.png)


### 권한파일 추가
`보기` 메뉴에서 `메니페스트 파일 표시` 선택

![](https://telegra.ph/file/903dd28b69c1adce9863f.png)

아래 `oauthScopes` 설정을 추가 후 저장

```json{7-9}
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
     "https://www.googleapis.com/auth/script.external_request"
   ]
}
```

### 트리거 설정

`수정` 메뉴에서 `현재 프로젝트의 트리거` 선택
![](https://telegra.ph/file/41ae2aace73ef228d7ad5.png)

![](https://telegra.ph/file/eff3c99e978015dd4eb66.png)

### 스크립트 사용 권한 승인

계정을 선택하여 권한을 부여합니다.

![](https://telegra.ph/file/466bea975bc2fd7d7a0c4.png)

![](https://telegra.ph/file/80fe2732121f3d2957f47.png)

![](https://telegra.ph/file/67a4c26667cf23808128a.png)

![](https://telegra.ph/file/41e9eec011b32582b86d0.png)



### 완료
해당 스크립트에 트리거가 설정된 것을 확인할 수 있습니다.

![](https://telegra.ph/file/3784a2e4717a14c5cb3d5.png)

### 테스트
다음과 같은 설문지로 테스트를 하면,
![](https://telegra.ph/file/107aad7cc1bf0a2acb127.png)

api로 전송되는 결과는 아래와 같습니다.
![](https://telegra.ph/file/280bd1d4db70366a4bf30.png)



이미지) https://telegra.ph/dddddd-12-01
