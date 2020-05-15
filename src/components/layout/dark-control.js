import React from "react"
import sun from "../../content/assets/sun.png"
import moon from "../../content/assets/moon.png"
import ThemeContext from "../../context/theme"

export default function DarkControl() {
  return (
    <ThemeContext.Consumer>
      {ctx => (
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
          checked={ctx.theme === "dark"}
          onChange={e => ctx.setTheme(e.target.checked ? "dark" : "light")}
        />
      )}
    </ThemeContext.Consumer>
  )
}
