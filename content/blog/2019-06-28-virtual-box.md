---
layout: post
title:  "VirtualBox 로 MS Edge 테스트환경 구축"
date:   2019-06-28 00:10
categories: test
tags: [edge, test, vitual-box]
---
맥용 MS Edge 가 있기는 하지만 Windows10 에서의 동작과 100% 일치할 순 없기 때문에 MS Edge on Windows10 테스트환경을 갖추는 것이 필요하다. 본 글에서는 맥에서 Windows10 MS Edge 테스트환경을 구축하는 방법을 간단히 정리한다.

<br>

### VirtualBox 설치
가상OS를 띄어야 하는데 일단 가볍게? 무료로 사용할 수 있는 Oracle의 VirtualBox 를 설치한다

https://www.virtualbox.org/wiki/Downloads


주의) pkg파일로 설치 중 설치를 할 수 없다는 문제가 발생하면 당황하지 말고 아래 링크를 참고한다

https://medium.com/@DMeechan/fixing-the-installation-failed-virtualbox-error-on-mac-high-sierra-7c421362b5b5

<br>

### Windows10 MS Edge 이미지 다운로드
아래 링크에서 테스트환경(Windows10 MS Edge) 이미지 파일을 다운로드 받은 후 압축을 푼다.

https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/

<br>

### Windows10 시작
VirtualBox 를 실행시키고 가상OS이미지를 import 한다. (손쉬운 부분이기에 디테일한 안내는 생략한다)

Windows10을 시작한다. 최초 로그인 비밀번호는 `Passw0rd!` 이다

<br>

### 해상도 resize
Windows10을 구동시키면 가상환경의 모니터 화면이 창 크기대로 resize 되지 않을 수 있다. 그런 경우에는 비디오 메모리를 최소 27MB이상으로 세팅한다.(홀수보단 짝수가 좋으니까 28MB로 세팅)

![](/images/vedio-memory.png)

주의) 시스템 설정은 가상환경이 완전히 중지(전원차단)된 상태에서만 값을 수정할 수 있다.

<br>

### 시스템 메모리
시스템의 메모리를 너무 많이 잡으면 로컬PC환경이 지나치게 느려질 수 있으니 적절히 조정한다. 필자는 8GB 메모리를 사용 중이었는데 가상환경의 메모리로 2GB 정도 할당하니 가장 쓸만했다.

![](/images/system-memory.png)
