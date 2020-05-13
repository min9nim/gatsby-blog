---
layout: post
title: "[java] ArrayList vs LinkedList vs Vector"
date: 2018-09-19 09:00
categories: java
tags: [ArrayList, LinkedList, Vector]
---

각 자료구조에 대한 차이를 정확히 알아야 적절한 자료구조를 선택할 수 있다

| 구분      | ArrayList | LinkedList | Vector                                    |
| --------- | --------- | ---------- | ----------------------------------------- |
| 동기화    | 미지원    | 미지원     | 지원                                      |
| 검색      | 빠름      | 느림       | 빠름                                      |
| 추가/삭제 | 무겁다    | 가볍다     | 무겁다                                    |
| 지원버젼  | java1.2   | java1.2    | java1.0                                   |
| 가변길이  | 가능      | 가능       | 가능                                      |
| 특징      | -         | -          | capacity이상이 되면 두배 씩 길이를 늘려감 |

<br>

#### 동기화이슈

ArrayList 와 LinkedList의 동기화 문제는 Collections 클래스를 이용해 해결할 수 있다

```
Collections.synchronizedList(List<T> list);
```

<br>

#### Ref

http://www.holaxprogramming.com/2014/02/12/java-list-interface/
