/** @jsx jsx */
import { jsx, Flex, Box, Text, Card, Link } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import GetIcon from './get-icon'
import useTransLinks from '../hooks/use-trans-links'
import { ItransLinks } from '../types/type-trans-links'

type Types = {
  target?: string
  iconname?: string
  iconcolor?: string
}

const CardMap = ({ target = `_blank`, iconname = `FaMapMarkedAlt`, iconcolor = `gray.7` }: Types) => {
  const relDefault = ``
  const rel = target === `_blank` ? `noopener` : relDefault
  const data = useStaticQuery(queryImage)
  const { linkMap } = useTransLinks() as ItransLinks

  return (
    <Card
      sx={{
        p: [2, 2],
        bg: `gray.1`,
        minWidth: `minViewport`,
        height: `100%`,
        borderTopWidth: `1px`,
        borderLeftWidth: [`0px`, `1px`],
        borderBottomWidth: `1px`,
        borderRightWidth: [`0px`, `1px`],
        borderStyle: `solid`,
        borderColor: `gray.6`,
        borderRadius: [0, `default`],
      }}
    >
      <Link href={linkMap.url} target={target} rel={rel} sx={{ variant: `links.innerButtonLink` }}>
        <Flex sx={{ width: `100%`, justifyContent: `center`, alignItems: `center` }}>
          <Box sx={{ pt: `6px`, px: 1, color: `${iconcolor}` }}>
            <GetIcon name={iconname} size={theme.sizes.icon} />
          </Box>
          <Text sx={{ pb: 1 }}>{linkMap.trans}</Text>
        </Flex>
        <Box sx={{ overflow: `hidden` }}>
          <Box sx={{ width: [`auto`, `auto`, 484, 632], minWidth: 440, maxWidth: 632 }}>
            <Img fluid={data.imgGoogleMap.childImageSharp.fluid} fadeIn={true} />
          </Box>
        </Box>
      </Link>
    </Card>
  )
}

export default CardMap

const queryImage = graphql`
  query {
    imgGoogleMap: file(relativePath: { eq: "googlemap.png" }) {
      childImageSharp {
        fluid(maxWidth: 632) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
