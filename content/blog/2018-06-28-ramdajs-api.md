---
layout: post
title: "ramdajs 주요 함수"
date: 2018-06-28 01:00:00 +0900
categories: ramdajs
tags: [functional, ramdajs]
---

흔히 사용될 수 있는 ramdajs 함수들을 알아본다
<br>
<br>

#### R.append

배열의 끝에 특정 요소를 추가한다

```javascript
R.append("tests", ["write", "more"]) //=> ['write', 'more', 'tests']
```

vs vanillaJS

```javascript
const arr = ["write", "more"]
arr.push("tests")
console.log(arr) //  ['write', 'more', 'tests']
```

<br>

#### R.prepend

배열의 처음에 특정 요소를 추가

```javascript
R.prepend("fee", ["fi", "fo", "fum"]) //=> ['fee', 'fi', 'fo', 'fum']
```

vs vanillaJS

```javascript
const arr = ["fi", "fo", "fum"]
arr.unshift("fee")
console.log(arr) // ["fee", "fi", "fo", "fum"]
```

<br>

#### R.insert

배열의 특정 위치에 요소를 삽입

```javascript
R.insert(2, "x", [1, 2, 3, 4]) //=> [1,2,'x',3,4]
```

vs vanillaJS

```javascript
const arr = [1, 2, 3, 4]
arr.splice(2, 0, "x")
console.log(arr) // [1,2,'x',3,4]
```

<br>

#### R.pipe

순서대로 연결된 함수를 리턴

```javascript
var f = R.pipe(Math.pow, R.negate, R.inc)
f(3, 4) // -(3^4) + 1
```

<br>

#### R.compose

역순으로 연결된 함수를 리턴

```javascript
R.compose(Math.abs, R.add(1), R.multiply(2))(-4)
// => 7  cause) | (-4 * 2) + 1 |
```

<br>

#### R.flip

**첫번째 두번째** 인자의 위치 순서를 뒤집어 놓은 함수를 리턴. (전체 인자의 순서를 뒤집는 것은 아님)

```javascript
var mergeThree = (a, b, c) => [].concat(a, b, c)
mergeThree(1, 2, 3) //=> [1, 2, 3]
R.flip(mergeThree)(1, 2, 3) //=> [2, 1, 3]
```

<br>

#### R.forEach

배열의 각 요소를 인자로 전달받는 특정 함수를 실행시키고 인자로 전달받았던 배열을 리턴한다

- Array.prototype.forEach 는 undefined 를 리턴
- 처리함수가 두번째 인자로 index 를 전달받지 못한다

```javascript
var printXPlusFive = x => console.log(x + 5)
R.forEach(printXPlusFive, [1, 2, 3]) //=> [1, 2, 3]
// logs 6
// logs 7
// logs 8
```

vs vanillaJS

```
var printXPlusFive = x => console.log(x + 5);
[1,2,3].forEach(printXPlusFive);

```

<br>

#### R.map

리스트의 각 요소를 다른 값으로 매핑한다. Array.prototype.map 와 유사.  
주의) 매핑함수의 2번째 인자로 index가 전달되지 않는다

```javascript
var double = x => x * 2
R.map(double, [1, 2, 3]) //=> [2, 4, 6]
R.map(double, { x: 1, y: 2, z: 3 }) //=> {x: 2, y: 4, z: 6}
```

<br>

#### R.filter

배열의 특정 요소들만 필터링. Array.prototype.filter 와 유사

```javascript
var isEven = n => n % 2 === 0
R.filter(isEven, [1, 2, 3, 4]) //=> [2, 4]
R.filter(isEven, { a: 1, b: 2, c: 3, d: 4 }) //=> {b: 2, d: 4}
```

<br>

#### R.reduce

리스트의 각 요소를 순회하며 특정 값으로 축약한다/ Array.prototype.reduce 와 유사

```javascript
R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
//          -               -10
//         / \              / \
//        -   4           -6   4
//       / \              / \
//      -   3   ==>     -3   3
//     / \              / \
//    -   2           -1   2
//   / \              / \
//  0   1            0   1
```

vanillaJS

