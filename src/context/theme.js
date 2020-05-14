// https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
import React from "react"

const defaultState = {
  theme: "light",
  setTheme: () => {},
}

const ThemeContext = React.createContext(defaultState)

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
// const supportsDarkMode = () =>
//   window.matchMedia("(prefers-color-scheme: dark)").matches === true

class ThemeProvider extends React.Component {
  state = {
    theme: null,
  }

  setTheme = theme => {
    document.body.className = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    meta.content = theme === "light" ? "#ddd" : "#282c35"
    localStorage.setItem("theme", theme)
    this.setState({ theme })
  }

  componentDidMount() {
    this.setTheme(localStorage.getItem("theme") || "light")
    // Getting dark mode value from localStorage!
    // const lsDark = JSON.parse(localStorage.getItem("dark"))
    // if (lsDark) {
    //   this.setState({ dark: lsDark })
    // } else if (supportsDarkMode()) {
    //   this.setState({ dark: true })
    // }
  }

  render() {
    const { children } = this.props
    const { theme } = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          setTheme: this.setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
