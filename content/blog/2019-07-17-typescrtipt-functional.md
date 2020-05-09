---
layout: post
title:  "타입스크립트와 함수형프로그래밍"
date:   2019-07-17 00:10
categories: funtional
tags: [typescript, funtional, ramda]
---
타입스크립트와 함수형프로그래밍을 함께 콜라보레이션으로 사용하면서 느낀 점을 간단하게 공유해 본다

<br>

#### 자바스크립트
자유분방한 동적언어로 탄생한 자바스크립트는 모든 것이 동적이고 유연하다. 그 유연함과 자유함으로 객체지향 프로그래밍이든 함수형프로그래밍이든 프로그래머가 원하는데로 코딩이 가능했다. 자유도가 많은 만큼 잘못된 길?로 가는 선택과 결과도 모두 프로그래머의 몫이 되었다

어디로 튈지 모르는 자유분방한 언어인 자바스크립트를 조금 더 정숙?하게 사용하고자 타입스크립트가 등장한다.

<br>

#### 타입스크립트
타입시스템을 갖추지 못한 자바스크립트에게 타입시스템의 옷을 입혔다. 반바지에 슬리퍼를 신고 다니던 자바스크립트가 말끔한 정장차림에 구두를 신은 것 같은 모습이랄까. 이제 런타임 전에 정밀한 타입체크가 가능해 졌다.

별거 아닌 typeError 로 런타임에 시도 때도 없이 멈춰버리던 애플리케이션들이 좀 더 안정적으로 돌아가기 시작했다. 또한 정적 타입시스템 덕분에 코딩시 IDE의 전폭적인 도움을 받을 수 있게 된 것은 개이득이다.

하지만 모든 일에는 득실이 함께 있기 마련이다. 타입스크립트가 주는 안정감과 편안함을 누리기 위해 개발자는 꼼꼼하게 타입정의를 해주어야 하며 그를 위해 필요한 학습량과 작업량이 또한 적지 않다. 가끔은 로직을 작성하는 일보다 타입을 적절히 정의하는 일에 더 많은 시간을 쓰기도 한다.

그럼에도 불구하고 타입스크립트는 참 좋은 시도다. 타입스크립트는 앞으로도 계속 성장하고 발전할 것이라고 본다.

<br>

#### 함수형프로그래밍
자바스크립트의 인기가 여전히 식지 않게 하는 또 다른 축은 함수형프로그래밍이다. 완벽하진 않지만 그럴듯하게 함수형프로그래밍이 가능하다는 것은 자바스크립트의 지속적인 성장에 또 다른 날개를 더 한다.

개발자들은 오래동안 SW의 복잡성과 싸워왔다. SW는 나이를 먹을 수록 복잡성이 증대되는 존재론적 특성을 벗어날 수 없다. 이 복잡성을 통제할 수단으로 개발자는 추상화라는 무기를 사용한다. 함수형프로그래밍은 추상화의 기본 단위로서 함수를 사용한다. 객체지향프로그맹에서는 물리적인 현실세계의 문제를 직관적으로 모델링하기 위해 클래스와 객체를 사용했다. 어떤 면에서 함수형프로그래밍은 객체지향프로그래밍과 참 대조적이다. (엄밀하게 말하면 함수형프로그래밍의 반대 개념은 절차적/명령형 프로그래밍에 더 가깝다) 객체지향프로그래밍은 상태와 함수를 결합하여 객체 단위로 SW를 설계하지만, 함수형프로그래밍은 철저하게 데이터(상태)와 로직(함수)을 분리하기 때문이다.

객체지향프로그래밍에서는 객체의 상태가 언제나 중요하다. 소스를 수정할 때는 언제나 객체의 상태를 추적해야 했다. 객체의 상태에 따라 결과가 달라지기 때문이다.

반면에 함수형프로그래밍은 데이터와 로직을 분명히 구별함으로써 로직에만 집중할 수 있게 해준다. 사실 개발자에게 프로그래밍이라는 것은 본래 로직을 작성하는 일이 아니었나. 하지만 우리는 로직을 작성할 때 늘 변수의 상태값을 추적해야만 했다. 하지만 함수형프로그래밍에서는 더 이상 변수의 값을 추적하지 않아도 된다. 또한 순수함수들의 조합으로 SW를 설계하고 빌드해 나가기 때문에 side-effect 에서 보다 자유로워 질 수 있다

<br>

#### 타입스크립트 & 함수형프로그래밍
이 둘을 함께 사용한다면 어떨까. 함수형프로그래밍은 자바스크립트의 유연함에 기반하지만 타입스크립트는 자바스크립트에 엄격함을 요구한다. 이 둘의 장점을 조화롭게 섞어 이용하는 것이 적절한 시도일까. 필자의 짧은 경험에 의하면 충분히 가능하다! 하지만 역시 그에 따른 수고로움이 필요하다.

구체적으로 어떤 수고로움이 필요한 것일까.

<br>

1\. 당연히 타입정의가 먼저 필요하다.
필자가 주로 사용하는 함수형 라이브러리 ramdajs 에서는 pipe 함수에 대한 타입을 아래와 같이 장황하게 제공한다. 특별히 `pipe` 의 타입 정의를 보면 10개의 인자까지만 타입 정의가 되어 있는데 그 이상의 인자를 사용하고자 할 경우엔 또 따로 추가를 해주어야 한다.

