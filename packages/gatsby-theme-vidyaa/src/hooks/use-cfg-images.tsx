import { useStaticQuery, graphql } from 'gatsby'
import { refactorByKeyValue } from '../utils/general-helpers'

const useCfgImages = () => {
  const { rawData } = useStaticQuery(query)
  // restucture array of objects, to one object with labels
  const cfgImages = refactorByKeyValue(rawData.themeOptions.cfgImages, `name`, `src`)

  return cfgImages
}

export default useCfgImages

const query = graphql`
  query useCfgImages {
    rawData: themeVidyaaConfig(id: { eq: "@itenisz/gatsby-theme-vidyaa-config" }) {
      themeOptions {
        cfgImages {
          name
          src
        }
      }
    }
  }
`
