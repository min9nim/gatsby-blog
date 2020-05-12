import React from "react"
import { Link } from "gatsby"
import "./tag-cloud.scss"

export default ({ tags }) => {
  return (
    <section className="tag-cloud">
      {Object.entries(tags).map(([key, value]) => (
        <Link
          to={"/tags/archives?tag=" + key}
          key={key}
          className="tag"
          style={{ fontSize: value + 14 + "px" }}
        >
          {key}
        </Link>
      ))}
    </section>
  )
}
