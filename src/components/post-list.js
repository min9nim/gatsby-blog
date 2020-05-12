import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

export default ({ posts }) => {
  return posts.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    return (
      <article key={node.fields.slug} style={{ marginBottom: "50px" }}>
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
              marginTop: rhythm(1),
            }}
          >
            <Link
              style={{ boxShadow: `none`, color: `var(--textTitle)` }}
              to={node.fields.slug}
            >
              {title}
            </Link>
          </h3>
          <small>{node.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </section>
      </article>
    )
  })
}
