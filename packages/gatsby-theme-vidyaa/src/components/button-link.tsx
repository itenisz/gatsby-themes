/** @jsx jsx */
import theme from '../gatsby-plugin-theme-ui'
import { jsx, Link, Flex, Box, Button } from 'theme-ui'
import GetIcon from './get-icon'

type Types = {
  children: React.ReactNode
  href: string
  iconname: string
  variant?: string
  iconcolor?: string
  target?: string
}

const ButtonLink = ({
  children,
  href,
  iconname,
  variant = `buttons.elevatedExt`,
  iconcolor = `gray.7`,
  target = `_blank`,
}: Types) => {
  const relDefault = ``
  const rel = target === `_blank` ? `noopener` : relDefault
  const href_handled = href.length ? href : null

  return (
    <Button sx={{ variant }}>
      <Link href={href_handled} target={target} rel={rel} sx={{ variant: `links.innerButtonLink` }}>
        <Flex sx={{ width: `100%`, justifyContent: `center`, alignItems: `center` }}>
          <Box sx={{ pt: `6px`, px: 1, color: `${iconcolor}` }}>
            <GetIcon name={iconname} size={theme.sizes.icon} />
          </Box>
          {children}
        </Flex>
      </Link>
    </Button>
  )
}

export default ButtonLink
