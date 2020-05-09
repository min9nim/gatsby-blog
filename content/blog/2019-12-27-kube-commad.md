---
layout: post
title: '[kubernetes] 기본 명령어'
date: 2019-12-27 00:10
categories: kubernetes
tags: [kubernetes, command]
---
### 쿠버네티스 설치
https://kubernetes.io/docs/tasks/tools/install-kubectl/

<br>

### 기본 명령어들

컨테이너 목록 확인
```
kubectl get pod
```

<br>

컨테이너 삭제
```
kubectl delete pod container-name
```

<br>

컨테이너 ssh 접속
```
kubectl exec -it container-name bash
```

<br>

kubectl 로그 확인
```
kubectl logs -f container-name
```

<br>

컨테이너의 파일을 로컬로 복사
```
kubectl cp <source pod>:<source file> <destination>
```
ex) `kubectl cp blabla-name:/var/app/screenshot/image1.png ./image1.png`


<br>

### 로그 확인 shell 스크립트
쿠버네티스는 컨테이너를 재기동할 때마다 컨테이너 이름이 바뀐다. 그래서 로그를 열려면 매번 컨테이너 이름을 확인해 줘야 한다. 삽질을 조금 줄이려면 아래와 같이 shell 스크립트를 사용할 수 있다.
```
#!/bin/sh

IN=$(kubectl get pod | grep case)
#echo $IN
arrIN=(${IN// / })
#echo $arrIN
kubectl logs -f $arrIN
```

<br>

### Ref.
https://stackoverflow.com/questions/918886/how-do-i-split-a-string-on-a-delimiter-in-bash