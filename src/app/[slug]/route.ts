import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

import { getUrlById } from '~/lib/redis'

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
  const url = await getUrlById(slug)

  if (!url) {
    redirect('/')
  }

  redirect(`/posts/${encodeURI(url)}`)
}
