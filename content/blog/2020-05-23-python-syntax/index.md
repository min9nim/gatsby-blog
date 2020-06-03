---
layout: post
title: Python 스터디
date: 2020-05-23 00:10
tags: [python, syntax]
draft: false
---

python 을 새롭게 공부하면서 특별히 기억할 만한 요소들을 정리해 본다.

### 변수의 선언 없이 바로 사용

다른 언어들(C/C++, JAVA, JavaScript)과 다르게 변수의 특별한 선언없이 바로 사용

```py
name = 'Keating'
print(name) # Keating
```

### comment

```python
# one line comment

"""
This is a comment
written in
more than just one line
"""

print("Hello, World!")
```

<br>

## 연산자

### power

```py
squared = 7 ** 2
cubed = 2 ** 3
print(squared)  # 7 * 7 = 49
print(cubed)  # 2 * 2 * 2 = 8
```

<br>

## 데이터 타입

### 문자열

```py

# 문자열 정의시 홑따옴표('), 쌍따옴표(") 모두 사용 가능
str1 = 'hello' # or "hello"

# 문자열 길이
len(str1) # 5

# 특정 문자의 위치
str1.index('e') # 1

# 특정 문자의 개수
str1.count('l') # 2

# 문자열 붙이기
str2 = 'world'
print(str1 + ' ' + str2)  # 'hello world'

# 문자열 반복
lotsofhellos = "hello" * 10
print(lotsofhellos) # 'hellohellohellohellohellohellohellohellohellohello'

# 문자열 자르기
"""
str[start:stop:step]
"""
str = 'hello world'
str[1] # 'e'
str[1:] # 'ello'
str[:3] # 'hel'
str[1:3] # 'el' (4번째 문자는 포함 안됨!)
str[1:-2] # 'el'

# 2칸씩 건너 뛰기
str[::2] # 'hlowrd'

# reverse
str[::-1] # 'dlrow olleh'

# upper & lower
str.upper() # HELLO WORLD
str.lower() # hello world

# startswith & endswith
str.startswith('hello') # True
str.endswith('xx') # False

# split
str.split(" ") # ['hello', 'world']

# Same result
str.split() # ['hello', 'world']

# 구분자는 포함안됨
str.split("e") # ['h', 'llo world']
```

### float

```py
# float 정의
myfloat = 7.0
print(myfloat)

# 이런 방법도 가능
myfloat = float(7)
print(myfloat)
```

### 리스트

```py
# 리스트에 요소 추가
list = []
list.append(1)

# 리스트 붙이기(concat)
concated = list + list
print(concated) # [1, 1]

# 리스트에 포함된 요소의 개수
len(list)

# 리스트의 반복
print([1,2,3] * 3)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# 리스트에 포함된 특정 요소의 개수
nums = [1,2,2,3]
print(nums.count(2)) # 2
```

<br>

## 조건문

### `==`, `True`, `False`

```py
x = 2
print(x == 2) # prints out True
print(x == 3) # prints out False
print(x < 3) # prints out True
```

### `and`, `or`

```py
name = "John"
age = 23
if name == "John" and age == 23:
    print("Your name is John, and you are also 23 years old.")

if name == "John" or name == "Rick":
    print("Your name is either John or Rick.")
```

### `in`

```py
name = "John"
if name in ["John", "Rick"]:
    print("Your name is either John or Rick.")
```

### `elif`, `else`, `is`

```py
statement = False
another_statement = True
if statement :
    print('do something')
elif another_statement :
    print('do something else')
else:
    print('do another thing')
```

### `is`

`==` 는 깊은 비교, `is` 는 네이티브 값을 비교(js의 `===` 같은 것?)

```py
x = [1,2,3]
y = [1,2,3]
print(x == y) # Prints out True
print(x is y) # Prints out False
```

### `not`

```py
print(not False) # Prints out True
print((not False) == (False)) # Prints out False
```

<br>

## 기타

### isinstance

```py
mystring = "hello"
myfloat = 10.0
myint = 20

if mystring == "hello":
    print("String: %s" % mystring)
if isinstance(myfloat, float) and myfloat == 10.0:
    print("Float: %f" % myfloat)
if isinstance(myint, int) and myint == 20:
    print("Integer: %d" % myint)

"""
String: hello
Float: 10.000000
Integer: 20
"""
```

### String formatting

- `%s` - String (or any object with a string representation, like numbers)
- `%d` - Integers
- `%f` - Floating point numbers
- `%.<number of digits>f` - Floating point numbers with a fixed amount of digits to the right of the dot.
- `%x/%X` - Integers in hex representation (lowercase/uppercase)

```py
# 문자열 포매팅
name = "John"
print("Hello, %s!" % name)  # Hello, John!

name = "John"
age = 23
print("%s is %d years old." % (name, age)) # John is 23 years old.

# 포매팅을 이용한 리스트의 출력
mylist = [1,2,3]
print("A list: %s" % mylist)  # A list: [1, 2, 3]

# float 도 %s 이용하여 출력가능
data = ("John", "Doe", 53.44)
format_string = "Hello %s %s. Your current balance is $%s."
print(format_string % data) # Hello John Doe. Your current balance is $53.44.
```

<br>

### Ref

https://www.learnpython.org/
