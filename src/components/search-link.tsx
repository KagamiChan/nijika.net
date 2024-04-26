'use client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '~/components/ui/button'

const searchPath = '/search'

export const SearchLink = () => {
  const pathname = usePathname()

  if (pathname === searchPath) {
    return null
  }

  return (
    <Button variant="ghost" size="icon" asChild title="搜索" aria-label="搜索">
      <Link href={searchPath} passHref>
        <Search className="h-5 w-5" />
        <span className="sr-only">搜索</span>
      </Link>
    </Button>
  )
}
