/** @jsx jsx */
import { jsx, Flex, Box, Text } from 'theme-ui'
import ButtonLink from './button-link'
import CardMap from './card-map'
import useTranslations from '../hooks/use-translations'
import useTransLinks from '../hooks/use-trans-links'
import { ItransLinks } from '../types/type-trans-links'

export const ContactBlock = () => (
  <Box id="contactBlock">
    <Flex
      sx={{
        width: `auto`,
        flexDirection: [`column`, `row`, `row`],
        justifyContent: `center`,
        alignItems: `stretch`,
      }}
    >
      <Box
        sx={{
          mb: [3, 3, 3, 3],
          ml: [0, 2],
          width: [`100%`, `66%`, `auto`],
        }}
      >
        <CardMap />
      </Box>
      <Flex
        sx={{
          width: [`100%`, `auto`],
          justifyContent: `center`,
        }}
      >
        <ButtonColumn />
      </Flex>
    </Flex>
  </Box>
)

export const ButtonColumn = () => (
  <Box
    sx={{
      minWidth: [`270px`, `auto`],
    }}
  >
    <Flex
      sx={{
        width: `auto`,
        height: `100%`,
        flexDirection: `column`,
        justifyContent: `space-between`,
      }}
    >
      <ButtonBooking />
      <ButtonFacebook />
      <ButtonInstagram />
      <ButtonPhone />
      <ButtonEmail />
    </Flex>
  </Box>
)

export const ButtonGroupFive = () => (
  <Box>
    <Flex sx={{ variant: `contact.flexButtonGroup` }}>
      <ButtonBooking />
    </Flex>
    <Flex sx={{ variant: `contact.flexButtonGroup` }}>
      <ButtonFacebook />
      <ButtonInstagram />
    </Flex>
    <Flex sx={{ variant: `contact.flexButtonGroup` }}>
      <ButtonPhone />
      <ButtonEmail />
    </Flex>
  </Box>
)

const ButtonBooking = () => {
  const { linkBooking } = useTransLinks() as ItransLinks
  return (
    <ButtonLink href={linkBooking.url} iconname="FaCalendarCheck" iconcolor="red.6" variant="buttons.borderedExt">
      <Text>{linkBooking.trans}</Text>
    </ButtonLink>
  )
}

const ButtonFacebook = () => {
  const { linkFacebook } = useTransLinks() as ItransLinks
  return (
    <ButtonLink href={linkFacebook.url} iconname="FaFacebookSquare" iconcolor="blue.6" variant="buttons.borderedExt">
      <Text>{linkFacebook.trans}</Text>
    </ButtonLink>
  )
}

const ButtonInstagram = () => {
  const { linkInstagram } = useTransLinks() as ItransLinks
  return (
    <ButtonLink href={linkInstagram.url} iconname="FaInstagram" iconcolor="orange.6" variant="buttons.borderedExt">
      <Text>{linkInstagram.trans}</Text>
    </ButtonLink>
  )
}

const ButtonPhone = () => {
  const { tel } = useTranslations() as { tel: string }
  return (
    <ButtonLink href="" iconname="FaPhoneSquare" iconcolor="purple.6" variant="buttons.borderedExt">
      <Text>{tel}</Text>
    </ButtonLink>
  )
}

const ButtonEmail = () => {
  const { linkEmail } = useTransLinks() as ItransLinks
  return (
    <ButtonLink href={linkEmail.url} iconname="MdMail" iconcolor="teal.6" variant="buttons.borderedExt">
      <Text>{linkEmail.trans}</Text>
    </ButtonLink>
  )
}
