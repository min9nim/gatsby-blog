---
layout: post
title:  "graphql 쿼리객체 문자열 변환"
date:   2019-08-27 00:10
categories: graphql
tags: [graphql]
---
그래프큐엘 쿼리 객체를 문자열로 변환하는 방법

하나,
```javascript
const myFragment = gql` .....some GQL... `;

console.log(getGqlString(myFragment));

function getGqlString(doc: DocumentNode) {
  return doc.loc && doc.loc.source.body;
}
```

<br>

둘,
```javascript
import { print } from 'graphql/language/printer'

console.log(print(query)) 
```

<br>

#### Ref.
https://github.com/apollographql/graphql-tag/issues/144