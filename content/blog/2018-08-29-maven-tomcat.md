---
layout: post
title: "메이븐 pom.xml 세팅 후 톰캣 기동시 오류"
date: 2018-08-29 01:00:00 +0100
categories: maven
tags: [maven, tomcat, repository]
---

전자정부프레임워크(eGovFrameDev-3.7.0-64bit)에서 eGovFrame Web Project 를 생성하고, pom.xml 에 어떤 내용을 추가하고 톰캣 서버 기동시 아래와 같은 오류 발생

```bash
8월 28, 2018 5:47:00 오후 org.apache.tomcat.util.digester.SetPropertiesRule begin
경고: [SetPropertiesRule]{Server/Service/Engine/Host/Context} Setting property 'source' to 'org.eclipse.jst.jee.server:egovWeb' did not find a matching property.
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Server version:        Apache Tomcat/8.5.33
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Server built:          Aug 12 2018 08:20:08 UTC
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Server number:         8.5.33.0
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: OS Name:               Windows 7
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: OS Version:            6.1
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Architecture:          amd64
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Java Home:             C:\Program Files\Java\jre1.8.0_151
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: JVM Version:           1.8.0_151-b12
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: JVM Vendor:            Oracle Corporation
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: CATALINA_BASE:         C:\egov\eGovFrameDev-3.7.0-64bit\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: CATALINA_HOME:         C:\Program Files\apache-tomcat-8.5.33
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Command line argument: -Dcatalina.base=C:\egov\eGovFrameDev-3.7.0-64bit\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Command line argument: -Dcatalina.home=C:\Program Files\apache-tomcat-8.5.33
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Command line argument: -Dwtp.deploy=C:\egov\eGovFrameDev-3.7.0-64bit\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Command line argument: -Djava.endorsed.dirs=C:\Program Files\apache-tomcat-8.5.33\endorsed
8월 28, 2018 5:47:00 오후 org.apache.catalina.startup.VersionLoggerListener log
정보: Command line argument: -Dfile.encoding=UTF-8
8월 28, 2018 5:47:00 오후 org.apache.catalina.core.AprLifecycleListener lifecycleEvent
정보: The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: [C:\Program Files\Java\jre1.8.0_151\bin;C:\Windows\Sun\Java\bin;C:\Windows\system32;C:\Windows;C:/Program Files/Java/jre1.8.0_151/bin/server;C:/Program Files/Java/jre1.8.0_151/bin;C:/Program Files/Java/jre1.8.0_151/lib/amd64;C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Parallels\Parallels Tools\Applications;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Users\songmingu\AppData\Local\Programs\Fiddler;C:\Program Files\Java\jre1.8.0_151\bin;C:\automation-test\selenium\webdriver\chrome;C:\automation-test\selenium\webdriver\ie;C:\Python27\Scripts;;C:\egov\eGovFrameDev-3.7.0-64bit\eclipse;;.]
8월 28, 2018 5:47:00 오후 org.apache.coyote.AbstractProtocol init
정보: Initializing ProtocolHandler ["http-nio-8080"]
8월 28, 2018 5:47:01 오후 org.apache.tomcat.util.net.NioSelectorPool getSharedSelector
정보: Using a shared selector for servlet write/read
8월 28, 2018 5:47:01 오후 org.apache.coyote.AbstractProtocol init
정보: Initializing ProtocolHandler ["ajp-nio-8009"]
8월 28, 2018 5:47:01 오후 org.apache.tomcat.util.net.NioSelectorPool getSharedSelector
정보: Using a shared selector for servlet write/read
8월 28, 2018 5:47:01 오후 org.apache.catalina.startup.Catalina load
정보: Initialization processed in 2113 ms
8월 28, 2018 5:47:01 오후 org.apache.catalina.core.StandardService startInternal
정보: Starting service [Catalina]
8월 28, 2018 5:47:01 오후 org.apache.catalina.core.StandardEngine startInternal
정보: Starting Servlet Engine: Apache Tomcat/8.5.33
8월 28, 2018 5:47:02 오후 org.apache.catalina.core.ContainerBase startInternal
심각: A child container failed during start
java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at java.util.concurrent.FutureTask.report(Unknown Source)
    at java.util.concurrent.FutureTask.get(Unknown Source)
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:942)
    at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:872)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1420)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1410)
    at java.util.concurrent.FutureTask.run(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
    at java.lang.Thread.run(Unknown Source)
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [org.apache.catalina.webresources.StandardRoot@1c2a7495]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.StandardContext.resourcesStart(StandardContext.java:4907)
    at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5042)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to initialize component [org.apache.catalina.webresources.JarResourceSet@756a4c1a]
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:112)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:140)
    at org.apache.catalina.webresources.StandardRoot.startInternal(StandardRoot.java:724)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 9 more
Caused by: java.lang.IllegalArgumentException: java.util.zip.ZipException: invalid LOC header (bad signature)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:142)
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:107)
    ... 12 more
Caused by: java.util.zip.ZipException: invalid LOC header (bad signature)
    at java.util.zip.ZipFile.read(Native Method)
    at java.util.zip.ZipFile.access$1400(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInputStream.read(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInflaterInputStream.fill(Unknown Source)
    at java.util.zip.InflaterInputStream.read(Unknown Source)
    at sun.misc.IOUtils.readFully(Unknown Source)
    at java.util.jar.JarFile.getBytes(Unknown Source)
    at java.util.jar.JarFile.getManifestFromReference(Unknown Source)
    at java.util.jar.JarFile.getManifest(Unknown Source)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:140)
    ... 13 more
8월 28, 2018 5:47:02 오후 org.apache.catalina.core.ContainerBase startInternal
심각: A child container failed during start
java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost]]
    at java.util.concurrent.FutureTask.report(Unknown Source)
    at java.util.concurrent.FutureTask.get(Unknown Source)
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:942)
    at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:262)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    at org.apache.catalina.core.StandardService.startInternal(StandardService.java:422)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:793)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    at org.apache.catalina.startup.Catalina.start(Catalina.java:681)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
    at java.lang.reflect.Method.invoke(Unknown Source)
    at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:353)
    at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:493)
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1420)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1410)
    at java.util.concurrent.FutureTask.run(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
    at java.lang.Thread.run(Unknown Source)
Caused by: org.apache.catalina.LifecycleException: A child container failed during start
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:950)
    at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:872)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 6 more
Caused by: java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at java.util.concurrent.FutureTask.report(Unknown Source)
    at java.util.concurrent.FutureTask.get(Unknown Source)
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:942)
    ... 8 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [org.apache.catalina.webresources.StandardRoot@1c2a7495]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.StandardContext.resourcesStart(StandardContext.java:4907)
    at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5042)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to initialize component [org.apache.catalina.webresources.JarResourceSet@756a4c1a]
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:112)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:140)
    at org.apache.catalina.webresources.StandardRoot.startInternal(StandardRoot.java:724)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 9 more
Caused by: java.lang.IllegalArgumentException: java.util.zip.ZipException: invalid LOC header (bad signature)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:142)
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:107)
    ... 12 more
Caused by: java.util.zip.ZipException: invalid LOC header (bad signature)
    at java.util.zip.ZipFile.read(Native Method)
    at java.util.zip.ZipFile.access$1400(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInputStream.read(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInflaterInputStream.fill(Unknown Source)
    at java.util.zip.InflaterInputStream.read(Unknown Source)
    at sun.misc.IOUtils.readFully(Unknown Source)
    at java.util.jar.JarFile.getBytes(Unknown Source)
    at java.util.jar.JarFile.getManifestFromReference(Unknown Source)
    at java.util.jar.JarFile.getManifest(Unknown Source)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:140)
    ... 13 more
8월 28, 2018 5:47:02 오후 org.apache.catalina.startup.Catalina start
심각: The required Server component failed to start so Tomcat is unable to start.
org.apache.catalina.LifecycleException: Failed to start component [StandardServer[8005]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.startup.Catalina.start(Catalina.java:681)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
    at java.lang.reflect.Method.invoke(Unknown Source)
    at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:353)
    at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:493)
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardService[Catalina]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:793)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 7 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.StandardService.startInternal(StandardService.java:422)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 9 more
Caused by: org.apache.catalina.LifecycleException: A child container failed during start
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:950)
    at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:262)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 11 more
Caused by: java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost]]
    at java.util.concurrent.FutureTask.report(Unknown Source)
    at java.util.concurrent.FutureTask.get(Unknown Source)
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:942)
    ... 13 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1420)
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1410)
    at java.util.concurrent.FutureTask.run(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
    at java.lang.Thread.run(Unknown Source)
Caused by: org.apache.catalina.LifecycleException: A child container failed during start
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:950)
    at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:872)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 6 more
Caused by: java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at java.util.concurrent.FutureTask.report(Unknown Source)
    at java.util.concurrent.FutureTask.get(Unknown Source)
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:942)
    ... 8 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [StandardEngine[Catalina].StandardHost[localhost].StandardContext[/egovWeb]]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to start component [org.apache.catalina.webresources.StandardRoot@1c2a7495]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:167)
    at org.apache.catalina.core.StandardContext.resourcesStart(StandardContext.java:4907)
    at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5042)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 6 more
Caused by: org.apache.catalina.LifecycleException: Failed to initialize component [org.apache.catalina.webresources.JarResourceSet@756a4c1a]
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:112)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:140)
    at org.apache.catalina.webresources.StandardRoot.startInternal(StandardRoot.java:724)
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
    ... 9 more
Caused by: java.lang.IllegalArgumentException: java.util.zip.ZipException: invalid LOC header (bad signature)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:142)
    at org.apache.catalina.util.LifecycleBase.init(LifecycleBase.java:107)
    ... 12 more
Caused by: java.util.zip.ZipException: invalid LOC header (bad signature)
    at java.util.zip.ZipFile.read(Native Method)
    at java.util.zip.ZipFile.access$1400(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInputStream.read(Unknown Source)
    at java.util.zip.ZipFile$ZipFileInflaterInputStream.fill(Unknown Source)
    at java.util.zip.InflaterInputStream.read(Unknown Source)
    at sun.misc.IOUtils.readFully(Unknown Source)
    at java.util.jar.JarFile.getBytes(Unknown Source)
    at java.util.jar.JarFile.getManifestFromReference(Unknown Source)
    at java.util.jar.JarFile.getManifest(Unknown Source)
    at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.initInternal(AbstractSingleArchiveResourceSet.java:140)
    ... 13 more
8월 28, 2018 5:47:02 오후 org.apache.coyote.AbstractProtocol pause
정보: Pausing ProtocolHandler ["http-nio-8080"]
8월 28, 2018 5:47:02 오후 org.apache.coyote.AbstractProtocol pause
정보: Pausing ProtocolHandler ["ajp-nio-8009"]
8월 28, 2018 5:47:02 오후 org.apache.catalina.core.StandardService stopInternal
정보: Stopping service [Catalina]
8월 28, 2018 5:47:02 오후 org.apache.coyote.AbstractProtocol destroy
정보: Destroying ProtocolHandler ["http-nio-8080"]
8월 28, 2018 5:47:02 오후 org.apache.coyote.AbstractProtocol destroy
정보: Destroying ProtocolHandler ["ajp-nio-8009"]
```

<br>

### 해결방법

나는 `.m2` 의 `repository` 폴더를 통째로 삭제하고 다시 시작하니 정상동작 되었음. 혹 누군가에게 도움이 될 수 있기를 바람
