/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import useTransNavbar from '../hooks/use-trans-navbar'
import LayoutContext from '../contexts/layout-context'
import Scrollspy from 'react-scrollspy'
import { getLinkActiveStyle, getPathHome } from '../utils/general-helpers'
import { LocalizedNavLink } from './localized-link'

type navGetLinkType = {
  withScrollSpy?: boolean
  item: {
    name: string
    link: string
  }
}

type navGetLinksType = {
  withScrollSpy?: boolean
  pageGroupName: string
}

const NavGetLink = ({ withScrollSpy = true, item }: navGetLinkType) => {
  const { locale, defaultLanguage } = React.useContext(LayoutContext)

  // devnote: crazy, maybe this dont need, testing without it
  /*
  const isHome = item.link === `/` || item.link === ``
  const anchorSplitted = item.link.includes(`#`) ? item.link.split(`#`) : ``
  const anchor = anchorSplitted.length ? anchorSplitted[anchorSplitted.length - 1] : ``
  const hasOneOrLessSlash = item.link.split(`/`).length <= 2
  const startsWithHashOrSlash = item.link.charAt(0) === `#` || item.link.charAt(0) === `/`
  const isHomeWithHash = item.link.includes(`#`) && hasOneOrLessSlash && startsWithHashOrSlash
  const myLink =
    anchor && hasOneOrLessSlash && !isHomeWithHash ? getPathHome(locale, defaultLanguage, anchor) : item.link
  */

  let variantLink = `navbar.navlink`
  if (typeof window !== `undefined`) {
    variantLink = withScrollSpy ? `navbar.navlink` : getLinkActiveStyle(locale, item.link, window.location.href)
  }

  return (
    <LocalizedNavLink
      href={item.link}
      sx={{
        variant: variantLink,
      }}
    >
      {item.name}
    </LocalizedNavLink>
  )
}

const NavGetLinks = ({ withScrollSpy = true, pageGroupName = `main` }: navGetLinksType) => {
  const { elements } = useTransNavbar(pageGroupName)

  //  const scrollspyItems = ['home','about', 'prices', 'contact']
  const scrollspyItems = elements.map((item: any) => (item.link.includes(`#`) ? item.link.split(`#`).pop() : ``))

  if (withScrollSpy) {
    return (
      <Box id="scrollspy_owner">
        <Scrollspy
          items={scrollspyItems}
          currentClassName="navLinkActiveClass"
          componentTag="div"
          offset={-50}
          style={{ display: `flex` }}
        >
          {elements.map((item: any) => (
            <Box key={item.name} sx={{ variant: `navbar.boxrow` }}>
              <NavGetLink item={item} />
            </Box>
          ))}
        </Scrollspy>
      </Box>
    )
  }

  // without scrollspy
  return (
    <Flex id="navbar_container">
      {elements.map((item: any) => (
        <Box key={item.name} sx={{ variant: `navbar.boxrow` }}>
          <NavGetLink withScrollSpy={false} item={item} />
        </Box>
      ))}
    </Flex>
  )
}

export default NavGetLinks
