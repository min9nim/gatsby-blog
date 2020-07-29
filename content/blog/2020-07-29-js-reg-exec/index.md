---
layout: post
title: 'RegExp 객체의 exec 사용'
date: 2020-07-29 00:10
tags: [js, regexp]
description:
draft: false
---

주어진 문자열에서 매칭되는 문자열을 전부 찾아내는 방법

```js
const str = '#{value1} 테스트 테스트 테스트 #{value2} 테스트12341234 #{value3}'
const reg = /#\{([^#]+)\}/

function getMatchAll(reg, str) {
  const regexp = new RegExp(reg, 'g')
  const arr = []
  let result
  while ((result = regexp.exec(str)) !== null) {
    arr.push({ result, lastIndex: regexp.lastIndex })
  }
  return arr
}
getMatchAll(reg, str)
  .map(item => item.result)
  .map(result => result[1]) // ["value1", "value2", "value3"]
```

1. `exec` 메소드는 실행될 때마다 다른 결과를 순차적으로 리턴한다.
1. 전체 문자열을 대상으로 매칭되는 문자열이 없을 때까지 주어진 문자열을 순회하며 매칭된 문자열을 찾아야 한다.

<br>

### Ref
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
