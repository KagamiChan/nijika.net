import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { Views } from './views'

import { MdxContent } from '~/components/mdx-content'
import { allPosts } from 'contentlayer/generated'
import { LocalTime } from '~/components/local-time'
import { getViewsKeyByPostPath } from '~/lib/utils'
import { getCount } from '~/lib/redis'

export default async function Article({
  params,
}: {
  params: { slug: string }
  toc: ReactNode
}) {
  const post = allPosts.find((p) => encodeURI(p.slug) === params.slug)
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
