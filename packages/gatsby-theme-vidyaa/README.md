# Gatsby Theme Vidyaa - i18n gatsby theme by @itenisz

This is a Gatsby Theme with i18n support, built with [MDX](https://mdxjs.com/) and [Theme UI](https://theme-ui.com/).

## Warning

:warning: **This repo is very unstable and likely to change.**

Use at your own risk :ghost:

The packages are still in heavy development, If I found better solution to any part of this project, I may change it completely.

## The goal of this project

I started this to learn to work with the newest technologies and maintain high quality of coding standards. I especially wanted to work with multilingual environment, because that's not an easy task to do. Try it for yourself and you will see why. Before start, I was unable to find any other example which is working with mdx, theme-ui and i18n and the topic of i18n solutions was very confusing with many different approaches.

So I made my own solution, based on the official Gatsby i18n example, without using any outside i18n libraries, only with GraphQL queries (In the future I may create versions with the great i18n libraries like react-intl or i18next). On the top of that, I decided to use Typescript, because it seems Typescript provides a lot of help to write a better code. For the Design System I use Theme-UI which I think is the best, and that's the future of frontend solutions in React and Gatsby. (Gatsby has official support to Theme-ui and they create a theme dev team to provide more higher level components in the future)

## Special Thanks to some great developers

They motivated me and showed a great way, how to handle development processes.

- Thanks to **Brent Jackson** ([@jxnblk](https://jxnblk.com/)) the creator of Theme-ui, who is one of the greatest developers on this planet, I learned from him a lot about design principles. His Theme-ui is just amazing and reforms the whole approach to designing. I recommend to read his [blog](https://jxnblk.com/blog).

- Thanks to **LekoArts** ([@LekoArts](https://www.lekoarts.de/)) creator of many high quality open source Gatsby Themes, and the original official Gatsby i18n example. He helps a lot in dev community on different forums and platforms. I learned a general approach to i18n from him, and about gatsby themes and his work encouraged me to use Typescript.

- Thanks to **Jason Lengstorf** ([@jlengstorf](https://lengstorf.com/)) who is a really great guy, a great speaker, working a lot for dev community and constantly helping others. I learned from him a more open minded attitude to handle development and he shows great balance to maintain a healthier developer life.

- Thanks to **Kristóf Poduszló** ([@kripod](https://github.com/kripod/)) who is following high quality coding standards as a computer engineer, I learned from him the importance of strict eslint and a new aproach to handle frontend with Design Systems like Rebass (by Brent Jackson).

## Origin of the name Vidyaa

Its very funny, because I wanted to use a female name for it, so I used a female name generator and the random result was "Vidya".
This name origins from the Sanskrit word "vidyā" which means "knowledge", and this whole project goal is gaining knowledge in development, so its a perfect name. I wrote as "vidyaa" because that's the correct Sanskrit transliteration.

## Features

### mdx

- this is a new format which is allow to use react components inside markdown and that creates a lot of possibilities

### theme-ui

- extremely smart Design System made by Brent Jackson ( who is the creator of Rebass and Styled-system )

### full responsive

- theme-ui is a great help to provide a full responsive design

### i18n

- i18n as SSR, based on official Gatsby example by LekoArts. I refactored to use multiple mdx pages, yaml files for multiple pages, menus, links etc.

### configurable navbar

- support different navbar for every page, with different languages

### multilingual seo

- different seo data-s for every language with react helmet

### offline support & webapp manifest

- makes possible to browse it on your phone even without internet connection

### gatsby image handling

- generating optimized images with sharp and requested trough GraphQL, with lazy load display

### parallax image scrolling

- I made a solution which make possible to use it with gatsby images and sharp technology together

### scrollspy

- change menu styles according to scrolling position

### theme shadowing

- this comes with all the gatsby themes, allow to use this theme and refactor any parts of it in your own gatsby project


### react hooks

- this is especially useful to handling the different language variables trough all the components

### typescript

- its not easy to learn but worth it, provides better quality of code because of type definitions, especially important in bigger projects

### strict eslint

- for high quality coding, follows airbnb standards, configured to Typescript (config is on workspace main repo)


## Installation

### If you use it in your own starter

```sh
yarn add @itenisz/gatsby-theme-vidyaa
```

### Install with the example starter

```sh
yarn add @itenisz/gatsby-starter-theme-vidyaa
```

## Usage

### Gatsby Starter example

Check these links:

Standalone Github repo: [@itenisz/gatsby-starter-theme-vidyaa](https://github.com/itenisz/gatsby-starter-theme-vidyaa)

Live Preview: [gatsby-theme-vidyaa.netlify.com](https://gatsby-theme-vidyaa.netlify.com/)


### Shadowing

First you need to learn about shadowing. You should shadow the config files to setup.

You can read the official shadowing guide [Shadowing in Gatsby Themes](https://www.gatsbyjs.org/docs/themes/shadowing/) to understand how to customize this theme! Generally speaking you will want to place your files into `src/@itenisz/gatsby-theme-vidyaa/` to shadow/override files. The Theme UI config can be configured by shadowing its files in `src/gatsby-plugin-theme-ui/`.

To shadow the language config file, you need to copy the original version to your `src/@itenisz/gatsby-theme-vidyaa/config/cfg-languages.js`, then make changes in your version.

Check it on the starter example.

### Theme options

| Key                  | Default Value                  | Description                                                                                   |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| `pathBase`           | `/`                            | Root url for the theme                                                                        |
| `pathMdxPages`       | `content/pages`                | Location of mdx dirs for pages (src/pages)                                                    |
| `pathMdxMain`        | `content/pages/main`           | Location of index page mdx dirs                                                               |
| `pathMdxBlog`        | `content/pages/blog`           | Location of blog pages mdx dirs                                                               |
| `pathTranslations`   | `content/translations`          | Location of translation subdirectories with files                                             |
| `pathImages`         | `static/images`                | Location of image files for `use-gatsby-images` hook                                          |
| `mdx`                | `true`                         | Configure `gatsby-plugin-mdx` (if you already using the plugin pass `false` to turn this off) |
| `cfgImages`          | array of objects               | If you want to use direct links without using gatsby image engine, from cfg-images.js file    |
| `cfgLanguages`       | object                         | Main language configuration object, from cfg-languages.js file                                |

The theme creates default directories, if not available. (directory creation written in Gatsby node config file)

The usage of `content/pages/blog` is optional. If no mdx file is found inside, the list will be empty.

The blog page design is very basic, it is still in development. Of course you can write your own blog page with page shadowing, and the theme handle the language and mdx files.

At default gatsby image engine process image files trough `src/hooks/use-gatsby-images` hook. Check the required image filenames there.
You need to shadow the `src/hooks/use-gatsby-images` hook, if you want to use your own gatsby images setup, and write your own hook for your images.

Optionally you can set every image name and src trough `cfgImages` theme option as array of objects. The best method for this, to shadow the config file located at `src/config/cfg-images`, and use your own setup in the shadowed file.

- The img name string are used in components. With your own components you can setup different names, but watch out for Typescript interface definition located in `src/types/type-cfg-images`
- All the image src default value is an empty string
- If src is empty string, `src/hooks/use-gatsby-images` hook image data used (sharp generated image from GraphQL)
- If src string is available, then `src/hooks/use-cfg-images` hook get the values, and set the image component link directly

If these are set, the theme use them directly those links trough `src/hooks/use-cfg-images` hook, instead of handling the image trough Gatsby engine and trough the `src/hooks/use-gatsby-images` hook. Below there are example for the object structure.


### Example usage

```js
// gatsby-config.js

// this is the shadowed cfg-images
const cfgImages = require(`./src/@itenisz/gatsby-theme-vidyaa/config/cfg-images`)

module.exports = {
  plugins: [
    {
      resolve: `@itenisz/gatsby-theme-vidyaa`,
      options: {
        cfgImages,
      },
    },
  ]
};
```


This example shows `cfgImages` structure, and usage. The name fields are used in components. With your own components you can setup different names.


```js
module.exports = {
  plugins: [
    {
      resolve: `@itenisz/gatsby-theme-vidyaa`,
      options: {
        cfgImages: [
          {
            // gatsby image plugin is used, because src is empty
            // image generated trough gatsby image engine
            // image path is theme option `pathImages`
            // image filename is set in `src/hooks/use-gatsby-images` hook
            name: `imgMLogoHeader`,
            src: ``,
          },
          {
            // src set directly to file inside `static/images/`
            // no gatsby image module is used
            name: `imgMLogoNavbar`,
            src: `images/logo_navbar.png`,
          },
          {
            // src set directly to url
            // no gatsby image module is used
            name: `imgHeader`,
            src: `https://unsplash.it/id/1039/2000/1000`
          },
          {
            name: `imgMain1`,
            src: `https://unsplash.it/id/287/2000/1000`
          },
          {
            name: `imgMain2`,
            src: `https://unsplash.it/id/456/2000/1000`
          },
          {
            name: `imgFooter`,
            src: `https://unsplash.it/id/1063/2000/1000`
          },
        ]
      },
    }
  ]
};
```

### Additional configuration


#### siteMetadata

The `siteMetadata` default values come from `config/cfg-languages`, you can find the example of setup in the starter example.

I don't use it in the SEO component because multilingual SEO requires all the data for all the languages, so the SEO data source is `config/cfg-languages`

Offline Support & WebApp Manifest config example in the starter too.

#### Configure languages

The languages are defined in `src/config/cfg-languages.js`. Inside there is the multilingual SEO data-s, and the `flagCountry` and `flagLabel` there for the `react-flags-select` component. All the localized pages generated by this config. You need to shadow your own version to your `src/@itenisz/gatsby-theme-vidyaa/config/cfg-images`.

The translations are located in `content/translations`. The custom hook `src/hooks/use-translations` pulls in these translations then (when the former is changed, the latter needs to update its GraphQL query). Due to the usage of a global layout/Context API and the passed `locale` to all pages (see `gatsby-node.js`) you know on every page which language is currently displayed. Moreover, with the usage of MDX and `gatsby-mdx` a custom component for the `<a>` tag is implemented -- this way links can stay the same for every language, without the need to manually write path prefixes.

### Adding translations

Translations are inside `content/translations`. Here are subdirectories for different sections. In each subdirectory there should be a `lang.yaml` file, where lang is the language, example `en.yaml`, `hu.yaml` etc. Each section can have different yaml structure.

#### Translation groups

You can set groups in your translation configs, so your components can request only a group of translations. This way you can have example different navbar setup for different pages. Or different link or translation setup for different pages under the same translation names. You need to change only the group.

The groupname `main` means your index page, the groupname `blog` for your blog page, you can create your own groups give the groupname to your component.

#### Link translations

Inside `content/translations/links` directory. 

Example `en.yaml`:

```yaml
transLinks:
  - groupname: main
    elements:
    - name: linkReviews
      trans: "Reviews - more than 200 review"
      url: "https://www.reviews.com"
    - name: linkPictures
      trans: "Pictures"
      url: "https://unsplash.com"
```

#### Navbar translations

Inside `content/translations/navbar` directory.

Example `en.yaml`:

```yaml
transNavbar:
  - groupname: main
    elements:
    - name: Blog
      link: "/blog"
    - name: About
      link: "#about"
```

#### Pages translations

Inside `content/translations/pages` directory.

Example `en.yaml`:

```yaml
transPages:
  - groupname: main
    elements:
    - name: hello
      trans: "Hello and welcome to this multilangual site!"
    - name: subline
      trans: "Have a nice day!"
```

### Adding content

#### add mdx block to main page

At default this is a `onepage` concept called `main`, which consists of different mdx files reading as blocks with `mdx-page` component.
Inside `content/main` you need to create a directory for each mdx page, example `content/main/about`. Inside your page directory there need to be an mdx file for each language, named like `index.en.mdx`, `index.hu.mdx` etc.

The `mdx-page` component reading your mdx and put in the content to a box. So you can read multiple mdx content to one page, to load in different blocks.
The index page contains three mdx source: about, prices and contact.

Adding content to main page:

1. Create a new folder inside `content/main`
2. Create a new `index.lang.mdx` file for each language like `index.en.mdx`, and add the frontmatter
3. Create your own component, and use the `mdx-page` component to request the content, check the theme example for usage.

#### add mdx blog posts

Optionally you can use mdx pages as a blog. Inside `content/blog` you need to create a directory for each mdx page, example `content/blog/mypost`. Inside your post directory there need to be an mdx file for each language, named like `index.en.mdx`, `index.hu.mdx` etc.

Adding content to blog page:

1. Create a new folder inside `content/blog`, example `content/blog/mypost`
2. Create a new `index.lang.mdx` file for each language like `index.en.mdx`, and add the frontmatter
3. Your post list will be generated at `yoursite.com/blog`

#### Slugs

Slugs come from frontmatter title, this way there are different slugs for each localized title. Different slugs for all the translations.
The change between different slugs is handled by `src/hooks/use-slugs` hook.

Please be aware, don't use the same slug for different posts or pages, because that cause a conflict, and just one will be generated.
So the title should be unique per language.

**Frontmatter reference:**

```md
---
title: 'About'
date: 2020-01-09
---
```

Now its very basic, but in the future I plan to add categories, tags, images, seo fields.


## Roadmap

- blog categories, tags, remark image handling, better design
- create an alternate burger menu component to mobile view
- create separated core, main, blog  theme packages
- possible theme packages with official i18n libraries like react-intl or i18next
- create a headless cms connection layer
- support for [sanity.io](https://www.sanity.io/), [datocms.com](https://www.datocms.com/)
