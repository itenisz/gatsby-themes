import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import LayoutContext from '../contexts/layout-context'
import { refactorByKeyValue } from '../utils/general-helpers'

const useTranslations = (groupname = `main`) => {
  const { locale } = React.useContext(LayoutContext)
  const { rawData } = useStaticQuery(query_graphql)

  const simplified = rawData.edges.map((item: any) => ({
    locale: item.node.locale,
    transFile: item.node.transFile,
  }))

  // Only return translations for the current locale
  const { transFile } = simplified.filter((item: any) => item.locale === locale)[0]

  // filter by groupname
  const { elements } = transFile.transPages.filter((item: any) => item.groupname === groupname)[0]
  // restucture array of objects, to one object with labels
  const transPages = refactorByKeyValue(elements, `name`, `trans`)

  return transPages
}

export default useTranslations

const query_graphql = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" }, relativeDirectory: { eq: "pages" } }) {
      edges {
        node {
          locale: name
          transFile: childPagesYaml {
            transPages {
              groupname
              elements {
                name
                trans
              }
            }
          }
        }
      }
    }
  }
`
