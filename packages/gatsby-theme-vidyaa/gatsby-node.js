const path = require(`path`)
const slugify = require(`slugify`)
const withDefaults = require(`./utils/default-options`)
const { createDirs, checkEmptyDirs, refactorByKey, localizedSlug, removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)

const slugify_options = {
  replacement: '-',           // replace spaces with replacement
  remove: /[*+~.()'"!:@ḥ]/g,  // regex to remove characters
  lower: true,                // result in lower case
}

// some directory and files checking
exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const options = withDefaults(themeOptions)
  const { program } = store.getState()
  const dirsMdxMain = [
    path.join(program.directory, options.pathMdxMain),
  ]
  const dirsMdxBlog = [
    path.join(program.directory, options.pathMdxBlog),
  ]
  const dirsTrans = [
    path.join(program.directory, options.pathTranslations),
  ]
  const dirsImages = [
    path.join(program.directory, options.pathImages),
  ]

  //create dirs if not exists
  createDirs(dirsMdxMain)
  createDirs(dirsMdxBlog)
  createDirs(dirsTrans)
  createDirs(dirsImages)

  // this will exit the node gatsby run if dirs empty
  // devnote: these maybe not needed, because dirs can be empty if files in subdirs
  // more testing required
  // checkEmptyDirs(dirsMdxMain, `(mdx)`)
  // checkEmptyDirs(dirsMdxBlog, `(mdx)`)
  // checkEmptyDirs(dirsTrans, `(translations)`)
  // checkEmptyDirs(dirsImages, `(images)`)
}

