---
layout: post
title: 'image lazy load'
date: 2020-04-08 00:10
categories: js
tags: [js, image-lazy-load]
---

image lazy load 란 사용자가 보여지는 화면 영역 안에(viewport) 들어왔을 때에 이미지를 로드하는 방법이다.

과거에는 아래와 같이 문서상의 이미지의 높이값과 스크롤 위치등을 계산해서 이미지가 보여지는 영역 안으로 들어왔는 지 여부를 체크해야만 했었다.

```javascript
function debounce(callback, ms) {
  let timeout
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => callback(...args), ms)
  }
}

function imageLazyLoadPolyfill() {
  let lazyload = () => {
    let lazyloadImages = document.querySelectorAll('img.lazy')
    lazyloadImages.forEach(img => {
      if (img.getBoundingClientRect().top >= window.innerHeight + window.pageYOffset) {
        return
      }
      if (img.dataset.src) {
        img.src = img.dataset.src
      } else {
        img.removeAttribute('src')
      }
      img.removeAttribute('data-src')
      img.classList.remove('lazy')
    })
    if (lazyloadImages.length === 0) {
      document.removeEventListener('scroll', lazyload, true)
      window.removeEventListener('resize', lazyload)
      window.removeEventListener('orientationChange', lazyload)
    }
  }
  lazyload = debounce(lazyload, 100) // 성능문제도 고려해 줘야 함
  lazyload()
  document.addEventListener('scroll', lazyload, true)
  window.addEventListener('resize', lazyload)
  window.addEventListener('orientationChange', lazyload)
}
```

<br>

최근에는 브라우져의 [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver) api 를 이용하여 보다 간단히 구현할 수 있다.

IntersectionObserver api 는 어떤 dom 요소가 화면에 노출되었는 지 여부를 보다 쉽게 그리고 정교하게 확인할 수 있게 해준다. IntersectionObserver 를 이용해 아래와 같이 특정 dom 이 화면에서 보여졌을 때 어떤 처리를 수행할 수 있는 함수 observeDom 을 만들 수 있다.

```javascript
function observeDom(dom, callback) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      }
      callback(entry.target)
      observer.unobserve(entry.target)
    })
  })
  observer.observe(dom)
  return () => {
    observer.unobserve(dom)
  }
}
```

<br>

이제 위 함수를 이용해 아래와 같이 image lazy load 를 구현할 수 있다.

<br>

최초 image 는 아래와 같이 렌더링한다.

```html
<img class="lazy" src="some-loading-image" data-src="~~" />
```

<br>

그리고 dom 이 모두 렌더링되었을 때 아래 함수를 호출한다.

```javascript
function imageLazyLoad() {
  const loadImage = img => {
    if (img.dataset.src) {
      img.src = img.dataset.src
    } else {
      img.removeAttribute('src')
    }
    img.removeAttribute('data-src')
    img.classList.remove('lazy')
  }
  const lazyloadImages = document.querySelectorAll('.lazy')
  lazyloadImages.forEach(item => observeDom(item, loadImage))
}
```

<br>

Note) 무한 스크롤 구현시 에도 `observeDom` 함수를 이용할 수 있다. 리스트의 마지막 요소가 눈에 보여질 때 이후 목록을 로딩하는 함수를 호출하면 되겠다.


<br>

#### Ref
- https://mommoo.tistory.com/85
