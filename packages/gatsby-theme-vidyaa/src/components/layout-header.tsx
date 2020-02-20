/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

type Types = {
  children?: React.ReactNode
}

const LayoutHeader = ({ children }: Types) => (
  <Box
    id="layout_header"
    sx={{
      variant: `layout.header`,
    }}
  >
    {children}
  </Box>
)

export default LayoutHeader
