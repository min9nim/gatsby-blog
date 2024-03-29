import React from "react"
import logger from "../../build/logger"

const LoggerContext = React.createContext(logger)

export default LoggerContext

export function LoggerProvider({ children }) {
  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  )
}
