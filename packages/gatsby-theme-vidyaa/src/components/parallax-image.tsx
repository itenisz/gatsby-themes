/** @jsx jsx */
//import React, { useLayoutEffect, useEffect } from "react"
import { jsx, Box } from 'theme-ui'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'
import BackgroundImage from 'gatsby-background-image'
import { ChildImageSharp } from '../types'

/*
const ParallaxCache = () => {
  const { parallaxController } = useController();

  useLayoutEffect(() => {
      const handler = () => parallaxController.update();
      window.addEventListener('load', handler);
      return () => window.removeEventListener('load', handler);
  }, [parallaxController]);

  return null;
}

const ParallaxUpdateFrame = () => {
  const { parallaxController } = useController();

  useEffect(() => {
    window.requestAnimationFrame(() => {
        parallaxController.update()
    })
  })

  return null;
}
*/

type TypesParallaxImage = {
  children?: React.ReactNode
  data: ChildImageSharp
  imagelink?: string
  height: string
  amount?: number
  type?: string
}

type TypesImageLayer = {
  data: ChildImageSharp
  imagelink?: string
  amount?: number
  expanded?: boolean
  boxShadow: string
  height: string
}

const ParallaxImageBG = ({ children, data, imagelink, height, amount = 0.4, type = `main` }: TypesParallaxImage) => {
  const boxShadowHeader = `inset 0 0 0 100vw rgba(10, 10, 10, 0.6)`
  const boxShadowMain = `inset 0 0 0 100vw rgba(10, 10, 10, 0.3)`
  const boxShadow = type === `header` ? boxShadowHeader : boxShadowMain

  const absoluteStyle = {
    position: `absolute`,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }

  return (
    <Box sx={{ minHeight: height, bg: `gray.1` }}>
      <Box
        sx={{
          position: `relative`,
          overflow: `hidden`,
          width: `100%`,
          height,
        }}
      >
        <Parallax
          y={[`${amount * -1 * 100}%`, `${amount * 100}%`]}
          styleOuter={absoluteStyle}
          styleInner={absoluteStyle}
        >
          <GatsbyImageLayer
            data={data}
            imagelink={imagelink}
            amount={amount}
            expanded={true}
            boxShadow={boxShadow}
            height={height}
          />
        </Parallax>
        {children}
      </Box>
    </Box>
  )
}

const GatsbyImageLayer = ({ data, imagelink, amount = 0, expanded = false, boxShadow, height }: TypesImageLayer) => {
  const top = expanded ? `${Math.abs(amount) * 100 * -1}%` : 0
  const bottom = expanded ? `${Math.abs(amount) * 100 * -1}%` : 0

  // colorful gardient overlay example
  //const backgroundFluidImageStack = [ `linear-gradient(rgba(220, 15, 15, 0.73), rgba(4, 243, 67, 0.73))`, data.childImageSharp.fluid ]

  if (data && !imagelink) {
    return (
      <BackgroundImage
        fluid={data.childImageSharp.fluid}
        fadeIn={false}
        preserveStackingContext={true}
        style={{
          position: `absolute`,
          top,
          right: 0,
          bottom,
          left: 0,
          minHeight: height,
          boxShadow,
        }}
      />
    )
  }
  if (imagelink) {
    return (
      <Box
        sx={{
          backgroundImage: `url(${imagelink})`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          position: `absolute`,
          top,
          right: 0,
          bottom,
          left: 0,
          minHeight: height,
          boxShadow,
        }}
      />
    )
  }
  console.error(`! -- Image data MISSING!`)
  return null
}

const ParallaxImageBanner = ({
  children,
  data,
  imagelink,
  height,
  amount = 0.4,
  type = `main`,
}: TypesParallaxImage) => {
  const boxShadowHeader = `inset 0 0 0 100vw rgba(10, 10, 10, 0.6)`
  const boxShadowMain = `inset 0 0 0 100vw rgba(10, 10, 10, 0.3)`
  const boxShadow = type === `header` ? boxShadowHeader : boxShadowMain

  const layerImage = data
    ? { image: ``, children: GatsbyImageLayer({ data, amount, boxShadow, height }) }
    : { image: imagelink, children: null }

  const layer1 = {
    amount,
    expanded: true,
    ...layerImage,
  }

  return (
    <Box sx={{ minHeight: height, bg: `gray.6` }}>
      <ParallaxBanner disabled={false} layers={[layer1]} style={{ height }}>
        {children}
      </ParallaxBanner>
    </Box>
  )
}

export { ParallaxImageBanner, ParallaxImageBG as ParallaxImage }
