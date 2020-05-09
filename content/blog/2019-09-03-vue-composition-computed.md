---
layout: post
title:  "[vue-composition-api] computed 속성이 reactive 하지 않을 때"
date:   2019-09-03 00:10
categories: vue
tags: [vue, commposition]
---
아래와 같이 `computed` 속성을 정의하면 `state.eventProps` 가 reactive 하지 않다(변경되는 prop값에 따라 반응하지 않는다)

```javascript
import {computed, createComponent, reactive} from '@vue/composition-api'
import {pick} from '~/utils'
import AtatchFiles from './atatch-files/index.vue'

export default createComponent({
  components: {
    AtatchFiles,
  },
  props: {
    caseId: String,
    caseInfo: Object,
  },
  setup({caseInfo}){
    const state = reactive({
      eventProps: computed(() => {
        const props = pick(['dateProp', 'cmdProp', 'docProp', 'transferProp'])(caseInfo)
        return Object.entries(props)
      }),
    })
    return {
      state,
    }
  },
})
```

<br>

아래와 같이 `computed` 함수에서 `initProps` 를 직접 접근해야 reactive 해진다

```javascript
import {computed, createComponent, reactive} from '@vue/composition-api'
import {pick} from '~/utils'
import AtatchFiles from './atatch-files/index.vue'

export default createComponent({
  components: {
    AtatchFiles,
  },
  props: {
    caseId: String,
    caseInfo: Object,
  },
  setup(initProps){
    const state = reactive({
      eventProps: computed(() => {
        const props = pick(['dateProp', 'cmdProp', 'docProp', 'transferProp'])(initProps.caseInfo)
        return Object.entries(props)
      }),
    })
    return {
      state,
    }
  },
})
```

이유는 뭐 잘 모르겠다. call-by-value vs call-by-reference 뭐 그런거 겠지