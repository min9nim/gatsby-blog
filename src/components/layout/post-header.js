import React from "react"
import { Link } from "gatsby"

export default function PostHeader({ title }) {
  return (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `var(--textTitle)`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  )
}
