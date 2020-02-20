/** @jsx jsx */
import { jsx, Flex, Box, Text } from 'theme-ui'
import { ParallaxImage } from './parallax-image'
import ButtonLink from './button-link'
import useTranslations from '../hooks/use-translations'
import useTransLinks from '../hooks/use-trans-links'
import useGatsbyImages from '../hooks/use-gatsby-images'
import useCfgImages from '../hooks/use-cfg-images'
import { ItransLinks } from '../types/type-trans-links'
import { Itranslations } from '../types/type-translations'
import { IcfgImages } from '../types/type-cfg-images'
import ImgLogoHeader from './img-logo-header'

type Types = {
  height?: string
}

export const ParallaxHeader = ({ height = `75vh` }: Types) => {
  const { imgHeaderBG } = useGatsbyImages()
  const { imgHeader } = useCfgImages() as IcfgImages

  return (
    <Box>
      <ParallaxImage data={imgHeaderBG} type="header" imagelink={imgHeader} height={height}>
        <Flex sx={{ variant: `parallax.parallaxInner` }}>
          <ImgLogoHeader />
        </Flex>
      </ParallaxImage>
    </Box>
  )
}

export const ParallaxMainOne = ({ height = `75vh` }: Types) => {
  const { imgMain1BG } = useGatsbyImages()
  const { imgMain1 } = useCfgImages() as IcfgImages
  const { linkReviews } = useTransLinks() as ItransLinks

  return (
    <Box>
      <ParallaxImage data={imgMain1BG} imagelink={imgMain1} height={height}>
        <Flex sx={{ variant: `parallax.parallaxInner` }}>
          <ButtonLink href={linkReviews.url} iconname="MdRateReview">
            <Text>{linkReviews.trans}</Text>
          </ButtonLink>
        </Flex>
      </ParallaxImage>
    </Box>
  )
}

export const ParallaxMainTwo = ({ height = `75vh` }: Types) => {
  const { imgMain2BG } = useGatsbyImages()
  const { imgMain2 } = useCfgImages() as IcfgImages
  const { linkPictures, linkVideos } = useTransLinks() as ItransLinks

  return (
    <Box>
      <ParallaxImage data={imgMain2BG} imagelink={imgMain2} height={height}>
        <Flex sx={{ variant: `parallax.parallaxInner` }}>
          <ButtonLink href={linkPictures.url} iconname="FaImages">
            <Text>{linkPictures.trans}</Text>
          </ButtonLink>
          <ButtonLink href={linkVideos.url} iconname="MdOndemandVideo">
            <Text>{linkVideos.trans}</Text>
          </ButtonLink>
        </Flex>
      </ParallaxImage>
    </Box>
  )
}

export const ParallaxFooter = ({ height = `75vh` }: Types) => {
  const { imgFooterBG } = useGatsbyImages()
  const { imgFooter } = useCfgImages() as IcfgImages
  const { address, addressLineTwo, tel } = useTranslations() as Itranslations

  return (
    <Box>
      <ParallaxImage data={imgFooterBG} imagelink={imgFooter} height={height}>
        <Flex sx={{ variant: `parallax.parallaxInnerTop` }}>
          <Flex
            sx={{
              flexDirection: `column`,
              width: [`100%`],
              opacity: 0.7,
              bg: `gray.3`,
              variant: `texts.elevated`,
            }}
          >
            <Text sx={{ fontSize: [3, 4, 5] }}>{address}</Text>
            <Text sx={{ fontSize: [2, 3, 3] }}>{addressLineTwo}</Text>
            <Text sx={{ fontSize: [2, 3, 3] }}>{tel}</Text>
          </Flex>
        </Flex>
      </ParallaxImage>
    </Box>
  )
}
