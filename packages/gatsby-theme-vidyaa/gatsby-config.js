const withDefaults = require(`./utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)
  const { mdx = true } = themeOptions
  const { pathImages, pathTranslations, pathMdxPages, cfgLanguages } = options
  const { defaultLanguage, configLanguages } = cfgLanguages
  const defaultLanguageObject = configLanguages.filter(item => item.key === defaultLanguage)[0]
  const {
    siteLanguage,
    siteTitle,
    siteTitleAlt,
    siteHeadline,
    siteUrl,
    siteDescription,
    siteKeywords,
    siteImage,
    author
  } = defaultLanguageObject

  return {
    siteMetadata: {
      defaultLanguage,
      siteLanguage,
      siteTitle,
      siteTitleAlt,
      siteHeadline,
      siteUrl,
      siteDescription,
      siteKeywords,
      siteImage,
      author,
    },
    plugins: [
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [ `.mdx`, `.md` ],
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-typescript`,
      `gatsby-transformer-json`,
      `gatsby-transformer-yaml`,
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: pathImages,
          name: 'images'
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: pathTranslations,
          name: `translations`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: pathMdxPages,
          name: `mdxpages`,
        },
      },
    ].filter(Boolean),
  }
}