import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { allPosts } from 'contentlayer/generated'
import { LocalTime } from '~/components/local-time'

export default function Article({
  params,
}: {
  params: { slug: string }
  toc: ReactNode
}) {
  console.log(params)
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  )
  if (!post) {
    notFound()
  }
  return (
    <article className="prose prose-neutral flex-1 dark:prose-invert">
      <LocalTime date={post.date} />
      <h1>{post.title}</h1>
      <div
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      ></div>
    </article>
  )
}