```javascript
;[1, 2, 3, 4].reduce((a, c) => a - c, 0) // => ((((0 - 1) - 2) - 3) - 4) = -10
```

<br>

#### R.prop

객체의 특정 속성의 값을 리턴한다

```javascript
R.prop("x", { x: 100 }) //=> 100
R.prop("x", {}) //=> undefined
```

<br>

#### R.props

여러개의 속성의 값을 배열로 리턴

```javascript
R.props(["x", "y"], { x: 1, y: 2 }) //=> [1, 2]
R.props(["c", "a", "b"], { b: 2, a: 1 }) //=> [undefined, 1, 2]

var fullName = R.compose(R.join(" "), R.props(["first", "last"]))
fullName({ last: "Bullet-Tooth", age: 33, first: "Tony" }) //=> 'Tony Bullet-Tooth'
```

<br>

#### R.find

배열에서 특정 조건을 만족하는 첫번재 요소를 리턴. Array.prototype.find 와 유사

```javascript
var xs = [{ a: 1 }, { a: 2 }, { a: 3 }]
R.find(R.propEq("a", 2))(xs) //=> {a: 2}
R.find(R.propEq("a", 4))(xs) //=> undefined
```

vanillaJS

```javascript
var xs = [{ a: 1 }, { a: 2 }, { a: 3 }]
xs.find(o => o.a === 2) //=> {a: 2}
xs.find(o => o.a === 4) //=> undefined
```

<br>

#### R.findIndex

배열에서 특정 조건을 만족하는 첫번째 요소의 인덱스를 리턴. Array.prototype.findIndex 와 유사

```
var xs = [{a: 1}, {a: 2}, {a: 3}];
R.findIndex(R.propEq('a', 2))(xs); //=> 1
R.findIndex(R.propEq('a', 4))(xs); //=> -1
```

<br>

#### R.propEq

속성의 값이 특정 값과 일치하는지 여부를 리턴

```javascript
var abby = { name: "Abby", age: 7, hair: "blond" }
var fred = { name: "Fred", age: 12, hair: "brown" }
var rusty = { name: "Rusty", age: 10, hair: "brown" }
var alois = { name: "Alois", age: 15, disposition: "surly" }
var kids = [abby, fred, rusty, alois]
var hasBrownHair = R.propEq("hair", "brown")
R.filter(hasBrownHair, kids) //=> [fred, rusty]
```

<br>

#### R.propIs

속성의 값의 타입이 특정 타입과 일치하는지 여부를 리턴

```javascript
R.propIs(Number, "x", { x: 1, y: 2 }) //=> true
R.propIs(Number, "x", { x: "foo" }) //=> false
R.propIs(Number, "x", {}) //=> false
```

<br>

#### R.range

특정 범위의 연속적인 자연수 배열을 리턴

```javascript
R.range(1, 5) //=> [1, 2, 3, 4]
R.range(50, 53) //=> [50, 51, 52]
```

<br>

#### R.add

두 수의 합을 리턴

```javascript
R.range(1, 5) //=> [1, 2, 3, 4]
R.range(50, 53) //=> [50, 51, 52]
```

<br>

#### R.and

두 값의 && 연산 결과를 리턴

```javascript
R.and(true, true) //=> true
R.and(true, false) //=> false
R.and(false, true) //=> false
R.and(false, false) //=> false
```

<br>

#### R.or

두 값의 || 연산 결과를 리턴

```javascript
R.or(true, true) //=> true
R.or(true, false) //=> true
R.or(false, true) //=> true
R.or(false, false) //=> false
```

<br>

#### R.partial

왼쪽부터 인자가 부분적용된 함수를 리턴

```javascript
var multiply2 = (a, b) => a * b
var double = R.partial(multiply2, [2])
double(2) //=> 4

var greet = (salutation, title, firstName, lastName) =>
  salutation + ", " + title + " " + firstName + " " + lastName + "!"

var sayHello = R.partial(greet, ["Hello"])
var sayHelloToMs = R.partial(sayHello, ["Ms."])
sayHelloToMs("Jane", "Jones") //=> 'Hello, Ms. Jane Jones!'
```

