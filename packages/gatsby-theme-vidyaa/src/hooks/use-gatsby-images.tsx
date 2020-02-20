import { graphql, useStaticQuery } from 'gatsby'

const useGatsbyImages = () => {
  const rawData = useStaticQuery(queryImage)
  return rawData
}

export default useGatsbyImages

const queryImage = graphql`
  fragment useLogo on File {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }

  fragment useImage on File {
    childImageSharp {
      fluid(maxWidth: 1900, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }

  query {
    imgLogoNavbar: file(relativePath: { eq: "logo_navbar.png" }) {
      ...useLogo
    }
    imgLogoHeader: file(relativePath: { eq: "logo_header.png" }) {
      ...useLogo
    }
    imgHeaderBG: file(relativePath: { eq: "img01.jpg" }) {
      ...useImage
    }
    imgMain1BG: file(relativePath: { eq: "img02.jpg" }) {
      ...useImage
    }
    imgMain2BG: file(relativePath: { eq: "img03.jpg" }) {
      ...useImage
    }
    imgFooterBG: file(relativePath: { eq: "img04.jpg" }) {
      ...useImage
    }
  }
`
