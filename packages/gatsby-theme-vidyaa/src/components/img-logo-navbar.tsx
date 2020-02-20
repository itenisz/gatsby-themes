/** @jsx jsx */
import theme from '../gatsby-plugin-theme-ui'
import { jsx, Box, Image } from 'theme-ui'
import Img from 'gatsby-image'
import useGatsbyImages from '../hooks/use-gatsby-images'
import useCfgImages from '../hooks/use-cfg-images'
import { IcfgImages } from '../types/type-cfg-images'

const ImgLogoNavbar = () => {
  const { imgLogoNavbar } = useGatsbyImages()
  const { imgMLogoNavbar } = useCfgImages() as IcfgImages

  return (
    <Box
      sx={{
        maxHeight: theme.navbar.height,
        variant: `logo.inNavbar`,
      }}
    >
      {imgMLogoNavbar ? (
        <Image src={imgMLogoNavbar} />
      ) : (
        <Img fluid={imgLogoNavbar.childImageSharp.fluid} fadeIn={false} />
      )}
    </Box>
  )
}

export default ImgLogoNavbar
