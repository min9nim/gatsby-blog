import React, { useContext } from "react"
import Tag from "./tag"
import { go } from "mingutils"
import { map, sort } from "ramda"
import LoggerContext from "../context/logger"
import "./tag-cloud.scss"

export default ({ tags }) => {
  const logger = useContext(LoggerContext).addTags("tag-cloud")
  return (
    <section className="tag-cloud">
      {go(
        Object.entries(tags),
        sort((a, b) => {
          // logger.debug(a[0], b[0])
          return a[0] < b[0] ? -1 : 1
        }),
        map(([key, value]) => <Tag tag={key} count={value} key={key} />)
      )}
    </section>
  )
}
