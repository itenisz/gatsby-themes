const cfgLanguagesDefault = require(`../src/config/cfg-languages`)
const cfgImagesDefault = require(`../src/config/cfg-images`)

module.exports = themeOptions => {

  //this from gatsby-config.js theme options
  const pathBase = themeOptions.pathBase || `/`
  const pathMdxPages = themeOptions.pathMdxPages || `content/pages`
  const pathMdxMain = themeOptions.pathMdxMain || `${pathMdxPages}/main`
  const pathMdxBlog = themeOptions.pathMdxBlog || `${pathMdxPages}/blog`
  const pathTranslations = themeOptions.pathTranslations || `content/translations`
  const pathImages = themeOptions.pathImages || `static/images`

  const mdx = themeOptions.mdx || true

  const cfgLanguages = themeOptions.cfgLanguages || cfgLanguagesDefault
  const cfgImages = themeOptions.cfgImages || cfgImagesDefault

  return {
    pathBase,
    pathMdxPages,
    pathMdxMain,
    pathMdxBlog,
    pathTranslations,
    pathImages,
    mdx,
    cfgLanguages,
    cfgImages,
  }
}