---
layout: post
title:  "[vue] 뷰 컴포넌트 이름이 필요한 이유"
date:   2019-08-14 00:10
categories: vue
tags: [vue, typescript, nuxt]
---
뷰 컴포넌트 이름이 필요한 경우를 전혀 찾지 못하다가 필요한 경우를 발견해서 기록을 남겨둔다.

<br>

#### 뷰 컴포넌트의 이름을 정의하는 2가지 방법(class based)
1\. @Component 에 등록하는 방법
```typescript
@Component({
  name: 'Overview',
  components: {Comment},
  filters: {
    phoneNumber,
  },
})
export default class extends Vue {
```

2\. 클래스 이름으로 정의하는 방법
```typescript
@Component({
  components: {Comment},
  filters: {
    phoneNumber,
  },
})
export default class Overview extends Vue {
```

2가지가 함께 정의되어 있을 경우에는 1번 설정이 우선한다

<br>

#### 이름을 정의하지 않을 경우 장단점
1. 장점
    - 타이핑을 줄일 수 있다
    - 파일명 변경시 명시했던 이름을 함께 수정해야 할 지 고민을 할 필요가 없다(이름이 없으므로)
1. 단점
    - 뷰 개발자도구에서 컴포넌트 이름이 표시되지 않는다


![image](/images/vue-comp-name1.png)

이름을 정의하면 아래와 같이 이름이 예쁘게 표시되어 뷰개발자도구를 사용할 때 컴포넌트 구조를 쉽게 파악할 수 있다(`Default1` 은 아직 이름 정의가 안 된 컴포넌트들;)

![image](/images/vue-comp-name2.png)


참고) pages 에 등록된 컴포넌트는 이름을 따로 정의하지 않아도 넉스트가 내부적으로 파일명을 이용해 정의해주는 것 같다.

<br>

#### TL;DR
1. 뷰개발자도구를 적극적으로 이용할 필요가 있다면 이름을 명시하는 것이 더 나을 수 있다
1. 이름을 명시적으로 정의해야할 다른 이유는 더 있을 수도 있다(아직 내가 모르겠다)