// creating custom GraphQL nodes to save themeOptions,
// SDL schema definition
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  type ThemeVidyaaConfig implements Node {
    themeOptions: themeOptions!
  }
  type themeOptions {
    pathBase: String!
    pathMdxPages: String!
    pathMdxMain: String!
    pathMdxBlog: String!
    mdx: Boolean!
    pathTranslations: String!
    pathImages: String!
    cfgImages: [objImage!]!
    cfgLanguages: cfgLanguages!
  }
  type cfgLanguages {
    defaultLanguage: String!
    configLanguages: [objLanguage!]!
  }
  type objImage {
    name: String!
    src: String!
  }
  type objLanguage {
    key: String!
    path: String!
    locale: String!
    dateFormat: String!
    siteLanguage: String!
    ogLanguage: String!
    flagCountry: String!
    flagLabel: String!
    defaultTitle: String!
    defaultDescription: String!
  }
  `
  createTypes(typeDefs)
}

// creating custom GraphQL nodes to save themeOptions
exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions
  const options = withDefaults(themeOptions)

  const optionsToSave = {
    pathBase: options.pathBase,
    pathMdxPages: options.pathMdxPages,
    pathMdxMain: options.pathMdxMain,
    pathMdxBlog: options.pathMdxBlog,
    mdx: options.mdx,
    pathTranslations: options.pathTranslations,
    pathImages: options.pathImages,
    cfgImages: options.cfgImages,
    cfgLanguages: options.cfgLanguages,
  }

const themeVidyaaConfig = {
  themeOptions: optionsToSave
}

  createNode({
    ...themeVidyaaConfig,
    id: `@itenisz/gatsby-theme-vidyaa-config`,
    parent: null,
    children: [],
    internal: {
      type: `ThemeVidyaaConfig`,
      contentDigest: createContentDigest(themeVidyaaConfig),
      content: JSON.stringify(themeVidyaaConfig),
      description: `Options for @itenisz/gatsby-theme-vidyaa`,
    },
  })
}


exports.onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage, deletePage } = actions
  const options = withDefaults(themeOptions)
  const { defaultLanguage, configLanguages } = options.cfgLanguages
  const locales = refactorByKey(configLanguages, `key`)

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page)


  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map(locale => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locale === defaultLanguage ? page.path : `${locales[locale].path}${page.path}`

    // here we are artifically generating slug data-s
    //for the src/pages/ main pages, and the default ones like 404 pages
    // becaues there is no frontmatter title
    // title comes from path for these pages
    // the context structure need to be the same as in PagesFromList
    const titleFromPath = (page.path === `/`) ? `` : page.path
    const titleNoSlash = titleFromPath.replace(/\\|\//g, ``)
    const title = titleNoSlash.replace(`.html`, ``)
    //const titleWithLocale = locale === defaultLanguage ? title : `${title}-${locale}`
    const slug = title

    const slugAllLocales = Object.keys(locales).map(loc => {
      //const slugWithLocale = loc === defaultLanguage ? title : `${title}-${loc}`
      return {
        locale: loc,
        slug,
      }
    })

    // we know that its coming from the src / pages
    const pageType = 'base'
    // pageGroupName is the page name(src / pages) or if the index page (root), then main, if 404 page then 404
    const titleEmpty404 = title.includes(`404`) ? `404` : title
    const pageGroupName = title.length ? titleEmpty404 : `main`

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/de/")
      // We want to remove that
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        pageType,
        pageGroupName,
        locale,
        title,
        slug,
        slugAllLocales,
        defaultLanguage,
        configLanguages,
        dateFormat: locales[locale].dateFormat,
      },
    })
  })
}

// As you don't want to manually add the correct languge to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language
exports.onCreateNode = ({ node, actions }, themeOptions) => {
  const { createNodeField } = actions
  const options = withDefaults(themeOptions)
  const { defaultLanguage } = options.cfgLanguages

  // Check for "Mdx" type so that other files (e.g. images) are exluded
  if (node.internal.type === `Mdx`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.fileAbsolutePath, `.mdx`)

    // Check if post.name is "index.defaultLanguage.mdx" -- because that's the file for default language, ("en" or your default language)
    const isDefault = name.split(`.`)[1] === defaultLanguage

    // Files are defined with "name-with-dashes.lang.mdx"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string, If it's the default language, pass the locale for that
    const lang = isDefault ? defaultLanguage : name.split(`.`)[1]

    //slug from frontmatter title to allMdx fields
    const slug = slugify(node.frontmatter.title, slugify_options)

    const dirs = path.dirname(node.fileAbsolutePath).split(`/`)
    const dirsFromMdxPages = dirs.length ? dirs.slice(dirs.indexOf(options.pathMdxPages)+1) : ``
    // here possible path.join(...dirsFromMdxPages) for windows compatibility
    //const relativeDirectory = dirsFromMdxPages.length ? path.join(...dirsFromMdxPages) : ``
    const relativeDirectory = dirsFromMdxPages.length ? dirsFromMdxPages.join(`/`) : ``
    const parentDir = dirs.length ? dirs.pop() : ``
    const grandParentDir = dirs.length ? dirs.pop() : ``

    createNodeField({ node, name: `relativeDirectory`, value: relativeDirectory })
    createNodeField({ node, name: `parentDir`, value: parentDir })
    createNodeField({ node, name: `grandParentDir`, value: grandParentDir })
    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
    createNodeField({ node, name: `postSlug`, value: slug })
  }
}

// create a page with slug for mdx files
exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions
  const options = withDefaults(themeOptions)
  const { defaultLanguage, configLanguages } = options.cfgLanguages
  const locales = refactorByKey(configLanguages, `key`)

  const postTemplate = require.resolve(`./src/templates/post.tsx`)

  const query_graphql = `
    query {
      rawData: allFile(filter: { sourceInstanceName: { eq: "mdxpages" } }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              fields {
                locale
                isDefault
                grandParentDir
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `

  const result_pagelist = await graphql(query_graphql)

  if (result_pagelist.errors) {
    console.error(result_pagelist.errors)
    return
  }

  const createPagesFromList = ( list ) => {
      list.forEach(({ node: post }) => {
        // All files for a blogpost are stored in a folder
        // relativeDirectory is the name of the folder
        //const slug = post.relativeDirectory

        const title = post.childMdx.frontmatter.title

        //slug from frontmatter title
        const slug = slugify(title, slugify_options)

        // Get slug for all locales, all mdx in a directory
        const list_filtered = list.filter((item) => item.node.relativeDirectory == post.relativeDirectory )
        const slugAllLocales = list_filtered.map((item) => {
          return {
            locale: item.node.childMdx.fields.locale,
            slug: slugify(item.node.childMdx.frontmatter.title, slugify_options)
          }
        })

        // Use the fields created in exports.onCreateNode
        const locale = post.childMdx.fields.locale
        const isDefault = post.childMdx.fields.isDefault

        // we know that its programmatically generated
        const grandParentDir = post.childMdx.fields.grandParentDir
        const pageType = `generated`
        // pageGroupName is like `blog_generated`
        const pageGroupName = `${grandParentDir}_${pageType}`

        createPage({
          path: localizedSlug({ isDefault, locale, slug }),
          component: postTemplate,
          context: {
            pageType,
            pageGroupName,
            // Pass both the "title" and "locale" to find a unique file
            // Only the title would not have been sufficient as articles could have the same title
            // in different languages, e.g. because an english phrase is also common in german
            locale,
            title,
            slug,
            slugAllLocales,
            defaultLanguage,
            configLanguages,
            dateFormat: locales[locale].dateFormat,
          },
        })
      })
  }

  createPagesFromList(result_pagelist.data.rawData.edges)

}
