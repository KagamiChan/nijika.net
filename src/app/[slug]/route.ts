import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

import { getUrlById } from '~/lib/redis'

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const url = await getUrlById(decodeURI(params.slug))

  if (!url) {
    redirect('/')
  }

  redirect(`/posts/${encodeURI(url)}`)
}
