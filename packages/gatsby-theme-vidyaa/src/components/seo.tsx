import React from 'react'
import Helmet from 'react-helmet'
import LayoutContext from '../contexts/layout-context'

type Types = {
  lang: string
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
}

// multilingual SEO
// SEO coming from layoutContext, where cfg-languages SEO data-s saved for all the languages
// so its not coming from metadata, metadata contains only for default language
const SEO = ({ lang, title = ``, description = ``, pathname = ``, image = ``, children = null }: Types) => {
  const { locale, defaultLanguage, configLanguages } = React.useContext(LayoutContext)
  const defaultLanguageObject = configLanguages.filter((item: any) => item.key === lang)[0]
  const {
    siteTitle: defaultTitle,
    siteTitleAlt,
    siteUrl,
    siteDescription: defaultDescription,
    siteKeywords,
    siteImage: defaultImage,
    author,
  } = defaultLanguageObject

  const seo = {
    lang: lang || defaultLanguage,
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  return (
    <Helmet title={title} defaultTitle={defaultTitle} titleTemplate={`%s | ${siteTitleAlt}`}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="image" content={seo.image} />
      <meta property="og:locale" content={seo.lang} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      {children}
    </Helmet>
  )
}

export default SEO
