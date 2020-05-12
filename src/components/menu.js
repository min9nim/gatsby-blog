import React from "react"
import { Link } from "gatsby"
import "./menu.scss"

export default () => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/tags">Tags</Link>
        </li>
        <li>
          <Link to="/archives">Archives</Link>
        </li>
      </ul>
    </nav>
  )
}
