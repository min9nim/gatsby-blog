---
layout: post
title:  "[vscode] java 사용시 세팅 관련"
date:   2018-05-30 10:00:00 +0900
categories: memo
tags: [vscode, java]
---
1. 특정 jar를 인식하지 못할 때,  
작업폴더의 루트 경로의 `.classpath` 파일에서 아래처럼 필요한 jar 파일들을 명시해 준다.
- `/lib/*.jar` 나 `/lib/*` 과 같이 설정은 안되더라


   ```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<classpath>
		<classpathentry kind="src" path="src"/>
		<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/JavaSE-1.6">
			<attributes>
				<attribute name="owner.project.facets" value="java"/>
			</attributes>
		</classpathentry>
		<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.web.container"/>
		<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.module.container"/>
		<classpathentry kind="lib" path="/Applications/apache-tomcat-7.0.29/lib/servlet-api.jar"/>
		<classpathentry kind="lib" path="WebContent/WEB-INF/lib/InswaveFramework.jar"/>
		<classpathentry kind="lib" path="WebContent/WEB-INF/lib/json_simple-1.1.jar"/>
		<classpathentry kind="lib" path="WebContent/WEB-INF/classes"/>
		<classpathentry kind="output" path="build/classes"/>
	</classpath>
	```


2. 확장자별 인코딩을 변경하려면,  
_작영 영역 설정_에서 아래와 같이 세팅한다. _gw 폴더 설정_에서 하면 안 먹힘
![img2](/images/vscode-encoding.png)