---
layout: post
title: 'husky pre-commit 에서 yarn: command not found 오류'
date: 2022-05-26 00:01
tags: [husky, macos-updated]
description:
draft: false
---

MacOS 를 업데이트하고 나면 꼭 뭐 하나씩 되던 것이 안 되는 것 같다.
이번에는 리액트 프로젝트에서 커밋을 만들 때 husky 의 pre-commit 이 돌면서 아래와 같이 에러를 뿜었다

```{4}
11:33:27.955: [aurora-web] git -c core.quotepath=false -c log.showSignature=false checkout HEAD -- src/views/basic/channels/AdAccountsForm.tsx
11:34:02.526: [aurora-web] git -c core.quotepath=false -c log.showSignature=false add --ignore-errors -A -f -- src/views/utilities/components/multi-select-doc.tsx
11:34:02.570: [aurora-web] git -c core.quotepath=false -c log.showSignature=false commit -F /private/var/folders/tn/t1m35t0n3bs770lfxjyryxjc0000gn/T/git-commit-msg-.txt --
.husky/pre-commit: line 4: yarn: command not found
husky - pre-commit hook exited with code 127 (error)
11:35:27.901: [aurora-web] git -c core.quotepath=false -c log.showSignature=false add --ignore-errors -A -- .huskydc
```


pre-commit 의 내용은 아래와 같다.
```{4}
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

yarn 명령어를 못 찾는다는 오류인데.. 갑자기 왜잉???


오류메세지로 관련 구글링 해봄
https://stackoverflow.com/questions/66246587/how-to-fix-error-not-found-husky-run-when-committing-new-code


간단히 의존성 재설치하니까 뭔가 허스키도 뭔가 함께 초기화되면서 문제가 해결 됨

Solution)
```
yarn install
```


