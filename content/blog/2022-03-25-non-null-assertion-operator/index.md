---
layout: post
title: 'react-query 와 suspense 옵션 그리고 Non-null assertion operator'
date: 2022-03-25 00:01
tags: [non-null-assertion]
description: 
draft: false
---

react-query 에서 suspense 모드를 사용할 때,

reqct-query 가 리턴하는 데이터는 undefined 일 수 있기 때문에, 이후 로직에서 data 를 사용할 때는 data 가 undefined 인 경우에 대한 예외처리를 반드시 해주어야 한다.

그런데.. 사실 suspense 모드를 사용한다는 것은 data 가 undefined 인 경우를 가정하고 싶지 않기 때문일 것이다. 하지만 어떻게든 타입 에러를 제거하려면 관련 예외처리 코드를 추가하거나 옵셔널체이닝 연산자를 사용해야 하는데.. 둘다 만족스런 해결책은 아니다.

불필요한 예외처리 관련 분기문을 추가하는 것 보다는 옵셔널체이닝을 사용하는 것이 낫지만, 옵셔널체이닝을 사용한다는 것은 데이터가 undefined 인 경우를 인정한다는 의미이고 표현이다.

사실 나는 data 가 undefined 인 상황은 논리상 없다고 자신할 수 있다면 이럴 경우에는 TS에게 절대 undefined 일 수 없다고 알려줄 수 있다.

그때 필요한 것이 바로 Non-null assertion operator 이다.

Non-null assertion operator 를 사용하면 그나마 훨씬 마음이 편안해 질 수 있다!


