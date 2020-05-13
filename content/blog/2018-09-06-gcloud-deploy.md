---
layout: post
title: "GCP App Engine 에 node_modules 폴더 배포 문제"
date: 2018-09-06 09:00
categories: cloud
tags: [google-cloud, node_modules, deploy]
---

이 글은 Google Cloud 의 App Engine 을 이용해 Node 프로젝트를 서비스할 경우 만날 수 있는 배포 관련 문제를 공유하기 위해 작성되었다

<br>

### 문제상황

노드 프로젝트의 변경사항을 배포할 때 서비스 운영에 필요하지 않은 파일들은 일반적으로 `.gcloudignore` 파일에 등록하여 배포내역에 포함되지 않게 한다. 특별히 `node_modules` 폴더는 사이즈가 워낙 크기 때문에(npm dependency 모듈들의 내용이 변하지 않는 한) `.gcloudignore` 파일에(베포금지 목록) 꼭 포함시켜야 한다.

사용 예)

```
# ~~ 생략 ~~
node_modules/
src/
express.log
LICENSE
nohup.out
README.md
# ~~ 생략 ~~
```

그러나 실제로 npm모듈에 변경사항이 발생할 경우에는 `node_modules` 폴더를 배포할 필요가 있다.

실제로 `React.Fragment` 기능을 사용하기 위해 최근 리액트 버젼을 기존 15에서 16버젼으로 업그레이드 했었다. 당연히 16버젼의 react 모듈을 배포할 필요가 있었기에 `.gcloudignore` 에서 `node_modules` 폴더 항목을 주석처리 하고

```
# ~~ 생략 ~~
#node_modules/
src/
express.log
LICENSE
nohup.out
README.md
# ~~ 생략 ~~
```

배포(`gcloud app deploy`)를 수행하자 약 한시간? 정도 시간이 소요되고 아래와 같은 오류를 만났다.

```
ERROR: (gcloud.app.deploy) Error Response: [400] This deployment has too many files. New versions are limited to 10000 files for this app.
```

예전엔 안 그랬던 것 같은데 최근 gcloud-cli 도구에서 배포파일 개수에 제약사항이 생긴 것 같다. 실제로 내가 배포하려고 했던 `node_modules` 폴더에 포함된 파일개수는 2만개가 넘었다.(처음부터 미리 알려주었으면 좋았을텐데 업로드 작업이 다 끝난? 후에 이런 오류 메세지를 표시하는 부분은 좀 아쉬웠다)

<br>

### 해결방법

아래와 같이 `node_modules` 폴더 안에 배포가 필요한 모듈들만 배포금지 목록에서 다시 예외처리하면 변경된 리액트모듈만 배포를 할 수 있다.

```
# ~~ 생략 ~~
node_modules/
!node_modules/react/
!node_modules/react-dom/
src/
express.log
LICENSE
nohup.out
README.md
# ~~ 생략 ~~
```

`gcloud app deploy`를 이용한 배포는 기존 배포내역을 전부 삭제하고 새로운 배포내역으로 교체되는 식으로 업로드 되는 것이 아니라 기존 배포사항은 그대로 두고 그 위에 **추가 배포내역들을 덮어쓰기로 업로드** 한다는 것을 기억하자.

또한 기존 배포내역과 비교해서 다른 부분만 배포가 되는 것 같다...(이 부분은 구체적인 확인 필요)

<br>

### Ref.

<https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore>
