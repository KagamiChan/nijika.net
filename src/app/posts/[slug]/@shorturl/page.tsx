import { ClipboardCopyIcon } from 'lucide-react'

import { allPosts } from 'contentlayer/generated'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ensurePostId } from '~/lib/redis'
import { SITE_URL } from '~/constants'

const ShortUrl = async ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  )
  if (!post) {
    return null
  }
  const id = await ensurePostId(post._raw.flattenedPath)

  if (!id) {
    return null
  }

  const url = new URL(id, SITE_URL).toString()

  return (
    <div className="prose prose-neutral flex max-w-[65ch] items-center gap-4 pr-4 dark:prose-invert">
      <span className="flex-1 rounded border p-2">
        本文短链接：<a href={url}>{url}</a>
      </span>

      <Button variant="ghost" size="icon" aria-label="复制">
        <ClipboardCopyIcon />
      </Button>
    </div>
  )
}

export default ShortUrl
