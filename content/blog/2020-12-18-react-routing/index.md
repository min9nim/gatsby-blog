---
layout: post
title: '[React] `pages` 폴더 경로를 이용한 동적 라우팅'
date: 2020-12-18 00:10
tags: [react, routing, lazy, Suspense]
description: 'React 를 이용한 SPA 웹프로젝트를 개발한다고 할 때 react-router 를 이용한 라우팅은 웹 개발시 거의 필수적인 요소라고 해도 과언이 아닐 것입니다. 그리고 프로젝트가 점차 커지고 라우팅 패스가 하나 둘씩 많아 지게 되면, 자연스럽게 클라이언트 라우팅만을 담당하는 별도 컴포넌트를 생성하여 관리하게 될 것입니다.'
draft: false
---

React 를 이용한 SPA 웹프로젝트를 개발한다고 할 때 react-router 를 이용한 라우팅은 웹 개발시 거의 필수적인 요소라고 해도 과언이 아닐 것입니다.

그리고 프로젝트가 점차 커지고 라우팅 패스가 하나 둘씩 많아 지게 되면, 자연스럽게 클라이언트 라우팅만을 담당하는 별도 컴포넌트 (가칭, `Routes.js` ) 를 생성하여 관리하게 될 것입니다.

그렇다면 라우팅을 담당하는 컴포넌트는 아마도 아래와 같은 모습을 하고 있겠죠?

Routes.js
```js
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Main from "./pages/index";
import NotFound from "./pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        // ... 이 아래로 10여 개의 라우팅 패스가 추가로 정의되어 있다고 상상해 봅시다. 😰
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
```

이러한 라우팅 설정은 라우팅해야 할 path 가 몇개 되지 않을 때에는 불편함이 없지만, 그 수가 많아 지기 시작하면 금방 짜증이 밀려오게 됩니다.

라우팅 패스가 하나 추가될 때마다 매번 `import` 문을 추가해야 하고 또 라우팅 설정도 하나씩 추가해야 하니까요.

혹시 현재 이런 불편함을 느끼고 있으시지는 않나요?

그렇다면 잘 오셨습니다.🙂

<br>

### 우리를 구원해 줄 lazy 와 Suspense
리액트 컴포넌트의 동적 로딩을 지원하기 위한 API 로서 [React.lazy 와 React.Suspense](https://ko.reactjs.org/docs/code-splitting.html#reactlazy) 가 있다는 것을 아시나요? 이를 이용하면 `pages` 폴더의 파일 경로에 따라 그대로 라우팅이 되도록 구성하는 것이 가능합니다.

아래와 같이 말이죠.

DynamicRoutes.js
```js
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function DynamicRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          render={({ history, location, match }) => {
            const Page = lazy(() =>
              import("./pages" + location.pathname).catch((e) => {
                if (/not find module/.test(e.message)) {
                  return import("./pages/NotFound.js");
                }
                if (/Loading chunk \d+ failed/.test(e.message)) {
                  window.location.reload();
                  return;
                }
                throw e;
              })
            );
            return (
              <Suspense fallback={<div>Loading..</div>}>
                <Page />
              </Suspense>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
```  


이렇게 동적 라우팅을 이용하면 더 이상 라우팅 패스가 추가될 때마다 라우팅 설정을 수정할 필요가 없습니다. pages 폴더 구조 자체가 바로 라우팅 설정이 되는 것이죠.

사실 이와 같은 방식은 [Nextjs 에서 기본적으로 제공하는 라우팅 기능](https://nextjs.org/docs/routing/introduction)과 동일합니다. Nextjs 의 라우팅방식을 SPA에서도 동일하게 적용한 사례가 되겠지요.

혹시 누군가에게 작은 도움이 되기를 바라는 마음으로 정리해 보았습니다. 🙏

<br>

#### 코드 데모
<iframe src="https://codesandbox.io/embed/cocky-andras-yrg09?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cocky-andras-yrg09"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
