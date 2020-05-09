---
layout: post
title:  "[vue] v-html 에서 필터 흉내내기"
date:   2019-08-15 00:10
categories: vue
tags: [vue, typescript]
---
vue 에서 text 를 화면에 렌더링하기 위해서는 머시태그나 v-html 을 사용한다.

특별히 html 태그사용이 필요한 경우 `v-html` 을 이용해 html 문자열을 렌더링해야 한다. 뷰는 template 태그 영역 내에서 간단하게/직관적으로/readable 하게 데이터를 변환시키는 용도로 [vue filter](https://kr.vuejs.org/v2/guide/filters.html) 를 제공한다. 하지만 vue filter 는 머시태그와 `v-bind` 에서만 사용이 가능하다

아쉽지만 `v-html` 에서는 아래와 같이 `go`함수를 이용하여 비스므리하게 vue filter 를 흉내내서 사용할 수 있다.

```html
<template lang="pug">
  p(v-html="go(contents, enableUrl, nl2br)")
</template>

<script lang="ts">
import * as R from 'ramda'
const {pipe} = R

function go(...args) {
  return pipe(...args.slice(1))(args[0])
}
function nl2br(str) {
  if(!str){
    return ''
  }
  return str.replace(/\r\n|\n/g, '<br />')
}
function enableUrl(str){
  const isUrl = /((?:http|https?|ftps?|sftp):\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/ig
  return str.replace(isUrl, '<a href="$1">$1</a>')
}

@Component({
  methods: {go, nl2br, enableUrl},
})
export default class VComment extends Vue {
  // ~~
}
</script>
```

<br>

### 주의사항
하지만 위와 같이 처리할 경우 `go` 함수의 결과값(primitive)이 `v-html` 에 바인딩되기 때문에 reactive 하지 않은 문제가 있다.
