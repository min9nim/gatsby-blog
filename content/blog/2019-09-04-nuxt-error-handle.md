---
layout: post
title:  "[nuxt] 공통 에러 페이지 error.vue"
date:   2019-09-04 00:10
categories: nuxt
tags: [Frontend]
---
nuxt 에서 처리되지 않은 예외는 모두 [넉스트의 기본 에러페이지](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)로 처리된다.

<br>

#### `/layout/error.vue`
넉스트의 기본 에러 출력화면을 커스터마이징 하려면 아래와 같이 `/layout/error.vue` 파일을 추가한다
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

<br>

#### `error` prop
error.vue 에 전달되는 `error` prop은 `Error` 클래스의 인스턴스가 아닌 error 의 속성이 그대로 복사된 plain object 이기 때문에 `error.stack` 에 접근할 수 없고 error stack 정보를 출력할 수 도 없다

<br>

#### Ref.
https://nuxtjs.org/guide/views#error-page