import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { NavItem } from './nav-item'
import { SearchLink } from './search-link'
import { SideNav } from './side-nav'
import { ThemeChooser } from './theme-chooser'

import { SiteTitle } from '~/components/site-title'
import { Button } from '~/components/ui/button'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <SiteTitle className="flex items-center gap-2 text-4xl font-semibold" />
        <ul className="flex gap-4">
          <NavItem href="/">首页</NavItem>
          <NavItem href="/about">关于</NavItem>
        </ul>
      </nav>
      <SideNav />
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchLink />
        <ThemeChooser />
        <Button
          variant="ghost"
          size="icon"
          title="源代码"
          aria-label="源代码"
          asChild
        >
          <Link href="https://github.com/kagamichan/nijika.net" target="_blank">
            <SiGithub />
          </Link>
        </Button>
      </div>
    </header>
  )
}
