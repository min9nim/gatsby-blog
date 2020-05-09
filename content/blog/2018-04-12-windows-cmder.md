---
layout: post
title:  "[windows] 특정 폴더에서 cmder 바로 열기"
date:   2018-04-12 13:50:00 +0900
categories: memo
tags: [windows, cmder]
---
### Problem
1. 윈도우에서 기본으로 제공되는 터미널은 Copy & Paste 및 창사이즈 조절에 제한이 있어 불편
2. 터미널에서 cd 명령을 이용해 특정 경로로 이동하는 것도 귀찮고
<br>
<br>

### Solution
1. 잘 알려진 [윈도우용 터미널 cmder][cmder] 를 `C:\cmder_mini` 경로에 설치한다.  
(설치 경로를 변경하고자 한다면 아래 레지스트리 편집기에서 경로를 알맞게 수정)
![img0](/images/addCmder0.png)

2. 아래와 같이 레지스트리 편집
    ```
    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\Directory\Background\shell\Open Command Window Here]
    @="Open commend window here(&Z)"

    [HKEY_CLASSES_ROOT\Directory\Background\shell\Open Command Window Here\command]
    @="C:\\cmder_mini\\cmder.exe %v"

    [HKEY_CLASSES_ROOT\Directory\shell\Open Command Window Here]
    @="Open commend window here(&Z)"

    [HKEY_CLASSES_ROOT\Directory\shell\Open Command Window Here\command]
    @="C:\\cmder_mini\\cmder.exe %v"
    ```
    직접 수정하기가 귀찮다면 아래 레지스트리 편집 파일을 간단히 사용해도 된다  
    - [AddCmder.reg](/files/AddCmder.reg) (위 내용과 동일)
    - [DelCmder.reg](/files/DelCmder.reg)
    - [AddCmderAdmin.reg](/files/AddCmderAdmin.reg) (관리자권한 실행)
    - [DelCmderAdmin.reg](/files/DelCmderAdmin.reg)



3. 특정 경로에서 마우스 오른 클릭을 하면 바로가기 가능!
![img1](/images/addCmder1.png)
<br>
<br>
![img2](/images/addCmder2.png)
<br>
<br>



### Ref.
<http://minq.tistory.com/667>{:target="_blank"}





[cmder]: http://cmder.net
