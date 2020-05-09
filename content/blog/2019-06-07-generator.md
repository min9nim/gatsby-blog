---
layout: post
title:  "[js] generator 를 이용한 iterator 구현"
date:   2019-06-07 00:10
categories: js
tags: [generator, iterator]
---
iterable 하지 않은 객체를 iterable 하게 만들려면  `Symbol.iterator` 에 이터레이터를 리턴하는 함수를 작성해야 한다.

ES6에서는 generator 를 이용하여 손쉽게 iterator를 리턴하는 함수를 작성할 수 있다.

```javascript
class Model {
  constructor(attrs = {}){
    this._attrs = attrs
  }
  get(key) {
    return this._attrs[key]
  }
  set(key, value){
    this._attrs[key] = value
    return this
  }
}

class Collection {
  constructor(models = []){
    this._models = models
  }
  at(idx) {
    return this._models[idx]
  }
  add(model) {
    this._models.push(model)
    return this
  }
}

const coll = new Collection();
coll.add(new Model({id:1, name: 'aa'}))
coll.add(new Model({id:3, name: 'bb'}))
coll.add(new Model({id:5, name: 'cc'}))

console.log(coll.at(2).get('name'))
console.log(coll.at(1).get('id'))

console.log(...coll)    // VM57:35 Uncaught TypeError: Found non-callable @@iterator
```

coll 은 아직 iterable 하지 않기 때문에 `console.log(...coll)` 와 같이 사용할 수 없다. 이제 `coll`객체를 `iterable`하게 만들려면 어떻게 해야할까. 아래와 같이 `Collection` 클래스에 `Symbol.iterator` 함수를 추가한다.

```javascript
class Collection {
  constructor(models = []){
    this._models = models
  }
  at(idx) {
    return this._models[idx]
  }
  add(model) {
    this._models.push(model)
    return this
  }
  *[Symbol.iterator]() {
    for(const model of this._models){
      yield model
    }
  }
}
```

Symbol.iterator 함수가 그냥 `this._models` 의 iterator 를 리턴해도 된다.
```javascript
  [Symbol.iterator]() {
    return this._models[Symbol.iterator]()
  }
```

또는 `this._models` 가 iterable 이므로 아래도 가능하다.
```javascript
  *[Symbol.iterator]() {
    yield *this._models
  }
```
`yield *this._model`s 는 `yield* this._models` 와 같이 `yield`쪽에 붙여서 사용할 수도 있다

<br>

#### Ref.
https://www.youtube.com/watch?v=xQIUQ1hIEhk