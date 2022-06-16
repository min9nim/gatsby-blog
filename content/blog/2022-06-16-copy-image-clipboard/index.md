---
layout: post
title: '화면캡쳐 후 클립보드로 복사'
date: 2022-06-16 00:01
tags: [image, clipboard, dom-to-image]
description: 전체 화면을 캡쳐해서 클립보드에 복사해 넣는 방법입니다.
draft: false
---

전체 화면을 캡쳐해서 클립보드에 복사해 넣는 방법입니다.

## dom-to-image 설치
https://www.npmjs.com/package/dom-to-image

```
yarn add dom-to-image
```

<br/>

## Source

```js{7-13}
import domtoimage from 'dom-to-image'

export default function CaptureScreen() {
    return (
        <span
            onClick={async () => {
                const dataUri = await domtoimage.toPng(
                    document.getElementById('root'),
                )
                const blob = await fetch(dataUri).then(res => res.blob())
                await navigator.clipboard.write([
                    new window.ClipboardItem({ 'image/png': blob }),
                ])

                window.alert('captured!')
            }}
            style={{
                width: 26,
                backgroundColor: '#222',
                cursor: 'pointer',
                padding: '1px',
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMuMiIvPgogICAgPHBhdGggZD0iTTkgMkw3LjE3IDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC0zLjE3TDE1IDJIOXptMyAxNWMtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo="
                alt="Try html2canvas"
                className="css-1bgbwga"
            />
        </span>
    )
}
```

<br/>

## Demo
https://pew74w.csb.app/
