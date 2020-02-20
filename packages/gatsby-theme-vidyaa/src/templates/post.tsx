/** @jsx jsx */
import { jsx, Box, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { LayoutPages } from '../components/layout-pages'
import { ParallaxHeader } from '../components/parallax-main'
import { Container } from '../components/container-main'

const Post = ({ data: { mdx } }: any) => (
  <LayoutPages withScrollSpy={false} pageGroupName="blog">
    <Box id="mdx_post" sx={{ variant: `layout.blogpage` }}>
      <Box id="top">
        <ParallaxHeader height="75vh" />
      </Box>
      <Container>
        <Box id="mdxrenderer_post" sx={{ variant: `mdx.boxpost` }}>
          <Box sx={{ color: `primary`, textAlign: `center` }}>
            <Styled.h3>{mdx.frontmatter.title}</Styled.h3>
          </Box>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Box>
      </Container>
    </Box>
  </LayoutPages>
)

export default Post

export const query = graphql`
  query Post($locale: String!, $title: String!) {
    mdx(frontmatter: { title: { eq: $title } }, fields: { locale: { eq: $locale } }) {
      frontmatter {
        title
      }
      body
    }
  }
`
