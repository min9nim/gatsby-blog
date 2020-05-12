// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagCloud from "../components/tag-cloud"
import { groupBy, path, dropLast, pipe } from "ramda"
import tagCloud from "../components/tag-cloud"

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
      <Bio />
      <h2>All tags</h2>
      <TagCloud tags={tagTable} />
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
