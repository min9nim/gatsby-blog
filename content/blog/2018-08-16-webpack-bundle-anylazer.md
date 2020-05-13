---
layout: post
title: "webpack 번들파일 size 분석"
date: 2018-08-16 01:00:00 +0900
categories: webpack
tags: [webpack, bundle, analyzer]
---

### Intro

웹사이트 성능을 튜닝할 때 빌드한 번들파일의 용량 분석이 필요할 수 있다. 이 때 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 를 이용하면 빌드된 번들파일을 보다 직관적으로 분석하고 이해할 수 있다.

<img src="https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif" />

<br>

### 설치

웹팩 빌드시 사용할 모듈이므로 `--save-dev` 옵션으로 설치

```
$ npm i --save-dev webpack-bundle-analyzer
```

<br>

### webpack.config.js 에 설정 추가

옵션에 대한 자세한 내용은 [npm모듈 홈페이지](https://www.npmjs.com/package/webpack-bundle-analyzer)를 확인한다

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // 분석결과를 파일로 저장
      reportFilename: "docs/size_dev.html", // 분설결과 파일을 저장할 경로와 파일명 지정
      defaultSizes: "parsed",
      openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
      generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
      statsFilename: "docs/stats_dev.json", // stats.json 파일명 rename
    }),
  ],
}
```

<br>

### 결과

위와 같이 설정을 추가하고 빌드하면 dev 폴더에 `size_dev.html` 과 `stats_dev.json` 파일이 생성된다.

```bash
$ pwd ; ls -al
/Users/songmingu/Documents/project/anony/public/docs
total 102408
drwxr-xr-x@  9 songmingu  staff       288  8 16 17:56 .
drwxr-xr-x  31 songmingu  staff       992  8 16 17:01 ..
-rw-r--r--   1 songmingu  staff    506180  8 16 17:01 size_dev.html
-rw-r--r--   1 songmingu  staff  28973301  8 16 17:01 stats_dev.json
MacBook9:docs songmingu$
```

`size_dev.html` 파일을 브라우져로 열어 결과를 확인한다.

![결과](/images/webpack-bundle-analyzer.png)
[> 자세히 보기 < ](https://anony-212509.appspot.com/docs/size_dev.html)
