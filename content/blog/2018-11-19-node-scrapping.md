---
layout: post
title:  "[Nodejs] EUC-KR 웹페이지 웹스크래핑"
date:   2018-11-10 00:10
categories: nodejs
tags: [nodejs]
---
Node 는 자바스크립트 기반이므로 기본적으로 UTF-8 인코딩을 사용한다. EUC-KR 인코딩을 사용하는 웹사이트를 스크래핑할 경우 한글이 깨지는 문제가 발생할 수 있다. 본 글에서는 EUC-KR 사이트를 고려하여 스크래핑을 처리함에 있어서 주목해야할 부분을 안내한다.

필요한 모듈 설치
```
npm i -S cheerio iconv jschardet request request-promise
```

<br>

모듈명 | 기능
--- | --- 
cheerio | selector를 이용해 웹페이지의 특정 내용을 가져온다
iconv | euc-kr 인코딩변환
jschardet | 웹페이지 문서의 인코딩 타입을 확인
request | 서버자원을 요청
request-promise | request 사용시 promise 사용


특정 웹페이지에서 제목과 내용요약을 가져오는 소스
<script src="https://gist.github.com/min9nim/74e1430cb645e2bdbbacd628caa6b5d6.js"></script>

실행결과
```
$ node app.js
source encoding = EUC-KR
골든아워 1 - 생과 사의 경계, 중증외상센터의 기록 2002-2013
외상외과 의사 이국종 교수가 눌러쓴 삶과 죽음의 기록이다. 저자는 17년간 외상외과 의사로서 맞닥뜨린 냉혹한 현실, 고뇌와 사색, 의료 시스템에 대한 문제의식 등을 기록해왔다. 때로는 짧게 때로는 길게 적어 내...
$
```

<br>

### 주목할 부분
- 위 소스에서 `request` 를 직접 사용하지는 않지만, `request-promise` 가 내부적으로 `request` 모듈을 참조하므로 함께 설치가 필요하다
- `iconv` 를 이용해 인코딩변환(11라인)을 할 때 넘겨줄 문자열 인자는 바이트배열이어야 하므로 16라인의 `encoding: null`옵션이 꼭 필요하다
- 16라인의 `utf-8//translit//ignore` 에서 `translit` 는 이상한 문자가 발견될 경우 대체 가능한 다른 문자로 자동 치환하는 옵션이다. `ignore` 는 대체 가능한 문자가 없을 경우에는 오류를 발생시키지 않고 그냥 무시하는 설정이다
- 8라인: 사이트의 인코딩에 따라 인코딩변환을 하려면 `jschardet` 모듈을 사용해 사이트의 인코딩을 확인해야 한다.
    - 하지만 `jschardet` 가 항상 정확하게 해당 인코딩을 탐지하는 것은 아닌 것 같다. 예를 들면 http://blog.jeonghwan.net/2016/04/28/es6.html 글의 경우 `utf-8`로 읽어야 하지만 `jschardet.detect(str)` 결과는 `ISO-8859-2` 가 나와서 위 코드대로 하면 한글이 깨지게 된다. 이에 대한 보정 작업은 따로 필요해 보인다. 추가 보정작업으로서 응답헤더의 `content-type` 의 `charset` 값을 확인하면 될 줄 알았지만 이 마저도 정확한 탐지는 아닌 것 같다. 위 [알라딘 링크][1]의 경우 `euc-kr` 인코딩이지만 응답헤더의 값은 `Content-Type: text/html; charset=ks_c_5601-1987` 로 확인된다. `Content-Type` 값을 이용하는 것도 적절한 방법은 아닌 것 같다. 필자는 일단 `jschardet` 의 탐지결과가 `euc-kr` 이 아니면 모두 `utf-8` 로 간주하도록 임시처리를 해두었다.



<br>

### 기타
`anyToUtf8` 함수는 http://ohgyun.com/665 글의 아래 함수를 참고하였다. 
```javascript
function eucKrToUtf8(str) {
    var iconv = new Iconv('euc-kr', 'utf-8');
    var buf = new Buffer(str, 'binary');
    return iconv.convert(buf).toString();
}
```
원래는 `isomorphic-unfetch` 모듈을 사용하고자 했었다. `isomorphic-unfetch` 모듈을 이용해서 가져온 응답결과를(`res.json()`)를 위 함수와 같이 `new Buffer(str, 'binary')` 를 이용해 바이너리로 읽어 들이고자 했으나 원하는대로 동작되지는 않았다. 처음 서버응답을 읽어들일 때 부터 바이너리로 읽어들이는 옵션이 반드시 필요한 것 같다.  `isomorphic-unfetch` 에서는 `encoding: null` 과 동일한 옵션을 찾지 못해서(시간관계상 많이 찾아보지는 않았음. 아마 관련 옵션이 있을 것이라고 예상함) 결국 `request-promise` 모듈로 대체하였음.

<br>

### Ref.
- 이 글보다 친절한 설명: http://victorydntmd.tistory.com/94



[1]:https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=168915737