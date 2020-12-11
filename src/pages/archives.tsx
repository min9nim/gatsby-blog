// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post-list"
import { groupBy, path, dropLast, pipe } from "ramda"
import { rhythm } from "../utils/typography"

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
  const groupList = groupBy(
    pipe(path(["node", "frontmatter", "date"]), dropLast(3))
  )(posts)
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Archives" />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              color: `var(--textTitle)`,
            }}
          >
            Archives
          </h1>
        </header>
        <section>
          {Object.entries(groupList).map(([key, posts]) => (
            <div key={key} style={{ marginBottom: "100px" }}>
              <h2 style={{ marginBottom: "5px" }}>{key}</h2>
              <div style={{ marginLeft: "20px" }}>
                <PostList posts={posts} />
              </div>
            </div>
          ))}
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
           allMarkdownRemark(
             filter: { fields: { draft: { eq: false } } } # here
             sort: { fields: [frontmatter___date], order: DESC }
           ) {
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
