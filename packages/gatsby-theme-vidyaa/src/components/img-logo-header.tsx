/** @jsx jsx */
import { jsx, Box, Image } from 'theme-ui'
import Img from 'gatsby-image'
import useGatsbyImages from '../hooks/use-gatsby-images'
import useCfgImages from '../hooks/use-cfg-images'
import { IcfgImages } from '../types/type-cfg-images'

const ImgLogoHeader = () => {
  const { imgLogoHeader } = useGatsbyImages()
  const { imgMLogoHeader } = useCfgImages() as IcfgImages

  return (
    <Box sx={{ variant: `logo.inHeader` }}>
      {imgMLogoHeader ? (
        <Image src={imgMLogoHeader} />
      ) : (
        <Img fluid={imgLogoHeader.childImageSharp.fluid} fadeIn={true} />
      )}
    </Box>
  )
}

export default ImgLogoHeader
