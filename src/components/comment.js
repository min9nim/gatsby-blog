// https://velog.io/@iamchanii/build-a-blog-with-gatsby-and-typescript-part-4
import React, { createRef, useEffect } from "react"
import logger from "../../build/logger"

export default function Comment({ repo, theme = "github-light" }) {
  const containerRef = createRef()
  logger.debug("Comment render")

  useEffect(() => {
    logger.debug("Comment effect", repo)
    const utterances = document.createElement("script")
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": "title",
      label: "comment",
      theme,
      crossOrigin: "anonymous",
      async: "true",
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef.current.appendChild(utterances)
  }, [])

  return <div ref={containerRef} />
}
