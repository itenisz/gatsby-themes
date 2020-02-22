/** @jsx jsx */
import React from 'react'
import theme from '../gatsby-plugin-theme-ui'
import { jsx, Flex, Box } from 'theme-ui'
import { navigate } from 'gatsby'
import ReactFlagsSelect from 'react-flags-select'
import useSlugs from '../hooks/use-slugs'
import LayoutContext from '../contexts/layout-context'
import { refactorByKeyValue, getPathPage, getPathFromHref } from '../utils/general-helpers'
import ImgLogoNavbar from './img-logo-navbar'

type navbarType = {
  children: React.ReactNode
  needNavbarLogo?: boolean
}

const Navbar = ({ children, needNavbarLogo = true }: navbarType) => {
  const { locale, defaultLanguage, configLanguages } = React.useContext(LayoutContext)
  const flagCountries = configLanguages.map((item: any) => item.flagCountry)
  const flagLabels = refactorByKeyValue(configLanguages, `flagCountry`, `flagLabel`)
  const pagepath =
    typeof window !== `undefined`
      ? getPathFromHref(locale, defaultLanguage, configLanguages, window.location.href)
      : `undefined`
  const slugAllLocales = useSlugs(pagepath)

  // Link Example
  //<Link to={ getPathPage("en", defaultLanguage, slugAllLocales) } hrefLang="en">English</Link>
  //{` `}/{` `}

  //onClick Example
  //<button onClick={() => navigate(getPathPage("en", defaultLanguage, slugAllLocales)) }>English</button>

  return (
    <Box
      id="navbar"
      sx={{
        variant: `navbar.main`,
      }}
    >
      <Flex
        id="nav_main"
        sx={{
          width: `100%`,
          minHeight: theme.navbar.height,
          maxHeight: theme.navbar.height,
          height: `auto`,
          borderBottom: `1px solid`,
          flexDirection: `row`,
          justifyContent: `space-between`,
          alignItems: `stretch`,
          flexWrap: [`no-wrap`, `no-wrap`],
          flexGrow: 0,
          flexBasis: `auto`,
        }}
      >
        <Flex
          id="nav_sub"
          sx={{
            width: `auto`,
            minHeight: theme.navbar.height,
            height: `auto`,
            border: `0px solid`,
            flexDirection: `row`,
            justifyContent: `start`,
            alignItems: `stretch`,
            flexWrap: [`no-wrap`, `no-wrap`],
            flexGrow: 0,
            flexBasis: `auto`,
          }}
        >
          {needNavbarLogo ? <ImgLogoNavbar /> : null}
        </Flex>
        <Flex
          as="nav"
          sx={{
            width: `auto`,
            minHeight: theme.navbar.height,
            height: `auto`,
            border: `0px solid`,
            flexDirection: `row`,
            justifyContent: `end`,
            alignItems: `stretch`,
            flexWrap: [`no-wrap`, `no-wrap`],
            flexGrow: 0,
            flexBasis: `auto`,
          }}
        >
          <Box
            sx={{
              border: `0px solid`,
              variant: `navbar.boxrowFlag`,
            }}
          >
            <ReactFlagsSelect
              countries={flagCountries}
              customLabels={flagLabels}
              defaultCountry={locale === `en` ? `GB` : locale.toUpperCase()}
              showSelectedLabel={false}
              selectedSize={theme.flagDropDown.selectedSize}
              optionsSize={theme.flagDropDown.optionsSize}
              onSelect={(countryCode: string) => navigate(getPathPage(countryCode, defaultLanguage, slugAllLocales))}
              className="myflag-select"
            />
          </Box>
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
