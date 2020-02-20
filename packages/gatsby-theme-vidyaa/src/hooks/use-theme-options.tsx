//import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// cfgLanguages and cfgImages has their own hook
const useThemeOptions = () => {
  const { rawData } = useStaticQuery(query)
  return rawData.themeOptions
}

export default useThemeOptions

const query = graphql`
  query useThemeOptions {
    rawData: themeVidyaaConfig(id: { eq: "@itenisz/gatsby-theme-vidyaa-config" }) {
      themeOptions {
        pathBase
        pathMdxPages
        pathMdxMain
        pathMdxBlog
        pathTranslations
        pathImages
        mdx
      }
    }
  }
`
