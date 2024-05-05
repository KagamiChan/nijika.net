/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

import { posts } from 'velite/generated'
import { SITE_TITLE, SITE_URL } from '~/constants'

const size = {
  width: 1600,
  height: 900,
}

export const generateImageMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = posts.find((p) => encodeURI(p.slug) === params.slug)

  return [
    {
      alt: post?.title
        ? `来自${SITE_TITLE}的文章：${post.title}`
        : `来自${SITE_TITLE}的文章`,
      contentType: 'image/png',
      id: 'medium',
      size,
    },
  ]
}

const Image = async ({ params }: { params: { slug: string } }) => {
  const logoData = await readFile(
    path.resolve(process.cwd(), './public/nijika-social.png'),
  )
  const logoSrc = Uint8Array.from(logoData).buffer

  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

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
        }}
        lang="zh-CN"
      >
        <div
          style={{
            width: '80%',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textWrap: 'pretty',
            textAlign: 'center',
          }}
        >
          <img src={logoSrc as unknown as string} width={600} />
          <span>{post?.title}</span>
          <span style={{ fontSize: '48px' }}>{`${SITE_URL}/${post.id}`}</span>
        </div>
      </div>
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
