// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
import React from "react"
import { ThemeProvider } from "./src/context/theme"
import { LoggerProvider } from "./src/context/logger"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <LoggerProvider>{element}</LoggerProvider>
  </ThemeProvider>
)
