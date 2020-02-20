/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { LayoutPages } from '../components/layout-pages'
import { ParallaxHeader, ParallaxMainOne, ParallaxMainTwo, ParallaxFooter } from '../components/parallax-main'
import { ContAbout, ContPrices, ContContact } from '../components/container-main'
import { ContactBlock } from '../components/contact-block'
import { pageContextTypes } from '../types/type-context'

export type Types = {
  pageContext: pageContextTypes
}

const Index = ({ pageContext }: Types) => {
  const { pageGroupName } = pageContext

  return (
    <LayoutPages withScrollSpy={true} pageGroupName={pageGroupName}>
      <Box id="page_main" sx={{ variant: `layout.main` }}>
        <Box
          sx={{
            display: `grid`,
            gridGap: 0,
          }}
        >
          <Box id="top">
            <ParallaxHeader />
          </Box>
          <ContAbout id="about" />
          <ParallaxMainOne />
          <ContPrices id="prices" />
          <ParallaxMainTwo />
          <Box id="contact">
            <ContContact />
            <ContactBlock />
          </Box>
          <ParallaxFooter />
        </Box>
      </Box>
    </LayoutPages>
  )
}

export default Index
