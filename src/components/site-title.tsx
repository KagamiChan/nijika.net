import Link from 'next/link'
import { type FC } from 'react'

import { Logo } from './logo'

interface SiteTitleProps {
  className?: string
}

export const SiteTitle: FC<SiteTitleProps> = ({ className }) => (
  <Link href="/" className={className}>
    <h1>
      <Logo />
      <span className="sr-only">虹夏工房</span>
    </h1>
  </Link>
)
