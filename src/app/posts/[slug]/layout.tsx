import { type ReactNode } from 'react'

import { Comments } from '~/components/comments'

export default function Layout({
  article,
  shorturl,
}: {
  article: ReactNode
  shorturl: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="flex gap-16">{article}</div>
      {shorturl}
      <Comments />
    </>
  )
}
