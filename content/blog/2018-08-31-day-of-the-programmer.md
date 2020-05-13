---
layout: post
title: "Day of the Programmer"
date: 2018-08-31 09:00
categories: algorithm
tags: [calendar, leap-year, Gregorian, Julian]
---

### Day of the Programmer

매해 256번째 날은 국제 [프로그래머의 날](https://en.wikipedia.org/wiki/Day_of_the_Programmer)이다. 일반적으로 9월 13일이고 윤년의 경우에는 9월 12일이 된다. 256은 2의 제곱으로 표현 가능한 자연수 중 356을 넘지않는 최대값이다. 또한 1바이트로 표현할 수 있는 정보의 최대 개수이기도 하다. [러시아는 2009년부터 이 날을 공휴일로 지정](http://opendotdotdot.blogspot.com/2009/09/russias-new-holiday-programmers-day.html)했다.

<br>

### 라시아 달력

- 러시아는 1917년 까지는 줄리안 달력을 사용했지만 1919년 부터는 그레고리 달력을 사용한다.
- 줄리안달력에서 고레고리달력으로 넘어간 시점은 1918년에 발생했다
  - 1918년 1월 31일 다음 날은 2월 14일이 되었다
- 2월 달이 29일인 년도를 윤년이라고 하는데 두 달력은 이 윤년을 계산하는 방식이 서로 다르다
  - 줄리안 달력: 4로 나누어 떨어지는 년도가 윤년
  - 그레고리 달력: 년도가 400으로 나누어 떨어지면 윤년, 아니라면 4로 나누어 떨어지고 100으로 나누어 떨어지지 않는다면 윤년

<br>

### 퀴즈

임의의 년도가 주어질 때 그 년도에 해당하는 프로그래머의 날이 언제인지 계산하라.
<https://www.hackerrank.com/challenges/day-of-the-programmer/problem>

<br>

### 입출력 예제

Sample Input

```
2016
```

Sample Output

```
12.09.2016
```

<br>

### js 코드

풀이는 간단하다. 그냥 위에 제시된 윤년의 조건을 분기로 표현하면 된다.

```javascript
function dayOfProgrammer(year) {
  if (year > 1918) {
    // 그레고리 달력
    if (year % 400 === 0) {
      // 윤년
      return "12.09." + year
    } else if (year % 4 === 0 && year % 100 !== 0) {
      // 윤년
      return "12.09." + year
    } else {
      // 평년
      return "13.09." + year
    }
  } else if (year < 1918) {
    if (year % 4 === 0) {
      // 윤년
      return "12.09." + year
    } else {
      // 평년
      return "13.09." + year
    }
  } else {
    // 1918년
    return "26.09." + year
  }
}
```
