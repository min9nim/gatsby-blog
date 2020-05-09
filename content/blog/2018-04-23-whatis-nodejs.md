---
layout: post
title:  "What exactly is Node.js?"
date:   2018-04-23 14:00:00 +0900
categories: FrontEnd
tags: [nodejs]
---

Node.js는 자바스크립트 실행 환경입니다. 멋진 말입니다. 그런데 그것이 의미하는 바는 무엇이며 어떻게 동작이 된다는 말일까요?

Node.js는 자바스크립트를 이용해 프로그램을 작성하기 위해 필요한 모든 것을 가지고 있습니다.

{: refdef: style="text-align: center;"}
![자바 vs 자바스크립트](/images/what-nodejs1.png)  
_\<Java 와 Node.js 의 비교\>_
{: refdef}



Node.js 는 자바스크립트를 웹브라우져 뿐만 아니라 독립적인 애플리케이션을 만들 때에도 사용하기 위한 목적으로 태어났습니다.
이제 당신은 자바스크립트를 웹사이트의 동적인 사용자 경험을 만드는 것 이상으로 훨씬 더 많은 일들을 할 수 있게 되었습니다.

자바스크립트는 이제 파이썬 같은 스크립트언어들이 하던 일을 동일하게 처리할 수 있는 능력이 생겼습니다

웹브라우져에서 동작하는 자바스크립트와 _Node.js_ 모두 V8엔진 위에서 동작합니다. V8엔진은 자바스크립트 코드를 기계어로 변환해 줍니다. 기계어는 더 이상 번역이 필요없이 컴퓨터가 바로 실행할 수 있는 저수준의 실행 코드입니다
<br>
<br>

### 왜 Node.js 를 사용해야 합니까?
Node.js 공식사이트에서는 Node.js를 아래와 같이 정의하고 있습니다

> * Node.js 는 크롬의 V8엔진을 이용한 실행환경이다.
> * Node.js 는 event-driven, non-blocking I/O 를 사용하여 가볍고 효율적이다.
> * Node.js 의 패키지 관리 시스템인 npm은 전세계에서 가장 큰 오픈소스 라이브러리 생태계를 이루고 있다.

우리는 앞서 이미 첫번째 사항에 대하여 살펴 보았습니다.
이제 우리는 Node.js의 나머지 2가지 내용에 대하여 알아볼 것입니다. 이를 통해 우리는 Node.js 가 유명해진 이유를 알게 될 것 입니다.

I/O는 입력과 출력을 의미합니다. 그것은 네트워크나 파일시스템을 통해 데이터를 읽고 쓰는 행위를 말합니다.

보통 I/O 처리는 시간을 많이 잡아먹기 때문에 I/O가 처리될 때까지 다른 함수들은 오래도록 실행을 대기해야 합니다

아래와 같은 상황을 예로 Blocking I/O 와 Non-Blocking I/O를 비교해 봅시다.  
user1과 user2의 상세 정보를 서버에 요청하고 그 결과를 받아서 화면에 출력하고자 합니다. 서버에서 해당 요청에 대한 처리는 시간이 좀 걸립니다 하지만 2가지 요청이 동시에 서버로 날라간다고 가정해 봅시다.

{: refdef: style="text-align: center;"}
![Blocking vs Non-Blocking](/images/what-nodejs2.png)
_\<Blocking i/O vs Non-Blocking I/O\>_
{: refdef}
<br>
<br>

### Blocking I/O
Blocking I/O 의 경우 user1의 요청에 대한 응답이 끝날 때 까지 user2 요청 처리에 대한 어떤 작업도 진행할 수 없습니다.

그래서 웹서버는 새로운 요청을 처리하기 위해 새로운 thread를 시작할 수 밖에 없습니다. 그러나 자바스크립트는 단일 쓰레드로 동작합니다(정확히 표현하자면 이벤트루프가 단일쓰레드로 동작합니다. 자세한 것은 나중에 다시 다루도록 하겠습니다). 이렇게 멀티쓰레드로 처리 해야하는 상황이라면 자바스크립트는 적절한 선택이 될 수 없습니다.

이제 Non-Blocking I/O 에 대하여 이야기를 할 때가 된 것 같습니다.
<br>
<br>


### Non-blocking I/O
앞선 경우와 다르게 자바스크립트는 Non-blocking 으로 위 상황을 처리할 수 있습니다. 당신은 user1의 요청에 대한 처리가 끝나기를 기다릴 필요 없이 user2의 요청을 준비하고 실행할 수 있습니다. 당신은 user1, user2의 요청을 동시에 처리할 수 있는 것입니다

Non-Blocking I/O 가 가능하다면 멀티쓰레드를 사용하지 않고도 서버는 여러개의 요청을 동시에 처리하는 것이 가능합니다


### The JavaScript event loop
당신에게 지금 26분의 여유가 있다면 아래 이벤트루프에 대한 영상을 보기를 권합니다

<iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<br>
<br>
위 영상을 볼 수 없다면 이벤트루프의 단계별 동작에 대해서 간단히 설명을 드리겠습니다.

