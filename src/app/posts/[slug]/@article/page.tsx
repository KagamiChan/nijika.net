import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { Views } from './views'

import { allPosts } from 'contentlayer/generated'
import { LocalTime } from '~/components/local-time'
import { MdxContent } from '~/components/mdx-content'
import { getCount } from '~/lib/redis'
import { getViewsKeyByPostPath } from '~/lib/utils'

export default async function Article({
  params,
}: {
  params: { slug: string }
  toc: ReactNode
}) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  const key = await getViewsKeyByPostPath(post.slug)
  const initialViews = (await getCount(key)) ?? 0

  return (
    <>
      <LocalTime date={post.date} />
      <h1 className="text-pretty">{post.title}</h1>
      <div className="h-4 w-full text-sm">
        <Views path={post.slug} initialViews={initialViews} />
      </div>
      <MdxContent
        code={post.body.code}
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
      />
    </>
  )
}
