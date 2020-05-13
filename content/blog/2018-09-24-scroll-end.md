---
layout: post
title: "[React Native] ScrollView 사용시 스크롤이 bottom에 닿을 때 처리"
date: 2018-09-24 00:30
categories: react-native
tags: [ScrollView]
---

무한 스크롤링과 같이 스크롤이 마지막에 닿았을 때 처리를 하고자 할 때 고려해야 할 변수는 아래와 같다.

| no  | value                                  | 의미                        |
| --- | -------------------------------------- | --------------------------- |
| 1   | e.nativeEvent.layoutMeasurement.height | 현재 보여지는 화면의 높이값 |
| 2   | e.nativeEvent.contentOffset.y          | 현재 스크롤 값              |
| 3   | e.nativeEvent.contentSize.height       | 전체 문서의 높이            |

결국, `1번 + 2번 >= 3번` 조건을 만족하는 경우가 스크롤이 화면의 마지막에 닿았을 때가 된다.

그런데 실제로는 1번 + 2번 값 자체가 3번보다 작을 수 있다(status bar의 유무에 따라 다른건지 뭔지 정확한 이유는 모르겠다). 이럴 경우 경우 아래 소스와 같이 적절한 `paddingToBottom` 값을 이용하여 적절하게 보정한다.

```javascript
onScroll = {
  (e) => {
    let paddingToBottom = 1;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    // console.log(Math.floor(paddingToBottom) + "-" + Math.floor(e.nativeEvent.contentOffset.y) + "-" + Math.floor(e.nativeEvent.contentSize.height));
    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
      this.scrollEnd();
    }
  }
```

<br>

#### Ref.

<https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end>
