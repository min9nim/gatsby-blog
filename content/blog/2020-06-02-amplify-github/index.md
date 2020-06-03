---
layout: post
title: 'AWS Amplify x GitHub 기반 CI/CD 설정'
date: 2020-06-02 00:10
tags: [AWS, amplify, GitHub, CI/CD]
description:
---

AWS Amplify 는 잘 모르겠는데.. 애플리케이션을 배포햐는 Serverless 클라우드 플랫폼의 하나라고 보면 될 듯하다. Heroku, Netlify, Vercel 등은 사용해 보았지만 AWS 의 Amplify 는 이번에 처음 사용을 해보았다.

GitHub 특정 레포지토리를 연결해서 자동으로 배포 설정하는 것 까지는 어렵지 않았다. 특정 레포지토리를 연결하게 되면 브랜치별 자동 배포설정을 수월히 진행할 수 있다.

1. 특정 브랜치의 웹훅 생성

2. GitHub 액션을 이용해 웹훅 호출