<br>

#### R.partialRight

오른쪽부터 인자가 부분적용된 함수를 리턴

```javascript
var greet = (salutation, title, firstName, lastName) =>
  salutation + ", " + title + " " + firstName + " " + lastName + "!"

var greetMsJaneJones = R.partialRight(greet, ["Ms.", "Jane", "Jones"])

greetMsJaneJones("Hello") //=> 'Hello, Ms. Jane Jones!'
```

<br>

#### R.partition

특정 기준으로 리스트를 둘로 나눔

```javascript
R.partition(R.contains("s"), ["sss", "ttt", "foo", "bars"])
// => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]

R.partition(R.contains("s"), { a: "sss", b: "ttt", foo: "bars" })
// => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
```

<br>

#### R.equals

두 값을 비교, 순환참조 객체도 비교 가능

```javascript
R.equals(1, 1) //=> true
R.equals(1, "1") //=> false
R.equals([1, 2, 3], [1, 2, 3]) //=> true

var a = {}
a.v = a
var b = {}
b.v = b
R.equals(a, b) //=> true
```

<br>

#### R.contains

리스트에 특정 요소가 포함되는지 여부를 리턴. 내부적으로 R.equals 를 이용해 비교

```javascript
R.contains(3, [1, 2, 3]) //=> true
R.contains(4, [1, 2, 3]) //=> false
R.contains({ name: "Fred" }, [{ name: "Fred" }]) //=> true
R.contains([42], [[42]]) //=> true
```

<br>

#### R.any

리스트에서 특정 조건을 만족하는 요소가 있는지 여부를 리턴

```javascript
var lessThan0 = R.flip(R.lt)(0)
var lessThan2 = R.flip(R.lt)(2)
R.any(lessThan0)([1, 2]) //=> false
R.any(lessThan2)([1, 2]) //=> true
```

<br>

#### R.tail

머리 빼고 리턴

```javascript
R.tail([1, 2, 3]) //=> [2, 3]
R.tail([1, 2]) //=> [2]
R.tail([1]) //=> []
R.tail([]) //=> []

R.tail("abc") //=> 'bc'
R.tail("ab") //=> 'b'
R.tail("a") //=> ''
R.tail("") //=> ''
```

<br>

#### R.init

배열의 마지막 요소만 뺀 앞 부분 전부 리턴

```javascript
R.init([1, 2, 3]) //=> [1, 2]
R.init([1, 2]) //=> [1]
R.init([1]) //=> []
R.init([]) //=> []

R.init("abc") //=> 'ab'
R.init("ab") //=> 'a'
R.init("a") //=> ''
R.init("") //=> ''
```

<br>

#### R.split

문자열을 특정 기준으로 나눔, String.prototype.split 과 유사

```javascript
var pathComponents = R.split("/")
R.tail(pathComponents("/usr/local/bin/node")) //=> ['usr', 'local', 'bin', 'node']
R.split(".", "a.b.c.xyz.d") //=> ['a', 'b', 'c', 'xyz', 'd']
```

<br>

#### R.clone

깊은복사

```javascript
var objects = [{}, {}, {}]
var objectsClone = R.clone(objects)
objects === objectsClone //=> false
objects[0] === objectsClone[0] //=> false
```

<br>

#### R.isNil

`undefined` or `null` 체크

```javascript
R.isNil(null) //=> true
R.isNil(undefined) //=> true
R.isNil(0) //=> false
R.isNil([]) //=> false
```

<br>

#### R.complement

`true` or `false` 를 리턴하는 함수를 인자로 받아서 그 반대 결과를 리턴하는 함수를 만든다

```javascript
var isNotNil = R.complement(R.isNil)
isNil(null) //=> true
isNotNil(null) //=> false
isNil(7) //=> false
isNotNil(7) //=> true
```

<br>

#### R.concat

두 배열을 병합

```javascript
R.concat("ABC", "DEF") // 'ABCDEF'
R.concat([4, 5, 6], [1, 2, 3]) //=> [4, 5, 6, 1, 2, 3]
R.concat([], []) //=> []
```

<br>

#### R.T

