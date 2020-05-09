---
layout: post
title:  "초간단 의존성 그래프 그리기"
date:   2018-11-04 00:10
categories: memo
tags: [dependency-graph]
---
[Graphviz](http://www.graphviz.org/) 를 이용한 의존성 그래프 그리는 간단한 방법을 소개한다. 무려 svg 포맷으로 :)

<br>

### 온라인 도구
온라인 도구가 제공된다. http://www.webgraphviz.com 접속
<img src="/images/graphviz.png">

<br>

### 의존성 정의
사이트에 준비된 샘플들을 참고하여 적절히 노드들의 의존성을 정의한다

```
digraph G {
  node [shape = doublecircle]; Index Write Login;
  node [shape = circle];
  "Index" -> "Post"
  "Write" -> "Layout"
  "Login" -> "Layout"
  "Index" -> "Layout"
  "Index" -> "LinkLoading"
  "Layout" -> "Header"
}
```
_Generate Graph_ 버튼을 클릭하면 그래프 생성 끝

<img src="/images/generate-graph.gif">

<br>

### svg 파일로 저장
위 온라인 도구에서 직접 svg 파일 다운로드 기능을 제공하지는 않는다. 개발자도구를 이용해서 svg 스트링을 복사한 후 아래 DTD와 함께 `.svg` 파일로 직접 저장한다.
```html
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

<img src="/images/svg-file.png">


