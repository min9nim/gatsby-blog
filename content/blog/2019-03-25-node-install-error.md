---
layout: post
title:  "[nodejs] EACCES: permission denied, mkdir"
date:   2019-03-25 00:10
categories: nodejs
tags: [error]
---
특정 npm 모듈을 글로벌 설치할 때 아래와 같은 오류를 종종 만나곤 한다. sudo 를 이용해 수행하더라도 설치 과정에서 내부적으로 쓰기 권한이 없어 오류가 발생하는 것으로 보인다

```

~/toy-p/toy-graphql $ sudo npm install -g babel-cli
/usr/local/bin/babel-doctor -> /usr/local/lib/node_modules/babel-cli/bin/babel-doctor.js
/usr/local/bin/babel -> /usr/local/lib/node_modules/babel-cli/bin/babel.js
/usr/local/bin/babel-node -> /usr/local/lib/node_modules/babel-cli/bin/babel-node.js
/usr/local/bin/babel-external-helpers -> /usr/local/lib/node_modules/babel-cli/bin/babel-external-helpers.js

> fsevents@1.2.7 install /usr/local/lib/node_modules/babel-cli/node_modules/fsevents
> node install

node-pre-gyp WARN Using needle for node-pre-gyp https download 
node-pre-gyp WARN Pre-built binaries not installable for fsevents@1.2.7 and node@10.15.1 (node-v64 ABI, unknown) (falling back to source compile with node-gyp) 
node-pre-gyp WARN Hit error EACCES: permission denied, mkdir '/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib' 
gyp ERR! configure error 
gyp ERR! stack Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/build'
gyp ERR! System Darwin 18.2.0
gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "configure" "--fallback-to-build" "--module=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" "--module_name=fse" "--module_path=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64" "--napi_version=3" "--node_abi_napi=napi"
gyp ERR! cwd /usr/local/lib/node_modules/babel-cli/node_modules/fsevents
gyp ERR! node -v v10.15.1
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok 
node-pre-gyp ERR! build error 
node-pre-gyp ERR! stack Error: Failed to execute '/usr/local/bin/node /usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js configure --fallback-to-build --module=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node --module_name=fse --module_path=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64 --napi_version=3 --node_abi_napi=napi' (1)
node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/node_modules/node-pre-gyp/lib/util/compile.js:83:29)
node-pre-gyp ERR! stack     at ChildProcess.emit (events.js:189:13)
node-pre-gyp ERR! stack     at maybeClose (internal/child_process.js:970:16)
node-pre-gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:259:5)
node-pre-gyp ERR! System Darwin 18.2.0
node-pre-gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/node_modules/node-pre-gyp/bin/node-pre-gyp" "install" "--fallback-to-build"
node-pre-gyp ERR! cwd /usr/local/lib/node_modules/babel-cli/node_modules/fsevents
node-pre-gyp ERR! node -v v10.15.1
node-pre-gyp ERR! node-pre-gyp -v v0.10.3
node-pre-gyp ERR! not ok 
Failed to execute '/usr/local/bin/node /usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js configure --fallback-to-build --module=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node --module_name=fse --module_path=/usr/local/lib/node_modules/babel-cli/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64 --napi_version=3 --node_abi_napi=napi' (1)
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/babel-cli/node_modules/fsevents):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 install: `node install`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

+ babel-cli@6.26.0
updated 1 package in 5.208s
~/toy-p/toy-graphql $
```

<br>

### 해결책
아래와 같이 `--unsafe-perm=true` 옵션을 추가해 본다
```
sudo npm install -g babel-cli --unsafe-perm=true
```

<br>

### Ref
https://github.com/npm/npm/issues/17268
