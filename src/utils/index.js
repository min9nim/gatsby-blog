import createLogger from "if-logger"
import moment from "moment"

function logFormat(level, tags, message) {
  const tagstr = tags
    .map(tag => (typeof tag === "function" ? tag() : tag))
    .join(" ")
  return `${level[0].toUpperCase()} ${tagstr} | ${message}`
}

function currentTime() {
  return moment().utc().add(9, "hours").format("MM/DD hh:mm:ss")
}

export const logger = createLogger({ format: logFormat, tags: [currentTime] })
