/** @jsx jsx */
import { jsx, Box, Styled } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

type Types = {
  locale: string
  dir: string
  notitle?: string
  variant?: string
}

// The normal <a> tag is modified here (so that internal links use gatsby-link / LocalizedLink
// More info:
// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const MdxPage = ({ locale, dir, notitle = ``, variant = `mdx.boxmain`, ...props }: Types) => {
  const withTitle = !notitle

  const { rawData } = useStaticQuery(query_graphql)

  const simplified = rawData.edges.map((item: any) => ({
    mdx: item.node.childMdx,
    relativeDirectory: item.node.relativeDirectory,
  }))

  const pagedata = simplified.filter((page: any) => page.mdx.fields.locale === locale && page.relativeDirectory === dir)

  if (pagedata.length) {
    return (
      <Box {...props} sx={{ variant }}>
        {withTitle ? (
          <Box sx={{ color: `primary`, textAlign: `center` }}>
            <Styled.h3>{pagedata[0].mdx.frontmatter.title}</Styled.h3>
          </Box>
        ) : (
          ``
        )}
        <MDXRenderer>{pagedata[0].mdx.body}</MDXRenderer>
      </Box>
    )
  }
  console.error(`! -- locale:${locale}, dir:${dir} -- mdxPage: pagedata not found`)
  return <Box {...props} />
}

export default MdxPage

const query_graphql = graphql`
  query MdxPages {
    rawData: allFile(filter: { sourceInstanceName: { eq: "mdxpages" } }) {
      edges {
        node {
          relativeDirectory
          childMdx {
            fields {
              locale
              isDefault
            }
            frontmatter {
              title
            }
            body
          }
        }
      }
    }
  }
`
