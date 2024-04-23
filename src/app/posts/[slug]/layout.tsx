import { type ReactNode } from 'react'

import { Comments } from '~/components/comments'

export default function Layout({
  article,
  toc,
  children,
}: {
  article: ReactNode
  toc: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="flex gap-16">
        {article}
        {toc}
        {children}
      </div>
      <Comments />
    </>
  )
}
