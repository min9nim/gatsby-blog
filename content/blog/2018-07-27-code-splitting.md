---
layout: post
title: "[React] 코드 스플리팅"
date: 2018-07-27 01:00:00 +0900
categories: react
tags: [code-splitting, react]
---

#### Code Spliting 왜 필요한가

webpack 을 이용하여 spa 애플리케이션을 만들면 결국 모든 소스파일이 하나의 파일로 (ex, index.bundle.js) 번들링되는데 개발이 진행되면서 여러가지 라이브러리들을 사용하게 되면 번들파일의 용량이 4~5MB 이상으로 금방 무거워질 수 있다. 이렇게 될 경우, 네트워크 상황에 따라 해당 js를 처음 내려받는데 오랜 시간이 걸릴 수 있다. 이럴 경우에는 index.bundle.js 파일을 splitting 하여 다운로드 받는데 걸리는 시간을 줄일 필요가 있다.
이때 코드를 나누는 방법은 성격에 따라 정적스플리팅, 동적스플리팅으로 나눠볼 수 있는데 차례대로 그 방법을 살펴보도록 한다.

<br>

#### 정적 스플리팅

먼저 쉽게 생각할 수 있는 방법은 번들링 파일을 여러 개로 나누는 것이다. 아래와 같이 webpack 설정에서 진입점(entry) 를 2개 이상으로 설정함으로써 번들링 파일의 사이즈를 줄일 수 있다.

```javascript
entry: {
    index : './src/index.js',
    react : ["react", "react-dom", "react-router-dom", 'react-bootstrap'],
},
```

**웹팩 빌드 후 정적 스플리팅에 의해 나뉘어진 파일들은 순서에 맞게 로드될 수 있도록 index.html 을 직접 수정해야 한다**

예를 들면 빌드 결과가 아래와 같을 때

```javascript
$ webpack --config webpack.prod.js

Hash: a3d89c558b50d3487010
Version: webpack 4.16.2
Time: 24627ms
Built at: 2018-07-26 13:56:37
                                                  Asset      Size  Chunks                    Chunk Names
                           vendors~index~react.chunk.js   183 KiB       2  [emitted]         vendors~index~react
                                        index.bundle.js  25.8 KiB       3  [emitted]         index
                                        react.bundle.js  1.49 KiB       4  [emitted]         react
                                 vendors~index.chunk.js  72.3 KiB      10  [emitted]         vendors~index
== 생략 ==
WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  index (281 KiB)
      vendors~index~react.chunk.js
      vendors~index.chunk.js
      index.bundle.js
$
```

코드스플리팅 전에는 index.bundle.js 만 로드하면 되었지만

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="/index.bundle.js"></script>
</html>
```

코드스플리팅 후에는 _index.bundle.js_ 에서 분리된 공통 모듈 _chunks_ 들을 아래와 같이를 순서에 맞게 로드할 수 있도록 직접 index.html 파일을 수정해야 한다.

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="/vendors~index~react.chunk.js"></script>
  <script src="/vendors~index.chunk.js"></script>
  <script src="/index.bundle.js"></script>
</html>
```

<br>

#### 동적 스플리팅

`import()` 를 이용해 모듈을 사용이 필요한 시점에 동적으로 로드하는 방법이다. `import()` 문은 아직 정식 표준은 아니고 statge-2 상태라고 한다. 그렇다고 _babel-preset-stage2_ 나 _babel-preset-env_ 를 사용한다고 해서 import() 문을 사용할 수 있는 것은 아니다. webpack2.0 이상을 사용하면 별다른 설치 및 설정없이 사용할 수 있다는 얘기도 봤지만 그렇지 않았다(내가 다 해봤는데 안 되더라). `import()` 구문을 사용하려면 [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/) 모듈을 설치해야 한다.

일단 위 플러그인을 세팅하면 웹팩이 자동으로 코드들을 동적으로 로드할 수 있게 적절히 splitting 해준다. 동적으로 나뉘어진 chunk 들은 필요할 때 자동으로 적절히 로드가 되니 신경쓰지 않아도 된다.
단, _react-router-dom_ 를 사용한다면 _chunk_ 들을 모두 동일한 경로에서 로드할 수 있도록 웹팩 `output` 설정에서 `publicPath` 속성을 설정해 주어야 한다.

```javascript
output: {
    path: __dirname + '/public/',
    publicPath: "/",        // chunk 파일을 / 에서 로드하도록 설정
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
},
```

