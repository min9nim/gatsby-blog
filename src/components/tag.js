import React from "react"
import { Link } from "gatsby"
import "./tag.scss"

export default function Tag({ tag, size, margin = "7px", color }) {
  return (
    <Link
      to={"/tags/archives?tag=" + tag}
      className="tag"
      style={{ fontSize: size, margin, color }}
    >
      {tag}
    </Link>
  )
}
