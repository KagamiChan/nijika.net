'use client'

import { Menu } from 'lucide-react'

import { NavItem } from './nav-item'

import { SiteTitle } from '~/components/site-title'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '~/components/ui/sheet'

export const SideNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开导航菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <SiteTitle className="flex items-center gap-2 text-2xl font-semibold" />
          <ul>
            <SheetClose asChild>
              <NavItem href="/">首页</NavItem>
            </SheetClose>
            <SheetClose asChild>
              <NavItem href="/about">关于</NavItem>
            </SheetClose>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
