// https://velog.io/@iamchanii/build-a-blog-with-gatsby-and-typescript-part-4
import React, { createRef, useEffect } from "react"

export default function Comment({ repo, theme = "github-light" }) {
  const containerRef = createRef()

  useEffect(() => {
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
  }, [repo])

  return <div ref={containerRef} />
}
