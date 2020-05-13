import React from "react"
import { Link } from "gatsby"

export default function PageNavi({ pageNo, noMore }) {
  return (
    <nav>
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
          marginLeft: 0,
        }}
      >
        <li>
          {!noMore && (
            <Link to={"/page/" + String(pageNo + 1)} rel="prev">
              ← Older
            </Link>
          )}
        </li>
        <li>
          {pageNo > 0 && (
            <Link to={"/page/" + String(pageNo - 1)} rel="next">
              Newer →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
