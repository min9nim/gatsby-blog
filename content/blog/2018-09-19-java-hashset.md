---
layout: post
title: "[java] HashSet 사용법"
date: 2018-09-19 09:00
categories: java
tags: [HashSet]
---

중복을 허락하지 않는 자료구조 Set

<br>

#### 예제소스

```java
package test;

import java.util.Set;
import java.util.HashSet;
import java.util.Iterator;

public class TestSet {

	public static void main(String args[]) {
		Set<String> set = new HashSet<String>();
		set.add("Tom");
		set.add("Marry");
		set.add("James");
		set.add("Mark");
		set.add("Marry");

		for (Iterator i = set.iterator(); i.hasNext();) {
			System.out.println(i.next());
		}
	}
}
```

<br>

#### 출력

```
Tom
James
Mark
Marry
```
