---
layout: post
title: 'npm 모듈 배포'
date: 2019-11-22 00:10
categories: npm
tags: [npm, publish]
---

처음으로 npm 모듈 배포를 실습해 보았다. 몰라서 고생했던 내용들만 내 맘대로(내가 이해한 만큼만) 축약해 정리해 본다.

<br>

#### 배포명령

프로젝트 루트 경로에서

```
npm publish
```

모듈 배포는 언제나 패키지명&버젼명이 유일해야 한다.

<br>

#### 인증

npm 모듈을 배포하려면 우선 npm 저장소에게 내가 누구인지 알려줘야 한다. npm 은 기본적으로 `.npmrc` 파일을 이용해 사용자정보를 관리한다.

`.npmrc` 는 아래와 같이 npm-auth-token 정보가 담겨 있다.

```
//registry.npmjs.org/:_authToken=blabla
```

해당 파일은 프로젝트 루트, 사용자 홈경로 등에 위치할 수 있다. 자세한 내용은 아래 참고.
https://docs.npmjs.com/files/npmrc

<br>

> 주의) 특별히 npm publish 할 경우에는 프로젝트 루트의 `.npmrc` 는 무시되고 사용자 홈의 `.npmrc` 가 사용된다.

<br>

현재 인증된 사용자 정보는 아래 명령으로 확인할 수 있다

```
npm whoami
```

<br>

#### 중복모듈 체크

배포할 패키지명이 이미 존재하는 지 아래 명령을 통해 확인할 수 있다.

```
npm info <패키지명>
```

간혹 위 명령으로 확인이 되지 않지만 이미 존재하는 패키지명이라 사용할 수 없는 경우도 있다.

<br>

#### 모듈 삭제

아래 명령으로 배포 후 72시간 내에만 삭제가 가능하다.(단, `@somescope/~~` 으로 배포된 개인 모듈들은 72시간 이후에도 삭제가 가능한듯 함..)

```
npm unpublish <패키지명> -f
```

패키지는 저장소에서 삭제가 되더라도 동일한 패키지명과 버젼으로는 다시 배포가 불가능하다.

<br>

#### Ref.

- https://docs.npmjs.com/cli/publish
- https://docs.npmjs.com/cli/unpublish
- https://docs.npmjs.com/files/npmrc
- http://www.daleseo.com/js-npm-publish/
