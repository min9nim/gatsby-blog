---
layout: post
title: 'Nodejs 에서 optional chaining 사용하기'
date: 2020-11-18 00:10
tags: [js, nodejs, aws-lambda, optional-chaning]
description: 
draft: false
---

AWS Lambda 에서 optional chaining 연산자를 사용하고 싶어서 잠깐 알아봤다.

optional chaining 은 Node14 부터 사용이 가능하다고 한다.
https://stackoverflow.com/a/59574160/8545797

`n` 을 이용해 노드 버젼 관리를 하고 있다면 간단하게 아래와 같이 LTS 버젼을 설치하고 테스트해 볼 수 있다.

```
n lts
```

<br>

> 그런데 AWS Lambda 가 아직 Node14 런타임을 지원하지 않는다.ㅠ

https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
