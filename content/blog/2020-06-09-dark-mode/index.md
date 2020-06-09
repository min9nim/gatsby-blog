---
layout: post
title: '[react] dark 모드 구현'
date: 2020-06-09
tags: [react, dark-mode, dark]
description:
draft: false
---

요즘 유행하는 다크모드를 리액트에서 구현하는 방법입니다. 기본적인 컨셉은 **설정된 테마에 따라 body 태그의 클래스를 다르게 변경**하는 것입니다. 기본적인 컨셉만 이해하면 누구든지 자유롭게 자신의 사이트 상황에 맞게 적절히 적용할 수 있을 것이라 생각합니다. 아래 방법은 이 블로그에서 사용 중인 다크모드의 구현사례입니다.

### 1. dark / light 모드에서 사용할 색상 정의

우선 각 테마 별로 사용할 색상을 css 변수를 이용해 전역으로 정의합니다. 그러면 각 컴포넌트에서는 `color: var(--textNormal);` 과 같이 해당 변수에 접근할 수 있습니다.

```scss
/* global.scss */
body {
  background-color: var(--bg);
  &.light {
    --bg: #ffffff;
    --textTitle: #444;
    --textNormal: #555;
    --textDesc: #999;
  }
  &.dark {
    --bg: #282c35;
    --textTitle: #eee;
    --textNormal: #ddd;
    --textDesc: #888;
  }
}
```

<br>

### 2. theme context 정의

테마의 설정 값을 애플리케이션 전역의 상태값으로 사용하기 위해서 context api 를 이용합니다. 그리고 설정한 테마값을 새로고침시에도 유지하기 위해 `localStorage` 를 사용합니다. (아래 예제는 `theme` 키에 `dark` or `light` 값을 사용합니다. 선호에 따라 `dark` 라는 키값에 `true`, `false` 값을 사용하기도 합니다)

```js{23}
// ThemeContext.js
// https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
import React from 'react'

const defaultState = {
  theme: null,
  setTheme: () => {},
}

const ThemeContext = React.createContext(defaultState)

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
// const supportsDarkMode = () =>
//   window.matchMedia("(prefers-color-scheme: dark)").matches === true

export class ThemeProvider extends React.Component {
  state = {
    theme: null,
  }

  setTheme = theme => {
    document.body.className = theme
    /* 모바일 브라우져에서 theme-color 를 함께 변경하고자 할 경우, 아래 2줄 주석해제 */
    // const meta = document.querySelector('meta[name="theme-color"]')
    // meta.content = theme === 'light' ? '#eee' : '#282c35'
    localStorage.setItem('theme', theme)
    this.setState({theme})
  }

  componentDidMount() {
    this.setTheme(localStorage.getItem('theme') || 'light')
  }

  render() {
    const {children} = this.props
    const {theme} = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          setTheme: this.setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext
```

`ThemeContext` 사용을 위해 애플리케이션 전체를 `ThemeProvider` 컴포넌트로 wrapping

```js
// App.js
import React from 'react'
import {ThemeProvider} from './themeContext'

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
```

<br>

### 3. 입력컨트롤 정의

이제 dark / light 모드를 제어할 입력 컨트롤이 필요합니다. 이래와 같이 단순하게 Dark, Light 텍스트만 출력하는 형태로 만들어도 동작에는 문제가 없습니다. `DarkMode` 컴포넌트는 `ThemeContext` 를 사용해야 하기 때문에 `ThemeContext.Consumer` 로 wrapping 됩니다

```js
// DarkMode.js
import React from 'react'
import ThemeContext from './themeContext'

export default function DarkMode() {
  return (
    <ThemeContext.Consumer>
      {ctx => (
        <div onClick={() => ctx.setTheme(ctx.theme === 'light' ? 'dark' : 'light')}>
          {ctx.theme}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
```

이제 완성된 DarkMode 컴포넌트를 원하는 위치에 삽입하기만 하면 됩니다. 😁🙂

<br>

### 4. 멋진 입력컨트롤 사용

애정을 가지고 운영하는 사이트라면 위의 제시된 `DarkMode` 컴포넌트를 그대로 사용하지는 않겠죠? 다크모드 컨트롤의 형태는 여러가지가 있는데요. 일단 현 블로그에서 사용 중인 다크모드 컨트롤의 구현은 아래와 같습니다.

