import React from 'react'
import { Link } from 'gatsby'
import { NavLink } from 'theme-ui'
import LayoutContext from '../contexts/layout-context'
import { refactorByKey } from '../utils/general-helpers'

type linkTypes = {
  children?: React.ReactNode
  to: string
  sx?: {}
}

type navlinkTypes = {
  children?: React.ReactNode
  href: string
  sx?: {}
}

// Use the globally available context to choose the right path
export const useLocalizedLink = (to: string) => {
  const { locale, defaultLanguage, configLanguages } = React.useContext(LayoutContext)
  const locales = refactorByKey(configLanguages, `key`)
  const localesPath = locales[locale].path
  const isIndex = to === `/`

  // If it's the default language, don't do anything
  // If it's another language, add the "path"
  // However, if the homepage/index page is linked don't add the "to"
  // Because otherwise this would add a trailing slash
  // the `to` always starts with `/` or `#`
  const pagePath = isIndex ? `` : to
  const path = locale === defaultLanguage ? to : `/${localesPath}${pagePath}`

  return path
}

// for gatsby link
export const LocalizedNavLink = ({ children, href, ...props }: navlinkTypes) => (
  <NavLink {...props} href={useLocalizedLink(href)}>
    {children}
  </NavLink>
)

// for gatsby link
export const LocalizedLink = ({ children, to, ...props }: linkTypes) => (
  <Link {...props} to={useLocalizedLink(to)}>
    {children}
  </Link>
)
