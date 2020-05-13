---
layout: post
title: "[jekyll] Invalid CP949 character 오류"
date: 2018-08-09 01:00:00 +0900
categories: memo
tags: [jekyll, encoding, CP949]
---

### Intro

맥에서 jekyll 블로그 테마를 커스터마이징 했었다. 당시에는 문제가 없었는데 windows7 로컬환경에서 블로그를 가져와 빌드를 해보니 아래와 같은 오류가 발생했다

```bash
λ bundle exec jekyll serve
Configuration file: C:/Users/myData/project/min9nim.github.io/_config.yml
            Source: C:/Users/myData/project/min9nim.github.io
       Destination: C:/Users/myData/project/min9nim.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 7.783 seconds.
 Auto-regeneration: enabled for 'C:/Users/myData/project/min9nim.github.io'
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
      Regenerating: 1 file(s) changed at 2018-08-09 22:45:47
                    assets/main.scss
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/main.scss':
                    Invalid CP949 character "\xED" on line 40
             Error: Invalid CP949 character "\xED" on line 40
             Error: Run jekyll build --trace for more information.
```

<br>

### 도대체 이 오류는 뭘까 @.@

인코딩 관련 오류인 것 같긴한데 [main.scss](https://gist.github.com/min9nim/0cde9e9c13846665710542884612f260) 파일에는 한글이 전혀 포함되어 있지 않았다. 파일 인코딩은 분명히 utf-8을 사용했었고 여기저기를 꼼꼼히 뜯어봐도 오류가 날만한 곳을 찾기가 어려웠다.

`jekyll build --trace` 명령을 이용해 좀 더 구체적인 오류 발생위치를 확인해 보았다.

```bash
λ bundle exec jekyll build --trace
Configuration file: C:/Users/myData/project/min9nim.github.io/_config.yml
            Source: C:/Users/myData/project/min9nim.github.io
       Destination: C:/Users/myData/project/min9nim.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/main.scss':
                    Invalid CP949 character "\xED" on line 40
C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-sass-converter-1.5.2/lib/jekyll/converters/scss.rb:123:in `rescue in convert': Invalid CP949 character "\xED" on line 40 (Jekyll::Converters::Scss::SyntaxError)
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-sass-converter-1.5.2/lib/jekyll/converters/scss.rb:119:in `convert'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:98:in `block in convert'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:96:in `each'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:96:in `reduce'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:96:in `convert'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:80:in `render_document'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/renderer.rb:62:in `run'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/site.rb:473:in `block in render_pages'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/site.rb:471:in `each'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/site.rb:471:in `render_pages'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/site.rb:191:in `render'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/site.rb:73:in `process'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/command.rb:28:in `process_site'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/commands/build.rb:65:in `build'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/commands/build.rb:36:in `process'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/lib/jekyll/commands/build.rb:18:in `block (2 levels) in init_with_program'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `block in execute'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `each'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `execute'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/mercenary-0.3.6/lib/mercenary/program.rb:42:in `go'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/mercenary-0.3.6/lib/mercenary.rb:19:in `program'
        from C:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/jekyll-3.7.3/exe/jekyll:15:in `<top (required)>'
        from C:/Ruby23-x64/bin/jekyll:23:in `load'
        from C:/Ruby23-x64/bin/jekyll:23:in `<main>'
```

_jekyll-sass-converter-1.5.2/lib/jekyll/converters/scss.rb_ 파일에서 오류가 발생했다. 해당 ruby 소스를 이리저리 살펴보았지만 감을 잡을 수 없었다. 여긴 어디 나는 누구;; 아무래도 배가 산으로 가는 듯한 느낌이 들었다. ruby를 써본 적도 없는데 ruby 소스를 까보며 디버깅을 하겠다고 덤비는 내가 한심해 보였다. 괜한 내부 소스까지 들춰서 해결할 문제는 아니겠다 싶었다.

<br>

### 찬찬히 마음을 가다듬고

나의 지나온 행적들을 쫓다가 운좋게 원인을 찾아낼 수 있었다.

<p align="left"><img src="/images/ceremony.jpg" width="200"/></p>
문제원인은 역시 한글이었다. _/assets/main.scss_ 에서 참조하는 _/_sass/whiteglass.scss_ 파일을 수정하면서 아래와 같이 한글주석을 사용했던 것이 화근이었다. 
```scss
// 푸터 커스터마이징 18-07-28
@mixin relative-font-size($ratio) {
  font-size: $base-font-size * $ratio;
}
```
한글주석을 영어로 변경하여 문제를 피해갈 수 있었다.

<br>

### 결론

우리가 만나는 많은 문제들의 해답은 대부분 가까운 곳에 있기 마련이다.

<br>

### Ref.

<https://mytory.net/archives/9653>
