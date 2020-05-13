---
layout: post
title: "[java] HashMap 사용법"
date: 2018-09-19 09:00
categories: java
tags: [HashMap]
---

java에서 HashMap 사용법

<br>

#### 기본 사용법

```java
package test;

import java.util.HashMap;

public class TestMap {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("people", "사람");
        map.put("baseball", "야구");

        System.out.println(map.get("people"));
        System.out.println(map.containsKey("people"));
        System.out.println(map.remove("people"));
        System.out.println(map.size());
    }
}
```

참고)

- 위에서 `HashMap` 객체 생성시 사용된 유형 매개변수는 jdk1.5 이상부터 사용 가능
- jdk1.4 에서 사용할 경우 아래와 같은 오류 발생

```
Syntax error, parameterized types are only available if source level is 1.5 or greater
```

#### 출력

```
사람
true
사람
1
```

<br>

#### 순회방법

```java
package test;

import java.util.HashMap;
import java.util.Map;

public class TestMapTour {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("people", "사람");
        map.put("baseball", "야구");
        map.put("apple", "사과");
        map.put("banana", "바나나");

        System.out.println("## entrySet() 을 이용한 순회");
        for (Map.Entry<String, String> entry : map.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println(key + " - " + value);
        }

        System.out.println("\n## keySet() 을 이용한 순회");
        for (String key : map.keySet()) {
            System.out.println(key);
        }

        System.out.println("\n## values() 을 이용한 순회");
        for (String value : map.values()) {
            System.out.println(value);
        }
    }
}
```

#### 출력

```
## entrySet() 을 이용한 순회
banana - 바나나
apple - 사과
baseball - 야구
people - 사람

## keySet() 을 이용한 순회
banana
apple
baseball
people

## values() 을 이용한 순회
바나나
사과
야구
사람
```

<br>

#### Ref

- <https://wikidocs.net/208>
- <http://starblood.tistory.com/entry/Map-HashMap-순회하기>
