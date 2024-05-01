import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

import { allPosts } from 'contentlayer/generated'

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  let slug = ''
  try {
    slug = decodeURI(params.slug)
  } catch {
    return redirect('/')
  }
  const post = allPosts.find((p) => p.id === slug)

  if (!post) {
    redirect('/')
  }

  redirect(`/posts/${encodeURI(post.id)}`)
}
