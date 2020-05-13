---
layout: post
title: "expo 개발환경 세팅"
date: 2018-08-27 01:00:00 +0000
categories: react-native
tags: [expo, react-native]
---

Expo는 React Native 를 사용하여 기본 iOS 및 Android 프로젝트를 구축 할 수 있는 빌드&테스트 환경을 제공한다.

1. 장점

- Xcode, Android Studio 없이도 iOS, Android 앱 개발이 가능하다.
- Windows 에서도 아이폰(테스트장비)만 있으면 iOS앱 개발(테스트)이 가능하다

1. 단점

- 아직 확인 안됨(아직 처음 써보는 중이라 이 부분은 나중에 업데이트 하겠음)

이 글에서는 expo 를 세팅하는 방법을 간략히 소개한다.

<br>

### 세팅

로컬환경에 expo-cli 설치시 관리자 권한으로 전역에 설치를 한다.

```bash
$ sudo npm i -g expo-cli
```

버젼확인(현시점 2018-08-27)

```bash
$ expo --version
1.1.0-beta.6
```

<br>

### 프로젝트 생성

아래와 같이 초기 템플릿 프로젝트를 생성한다

```
$ expo init my-new-project
```

앱 실행

```bash
$ cd my-new-project
$ expo start
```

<br>

### Ref.

<https://expo.io/learn>
