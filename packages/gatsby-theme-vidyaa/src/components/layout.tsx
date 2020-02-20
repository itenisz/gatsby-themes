/** @jsx jsx */
import React from 'react'
import { ThemeProvider, jsx, Box, Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import theme from '../gatsby-plugin-theme-ui'
import { MDXProvider } from '@mdx-js/react'
import MdxLink from './mdx-link'
import MdxEmbed from './mdx-embed'
import SEO from './seo'
import LayoutContext from '../contexts/layout-context'
import { pageContextTypes } from '../types/type-context'

type Types = {
  children: React.ReactNode
  pageContext: pageContextTypes
}

// Use the built-in Context API to make the "locale" available to every component in the tree
// This e.g. enables the LocalizedLink to function correctly
// As this component wraps every page (due to the wrapPageElement API) we can be sure to have
// the locale available everywhere!
const Layout = ({ children, pageContext }: Types) => {
  const { locale, pageGroupName } = pageContext

  // main is the index page, use different variant on other pages
  const variant_layout_root = pageGroupName === `main` ? `layout.main` : `layout.pages`

  const mdxComponents = {
    a: MdxLink,
    MdxEmbed,
  }

  //console.log(pageContext)
  //console.log(LayoutContext)

  // we put the pageContext from node config, to the LayoutContext, which is a react context
  return (
    <LayoutContext.Provider value={{ ...pageContext }}>
      <Styled.root data-id="theme-root">
        <ThemeProvider theme={{ theme }}>
          <Global
            styles={themeGlobal => ({
              '*': {
                boxSizing: `inherit`,
              },
              html: {
                scrollBehavior: `smooth`,
                scrollPaddingTop: theme.navbar.scrolloffset.scrollPaddingTop,
              },
              body: {
                margin: 0,
                padding: 0,
                boxSizing: `border-box`,
                textRendering: `optimizeLegibility`,
              },
              '::selection': {
                backgroundColor: `primary`,
                color: `background`,
              },
              a: {
                transition: `all 0.3s ease-in-out`,
              },
              '.navLinkActiveClass a': {
                color: `${theme.colors.primary} !important`,
                borderBottom: theme.navbar.navLinkActiveClass.borderBottom,
                borderRadius: theme.navbar.navLinkActiveClass.borderRadius,
              },
            })}
          />
          <SEO lang={locale} />
          <Box
            id="layout_root"
            sx={{
              display: `flex`,
              flexDirection: `column`,
              // set this to `minHeight: '100vh'` for full viewport height
              minHeight: `100vh`,
              variant: variant_layout_root,
            }}
          >
            <MDXProvider components={{ ...mdxComponents }}>{children}</MDXProvider>
          </Box>
        </ThemeProvider>
      </Styled.root>
    </LayoutContext.Provider>
  )
}

export { Layout }
