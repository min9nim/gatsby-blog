---
layout: post
title:  "마크다운 주요 문법 정리"
date:   2018-04-23 22:00:00 +0900
categories: FrontEnd
tags: [markdown, syntax]
---

#### 마크다운 이미지 중앙정렬 방법

```
{: refdef: style="text-align: center;"}
![자바 vs 자바스크립트](/images/what-nodejs1.png)  
_\<Java 와 Node.js 의 비교\>_
{: refdef}
```

{: refdef: style="text-align: center;"}
![자바 vs 자바스크립트](/images/what-nodejs1.png)  
_\<Java 와 Node.js 의 비교\>_
{: refdef}

<br>
- - -
<br>

#### 링크 새창으로 열기

```
[네이버](http://naver.com){:target="_blank"}
```

[네이버](http://naver.com){:target="_blank"}

<br>
- - -
<br>

#### 참조 링크
* 참조링크는 본문과 한줄 이상 띄어야 합니다
* 참조링크의 위치는 본문 어느 곳이든 위치할 수 있습니다. 보통은 글 마지막에 둡니다.

```
이 글은 [What exactly is Node.js?][1]를 번역한 글입니다.

[1]:https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5
```

이 글은 [What exactly is Node.js?][1]를 번역한 글입니다.

[1]:https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5


<br>
- - -
<br>


### 수평선
아래 줄은 모두 수평선(\<hr/\>)을 만든다. 마크다운 문서를 미리보기로 출력할 때 페이지 나누기 용도로 많이 사용한다.
```
* * *
***
*****
- - -
---------------------------------------
```

- - -


<br>
- - -
<br>




#### 테이블

```
| foo | bar |
| --- | --- |
| baz | bim |
```

| foo | bar |
| --- | --- |
| baz | bim |



<br>
- - -
<br>


### Ref.
* <https://hashbox.github.io/마크다운-이미지-중앙정렬>{:target="_blank"}
* <http://tech.inswave.com/2018/02/13/setup>{:target="_blank"}