동적로딩의 예를 들자면 [highlight.js](https://highlightjs.org) 는 본문에 코드 삽입시 syntax 별로 예쁘게 색칠해 주는 모듈인데 이 모듈은 약 500kb 정도로 무겁다. 해당 모듈은 소스코드를 보여주는 화면에서만 필요하므로 필요한 시점에만 동적으로 로드하면 번들링 파일의 용량을 크게 줄일 수 있다. 이를 정적으로 사용하던 코드에서 동적으로 로드하는 방법에 대한 예를 소개한다

1.  highlight.js 정적로딩

    ```javascript
    import hljs from "highlight.js"
    // == 생략 ==

    export default class Post extends React.Component {
      constructor(props) {
        super(props)

        // == 생략 ==
        this.md = new Remarkable({
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(lang, str).value
            }
            return hljs.highlightAuto(str).value
          },
        })
      }

      render() {
        const html = this.md.render(this.state.content) // this.md.render 는 코드 하이라이트닝을 위해 위 객체 생성시 설정한 hightlight 함수를 사용함
        return <div>html</div>
      }
    }
    ```

2.  highlight.js 동적로딩  
    동기로 처리하는 로직을 비동기로 변환할 때의 포인트는 모듈이 undefined 일 때의 처리를 우선 동기적으로 적절히 구현하여 로직 흐름에 문제가 없게 만든 후 모듈이 로드 되었을 때의 처리를 따로 해당 부분만 새로고침할 수 있도록 로직이 흘러가도록 코딩을 하는 것이다.
    ```javascript
    // import hljs from 'highlight.js';

        //== 중략 ==
        export default class Post extends React.Component {
            constructor(props){
                super(props)

                this.md = new Remarkable({
                    highlight: (str, lang) => { // 아래에서 this를 사용하기 위해 화살표함수로 변경
                        if(tp.hljs === undefined){  // tp 는 전역변수
                            import(/* webpackChunkName: "highlightjs"  */'highlight.js')
                                .then(m => {
                                    tp.hljs = m.default;
                                    this.setState(this.state);  // 컴포넌트를 re-rendering
                                })
                                .catch(err => console.log(err.message));
                            return "code is loading.."; // highlight.js 로드 전에는 코드를 렌더링하지 않고 code is loading.. 이라고 표시
                        }else{
                            if (lang && tp.hljs.getLanguage(lang)) {
                                return tp.hljs.highlight(lang, str).value;
                            }
                            return tp.hljs.highlightAuto(str).value;
                        }
                    }
                });

            render(){
                const html = this.md.render(this.state.content);    // this.md.render 는 코드 하이라이트닝을 위해 위 객체 생성시 설정한 hightlight 함수를 사용함
                return <div>html</div>
            }
        }
        ```

<br>

#### 리액트 컴포넌트를 동적으로 로드하는 방법

리액트 컴포넌트를 동적으로 로드하고자 할 경우 간단?하게 아래 함수를 사용할 수 있다.(아래 함수는 [Andrew Clark 의 코드](https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194)를 참고하였다.)

```javascript
tp.asyncComponent = function (getComponent, compname) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { Component: tp.asyncCache[compname] }
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(m => {
          tp.asyncCache[compname] = m.default
          this.setState({ Component: m.default })
        })
      } else {
        console.log(`## tp.asyncCache[${compname}] used`)
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return <div>Loading..</div>
    }
  }
}
```

위 asyncComponent 함수를 사용하면 화면이 re-rendering 될 때마다 컴포넌트의 생성자함수가 호출이 되는데 이로 인한 side-effect 가 발생할 수 있으니 해당 문제는 적절히 수정을 해야한다.

위 함수를 사용하는 방법은 아래와 같다

이전 코드를

```javascript
import React from "react"
import { Route, Switch } from "react-router-dom"
import List from "./pages/List"

export default class App extends React.Component {
  //== 중략 ==
  render() {
    const renderList = ({ history, match }) => {
      return <List history={history} context={match.params.context} />
    }

    return (
      <Switch>
        <Route path="/list/" render={renderList} />
      </Switch>
    )
  }
}
```

아래와 같이 변경

```javascript
import React from "react"
import { Route, Switch } from "react-router-dom"
//import List from "./pages/List";

export default class App extends React.Component {
  //== 중략 ==
  render() {
    const renderList = ({ history, match }) => {
      const List = tp.asyncComponent(
        () => import(/* webpackChunkName: "List"  */ "./pages/List"),
        "/pages/List"
      )
      return <List history={history} context={match.params.context} />
    }

    return (
      <Switch>
        <Route path="/list/" render={renderList} />
      </Switch>
    )
  }
}
```

<br>

#### optimization.splitChunks 옵션

나뉘어진 _chunk_ 들 사이의 공통 코드들은 또 별도 _chunk_ 파일로 만들어야 하는데, Webpack4 에서는 이를 위해 `optimization.splitChunks.chunks` 옵션을 제공한다. `all` 로 세팅할 경우에는 정적스플리팅, 동적스플리팅 모두 chunks 들 간의 공통 모듈을 별도 chunk 파일로 생성한다

```javascript
    optimization : {
        splitChunks: {
          chunks: 'all',    // include all types of chunks
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 10,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            default: false
          }
        }
    },
```

<br>

#### 리액트 컴포넌트(Post)와 highlight.js 동적로딩 처리 결과

![동적로딩](/images/code-splitting.gif)
