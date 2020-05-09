---
layout: post
title:  "[Nodejs] 프라미스 파일쓰기"
date:   2018-12-11 00:10
categories: nodejs
tags: [nodejs, file, promise]
---
it works

```javascript
const util = require('util')
const fs = require('fs');
const fs_writeFile = util.promisify(fs.writeFile)

fs_writeFile('message.txt', 'Hello Node.js')
.catch((error) => {
    console.log(error)
});
```

<br>

### Ref.
<https://stackoverflow.com/questions/31978347/fs-writefile-in-a-promise-asynchronous-synchronous-stuff>