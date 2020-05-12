import React from "react"
import { Link } from "gatsby"
import Tag from "./tag"
import "./tag-cloud.scss"

export default ({ tags }) => {
  return (
    <section className="tag-cloud">
      {Object.entries(tags).map(([key, value]) => (
        <Tag tag={key} count={value} key={key} />
      ))}
    </section>
  )
}
