import { useStaticQuery, graphql } from 'gatsby'
import { refactorByKey } from '../utils/general-helpers'

const useCfgLanguages = () => {
  const { rawData } = useStaticQuery(query)
  // restucture array of objects, to one object with labels
  const cfgLanguages = refactorByKey(rawData.themeOptions.cfgLanguages.config, `key`)

  return cfgLanguages
}

export default useCfgLanguages

const query = graphql`
  query useCfgLanguages {
    rawData: themeVidyaaConfig(id: { eq: "@itenisz/gatsby-theme-vidyaa-config" }) {
      themeOptions {
        cfgLanguages {
          defaultLanguage
          config: configLanguages {
            key
            path
            locale
            dateFormat
            ogLanguage
            siteLanguage
            siteTitle
            siteTitleAlt
            siteHeadline
            siteUrl
            siteDescription
            siteKeywords
            siteImage
            author
            flagCountry
            flagLabel
          }
        }
      }
    }
  }
`
