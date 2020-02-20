import React from "react"
import { Layout } from "./src/components/layout"

// this imported to gatsby-browser.js and gatsby-ssr.js too, so the translations are in SSR mode

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
)

export default wrapPageElement
