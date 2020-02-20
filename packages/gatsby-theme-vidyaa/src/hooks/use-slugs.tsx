import { useStaticQuery, graphql } from 'gatsby'
import { refactorByKeyValue } from '../utils/general-helpers'

const useSlugs = (pagepath: string) => {
  const { rawData } = useStaticQuery(query_graphql)

  // Simplify the response from GraphQL
  // filter: context not null , and context.title not null
  const rawFiltered = rawData.edges.filter((item: any) =>
    item.node.context == null ? false : item.node.context.title != null
  )

  const simplified = rawFiltered.map((item: any) => ({
    path: item.node.path,
    slugAllLocales: item.node.context.slugAllLocales,
  }))

  // Only return data for the current page
  const pagedata = simplified.filter((page: any) => page.path === pagepath)[0]
  // restucture array of objects, to one object with labels
  const slugAllLocales = pagedata === undefined ? null : refactorByKeyValue(pagedata.slugAllLocales, `locale`, `slug`)

  return slugAllLocales
}

export default useSlugs

const query_graphql = graphql`
  query slugAllLocales {
    rawData: allSitePage {
      edges {
        node {
          path
          context {
            locale
            title
            slug
            slugAllLocales {
              locale
              slug
            }
          }
        }
      }
    }
  }
`
