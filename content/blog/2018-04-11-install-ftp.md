---
layout: post
title:  "[mac] High Sierra 에서 telnet & ftp CLI 설치"
date:   2018-04-11 14:40:00 +0900
categories: memo
tags: [HighSierra, mac, telnet, ftp]
---
### Problem
Mac High Sierra 는 보안 상의 문제로 터미널에서 telnet, ftp 명령어를 기본적으로 지원하지 않는다
<br>
<br>

### Solution
아래와 같이 CLI도구를 따로 설치해야 한다

1. 다운로드
```console
$ curl http://ftp.gnu.org/gnu/inetutils/inetutils-1.9.4.tar.gz -o inetutils-1.9.4.tar.gz
```
2. 컴파일
```console
$ tar xvzf inetutils-1.9.4.tar.gz
$ cd inetutils-1.9.4
$ ./configure
$ make
```
3. 설치
```console
$ sudo make install
```
4. 추가로 설치되는 항목들은 아래와 같다(/usr/local/bin)
```
ifconfig
ping6
ping
whois
talk
ftp
telnet
traceroute
tftp
rsh
rlogin
rexec
rcp
logger
dnsdomainname
hostname
```
<br>
<br>

### Ref.
<http://www.unixfu.ch/get-telnet-and-ftp-client-back-on-macos-high-sierra/>
