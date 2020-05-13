---
layout: post
title: "[java] 날짜를 문자열로 변환"
date: 2018-10-15 00:30
categories: java
tags: [java]
---

날짜를 문자열 포맷으로 변경하는 방법

```java
package test;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateToStr {
	public static void main(String[] args) {
		Date from = new Date();

		SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String current = transFormat.format(from);

		System.out.println(current);
	}
}
```

<br>

#### Ref.

<http://nota.tistory.com/50>
