---
layout: post
title: "npm command"
date: 2018-07-22 01:00:00 +0900
categories: nodejs
tags: [npm, command]
---

#### npm 모듈 삭제

node_module 폴더에서 패키지 삭제. package.json 에서 내용을 삭제하지는 않는다

```
npm uninstall <package>
```

package.json 에서까지 삭제하려면 `--save` or `--save-dev` 옵션을 주어야 한다

dependency 에서 삭제

```
npm uninstall --save webpack
```

devDependency 에서 삭제

```
npm uninstall --save-dev webpack
```

<br>

#### npm 전역모듈 설치 경로 확인

```
$ npm root -g
/usr/local/lib/node_modules
```