항상 `true` 리턴

```javascript
R.T() //=> true
```

<br>

#### R.F

항상 `false` 리턴

```javascript
R.F() //=> false
```

<br>

#### R.always

항상 주어진 값을 리턴

```javascript
var t = R.always("Tee")
t() //=> 'Tee'
```

<br>

#### R.cond

true를 만날 때까지 조건을 체크, true를 만나면 해당 함수를 실행, true를 못 만나면 undefined 리턴. `switch` 문과 비슷

```javascript
var fn = R.cond([
  [R.equals(0), R.always("water freezes at 0°C")],
  [R.equals(100), R.always("water boils at 100°C")],
  [R.T, temp => "nothing special happens at " + temp + "°C"],
])
fn(0) //=> 'water freezes at 0°C'
fn(50) //=> 'nothing special happens at 50°C'
fn(100) //=> 'water boils at 100°C'
```

<br>

#### R.ifElse

if else 구문과 비슷

```javascript
var incCount = R.ifElse(
  R.has("count"),
  R.over(R.lensProp("count"), R.inc),
  R.assoc("count", 1)
)
incCount({}) //=> { count: 1 }
incCount({ count: 1 }) //=> { count: 2 }
```

<br>

#### R.sort

조건에 따라 배열을 정렬

```javascript
var diff = function (a, b) {
  return a - b
}
R.sort(diff, [4, 2, 7, 5]) //=> [2, 4, 5, 7]
```

<br>

#### R.flatten

이상한? 배열을 받아서 1차원 배열로 리턴

```javascript
R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

<br>

#### R.keys

모든 속성을 배열로 리턴, `Object.keys` 와 유사

```javascript
R.keys({ a: 1, b: 2, c: 3 }) //=> ['a', 'b', 'c']
```

<br>

#### R.values

모든 값을 배열로 리턴, `Object.values` 와 유사

```javascript
R.values({ a: 1, b: 2, c: 3 }) //=> [1, 2, 3]
```

<br>

#### R.trim

문자열 양끝의 공백제거

```javascript
R.trim("   xyz  ") //=> 'xyz'
```

vanillaJS

```javascript
"   xyz  ".trim()
```

<br>

#### R.all

모든 요소가 어떤 조건을 만족하는 지 체크

```javascript
var equals3 = R.equals(3)
R.all(equals3)([3, 3, 3, 3]) //=> true
R.all(equals3)([3, 3, 1, 3]) //=> false
```

<br>

#### R.curry

원하는 순서대로 인자 하나씩 부분적용 가능, `R.__`를 이용해 해당인자 잠시 비워두기도 가능. `R.__` 는 `R.curry` 를 통한 함수에서만 사용이 가능

```javascript
var g = R.curry((a, b, c) => a - b - c)
// 아래 예시는 모두 동일한 결과
g(1, 2, 3)
g(1)(2)(3)
g(1, 2)(3)
g(1)(2, 3)
// 2번째 인자 먼저 적용하고 싶으면
g(R.__, 2)(1)(3)

// 3번째 인자 먼저 적용하려면
g(R.__, R.__, 3)(1)(2)
```

<br>

#### R.drop

앞쪽부터 n개의 요소를 제거한다

```javascript
R.drop(1, ["foo", "bar", "baz"]) //=> ['bar', 'baz']
R.drop(2, ["foo", "bar", "baz"]) //=> ['baz']
R.drop(3, ["foo", "bar", "baz"]) //=> []
R.drop(4, ["foo", "bar", "baz"]) //=> []
R.drop(3, "ramda") //=> 'da'
```

<br>

#### R.dropLast

뒤쪽부터 n개의 요소를 제거한다

```javascript
R.dropLast(1, ["foo", "bar", "baz"]) //=> ['foo', 'bar']
R.dropLast(2, ["foo", "bar", "baz"]) //=> ['foo']
R.dropLast(3, ["foo", "bar", "baz"]) //=> []
R.dropLast(4, ["foo", "bar", "baz"]) //=> []
R.dropLast(3, "ramda") //=> 'ra'
```

<br>

#### Ref.

<https://ramdajs.com/docs>
