import Image from 'next/image'
import { useNextSanityImage } from '@fevernova90/next-sanity-image'
import clsx from 'clsx'

import client from '@/lib/sanity-client'

export default function SanityImage(props) {
  const { src: image, quality = 85, className, ...rest } = props
  const imageProps = useNextSanityImage(client, image)

  // SVG images don't load without this
  if (imageProps?.src?.includes('.svg')) {
    const url = new URL(imageProps.src)
    imageProps.src = url.origin + url.pathname
  }

  // Next complains if you add dimensions with layout="fill"
  if (props.layout === 'fill') {
    delete imageProps.width
    delete imageProps.height
  }

  return (
    <Image
      {...imageProps}
      quality={quality}
      // Smoothly transition from placeholder
      className={clsx('transition duration-200', className)}
      {...rest}
    />
  )
}
