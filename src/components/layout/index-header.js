import React from "react"
import { Link } from "gatsby"
import { scale } from "../../utils/typography"

export default function IndexHeader({ title }) {
  return (
    <h1
      style={{
        ...scale(0.6),
        marginBottom: 0,
        marginTop: 0,
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
    </h1>
  )
}
