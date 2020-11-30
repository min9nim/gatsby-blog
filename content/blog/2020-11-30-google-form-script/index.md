---
layout: post
title: '구글설문지 응답 결과를 DB로 자동 수집하는 방법'
date: 2020-11-30 00:10
tags: [google-form]
description: 
draft: true
---

요즘 시장 조사 및 서비스 만족도 조사등을 위해 구글 폼을 많이 사용합니다. 구글 폼을 이용하면 손쉽게 설문양식을 생성할 수 있고 배포할 수 있으며 실시간으로 취합된 응답결과를 확인할 수 있어 편리합니다. 하지만 많은 경우에 설문 결과를 취합하는 것만으로 관련 일이 끝나지는 않을 것 같습니다. 설문조사를 시작했다면 그 응답 결과를 활용할 목적이 있었을 것이고 해당 결과들을 이용한 다양한 이후 처리 작업들이 기다리고 있을 것입니다. 

이 글에서는 특별히 구글 설문지 양식이 제출될 때의 이벤트를 통해 그 결과를 다양하게 활용할 수 있는 방법에 대하여 알아보고 특별히 설문지 응답결과를 api 호출을 통해 DB에 자동으로 적재하는 방법을 소개합니다.

<br>

### Google Apps Script
제가 소개하고자 하는 내용은 사실 [Google Apps Script](https://developers.google.com/apps-script) (이하 `구글스크립트`) 라는 도구의 아주 작은 일부 사용 사례입니다. 구글스크립트 를 이용하면 구글설문지 뿐만 아니라 모든 구글문서 도구의 반복적인 작업들을 자동화할 수 있습니다.

본 글에서는 특별히 구글 설문지 양식의 제출 이벤트를 처리하는 방법에 대해서만 소개를 하고자 합니다.

<br>

### 사전 준비사항
- 준비된 설문지
- 호출 가능한 RESTful API 엔드포인트


### 

### 코드 삽입
코드.gs
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



