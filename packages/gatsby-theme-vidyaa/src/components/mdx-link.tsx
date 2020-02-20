import React from 'react'
import { LocalizedLink } from './localized-link'

type Types = {
  children?: React.ReactNode
  href: string
}

const isHash = (str: string) => /^#/.test(str)
const isInternal = (to: string) => /^\/(?!\/)/.test(to)

// Only use <LocalizedLink /> for internal links
const MdxLink = ({ children, href, ...props }: Types) =>
  isHash(href) || !isInternal(href) ? (
    <a {...props} href={href}>
      {children}
    </a>
  ) : (
    <LocalizedLink to={href} {...props}>
      {children}
    </LocalizedLink>
  )

export default MdxLink
