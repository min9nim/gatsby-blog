---
layout: post
title:  "[Nextjs] Nextjs 를 시작 해야하는 이유"
date:   2018-12-08 00:10
categories: nextjs
tags: [react, nextjs]
---
SPA 앱을 만들려는 노력은 더 이상 특별한 일이 아닙니다. 다행히도 SPA앱을 간단하게 만들 수 있도록 도와주는 여러 프로젝트들이 있습니다.

[Create React App](https://github.com/facebook/create-react-app) 이 그 좋은 예 입니다

그러나 CRA를 통해 프로젝트를 시작하더라도 그럴듯한 웹앱을 만들기 위해서는 클라이언트 라우팅, 서버 사이드 렌더링, 코드스플릿 등의 넘어야 할 산들이 여전히 남아있습니다. Nextjs는 CRA 이후의 남은 일반적인 과제들을 해결하는 데 집중합니다. Nextjs를 이용하면 아래 기능들을 간단히 사용할 수 있습니다.

- 기본적인 서버 사이드 렌더링
- 더 빠른 화면로딩을 위한 자동 코드분리
- 페이지 기반 클라이언트 사이트 라우팅
- 웹팩기반 [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
- 노드 기반 HTTP서버 구성
- 바벨 및 웹팩 설정의 사용자화

멋지지 않나요?
그럼 이제 시작해 봅시다!

<br>

#### Nextjs 프로젝트 세팅
아래 명령들을 차례대로 수행합니다
```
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```

package.json 을 열고 아래와 같이 NPM 스크립트를 입력합니다
```
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

세팅이 끝났습니다. http://localhost:3000 로 접속해 보세요. 아마도 404오류가 나타날 것입니다


<br>

#### 페이지 작성
첫번째 페이지를 만들어 봅시다. 아래와 같이 작성하고 `pages/index.js` 파일로 저장을 합니다. react 모듈을 불러오지 않은 것이 왠지 불안하신가요? 걱정 마세요. Nextjs 는 암묵적으로 React 모듈을 로드하기 때문에 문제가 되지 않습니다.
```javascript
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```
다시 http://localhost:3000 을 확인해 보세요. 첫번째 넥스트 페이지가 열렸을 것입니다

혹시 pages 폴더명을 반드시 사용해야 하나요? 라고 묻고 싶으실 지 모르겠습니다.

대답은 yes!

Nextjs는 클라이언트 라우팅과 간편한 서버사이드렌더링 지원을 위해 pages 폴더 안에 페이지 파일들을 넣을 것을 강제하고 있습니다.

<br>

#### Ref.
- <https://nextjs.org/learn/basics/getting-started>
- <https://nextjs.org/learn/basics/getting-started/setup>

