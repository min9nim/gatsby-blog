---
layout: post
title:  "[JEST] ES2015 모듈 사용하기"
date:   2018-11-28 00:10
categories: jest
tags: [jest, TDD, node]
---
테스트 대상이 되는 모듈을 테스트하기 위해서는 테스트코드에서 일단 해당 모듈을 불러올 수 있어야 한다. 하지만 JEST 는 기본적으로 ES6의 `import`, `export` 구문을 사용할 수 없다. 해당 구문을 사용하려면 `import`, `export` 를 commonjs 모듈로 변환해 주는 바벨 설정이 필요하다.

본 글은 JEST에서 `import`, `export` 구문을 사용할 수 있도록 설정 방법을 안내한다.

<br>

#### babel-plugin-transform-es2015-modules-commonjs 설치
테스트환경에서만 필요한 모듈이므로 설치시 `--save-dev` 옵션을 사용한다
```
npm install --save-dev babel-plugin-transform-es2015-modules-commonjs
```

<br>

####  .babelrc 설정
프로젝트 루트 경로에 `.babelrc` 파일을 추가하고 아래 내용을 입력한다
```
{
  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```

<br>

#### Ref.
<https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export>
