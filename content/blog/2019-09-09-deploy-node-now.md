---
layout: post
title:  "[now] Node 서버 배포"
date:   2019-09-09 00:10
categories: Node
tags: [zeit, now, deploy, node]
---
작년 이 맘때 [now 서비스를 사용하는 방법](/2018/10/zeit-now/)을 간단히 포스트 한적이 있다. 당시에는 1.0 버젼이었는데 최근? 2.0으로 버젼 업이 되면서 소소하게 적잖은 부분이 변경되었다.

최근 2.0 내용에 맞춰 express 서버를 간단히 now 를 이용해 배포하는 방법을 공유한다. (해당 내용은 본 글에서 다루고자 하는 내용이 아니므로 구체적인 내용 생략)
 
<br>

### 1\. node 프로젝트 작성
간단하게 노드 프로젝트를 작성한다. 깃헙이나 깃랩을 이용할 경우에는 원격저장소를 작접 연결하여 배포가 가능하다

<br>

### 2\. `now.json` 작성
프로젝트 루트경로에 `now.json` 파일을 작성한다. 아래와 같이 해당 프로젝트가 node 프로젝트임을 명시적으로 정의해야 한다
```json
{
  "public": true,
  "version": 2,
  "builds": [{ "src": "src/index.js", "use": "@now/node-server" }],
  "routes": [
    {
      "src": "/webscrap",
      "dest": "/src/index.js",
      "methods": ["POST", "OPTIONS"],
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}
```
\* 사용되는 route 경로를 `now.json` 에도 추가로 정의해 주어야 함에 주의한다

\* cors 설정이 필요하다면 `Access-Control-Allow-Origin` 헤더 추가와 함께 methods 에 `OPTIONS` 항목도 추가해야 한다

<br>

### 3\. package.json에 start, build 명령 작성
package.json 파일에는 반드시 start, build 명령이 포함되어 있어야 한다

<br>

### 4\. 배포
```
now
```
여기까지 배포과정의 전부다.

github 의 특정 레포지토리와 연결하여 프로젝트를 관리하고자 한다면 이후 내용을 참고한다.

<br>

### 5\. github 연동
now.sh 계정과 github 계정의 연동설정을 미리 해두었다면 아래와 같이 now.sh 의 레포지토리가 github 의 특정 레포지토리를 바라보도록 설정할 수 있다.

![](/images/now-github1.png)

<br>

연결할 레포지토리 선택한 후 save
![](/images/now-github2.png)

<br>

연결이 완료되면 아래와 같이 표시됨
![](/images/now-github3.png)

<br>

이제 해당 github 레포지토리에 소스코드를 푸시할 경우 자동으로 now 로 배포가 된다.

![](/images/now-deploy.png)

<br>

### Ref.
- https://github.com/min9nim/webscrap
- https://scotch.io/tutorials/easily-deploy-a-serverless-node-app-with-zeit-now


