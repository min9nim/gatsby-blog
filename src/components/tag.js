import React from "react"
import { Link } from "gatsby"
import "./tag.scss"
import { getDefaultColors } from "../utils"

export default function Tag({ tag, count, margin = "7px", color }) {
  return (
    <Link
      to={"/tags/archives?tag=" + tag}
      className="tag"
      style={{ fontSize: count + 14 + "px", margin, color }}
    >
      {tag}
    </Link>
  )
}
