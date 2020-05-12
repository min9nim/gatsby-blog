import React from "react"
import { Link } from "gatsby"
import "./tag.scss"

export default function Tag({ tag, count, margin = "7px" }) {
  return (
    <Link
      to={"/tags/archives?tag=" + tag}
      className="tag"
      style={{ fontSize: count + 14 + "px", margin }}
    >
      {tag}
    </Link>
  )
}