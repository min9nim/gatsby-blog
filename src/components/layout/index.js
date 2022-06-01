import React from "react"
import { rhythm } from "../../utils/typography"
import Menu from "./menu"
import License from "./license"
import DarkControl from "./dark-control"
import PostHeader from "./post-header"
import IndexHeader from "./index-header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

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
          {location.pathname === rootPath ? (
            <IndexHeader title={title} />
          ) : (
            <PostHeader title={title} />
          )}
          <DarkControl />
        </header>
        <Menu />
        <main>{children}</main>
        <footer style={{ borderTop: "1px solid #e8e8e8", paddingTop: "20px" }}>
          <License />
        </footer>
      </div>
      <div
        style={{
          border: "1px solid red",
          position: "fixed",
          left: 0,
          top: 0,
          float: "left",
          height: "100vh",
          width: 200,
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3221090343920987"
          crossOrigin="anonymous"
        ></script>
      </div>
    </div>
  )
}

export default Layout
