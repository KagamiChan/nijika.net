/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'

const size = {
  width: 1200,
  height: 630,
}

const Image = async () => {
  const logoData = await readFile(
    path.resolve(process.cwd(), './public/nijika-social.png'),
  )
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: '96px',
          fontWeight: '600',
          lineHeight: '1.2em',
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url("data:image/png;base64,${Buffer.from(
            logoSrc,
          ).toString('base64')}")`,
        }}
      />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

export default Image
