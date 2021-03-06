/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex, Box } from 'theme-ui'
import LayoutContext from '../contexts/layout-context'
import MdxPage from './mdx-page'
import useTranslations from '../hooks/use-translations'
import { Itranslations } from '../types/type-translations'

type TypesBoxMdx = {
  locale: string
  dir: string
  minHeight?: string
  variant?: string
}

type contAboutTypes = {
  needWelcome?: boolean
}

const BoxWelcome = () => {
  const { hello } = useTranslations() as Itranslations
  return (
    <Box id="welcome">
      <Styled.h4>{hello}</Styled.h4>
    </Box>
  )
}

const BoxMdx = ({ locale, dir, minHeight = `45vh`, variant = `mdx.boxmain`, ...props }: TypesBoxMdx) => (
  <Box {...props} sx={{ minHeight }}>
    <MdxPage locale={locale} dir={dir} variant={variant} />
  </Box>
)

const Container = ({ ...props }) => (
  <Flex
    sx={{
      justifyContent: `center`,
    }}
  >
    <Box
      {...props}
      sx={{
        width: `100%`,
        minWidth: `minViewport`,
        maxWidth: `container`,
        mx: `auto`,
        p: 3,
        textAlign: `center`,
      }}
    />
  </Flex>
)

const ContAbout = ({ needWelcome = true, ...props }: contAboutTypes) => {
  const { locale } = React.useContext(LayoutContext)
  const dir = `main/about`
  return (
    <Container>
      {needWelcome ? <BoxWelcome /> : null}
      <BoxMdx locale={locale} dir={dir} {...props} />
    </Container>
  )
}

const ContPrices = ({ ...props }) => {
  const { locale } = React.useContext(LayoutContext)
  const dir = `main/prices`
  return (
    <Container
      sx={{
        display: `flex`,
        justifyContent: `center`,
      }}
    >
      <BoxMdx locale={locale} dir={dir} variant="mdx.boxprices" {...props} />
    </Container>
  )
}

const ContContact = ({ ...props }) => {
  const { locale } = React.useContext(LayoutContext)
  const dir = `main/contact`
  return (
    <Container>
      <BoxMdx locale={locale} dir={dir} minHeight="auto" {...props} />
    </Container>
  )
}

export { BoxWelcome, BoxMdx, Container, ContAbout, ContPrices, ContContact }
