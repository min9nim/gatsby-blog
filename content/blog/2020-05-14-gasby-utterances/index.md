---
layout: post
title: "Gatsby 블로그 댓글 플러그인(utterances)"
date: 2020-05-14 00:10
tags: [gatsby, utterances]
---

[최민규님 글](https://wdever.dev/introduce-my-blog/)을 보고 [utterances](https://utteranc.es/) 댓글 플러그인을 알게 되었다. [이전 jekyll 블로그](https://min9nim.github.io)에서는 [DISQUS](https://disqus.com/) 댓글을 사용했었는데, utterances 가 왠지 조금 더 사랑스럽다.

utterances 의 컨셉은 간단하다. 최초 설정시 특정 깃헙 레포지토리를 설정해 두면 GihHub API 를 이용하여 특정 글에 댓글이 달릴 때마다 미리 설정해 둔 레포에 새로운 이슈가 열리고(처음 댓글이 달릴 때) 해당 이슈에 신규 댓글이 등록 된다. 블로그에서는 해당 이슈에 등록된 댓글 목록을 가져와서 뿌려준다.

Disqus 와 비교해 볼 때 utterances 의 장점은 다음과 같다

- **깃헙 계정을 가지고 있다면 따로 회원가입이 따로 필요없다**
- UI가 이쁘다
- Markdown 사용 가능
  - Disqus 는 간단한 에디터를 제공
- 이모지를 통한 다양한 리액션 가능

utterances 댓글의 설정방법은 매우 간단하다(상세 설명은 [문서를](https://utteranc.es) 참고). 댓글을 쌓아둘 본인의 특정 레포(일반적으로 해당 블로그 레포)를 repo 속성에 설정하고 아래 코드조각을 원하는 위치에 넣기만 하면 된다.

```js{3}
<script
  src="https://utteranc.es/client.js"
  repo="[ENTER REPO HERE]"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async
></script>
```

그런데 dom 에 js 를 직접 삽입할 경우 발생할 수 있는 XSS 보안 이슈 때문에 리액트 애플리케이션에 붙일 경우에는 아래와 같이 조금 추가적인 코딩이 필요하다.

<br>

### 1. 댓글 컴포넌트 작성

```jsx
import React, { createRef, useEffect } from "react"

export default function Comment({ repo }) {
  const containerRef = createRef()
  useEffect(() => {
    const utterances = document.createElement("script")
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": "title",
      label: "comment",
      theme: "github-light",
      crossOrigin: "anonymous",
      async: "true",
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef.current.appendChild(utterances)
  }, [repo, theme])
  return <div id="comment" ref={containerRef} />
}
```

<br>

### 2. 원하는 위치에 삽입

```jsx{4}
<Post>
  <article>blabla~</article>
  <footer>
    <Comment repo="min9nim/gatsby-blog" />
  </footer>
</Post>
```
