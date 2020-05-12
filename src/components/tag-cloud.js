import React from "react"
import "./tag-cloud.scss"

export default ({ tags }) => {
  return (
    <section className="tag-cloud">
      {Object.entries(tags).map(([key, value]) => (
        <span
          key={key}
          className="tag"
          style={{ fontSize: value + 14 + "px" }}
        >{`${key}`}</span>
      ))}
    </section>
  )
}
