// Gatsby supports TypeScript natively!
import React, {useContext} from 'react'
import {PageProps, Link, graphql} from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import PageNavi from '../components/page-nav'
import SEO from '../components/seo'
import TagList from '../components/tag-list'
import {rhythm} from '../utils/typography'
import LoggerContext from '../context/logger'

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
          tags: string[]
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}
const COUNT = 10
const BlogIndex = ({data, location}: PageProps<Data>) => {
  const logger = useContext(LoggerContext)
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const pageNo = Number(location.pathname.split('/').slice(-1)[0] || '0')

  const currentPagePosts = posts.slice(pageNo * COUNT, pageNo * COUNT + COUNT)

  // @ts-ignore
  logger.debug(
    'node.excerpt',
    currentPagePosts.map(({node}) => node.excerpt)
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='All posts' />
      <Bio />
      {currentPagePosts.map(({node}) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{boxShadow: `none`, color: `var(--textTitle)`}} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date} -
                <TagList tags={node.frontmatter.tags} />
              </small>
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
      })}
      <PageNavi pageNo={pageNo} noMore={currentPagePosts.length < COUNT} />
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
      filter: {fields: {draft: {eq: false}}} # here
      sort: {fields: [frontmatter___date], order: DESC} # skip: 0 # limit: 5
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
