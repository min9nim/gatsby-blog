import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Toggle from "./Toggle"
import { rhythm, scale } from "../utils/typography"
import sun from "../../content/assets/sun.png"
import moon from "../../content/assets/moon.png"

const Layout = ({ location, title, children }) => {
  const [theme, setTheme] = useState("light")
  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      changeTheme(theme)
    }
  }, [])
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
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
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
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
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }

  function changeTheme(theme) {
    setTheme(theme)
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        color: "var(--textNormal)",
        background: "var(--bg)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.625rem",
        }}
      >
        {header}
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: "none" }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: "none" }}
              />
            ),
          }}
          checked={theme === "dark"}
          onChange={e => changeTheme(e.target.checked ? "dark" : "light")}
        />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
