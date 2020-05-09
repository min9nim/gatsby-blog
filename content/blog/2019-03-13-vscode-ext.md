---
layout: post
title:  "[vscode] 단축키로 터미널 명령 실행"
date:   2019-03-13 00:10
categories: vscode
tags: [vscode]
---
vscode 에서 단축키를 이용해 터미널 명령을 바로 실행하는 방법은 여러가지가 있겠지만 특별히 Command Runner 익스텐션을 사용하는 방법을 공유한다.

<br>

### Command Runner 설치
vscode extension 메뉴에서 Command Runner 를 검색하여 설치한다.

![](/images/command-runner.png)


<br>

### 설정
vscode 설정에서 "command runner" 검색어를 이용해 해당 설정을 찾고
![](/images/command-runner2.png)


적절한 스코프 설정(user/workspace/project)에 아래와 같이 명령어를 등록한다
```
{
    "command-runner.commands" : {
        "prettier-eslint current file" : "npx prettier-eslint --write ${file}"
    }
}
```

<br>

### 단축키 등록
적절한 단축키를 등록하고
![](/images/command-runner3.png)

등록한 단축키를 누르면 앞서 등록했던 명령어가 목록에 나타난다
![](/images/command-runner4.png)


<br>

### 명령어 등록시 사용 가능한 변수
```
${file}: activated file path;
${fileBasename}: activated file basename;
${fileBasenameNoExtension}: activated file basename with no extension;
${fileDirname}: activated file dirname;
${fileExtname}: activated file extension;
${lineNumber}: the first selected line number;
${lineNumbers}: the all selected line number, eg. 41,46,80;
${selectedText}: the first selected text;
${selectedTextList}: the all selected text list, eg. sl1 sl2;
${selectedPosition}: the selected position list, eg. 21,6;
${selectedPositionList}: the all selected position list, eg. 45,6 80,18 82,5;
${relativeFile}: activated file relative path;
${workspaceFolder}: activated workspace folder path;
${workspaceFolderBasename}: activated workspace folder basename;
${homedir}: the home directory of the current user;
${tmpdir}: default directory for temporary files;
${env:PATH}: shell environment variable "PATH";
${config:editor.fontSize}: vscode config variable;
${command:workbench.action.terminal.clear}: run vscode command;
```


<br>

### Ref
https://marketplace.visualstudio.com/items?itemName=edonet.vscode-command-runner