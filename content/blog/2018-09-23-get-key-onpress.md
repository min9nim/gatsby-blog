---
layout: post
title: "[React Native] onPress 이벤트에서 key값 참조 방법"
date: 2018-09-23 01:00
categories: react-native
tags: [onPress]
---

react-native 에서 루프 안의 key 값을 참조하는 방법을 몰라 한참 헤맸다.
ReactNativeComponentTree 를 이용하거나 props 를 이용한 wrapper 컴포넌트를 만드는 방법들이 있었지만 다 좀 지저분하고 복잡하고 잘 안 되었는데 간단한 해결방법을 찾았다.

그냥 클로져를 이용해서 값을 직접 전달하는 것이었다.
그뤠~잇!

```javascript
onPressTitle(postKey) {
  this.setState({postKey});
}

render() {
  return (
    <View>
      {this.state.posts.map(post => {
          return (
            <TouchableHighlight key={post.key} onPress={(e) => {this.onPressTitle(post.key)}}>
              <View>
                <Text>{post.title}</Text>
              </View>
            </TouchableHighlight>
          )
        })}
    </View>
  );
```

<br>

#### Ref.

<https://stackoverflow.com/questions/51667421/get-key-and-item-onpress-touchableopacity-when-items-are-map>
