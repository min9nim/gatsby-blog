---
layout: post
title: "URL 메타 정보 긁어오기"
date: 2019-09-06 00:10
categories: Frontend
tags: [js, Frontend]
---

특정 URL의 타이틀, 이미지, 설명 정보를 간단히 긁어오는 웹스크래핑 소스를 작성해 보았다.

```javascript
import cheerio from "cheerio"

export function _getHostname(url) {
  let start = url.indexOf("://") + 3
  let end = url.indexOf("/", start)
  return url.slice(start, end)
}

export function _getProtocol(url) {
  let end = url.indexOf("://") + 3
  return url.slice(0, end)
}

export function _bodyScrap(url) {
  return $ => {
    // 글제목
    let title = $("meta[property='og:title']").attr("content")
    if (!title) {
      title = $("head title").text()
      if (!title) {
        throw Error("This link has no title")
      }
    }
    // 글이미지
    let image = $("meta[property='og:image']").attr("content")
    if (!image) {
      image = $("img").attr("src")
      //이미지 세팅
      if (image && image.indexOf("http") === 0) {
        // http 로 시작하면 그냥 사용
      } else if (image && image[0] === "/") {
        // image 경로가 / 로 시작한다면
        //let urlObj = new URL(url);
        image = _getProtocol(url) + _getHostname(url) + image
      } else {
        image = ""
      }
    }

    // 글요약본
    let desc = $("meta[property='og:description']").attr("content")
    if (!desc) {
      desc = ""
    }
    return {
      title,
      image,
      desc,
    }
  }
}

export async function getUrlMeta(url) {
  const meta = await fetch(url)
    .then(res => res.text())
    .then(cheerio.load)
    .then(_bodyScrap(url))
  return meta
}
```

브라우져에서 사용할 경우에는 CORS 문제로 url의 응답을 가져오는데 제한이 있을 수 있다. 그럴 경우에는 URL의 응답을 받을 수 있는 접근 가능한 별도의 서버 엔드포인트를 이용해야 한다.

ex) https://www.scraperapi.com

<br>

#### 출력 결과 예시

https://news.v.daum.net/v/20190907150817348 에 대한 결과

```javascript
{
  "title": "여야, 조국 두고 \"의혹해소·개혁매진\" vs \"자진사퇴·지명철회\"",
  "image": "https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/201909/07/yonhap/20190907150817591lmhm.jpg",
  "desc": "(서울=연합뉴스) 설승은 이슬기 기자 = 여야는 7일 국회 인사청문회를 마친 조국 법무부 장관 후보자의 적격성 여부를 놓고 극명한 입장차를 보였다. 여당인 더불어민주당과 정의당은 조 후보자가 적격하다는 입장인 반면 자유한국당과 바른미래당, 민주평화당은 청문회에서 부적격함이 드러났다며 자진사퇴나 지명철회를 요구하고 있다. 우선 민주당은 인사청문회를 통해 조"
}
```

<br>

#### Ref.

https://github.com/min9nim/webscrap/blob/master/src/com/webscrap.js
