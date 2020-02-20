import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import LayoutContext from '../contexts/layout-context'
import { refactorByKey } from '../utils/general-helpers'

const useTransLinks = (groupname = `main`) => {
  const { locale } = React.useContext(LayoutContext)
  const { rawData } = useStaticQuery(query_graphql)

  const simplified = rawData.edges.map((item: any) => ({
    locale: item.node.locale,
    transFile: item.node.transFile,
  }))

  // Only return translations for the current locale
  const { transFile } = simplified.filter((item: any) => item.locale === locale)[0]

  // filter by groupname
  const { elements } = transFile.transLinks.filter((item: any) => item.groupname === groupname)[0]
  // restucture array of objects, to one object with labels
  const transLinks = refactorByKey(elements, `name`)

  return transLinks
}

export default useTransLinks

const query_graphql = graphql`
  query useLinks {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" }, relativeDirectory: { eq: "links" } }) {
      edges {
        node {
          locale: name
          transFile: childLinksYaml {
            transLinks {
              groupname
              elements {
                name
                trans
                url
              }
            }
          }
        }
      }
    }
  }
`