```javascript
  interface Static {
    includes(__: Placeholder, list: ReadonlyArray<string> | string): (s: string)  => boolean;
    includes<T>(__: Placeholder, list: ReadonlyArray<T>): (target: T) => boolean;

    pipe<T1>(fn0: () => T1): () => T1;
    pipe<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;
    pipe<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1;
    pipe<V0, V1, V2, T1>(fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T1;

    pipe<T1, T2>(fn0: () => T1, fn1: (x: T1) => T2): () => T2;
    pipe<V0, T1, T2>(fn0: (x0: V0) => T1, fn1: (x: T1) => T2): (x0: V0) => T2;
    pipe<V0, V1, T1, T2>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2): (x0: V0, x1: V1) => T2;
    pipe<V0, V1, V2, T1, T2>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2): (x0: V0, x1: V1, x2: V2) => T2;

    pipe<T1, T2, T3>(fn0: () => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): () => T3;
    pipe<V0, T1, T2, T3>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x: V0) => T3;
    pipe<V0, V1, T1, T2, T3>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x0: V0, x1: V1) => T3;
    pipe<V0, V1, V2, T1, T2, T3>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x0: V0, x1: V1, x2: V2) => T3;

    pipe<T1, T2, T3, T4>(fn0: () => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): () => T4;
    pipe<V0, T1, T2, T3, T4>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x: V0) => T4;
    pipe<V0, V1, T1, T2, T3, T4>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x0: V0, x1: V1) => T4;
    pipe<V0, V1, V2, T1, T2, T3, T4>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x0: V0, x1: V1, x2: V2) => T4;

    pipe<T1, T2, T3, T4, T5>(fn0: () => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): () => T5;
    pipe<V0, T1, T2, T3, T4, T5>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x: V0) => T5;
    pipe<V0, V1, T1, T2, T3, T4, T5>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x0: V0, x1: V1) => T5;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x0: V0, x1: V1, x2: V2) => T5;

    pipe<T1, T2, T3, T4, T5, T6>(fn0: () => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): () => T6;
    pipe<V0, T1, T2, T3, T4, T5, T6>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): (x: V0) => T6;
    pipe<V0, V1, T1, T2, T3, T4, T5, T6>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): (x0: V0, x1: V1) => T6;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
        fn0: (x0: V0, x1: V1, x2: V2) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6): (x0: V0, x1: V1, x2: V2) => T6;

    pipe<T1, T2, T3, T4, T5, T6, T7>(
        fn0: () => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn: (x: T6) => T7): () => T7;
    pipe<V0, T1, T2, T3, T4, T5, T6, T7>(
        fn0: (x: V0) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn: (x: T6) => T7): (x: V0) => T7;
    pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7>(
        fn0: (x0: V0, x1: V1) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7): (x0: V0, x1: V1) => T7;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(
        fn0: (x0: V0, x1: V1, x2: V2) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7): (x0: V0, x1: V1, x2: V2) => T7;

    pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
        fn0: () => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn: (x: T7) => T8): () => T8;
    pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
        fn0: (x: V0) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn: (x: T7) => T8): (x: V0) => T8;
    pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(
        fn0: (x0: V0, x1: V1) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8): (x0: V0, x1: V1) => T8;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(
        fn0: (x0: V0, x1: V1, x2: V2) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8): (x0: V0, x1: V1, x2: V2) => T8;

    pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        fn0: () => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9): () => T9;
    pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        fn0: (x0: V0) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9): (x0: V0) => T9;
    pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        fn0: (x0: V0, x1: V1) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9): (x0: V0, x1: V1) => T9;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        fn0: (x0: V0, x1: V1, x2: V2) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9): (x0: V0, x1: V1, x2: V2) => T9;

    pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        fn0: () => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9,
        fn9: (x: T9) => T10): () => T10;
    pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        fn0: (x0: V0) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9,
        fn9: (x: T9) => T10): (x0: V0) => T10;
    pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        fn0: (x0: V0, x1: V1) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9,
        fn9: (x: T9) => T10): (x0: V0, x1: V1) => T10;
    pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        fn0: (x0: V0, x1: V1, x2: V2) => T1,
        fn1: (x: T1) => T2,
        fn2: (x: T2) => T3,
        fn3: (x: T3) => T4,
        fn4: (x: T4) => T5,
        fn5: (x: T5) => T6,
        fn6: (x: T6) => T7,
        fn7: (x: T7) => T8,
        fn8: (x: T8) => T9,
        fn9: (x: T9) => T10): (x0: V0, x1: V1, x2: V2) => T10;    
  }
```

하지만 타입을 제공하지 않거나 제공된 타입에 빠져있는 것이 있다면 아래와 같이 수동으로 필요한 타입을 추가해야 한다

```typescript
declare namespace R {
  interface Filter {
    (fn: (value: string) => boolean, list: string[]): string[];
  }
  interface Static {
    includes(__: Placeholder, list: ReadonlyArray<string> | string): (s: string)  => boolean;
    includes<T>(__: Placeholder, list: ReadonlyArray<T>): (target: T) => boolean;
  }
}
```
그래도 이렇게 한번 타입을 정의해 놓으면 이후에는 거의 수정될 일이 없다는 것은 다행스런 일이다.

<br>

2\. 함수 호출시 사용될 타입을 명시해야 한다.
아래는 [ramdajs](https://ramdajs.com/docs) 의 pipe, prop, includes 를 사용한 코드의 일부이다. pipe 함수 사용시 아래와 같이 사용되어질 타입을 명시해야 한다
```typescript
pipe<IType, string, boolean>(
    prop('__typename'),
    includes(_, queryTypes),
),
```






