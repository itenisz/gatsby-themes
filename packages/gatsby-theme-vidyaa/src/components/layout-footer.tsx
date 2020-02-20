/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

type Types = {
  children?: React.ReactNode
}

const LayoutFooter = ({ children }: Types) => (
  <Box
    id="layout_footer"
    sx={{
      width: `100%`,
      minHeight: `0px`,
      variant: `layout.footer`,
    }}
  >
    {children}
  </Box>
)

export default LayoutFooter
