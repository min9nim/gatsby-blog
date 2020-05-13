// Gatsby supports TypeScript natively!
import React from 'react'
import {PageProps, Link, graphql} from 'gatsby'
import Bio from '../../components/bio'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import PostList from '../../components/post-list'
import {path, includes, pipe, ifElse, isNil, always} from 'ramda'
import {getQueryParams} from 'mingutils'
import {rhythm, scale} from '../../utils/typography'

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

export default function TagArchives({data, location}: PageProps<Data>) {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const tag = getQueryParams(location.search).tag
  const postsTagged = posts.filter(
    // @ts-ignore
    pipe(path(['node', 'frontmatter', 'tags']), ifElse(isNil, always(false), includes(tag)))
  )
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='All posts' />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              color: `var(--textTitle)`,
            }}
          >
            "{decodeURI(tag)}" tagged
          </h1>
        </header>
        <section>
          <PostList posts={postsTagged} />
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
