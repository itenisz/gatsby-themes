/** @jsx jsx */
import { jsx, Flex, Box, Embed } from 'theme-ui'

type Types = {
  src: string
  minWidth?: string
  width?: number
  justifyContent?: string
}

const MdxEmbed = ({ src, minWidth = `minViewport`, width = 600, justifyContent = `center`, ...props }: Types) => {
  const ytEmbed = `https://www.youtube.com/embed/`
  const ytVcode = src.includes(`https://www.youtube.com/watch?v=`) ? src.split(`=`).pop() : ``
  const srcEmbed = ytVcode && ytVcode.length ? ytEmbed + ytVcode : src

  return (
    <Flex sx={{ width: `100%`, justifyContent }}>
      <Box sx={{ minWidth, width }}>
        <Embed src={srcEmbed} {...props} />
      </Box>
    </Flex>
  )
}

export default MdxEmbed
