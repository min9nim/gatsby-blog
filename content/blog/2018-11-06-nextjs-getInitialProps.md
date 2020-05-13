---
layout: post
title: "[Nextjs] getInitialProps 를 이용한 ServerSideReandering"
date: 2018-11-06 00:10
categories: nextjs
tags: [getInitialProps]
---

Nextjs 에서 서버사이드렌더링을 가능케 하는 것은 비밀이 바로 `getInitialProps` 에 있다. Nextjs에서 모든 스크립트 코드는 Nodejs 런타임(서버)과 브라우져(클라이언트) 양쪽 모두에서 수행되지만 `getInitialProps` 함수는 서버나 클라이언트 중 한군데서만 실행된다. `getInitialProps` 의 서버사이드렌더링 동작방식과 활용예시들을 참고한다.

<br>

#### `getInitialProps` 의 서버사이드렌더링 절차

1. `getInitialProps` 의 호출
   - URL주소를 이용해 직접 특정 페이지를 접근하면 Nodejs 환경에서 `getInitialProps` 가 호출됨
   - 클라이언트(웹브라우져)에서 SPA로 화면 이동할 경우에는 브라우져 환경에서 `getInitialProps` 가 호출됨
1. `getInitialProps` 가 plain object 를 리턴하면 해당 객체가 그대로 `constructor` 의 `props`로 전달됨
1. 서버에서 rendering 된 html 이 그대로 클라이언트로 내려옴
1. 클라이언트에서는 `constructor` 에서 `props`를 통해 전달받은 데이터를 이용해 추가적인 서버 요청없이 화면을 똑같이 다시 한번 더 그림

<br>

#### `req` 값으로 서버 or 클라이언트 여부를 확인

```javascript
import React from "react"

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return <div>Hello World {this.props.userAgent}</div>
  }
}
```

<br>

#### 함수형 컴포넌트에서도 사용 가능

```javascript
const Page = ({ stars }) => <div>Next stars: {stars}</div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js")
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

<br>

#### `getInitialProps` 에서 사용할 수 있는 속성

- `pathname` - path section of URL
- `query` - query string section of URL parsed as an object
- `asPath` - String of the actual path (including the query) shows in the browser
- `req` - HTTP request object (server only)
- `res` - HTTP response object (server only)
- `jsonPageRes` - Fetch Response object (client only)
- `err` - Error object if any error is encountered during the rendering

<br>

#### 주의사항

- `getInitialProps` 는 `pages` 폴더안의 파일들에서만 사용할 수 있고 자식컴포넌트들에서는 사용할 수 없다
- `getInitialProps` 가 서버측에서 수행될 때만 필요한 모듈들은 클라이언트 쪽에서 불필요하게 로드되지 않도록 주의한다.

<br>

#### Ref.

<https://nextjs.org/docs/#fetching-data-and-component-lifecycle>
