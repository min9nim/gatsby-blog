---
layout: post
title: "react-devtools 설치시 permission denied 오류"
date: 2018-08-27 01:00:00 +0000
categories: react-native
tags: [react-devtools, --unsafe-perm=true]
---

[react-devtools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) 설치시 아래와 같은 오류가 날 경우

```bash
$ sudo npm i -g react-devtools
Password:
/usr/local/bin/react-devtools -> /usr/local/lib/node_modules/react-devtools/bin.js

> electron@1.8.8 postinstall /usr/local/lib/node_modules/react-devtools/node_modules/electron
> node install.js

/usr/local/lib/node_modules/react-devtools/node_modules/electron/install.js:47
  throw err
  ^

Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/react-devtools/node_modules/electron/.electron'
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! electron@1.8.8 postinstall: `node install.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the electron@1.8.8 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/songmingu/.npm/_logs/2018-08-27T01_24_56_800Z-debug.log
```

<br>
npm 설치시 `--unsafe-perm=true` 옵션을 추가하면 정상적으로 설치가 된다
```
$ sudo npm i -g react-devtools --unsafe-perm=true
/usr/local/bin/react-devtools -> /usr/local/lib/node_modules/react-devtools/bin.js

> electron@1.8.8 postinstall /usr/local/lib/node_modules/react-devtools/node_modules/electron
> node install.js

Downloading SHASUMS256.txt
[============================================>] 100.0% of 5.74 kB (5.74 kB/s)

- react-devtools@3.2.3
  added 235 packages from 144 contributors in 141.042s

```


<br>

### Ref.
<https://github.com/facebook/react-devtools/issues/741>
```
