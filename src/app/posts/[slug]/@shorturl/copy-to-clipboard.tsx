'use client'

import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useCallback, useTransition } from 'react'
import { useCopyToClipboard } from 'react-use'

import { Button } from '~/components/ui/button'

export const CopyToClipboard = ({ text }: { text: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard()

  const [isPeding, startTransition] = useTransition()

  const handleClick = useCallback(() => {
    startTransition(async () => {
      copy(text)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
  }, [copy, text])

  return (
    <Button
      variant="ghost"
      size="icon"
      title="复制到剪贴板"
      aria-label="复制到剪贴板"
      onClick={handleClick}
    >
      {isPeding ? <CheckIcon /> : <ClipboardCopyIcon />}
    </Button>
  )
}
