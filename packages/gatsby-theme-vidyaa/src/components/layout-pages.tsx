/** @jsx jsx */
import React from 'react'
import { jsx, Box } from 'theme-ui'
import { ParallaxProvider } from 'react-scroll-parallax'
import LayoutHeader from './layout-header'
import LayoutFooter from './layout-footer'
import Navbar from './navbar'
import NavGetLinks from './nav-get-links'

type Types = {
  children: React.ReactNode
  withScrollSpy?: boolean
  pageGroupName?: string
}

export const LayoutPages = ({ children, withScrollSpy = false, pageGroupName = `main` }: Types) => (
  <ParallaxProvider>
    <Box id="layout_pages">
      <LayoutHeader>
        <Navbar>
          <NavGetLinks withScrollSpy={withScrollSpy} pageGroupName={pageGroupName} />
        </Navbar>
      </LayoutHeader>
      <Box id="layout_main">{children}</Box>
      <LayoutFooter />
    </Box>
  </ParallaxProvider>
)
