import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Toggle from "./Toggle"
import { rhythm, scale } from "../utils/typography"
import sun from "../../content/assets/sun.png"
import moon from "../../content/assets/moon.png"
import Menu from "./menu"

const Layout = ({ location, title, children }) => {
  const [theme, setTheme] = useState(null)
  useEffect(() => {
    setTheme(window.__preferredTheme)
  }, [])
  const rootPath = `${__PATH_PREFIX__}/`
  const indexHeader = (
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
  const postHeader = (
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

  function changeTheme(theme) {
    setTheme(theme)
    window.setTheme(theme)
  }

  return (
    <div
      style={{
        color: "var(--textNormal)",
        background: "var(--bg)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 0,
          }}
        >
          {location.pathname === rootPath ? indexHeader : postHeader}
          {theme && (
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    alt="moon"
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    alt="sun"
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
          )}
        </header>
        <Menu />
        <main>{children}</main>
        <footer style={{ borderTop: "1px solid #e8e8e8", paddingTop: "20px" }}>
          <div className="license">
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-sa/4.0/"
            >
              <img
                alt="크리에이티브 커먼즈 라이선스"
                style={{ borderWidth: 0, marginBottom: 0 }}
                src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
              />
            </a>
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-sa/4.0/"
            >
              크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스
            </a>
            에 따라 이용할 수 있습니다
          </div>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
