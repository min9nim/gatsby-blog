import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import createLogger from "if-logger"
import moment from "moment"

function logFormat(level, tags, message) {
  const tagstr = tags
    .map(tag => (typeof tag === "function" ? tag() : tag))
    .join(" ")
  return `${level[0].toUpperCase()} ${tagstr} | ${message}`
}

function currentTime() {
  return moment().utc().add(9, "hours").format("MM/DD hh:mm:ss")
}

const logger = createLogger({ format: logFormat, tags: [currentTime] })

export default function HTML(props) {
  useEffect(() => {
    logger.debug("server side rendering")
  })
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function setTheme(theme){
              document.body.className = theme
              const meta = document.querySelector('meta[name="theme-color"]')
              meta.content = theme === "light" ? "#aaa" : "#282c35"
              localStorage.setItem('theme', theme)
              window.__preferredTheme = theme
            }     
            const theme = localStorage.getItem('theme') || 'light'
            setTheme(theme)
            `,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
