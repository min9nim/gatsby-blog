---
layout: post
title:  "[vue] composition-api 에서 watch 사용법"
date:   2019-09-14 00:10
categories: vue
tags: [Frontend, composition-api, vue]
---
뷰의 composition-api 를 적극적으로 프로젝트에 적용해 보고 있는데 아직 관련 문서나 보고된 이슈들이 많지 않아 쉽지가 않다.

watch 메소드를 이용할 때 state 특정 필드의 변화가 생겼을 때만 어떤 처리를 하고자 할 때 사용방법을 공유한다.(기본적인 상황인데도 처리 방법이 공식문서에 소개가 되어 있지가 않았다.)

관련 자료를 찾아보다가 시간을 많이 빼있겼다. 처음부터 차라리 소스를 열어봤으면 금방 원하는 답을 찾을 수 있었을 텐데.. 별것 아니지만 어렵게 알아낸 내용이라 기록을 남겨둔다.

```javascript
import {reactive, watch} from '@vue/composition-api'

export default {
  props: ['visible'],
  
  setup(props, context){
    state = reactive({
      count: 0,
    })
    watch(() => props.visible, (newValue, oldValue) => {
      console.log('props.visible 의 변이가 감지되었을 때 ', {newValue, oldValue})
    })
    watch(() => state.count, (newValue, oldValue) => {
      console.log('state.count 의 변이가 감지되었을 때 ', {newValue, oldValue})
    })
    return {
      state,
    }
  }
}
```