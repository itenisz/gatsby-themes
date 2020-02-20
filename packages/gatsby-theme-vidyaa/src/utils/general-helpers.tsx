type refactorType = {
  [index: string]: any
}

const refactorByKey = (arr: object[], key: string): refactorType =>
  arr.reduce((acc: object, item: any) => ({ ...acc, [item[key]]: item }), {})

const refactorByKeyValue = (arr: object[], key: string, value: string): refactorType =>
  arr.reduce((acc: object, item: any) => ({ ...acc, [item[key]]: item[value] }), {})

// use this func only here
const getLocales = (configLanguages: object[]): refactorType => refactorByKey(configLanguages, `key`)

// Use a little helper function to remove trailing slashes from paths
const removeTrailingSlash = (path: string): string => (path === `/` ? path : path.replace(/\/$/, ``))

const getLinkActiveStyle = (locale: string, itemlink: string, href: string): string => {
  // this part probably dont need, use React Link getProps (https://reach.tech/router/api/Link)
  // set active link style by check the current link from location.href is equal with the item.link
  // warning: location here is not defined at build
  const pathname = typeof window !== `undefined` ? href.split(`/`).pop() : `/`
  const currentLink = !pathname || pathname === locale ? `#home` : `${pathname}`
  const currentLinkAnchor = currentLink.includes(`#`) ? currentLink.split(`#`).pop() : ``
  const variantLink = itemlink === `#${currentLinkAnchor}` ? `navbar.navlinkactive` : `navbar.navlink`

  return variantLink
}

// get the full path with slug for the current page with the given locale
const getPathPage = (locale: string, defaultLanguage: string, slugAllLocales: any): string => {
  const loc = locale === `GB` ? `en` : locale.toLowerCase()
  const slug_slash = defaultLanguage === loc ? `/` : ``
  const slug =
    slugAllLocales === null || slugAllLocales === undefined || slugAllLocales === ``
      ? slug_slash
      : `/${slugAllLocales[loc]}`

  const path_base = defaultLanguage === loc ? `` : `/${loc}`

  return path_base + slug
}

// get pathname from window.location.href
const getPathFromHref = (locale: string, defaultLanguage: string, configLanguages: object[], href: string): string => {
  const locales = getLocales(configLanguages)
  const localesPath = Object.values(locales).map((item: any) => item.path)
  const pathSplitted = removeTrailingSlash(href).split(`/`)
  let pathname = pathSplitted.length ? pathSplitted[pathSplitted.length - 1] : ``
  if ([``, ...localesPath].includes(pathname)) {
    pathname = ``
  }
  if (pathname.includes(`#`) && pathname.charAt(pathname.length - 1) !== `#`) {
    const splittedByAnchor = pathname.split(`#`)
    const splitAnchor = splittedByAnchor.length ? splittedByAnchor[splittedByAnchor.length - 1] : ``
    pathname = `#${splitAnchor}`
  }

  let path_base = `/`
  if (defaultLanguage !== locale) {
    path_base = pathname.length ? `/${locale}/` : `/${locale}`
  }

  return path_base + pathname
}

// get home path according to current locale
const getPathHome = (locale: string, defaultLanguage: string, anchor: string): string => {
  // this is the slash-ed anchor solution working with outside pages, needs further testing
  //const localizedAnchor = anchor == `` ? `` : defaultLanguage === locale ? `#${anchor}` : `/#${anchor}`
  //const result = defaultLanguage === locale ? `${localizedAnchor}` : `/${locale}${localizedAnchor}`

  //anchor without slash, simple
  const origin = typeof window !== `undefined` ? window.location.origin : `/`
  const result = anchor === `` ? `${origin}` : `#${anchor}`
  return result
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
/*
const hexToRGB = h => {
  let r = 0
  let g = 0
  let b = 0

  // 3 digits
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`
    g = `0x${h[2]}${h[2]}`
    b = `0x${h[3]}${h[3]}`

    // 6 digits
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`
    g = `0x${h[3]}${h[4]}`
    b = `0x${h[5]}${h[6]}`
  }

  return `rgb(${+r},${+g},${+b})`
}
*/

export { getLinkActiveStyle, getPathPage, getPathFromHref, getPathHome, refactorByKey, refactorByKeyValue }
