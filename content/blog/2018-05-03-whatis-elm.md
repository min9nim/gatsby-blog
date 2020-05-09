---
layout: post
title:  "What is Elm?"
date:   2018-05-03 09:00:00 +0900
categories: FrontEnd
tags: [elm]
---
[Charles Scalfani][1]의 [글][2]을 통해 Elm을 알게 되었다. 이 글을 꼼꼼히 번역해보고 싶지만, 바쁜 일정을 핑계로 번역은 다음으로 미루고 일단 몇가지 인상깊은 문장들을 중심으로 summary 만 남긴다.

- 자바스크립트는 함수형프로그래밍을 비슷하게나마 흉내낼 수 는 있지만 순수함수형프로그래밍 언어가 아니기 때문에 여러가지 제약이 있을 수 있다
- js함수형 프로그래밍을 위해 [Ramds.js][3], [immutable.js][4] 등을 이용할 수 있지만 충분하지는 않다.
- Haskell, Lisp, [Clojure][5] 등의 함수형 언어들이 있지만 Frontend 개발에 적합하지는 않다.(웹브라우져에서 사용 가능한 언어는 js뿐이라)
- front-end 함수형 프로그래밍을 위해 만들어진 [Elm][7] 을 사용해 보기를 권장
  - Elm은 js로 컴파일되기 때문에 webapp을 만들기 적합
  - js의 초안은 10일만에 작성되었고, 이후 20년 동안 패치가 거듭되면서 함수형, 객체지향형, 절차형 프로그래밍을 모두 흉내낼 수 있게 되었지만 충분하지 않다.
  - Elm 은 Haskell 커뮤니티에 의해 지난 30년간 배운 기술과 지식들이 총망라되어 설계되었다
  - Elm 은 fron-end 웹개발자들을 위해 탄생하였다. 그것은 그들의 삶의 질을 향상시켜 줄 것이다
  - [Elm 한글가이드][6]
- 미래예측
  - coffeescript, typescript, elm 과 같이 자바스크립트로 컴파일되는 언어들이 대중적이 될 것이다
  - sw의 복잡성을 해결하는 방법으로서 함수형 프로그래밍은 재조명을 받을 것이다.
  - GB단위의 메모리와 빠른 프로세서는 함수형프로그래밍을 더욱 쓸모있게 만들어 줄 것이다
  - CPU는 더이상 빨라질 수 없지만, 코어수는 계속 늘어날 것이다
  - 변경가능한 상태(변수사용)가 sw의 복잡성을 발생시키는 주요 문제로 인식이 되어질 것이다






[1]: https://medium.com/@cscalfani
[2]: https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-6-db502830403
[3]: http://ramdajs.com/
[4]: https://facebook.github.io/immutable-js/
[5]: https://clojure.org/
[6]: https://kyunooh.gitbooks.io/elm/content/
[7]: http://elm-lang.org/
