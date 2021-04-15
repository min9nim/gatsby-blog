---
layout: post
title:  "[JAVA] 터미널에서 컴파일하고 실행하기"
date:   2018-11-30 00:10
categories: java
tags: [java]
---
jdk 명령도구를 이용해 자바를 컴파일하고 실행하는 방법


<br>
Hello.java 코드 작성

```java
class Hello {
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

<br>

컴파일
```
$ javac Hello.java
```
컴파일이 완료되면 Hello.class 파일이 생성된다

<br>

실행
```
$ java Hello
hello world
$
```
