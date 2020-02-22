/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui'
import { LayoutPages } from '../components/layout-pages'
import { ParallaxHeader, ParallaxMainOne, ParallaxMainTwo, ParallaxFooter } from '../components/parallax-main'
import { ContAbout, ContPrices, ContContact } from '../components/container-main'
import { ContactBlock } from '../components/contact-block'
import { pageContextTypes } from '../types/type-context'

export type Types = {
  pageContext: pageContextTypes
}

const Index = ({ pageContext }: Types) => (
  <LayoutPages withScrollSpy={true} pageGroupName="main">
    <Box id="page_main" sx={{ variant: `layout.main` }}>
      <Box
        sx={{
          display: `grid`,
          gridGap: 0,
        }}
      >
        <Box id="top">
          <ParallaxHeader height={theme.parallax.heightHeader} />
        </Box>
        <Box id="about">
          <ContAbout />
        </Box>
        <ParallaxMainOne height={theme.parallax.heightMain} />
        <Box id="prices">
          <ContPrices />
        </Box>
        <ParallaxMainTwo height={theme.parallax.heightMain} />
        <Box id="contact">
          <ContContact />
          <ContactBlock />
        </Box>
        <ParallaxFooter height={theme.parallax.heightFooter} />
      </Box>
    </Box>
  </LayoutPages>
)

export default Index
