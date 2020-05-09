---
layout: post
title:  "크롬 개발자도구를 이용한 js beautify"
date:   2018-04-02 23:25:00 +0900
categories: FrontEnd
tags: [chrome, beautify]
---
#### Summary
- 난독화된 js를 디버깅해야 할 경우 크롬 개발자도구의 beautify 기능을 간단히 이용할 수 있다.
  - 특별히 오프라인 환경에서 beautify 도구를 사용할 수 없을 때 유용함
- 난독화된 $.clone 함수를 예로 해당 함수를 beautify 하는 방법을 소개
<br>
<br>
<br>

#### Benefits to
보안 상의 이유로 폐쇄 망에 갇혀 프로젝트를 진행해야 하는 서글픈 SI개발자
<br>
<br>
<br>

#### Guide
1. 개발자도구 console탭을 이용해 toString 을 이용해 디버깅할 함수 정의를 확인한다
```console
> $.clone.toString();
< "function (a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f}"
```
<br>
2. 위 함수 정의를 복사하여 아래와 같이 변수에 할당한다.  
(이때 `var tmp = $.clone;` 와 같이 `$.clone` 함수를 직접 `tmp` 변수에 담을 경우 함수의 복사본이 아닌 참조가 `tmp`에 할당되며 이후 아래 3번 과정에서 난독화된 js전체 소스를 한꺼번에 beautify 해야하는 부담이 발생할 수 있다)
```console
> var tmp = function (a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f}
< undefined
```
<br>
3. `debugger; tmp();` 를 실행하고, tmp 함수내로 진입한 후
![step1](/images/chrome-step1.PNG)
<br>
왼쪽 아래 {} 버튼을 클릭하면
<br>
![step2](/images/chrome-step2.PNG)
<br>beautify 됨
<br>
![step3](/images/chrome-step3.PNG)
