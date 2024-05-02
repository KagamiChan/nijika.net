'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps } from 'react'
import { motion } from 'framer-motion'

import { cn } from '~/lib/utils'

type NavItemProps = ComponentProps<typeof Link>

export const NavItem = (props: NavItemProps) => {
  const pathname = usePathname()

  const isSelected = pathname === props.href

  return (
    <li className="relative">
      <Link
        {...props}
        className={cn(
          {
            'text-foreground': isSelected,
            'text-muted-foreground': !isSelected,
          },
          'flex h-12 items-center whitespace-nowrap px-4 transition-colors hover:text-foreground md:h-16',
          props.className,
        )}
      >
        {props.children}
      </Link>
      {isSelected && (
        <motion.div
          className="absolute left-[-1px] right-0 top-0 h-full w-0.5 bg-primary md:bottom-0 md:bottom-[-1px] md:left-0 md:top-auto md:h-0.5 md:w-full"
          layoutId="header-underline"
        />
      )}
    </li>
  )
}
