---
layout: post
title:  "[nodejs] GraphQL 클라이언트 소개"
date:   2019-04-25 00:10
categories: nodejs
tags: [graphql]
---
본 글에서는 Nodejs 에서 간단히 GrahpQL 서버에서 데이터를 fetch 하는 클라이언트 작성 방법을 소개한다.

<br>

### 필요 모듈
```json
  "devDependencies": {
    "ts-node": "^8.1.0",        
    "typescript": "^3.4.5"      
  },
  "dependencies": {
    "apollo-boost": "^0.3.1",   
    "graphql": "^14.2.1",
    "node-fetch": "^2.3.0"
  }
```
1. ts-node
    - ts 를 컴파일 없이 바로 실행
1. type-script
    - 본 예제에서는 단순히 import 구문을 간단히 사용하기 위함
1. apollo-boost
    - GraphQL 클라이언트 모듈
1. node-fetch
    - ApolloClient 가 사용할 http 요청 모듈

<br>

### 소스
```javascript
import ApolloClient, {gql} from "apollo-boost";
import fetch from 'node-fetch'

const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    fetch,
});

client.query({
  query: gql`
      {
          rates(currency: "USD") {
              currency
          }
      }
  `
}).then(result => console.log(result));
```
1. 예제를 테스트하기 전에 https://48p1r2roz4.sse.codesandbox.io 를 클릭하여 서버 인스턴스를 시작해 두어야 한다
1. ApolloClient 는 http 요청을 날리기 위해 내부적으로 전역스코프에서 fetch 를 찾는다. Nodejs 환경에서는 기본으로 fetch 를 제공하지 않기 때문에 node-fetch 모듈을 객체생성시 전달해야 한다.
1. gql 은 작성된 grahpql 쿼리를 파싱하고 ApolloClient 가 처리할 수 있는 객체로 반환한다.
1. 본 예제에서 ts-node 와 typescript 는 바벨설정 없이 import 구문을 간단히 사용하기 위해 사용되었다.

<br>

#### mutation 예제
```javascript
client.mutate({
    mutation : gql`
        mutation {
          signUp(email: "user01@gmail.com", password: "Dev1@#$%^&"){
              email
              roles
          }
        }
  `
}).then(result => console.log(result));
```

<br>

### Ref.
https://www.apollographql.com/docs/react/essentials/get-started

 <br>

### GitHub
https://github.com/min9nim/toy-apollo-client
 