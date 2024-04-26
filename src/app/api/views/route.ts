import { type NextRequest } from 'next/server'

import { increaseCount } from '~/lib/redis'
import { getViewsKeyByPostPath } from '~/lib/utils'

export const increaseViews = async (path?: string) => {
  if (!path) {
    return -1
  }
  const key = await getViewsKeyByPostPath(path)

  return increaseCount(key)
}

export const POST = async (req: NextRequest) => {
  const { path = '' } = ((await req.json()) as { path: string }) ?? {}

  const views = await increaseViews(path)

  return Response.json({ views, error: views === -1 })
}
