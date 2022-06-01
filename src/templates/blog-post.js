import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"
import PostNav from "../components/post-nav"
import Comment from "../components/comment"
import { rhythm, scale } from "../utils/typography"
import ThemeContext from "../context/theme"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <ThemeContext.Consumer>
      {ctx => (
        <Layout location={location} title={siteTitle}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <article>
            <header>
              <h1
                style={{
                  marginTop: rhythm(1),
                  marginBottom: 0,
                  color: `var(--textTitle)`,
                }}
              >
                {post.frontmatter.title}
              </h1>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {post.frontmatter.date} -{" "}
                <TagList tags={post.frontmatter.tags} />
              </p>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <footer>
              <PostNav previous={previous} next={next} />
              <Bio />
            </footer>
          </article>

          {ctx.theme && (
            <Comment repo="min9nim/gatsby-blog" theme={"github-" + ctx.theme} />
          )}
          <div
            className="left-ad"
            style={{
              border: "1px solid red",
              position: "fixed",
              left: 0,
              top: 0,
              float: "left",
              height: "100vh",
              width: 200,
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3221090343920987"
              crossOrigin="anonymous"
            ></script>
          </div>
        </Layout>
      )}
    </ThemeContext.Consumer>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
