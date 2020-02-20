import { configLanguagesTypes } from './type-cfg-languages'

export type pageContextTypes = {
  pageType: string
  pageGroupName: string
  locale: string
  title: string
  slug: string
  slugAllLocales: {
    locale: string
    slug: string
  }[]
  defaultLanguage: string
  configLanguages: configLanguagesTypes
  dateFormat: string
}

export type layoutContextTypes = {
  pageType: string
  pageGroupName: string
  locale: string
  title: string
  slug: string
  slugAllLocales: {
    locale: string
    slug: string
  }[]
  defaultLanguage: string
  configLanguages: configLanguagesTypes
  dateFormat: string
}
