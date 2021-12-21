import Image from 'next/image'
import React, { useState } from 'react'
import { myLoader, pad } from 'utils'

export const CharacterIcon = ({ id, alt }: { id: number; alt: string }) => {
  const [src, setSrc] = useState<string>(
    `adv/ondemand/chara_icon/adv_icon_${pad(id, 3)}.png`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width="128"
      alt={alt}
      height="128"
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}

const MusicIconContent = ({ id }: { id: number }) => {
  console.log('rerender')
  const [src, setSrc] = useState<string>(
    `music_jacket/music_jacket_${pad(id, 7)}.jpg`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width="128"
      alt={`image jacket`}
      height="128"
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}
export const MusicIcon = React.memo(MusicIconContent)
