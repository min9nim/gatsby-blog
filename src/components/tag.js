import React from "react"
import { Link } from "gatsby"
import "./tag.scss"

export default function Tag({ tag, count }) {
  return (
    <Link
      to={"/tags/archives?tag=" + tag}
      className="tag"
      style={{ fontSize: count + 14 + "px" }}
    >
      {tag}
    </Link>
  )
}
