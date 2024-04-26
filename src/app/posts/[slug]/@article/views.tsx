'use client'

import { useEffect, useRef, useState } from 'react'

interface Views {
  views: number
  error: boolean
}

const update = async (path: string) =>
  fetch('/api/views', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  }).then((res) => res.json() as Promise<Views>)

export const Views = ({
  path,
  initialViews,
}: {
  path: string
  initialViews: number
}) => {
  const [views, setViews] = useState(initialViews)
  const didReportViews = useRef(false)

  useEffect(() => {
    if (!didReportViews.current) {
      void update(path).then(
        (result) => result.views > 0 && setViews(result.views),
      )

      didReportViews.current = true
    }
  }, [path])

  return <>阅读数：{views}</>
}
