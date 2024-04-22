import Link from "next/link"
import { Logo } from "./logo"
import { type FC } from "react"

interface SiteTitleProps {
  className?: string
}

export const SiteTitle: FC<SiteTitleProps> = ({ className }) => (
  <Link href="/" className={className}>
    <h1>
      <Logo />
      <span className="sr-only">アトリエにじか</span>
    </h1>
  </Link>
)
