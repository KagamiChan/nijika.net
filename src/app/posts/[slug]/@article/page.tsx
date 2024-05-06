import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { Views } from './views'

import { posts } from 'velite/generated'
import { LocalTime } from '~/components/local-time'
import { MdxContent } from '~/components/mdx-content'
import { getCount } from '~/lib/redis'
import { getViewsKeyByPostPath } from '~/lib/utils'
import { TableOfContents } from '~/components/table-of-contents'
import { ScrollArea } from '~/components/ui/scroll-area'

export default async function Article({
  params,
}: {
  params: { slug: string }
  toc: ReactNode
}) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) {
    notFound()
  }

  const key = await getViewsKeyByPostPath(post.slug)
  const initialViews = (await getCount(key)) ?? 0

  return (
    <>
      <article className="prose prose-neutral flex-1 scroll-pt-16 dark:prose-invert">
        <LocalTime date={post.date} />
        <h1 className="text-pretty">{post.title}</h1>
        <div className="h-4 w-full text-sm">
          <Views path={post.slug} initialViews={initialViews} />
        </div>
        <MdxContent
          code={post.code}
          className="[&>*:last-child]:mb-0 [&>*]:mb-3"
        />
      </article>
      <div className="hidden text-sm xl:block">
        <div className="fixed top-[10rem] -mt-10 pt-4">
          <ScrollArea className="pb-10">
            <div className="sticky top-[10rem] -mt-10 h-[calc(100vh-3.5rem)] py-12 pl-4">
              <TableOfContents toc={post.toc} key={post.id} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
