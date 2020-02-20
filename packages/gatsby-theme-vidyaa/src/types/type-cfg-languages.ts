export type configLanguagesTypes = [
  {
    key: string
    path: string
    locale: string
    dateFormat: string
    ogLanguage: string
    siteLanguage: string
    siteTitle: string
    siteTitleAlt: string
    siteHeadline: string
    siteUrl: string
    siteDescription: string
    siteKeywords: string
    siteImage: string
    author: string
    flagCountry: string
    flagLabel: string
  }
]

export interface IcfgLanguages {
  defaultLanguage: string
  configLanguages: configLanguagesTypes
}
