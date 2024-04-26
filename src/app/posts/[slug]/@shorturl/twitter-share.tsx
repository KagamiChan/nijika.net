'use client'

import { SiX } from '@icons-pack/react-simple-icons'
import { useCallback } from 'react'

import { Button } from '~/components/ui/button'

export const TwitterShare = ({ url }: { url: string }) => {
  const handleShare = useCallback(() => {
    const shareUrl = new URL('https://twitter.com/intent/tweet')
    shareUrl.searchParams.set('url', url)

    window.open(shareUrl.toString(), 'twitter-share', 'width=800,height=600')
  }, [url])
  return (
    <Button
      variant="ghost"
      size="icon"
      title="分享到Twitter"
      aria-label="分享到Twitter"
      onClick={handleShare}
    >
      <SiX title="分享到Twitter" />
    </Button>
  )
}
