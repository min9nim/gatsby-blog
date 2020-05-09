---
layout: post
title:  "[js] clipboard 읽기&쓰기"
date:   2019-10-08 00:10
categories: js
tags: [Frontend, js]
---
클립보드에 데이터를 읽고 쓰는 방법

<br>

### 클립보드에 데이터 쓰기(execCommand 이용)
```javascript
function copyToClipboard(val) {
  let t = document.createElement('textarea')
  document.body.appendChild(t)
  t.value = val
  t.select()
  document.execCommand('copy')
  document.body.removeChild(t)
}
```
- 크롬에서 정상 동작

<br>

### 클립보드 데이터 읽기(execCommand 이용)
```html
<textarea id="output"></textarea>
<button id="paste">Paste</button>
```

```javascript
function paste() {
  var pasteText = document.querySelector("#output");
  pasteText.focus();
  document.execCommand("paste");
  console.log(pasteText.textContent);
}

document.querySelector("#paste").addEventListener("click", paste);
```
- 크롬에서 정상 동작
- 파이어폭스 미지원

<br>

### 클립보드 데이터 읽기(clipboard API 이용)
```javascript
navigator.clipboard.readText()
  .then(text => {
    console.log('Pasted content: ', text);
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
```
- [공식매뉴얼](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)에서는 파이어폭스 지원이라고 나와있는데, 실제 테스트결과 파이어폭스(69.0.2 on Mac)에서 동작하지가 않았다(readText 가 undefined)

<br>

#### Epilog
파이어폭스에서 클립보드의 데이터를 읽어와서 특정 textarea 붙여넣기를 하고자 했었는데 가능한 방법을 찾을 수 없다. ㅠ

<br>

### Ref.
- https://stackoverflow.com/questions/6413036/get-current-clipboard-content
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard