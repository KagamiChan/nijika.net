import { type ReactNode } from 'react'

import { Comments } from '~/components/comments'

export default function Layout({
  article,
  toc,
  shorturl,
}: {
  article: ReactNode
  toc: ReactNode
  shorturl: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="flex gap-16">
        <article className="prose prose-neutral flex-1 dark:prose-invert">
          {article}
        </article>
        {toc}
      </div>
      {shorturl}
      <Comments />
    </>
  )
}
