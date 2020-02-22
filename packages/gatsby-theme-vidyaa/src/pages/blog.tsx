/** @jsx jsx */
import { jsx, Box, Text, Styled } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui'
import { graphql } from 'gatsby'
import { LayoutPages } from '../components/layout-pages'
import { LocalizedLink } from '../components/localized-link'
import { ParallaxHeader } from '../components/parallax-main'
import { pageContextTypes } from '../types/type-context'
import { Container } from '../components/container-main'

type Types = {
  data: {
    blog: {
      edges: []
    }
  }
  pageContext: pageContextTypes
}

const Index = ({ data: { blog }, pageContext }: Types) => (
  <LayoutPages withScrollSpy={false} pageGroupName="blog">
    <Box id="page_blog" sx={{ variant: `layout.blogpage` }}>
      <Box id="top">
        <ParallaxHeader height={theme.parallax.heightHeader} />
      </Box>
      <Box id="postlist">
        <Container>
          <Styled.h2>Blog</Styled.h2>
          <Box sx={{ m: [2, 3, 4] }}>
            {blog.edges.map(({ node: post }: any) => (
              <Box key={`${post.childMdx.frontmatter.title}-${post.childMdx.fields.locale}`} sx={{ mb: 4 }}>
                <LocalizedLink to={`/${post.childMdx.fields.postSlug}`} sx={{ variant: `blog.list_link` }}>
                  {post.childMdx.frontmatter.title}
                </LocalizedLink>
                <Text sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
                  <Box>{post.childMdx.frontmatter.date}</Box>
                </Text>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  </LayoutPages>
)

export default Index

export const query = graphql`
  query Blog($locale: String!, $dateFormat: String!) {
    blog: allFile(
      filter: {
        sourceInstanceName: { eq: "mdxpages" }
        childMdx: { fields: { locale: { eq: $locale }, grandParentDir: { eq: "blog" } } }
      }
      sort: { fields: [childMdx___frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          relativeDirectory
          childMdx {
            frontmatter {
              title
              date(formatString: $dateFormat)
            }
            fields {
              locale
              postSlug
            }
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
    }
  }
`
