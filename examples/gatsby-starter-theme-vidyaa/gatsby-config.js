const cfgImages = require(`./src/@itenisz/gatsby-theme-vidyaa/config/cfg-images`)
const cfgLanguages = require(`./src/@itenisz/gatsby-theme-vidyaa/config/cfg-languages`)

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

// manifest plugin is optional
//get `en` description for manifest locale
const siteDescriptionHU = configLanguages.filter(item => item.key === `hu`)[0].siteDescription

module.exports = {
  siteMetadata: {
    defaultLanguage,
    siteTitle,
    siteTitleAlt,
    siteHeadline,
    siteUrl,
    siteDescription,
    siteLanguage,
    siteKeywords,
    siteImage,
    author,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vidyaa - Gatsby theme`,
        short_name: `Vidyaa`,
        description: siteDescription,
        lang: defaultLanguage,
        start_url: `/`,
        background_color: `#f7fafc`,  //tailwind grey.1
        theme_color: `#f7fafc`,  //tailwind grey.1
        theme_color_in_head: true,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `browser`,
        icon: `${__dirname}/static/images/favicon.png`, // This path is relative to the root of the site.
        localize: [
          {
            start_url: `/hu/`,
            lang: `hu`,
            name: `Vidyaa - Gatsby theme`,
            short_name: `Vidyaa`,
            description: siteDescriptionHU,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `@itenisz/gatsby-theme-vidyaa`,
      options: {
        cfgImages,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          }
        }
      }
    },
  ],
}
