declare module 'theme-ui'
declare module '@theme-ui/presets'
declare module 'react-helmet'
declare module 'react-scrollspy'
declare module 'react-flags-select'
declare module 'gatsby-plugin-mdx'

declare module '*.mdx' {
  const MDXComponent: (props) => JSX.Element
  export default MDXComponent
}

declare module '@mdx-js/react' {
  import { ComponentType, StyleHTMLAttributes } from 'react'

  type MDXProps = {
    children: React.ReactNode
    components: React.ReactNode
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