> Note) 아래 다크모드 컨트롤은 [overreacted.io](https://overreacted.io) 에서 사용 중인 컨트롤을 그대로 가져온 것입니다.

```js
// DarkMode.js
import React from 'react'
import ThemeContext from './themeContext'
import Toggle from './toggle'
import {moon, sun} from './icon'

export default function DarkMode() {
  return (
    <ThemeContext.Consumer>
      {ctx =>
        ctx.theme && ( // ctx.theme 가 null 일 경우에는 렌더링하지 않음(깜빡인 문제 해결)
          <Toggle
            icons={{
              checked: (
                <img
                  src={moon}
                  alt='moon'
                  width='16'
                  height='16'
                  role='presentation'
                  style={{pointerEvents: 'none'}}
                />
              ),
              unchecked: (
                <img
                  src={sun}
                  alt='sun'
                  width='16'
                  height='16'
                  role='presentation'
                  style={{pointerEvents: 'none'}}
                />
              ),
            }}
            checked={ctx.theme === 'dark'}
            onChange={e => ctx.setTheme(e.target.checked ? 'dark' : 'light')}
          />
        )
      }
    </ThemeContext.Consumer>
  )
}
```

```js
// icon.js
export const moon = `data:image/png;base64,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`
export const sun = `data:image/png;base64,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`
```

```js
// toggle.js
/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 **/

import './toggle.scss'

import React, {PureComponent} from 'react'

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const changedTouches = event.changedTouches
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0]
      return {x: touch.clientX, y: touch.clientY}
    }
    const pageX = event.pageX
    if (pageX !== undefined) {
      return {x: pageX, y: event.pageY}
    }
  }
  return {x: 0, y: 0}
}

export default class Toggle extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchCancel = this.handleTouchCancel.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.previouslyChecked = !!(props.checked || props.defaultChecked)
    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
      this.previouslyChecked = !!nextProps.checked
    }
  }

  handleClick(event) {
    const checkbox = this.input
    this.previouslyChecked = checkbox.checked
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    this.setState({checked: checkbox.checked})
  }

  handleTouchStart(event) {
    this.startX = pointerCoord(event).x
    this.touchStarted = true
    this.hadFocusAtTouchStart = this.state.hasFocus
    this.setState({hasFocus: true})
  }

  handleTouchMove(event) {
    if (!this.touchStarted) return
    this.touchMoved = true

    if (this.startX != null) {
      let currentX = pointerCoord(event).x
      if (this.state.checked && currentX + 15 < this.startX) {
        this.setState({checked: false})
        this.startX = currentX
      } else if (!this.state.checked && currentX - 15 > this.startX) {
        this.setState({checked: true})
        this.startX = currentX
      }
    }
  }

  handleTouchEnd(event) {
    if (!this.touchMoved) return
    const checkbox = this.input
    event.preventDefault()

    if (this.startX != null) {
      if (this.previouslyChecked !== this.state.checked) {
        checkbox.click()
      }

      this.touchStarted = false
      this.startX = null
      this.touchMoved = false
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({hasFocus: false})
    }
  }

  handleTouchCancel(event) {
    if (this.startX != null) {
      this.touchStarted = false
      this.startX = null
      this.touchMoved = false
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({hasFocus: false})
    }
  }

  handleFocus(event) {
    const {onFocus} = this.props

    if (onFocus) {
      onFocus(event)
    }

    this.hadFocusAtTouchStart = true
    this.setState({hasFocus: true})
  }

  handleBlur(event) {
    const {onBlur} = this.props

    if (onBlur) {
      onBlur(event)
    }

    this.hadFocusAtTouchStart = false
    this.setState({hasFocus: false})
  }

  getIcon(type) {
    const {icons} = this.props
    if (!icons) {
      return null
    }
    return icons[type] === undefined ? Toggle.defaultProps.icons[type] : icons[type]
  }

  render() {
    const {className, icons: _icons, ...inputProps} = this.props
    const classes =
      'react-toggle' +
      (this.state.checked ? ' react-toggle--checked' : '') +
      (this.state.hasFocus ? ' react-toggle--focus' : '') +
      (this.props.disabled ? ' react-toggle--disabled' : '') +
      (className ? ' ' + className : '')
    return (
      <div
        className={classes}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
        role='presentation'
      >
        <div className='react-toggle-track'>
          <div className='react-toggle-track-check'>{this.getIcon('checked')}</div>
          <div className='react-toggle-track-x'>{this.getIcon('unchecked')}</div>
        </div>
        <div className='react-toggle-thumb' />

        <input
          {...inputProps}
          ref={ref => {
            this.input = ref
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className='react-toggle-screenreader-only'
          type='checkbox'
          aria-label='Switch between Dark and Light mode'
        />
      </div>
    )
  }
}
```

```scss
// toggle.scss
/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
**/

.react-toggle {
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.react-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.react-toggle-track {
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: hsl(222, 14%, 7%);
  transition: all 0.2s ease;
}

.react-toggle-track-check {
  position: absolute;
  width: 17px;
  height: 17px;
  left: 5px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-check {
  opacity: 1;
  transition: opacity 0.25s ease;
}

.react-toggle-track-x {
  position: absolute;
  width: 17px;
  height: 17px;
  right: 5px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  opacity: 1;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-x {
  opacity: 0;
}

.react-toggle-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #fafafa;
  box-sizing: border-box;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transform: translateX(0);
}

.react-toggle--checked .react-toggle-thumb {
  transform: translateX(26px);
  border-color: #19ab27;
}

.react-toggle--focus .react-toggle-thumb {
  box-shadow: 0px 0px 2px 3px #777;
}

.react-toggle:active .react-toggle-thumb {
  box-shadow: 0px 0px 5px 5px #777;
}
```
