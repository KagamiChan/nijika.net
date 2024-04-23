import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { allPosts } from 'contentlayer/generated'
import { SITE_TITLE, SITE_URL } from '~/constants'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  )

  if (post) {
    return {
      title: `${SITE_TITLE}::${post.title}`,
      openGraph: {
        url: `${SITE_URL}${post.url}`,
      },
    }
  }
  return {}
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
  toc: ReactNode
}) {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  )
  if (!post) {
    notFound()
  }
  return null
}
