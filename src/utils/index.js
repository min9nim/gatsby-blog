import createLogger from "if-logger"
import moment from "moment"
import { scaleOrdinal } from "d3-scale"
import { schemeCategory10 } from "d3-scale-chromatic"
import { range } from "d3-array"

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


export function getDefaultColors() {
  return range(20)
    .map(number => number.toString())
    .map(scaleOrdinal(schemeCategory10))
}
