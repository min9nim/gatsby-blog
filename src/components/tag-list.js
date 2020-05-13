import React from "react"
import Tag from "./tag"

export default function TagList({ tags }) {
  return (
    <>
      [
      {tags.map((tag, idx) => (
        <span key={tag}>
          <Tag tag={tag} count={1} margin="2px" />
          {tags.length - 1 > idx && ", "}
        </span>
      ))}
      ]
    </>
  )
}
