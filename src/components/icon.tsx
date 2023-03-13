import { IconSizeEnum } from '@/enum/icon-size.enum'
import Image from 'next/image'
import React, { useState } from 'react'

const getEnumWidth = (size?: IconSizeEnum) => {
  let width = 24
  switch (size) {
    case IconSizeEnum.SM:
      width = 16
      break
    case IconSizeEnum.MD:
      width = 24
      break
    case IconSizeEnum.LG:
      width = 32
      break
  }
  return width
}

interface IconProps {
  src: string
  alt: string
  className?: string
  size?: IconSizeEnum
  width?: number
  height?: number
}

const Icon = React.memo((props: IconProps) => {
  const { src, alt, size, className, width, height } = props
  const [widthPx, setWidthPx] = useState(getEnumWidth(size))

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width ? width : widthPx}
      height={height ? height : widthPx}
    />
  )
})

export default Icon
