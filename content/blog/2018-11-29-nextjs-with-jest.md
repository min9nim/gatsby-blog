---
layout: post
title:  "[JEST] Nextjs 에서 jest 사용하기"
date:   2018-11-29 00:10
categories: jest
tags: [jest, TDD, node, Nextjs]
---
Nextjs 프로젝트에서 [지난 포스트의 방법](/2018/11/jest-module/)대로 jest 구성을 하니 Nextjs 프로젝트를 빌드할 때 아래와 같은 오류가 발생했다.
```
$ npm run build

> sharelink-nextjs@1.0.0 build /Users/songmingu/Documents/project/sharelink-nextjs
> next build

[12:28:59] Compiling server
[12:28:59] Compiling client
> Using external babel configuration
> Location: "/Users/songmingu/Documents/project/sharelink-nextjs/.babelrc"
[12:28:59] Compiled server in 476ms
[12:29:01] Compiled client in 2s
> Failed to build
{ Error: (client) ./pages/index.js
Module build failed (from ./node_modules/next/dist/build/webpack/loaders/next-babel-loader.js):
SyntaxError: /Users/songmingu/Documents/project/sharelink-nextjs/pages/index.js: Unexpected token (91:6)

  89 |     //console.log("@@ app.state.totalCount = " + app.state.totalCount);
  90 |     return (
> 91 |       <Layout>
     |       ^
  92 |         <div className="intro">{"* " + intro + "(" + app.state.totalCount + "개)"}</div>
  93 |         {/* <div className="intro">{"* " + intro}</div> */}
  94 |         <ul className="PostList">
    at Parser.raise (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:3939:15)
    at Parser.unexpected (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5248:16)
    at Parser.parseExprAtom (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:6328:20)
    at Parser.parseExprSubscripts (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5924:21)
    at Parser.parseMaybeUnary (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5903:21)
    at Parser.parseExprOps (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5812:21)
    at Parser.parseMaybeConditional (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5784:21)
    at Parser.parseMaybeAssign (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5731:21)
    at Parser.parseParenAndDistinguishExpression (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:6482:28)
    at Parser.parseExprAtom (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:6284:21)
    at Parser.parseExprSubscripts (/Users/songmingu/Documents/project/sharelink-nextjs/node_modules/@babel/parser/lib/index.js:5924:21)
 ===  중략 ===
```
<br>

구글링 결과 Nextjs 에서 jest 를 사용하려면 `babel-plugin-transform-es2015-modules-commonjs` 를 추가로 설치할 필요 없이 그냥 아래와 같이 `.babelrc` 를 설정하면 되더라

```
{
  "presets": ["next/babel"]
}
```

<br>

#### Ref.
<https://github.com/zeit/next.js/tree/canary/examples/with-jest>