import React from 'react'
import LayoutContext from '../contexts/layout-context'
import { useStaticQuery, graphql } from 'gatsby'

type groupType = {
  groupname: string
  elements: {
    link: string
    name: string
  }[]
}

const useTransNavbar = (pageGroupName = `main`): groupType => {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LayoutContext)
  // Query the JSON files in <rootDir>/ i18n /translations
  const { rawData } = useStaticQuery(query_graphql)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map((item: any) => ({
    locale: item.node.locale,
    transFile: item.node.transFile,
  }))

  // Only return translations for the current locale
  const { transFile } = simplified.filter((item: any) => item.locale === locale)[0]

  // filter by groupname
  const elements = transFile.transNavbar.filter((item: any) => item.groupname === pageGroupName)[0]

  return elements
}

export default useTransNavbar

const query_graphql = graphql`
  query useTransNavbar {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" }, relativeDirectory: { eq: "navbar" } }) {
      edges {
        node {
          locale: name
          transFile: childNavbarYaml {
            transNavbar {
              groupname
              elements {
                link
                name
              }
            }
          }
        }
      }
    }
  }
`
