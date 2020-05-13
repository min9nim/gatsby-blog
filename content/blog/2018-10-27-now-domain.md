---
layout: post
title: "[Now] 신규 배포앱에 간단한 URL별칭 부여하기"
date: 2018-10-27 00:30
categories: memo
tags: [zeit, now, domain]
---

now 를 이용해 앱을 배포하면 아래와 같은 모양의 매번 새로운 URL을 생성된다. 앱을 업데이트할(배포) 때마다 URL이 바뀌기 때문에 운영상의 불편함이 발생한다.

```
https://sharelink-backend-yukanafgbt.now.sh/
```

이에 대한 해결방안으로 간단하고 쉬운 도메인으로 별칭을 부여할 수 있다.

```
$ now alias https://sharelink-backend-yukanafgbt.now.sh/ sharelink-backend
> Assigning alias sharelink-backend to deployment sharelink-backend-yukanafgbt.now.sh
> Success! sharelink-backend.now.sh now points to sharelink-backend-yukanafgbt.now.sh [3s]
$
```

이제 깔끔한 도메인(`https://sharelink-backend.now.sh/`)으로 서비스를 이용할 수 있다. 이와 같은 `now alias` 기능은 서비스의 중단없이 서비스를 지속할 수 있게 하는 장점을 제공한다.

물론 매번 새로운 배포시마다 별칭을 새롭게 설정해야하는 일은 여전히 귀찮은 일이 된다.

<br>

#### Ref.

<https://zeit.co/docs/features/aliases#creating-aliases>
