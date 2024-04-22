"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h2>哎呀</h2>
      <p>……他突然袭击左刺拳来打我脸，啊，我大意了啊，没有闪，……</p>
    </div>
  )
}
