// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Bio from "../../components/bio"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import TagCloud from "../../components/tag-cloud"
import { rhythm, scale } from "../../utils/typography"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          tags: string[]
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const tagTable = posts.reduce((acc, value) => {
    const { tags } = value.node.frontmatter
    if (tags) {
      tags.forEach(tag => {
        acc[tag] = acc[tag] ? acc[tag] + 1 : 1
      })
      return acc
    }
    return acc
  }, {})
  console.log(tagTable)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              color: `var(--textTitle)`,
            }}
          >
            All tags
          </h1>
        </header>
        <section>
          <TagCloud tags={tagTable} />
        </section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY MMMM DD")
            title
            description
            tags
            categories
          }
        }
      }
    }
  }
`