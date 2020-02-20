import React from 'react'
import cfgLanguages from '../config/cfg-languages'
import { IcfgLanguages } from '../types/type-cfg-languages'
import { layoutContextTypes } from '../types/type-context'

const { defaultLanguage, configLanguages } = cfgLanguages as IcfgLanguages
const { dateFormat } = configLanguages.filter((item: any) => item.key === defaultLanguage)[0]

// context default value readed from the shadowed cfg-languages file
const layoutContextDefault = {
  pageType: `base`,
  pageGroupName: `main`,
  locale: defaultLanguage,
  title: ``,
  slug: ``,
  slugAllLocales: [
    {
      locale: ``,
      slug: ``,
    },
  ],
  defaultLanguage,
  configLanguages,
  dateFormat,
}

const createLayoutContext = (context: layoutContextTypes) => React.createContext(context)
const LayoutContext = createLayoutContext(layoutContextDefault)

export default LayoutContext