{: refdef: style="text-align: center;"}
![이벤트루프](/images/what-nodejs3.png)
_\<자바스크립트 이벤트루프\>_
{: refdef}


1. `main()` 함수를 _Call Stack_ 에 추가합니다
1. `console.log()` 를 _Call Stack_ 에 추가합니다. 이것은 바로 실행되고 _Call Stack_  에서 사라집니다.
1. `setTimeout(2000)` 을 스택에 추가합니다. `setTimeout(2000)` 는 Node API이다. 해당 함수를 호출할 때 이벤트 콜백함수를 _Callback Queue_ 에 등록합니다. 2초 초동안 기다린 후 콜백함수를 호출합니다
1. API목록에 등록이 되면, `setTimeout(2000)` 은 _Call Stack_ 에서 사라집니다
1. 이제 같은 방식으로 `setTimeout(0)`가 APIs에 등록됩니다. 이제 우리는 실행 대기중인 2개의 Node API를 가지고 있습니다.
1. 0초 후에, `setTimeout(0)`가 _Call Stack_ 으로 이동됩니다. 그리고 `setTimeout(2000)` 도 동일한 방식으로 처리가 됩니다.
1. _Callback Queue_ 에서는 _Call Stack_ 의 함수들이 모두 처리되기를 기다립니다. 단일쓰레드 환경에서는 한번에 하나의 명령만 실행되기 때문에 이 부분을 주의 깊게 보아야 합니다.
1. 마지막 `console.log()` 가 실행되면, _Call Stack_ 에서 main() 가 꺼내집니다
1. 이벤트루프는 _Call Stack_ 의 empty 여부를 모니터링 하다가 _Call Stack_ 이 empty 상태가 되면 _Callback Queue_ 에서 콜백함수를 _Call Stack_ 으로 이동시킵니다.
<br>
<br>


### npm

{: refdef: style="text-align: center;"}
![npm](/images/what-nodejs4.png)
{: refdef}

npm은 일반적인 문제들을 해결할 수 있는 다양한 라이브러리들을 가지고 있습니다. 당신은 애플리케이션을 보다 빠르고 효율적으로 만들기 위헤 이 npm 패키지들을 이용할 수 있습니다
<br>
<br>


### Require
Require 는 3가지 일을 합니다

* _Node.js_ 패키지 모듈을 로드합니다.
* _Express_ 나 _Mongoose_ 같은 외부 라이브러리들을 불러오거나 npm을 이용해 설치할 수 있습니다
* 당신이 작성한 모듈을 직접 불러오거나 프로젝트를 모듈화 할 수 있습니다

_Require_ 는 _"path"_ 를 인자로 받아서 `module.exports` 를 리턴합니다
<br>
<br>



### Node Modules
Node의 모듈은 다른 코드들에 영향을 미치지 않는 재사용 가능한 코드블록 입니다

당신은 자신만의 모듈을 작성할 수 있고 다양한 애플리케이션에서 그것을 사용할 수 있습니다. Node.js 는 특별한 설치없이 바로 사용가능한 모듈들을 포함하고 있습니다
<br>
<br>


### V8 turbo-charges JavaScript by leveraging C++
V8은 C++로 씌어진 자바스크립트의 오픈소스 실행환경입니다

> JavaScript -> V8(C++) -> Machine Code

V8은 ECMA-262의 명세인 ECMAScript 를 구현하였습니다. ECMAScript는 자바스크립트 표준화 단체인 Ecma International에 의해 탄생하였습니다.

V8은 단독으로 실행되거나 C++ 애플리케이션에 포함될 수 있습니다. 또한 자바스크립트를 사용할 수 있는 당신만의 C++코드를 작성할 수 있도록 허용합니다.

이것은 V8을 이용해 당신이 ECMAScript 표준 스펙 이외의 원하는 자바스크립트 기능을 자신만의 C++을 이용해 직접 추가할 수 있음을 의미합니다.
<br>
<br>


### Events
애플리케이션 안에서 발생하는 사건들 중 우리가 직접 핸들링이 가능한 것을 이벤트라고 한다. Node 에는 2가지 종류의 이벤트가 있습니다.

* System Events: libuv 라고 불리는 C++코어에서 발생하는 이벤트(예를 들면, 파일을 읽기가 끝났을 때).
* Custom Events: 자바스크립트 코어에서 발생하는 이벤트
<br>
<br>


### Writing Hello World in Node.js
Node.js 용 Hello World 를 만들어 보겠습니다.

app.js 파일을 만들고 아래 코드를 작성합니다

```
console.log("Hello World!");
```
터미널에서 app.js 파일이 있는 경로로 이동한 후 `node app.js` 명령을 실행해 봅니다.

짠, 이렇게 Hello World 프로그램을 Node.js 로 작성해 보았습니다.

freeCodeCamp.org를 포함하여 Node.js 에 대하여 배울 수 있는 자료들은 엄청나게 많이 있습니다.
<br>
<br>
<br>
<br>

### Ref.
이 글은 [What exactly is Node.js?][1]를 번역한 글입니다. 글읽기에 어려움이 없도록 충분한 의역을 포함하였습니다.


[1]:https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5
