---
layout: post
title: "mime type 설정"
date: 2018-10-16 00:30
categories: tomcat
tags: [mime-type]
---

HTTP 응답헤더 중 Content-Type 은 서버의 특정 자원이 어떤 용도에 필요한지에 대한 부가정보를 제공한다. 브라우져는 이 정보를 기반으로 해당 자원을 어떤 용도로 해석하고 표현해야 할 지 결정한다.

한 예로 svg 파일을 이미지로서 사용하기 위해서는 서버에서 응답헤더에 `Content-Type: image/svg+xml` 를 설정해 주어야 한다. 해당 헤더를 설정하는 방법은 서버에 따라서 설정 방법이 조금씩 다를 수 있다.

<br>
톰캣 `web.xml` 설정

```
<mime-mapping>
    <extension>svg</extension>
    <mime-type>image/svg+xml</mime-type>
</mime-mapping>
```

<br>
아파치 `mime.types` 설정

```
image/svg+xml	svg svgz
```

<br>

#### Ref.

<https://www.developershome.com/wap/wapServerSetup/tutorial.asp?page=settingUpMIME>
