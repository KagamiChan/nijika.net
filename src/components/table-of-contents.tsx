'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

import { cn } from '~/lib/utils'
import { useMounted } from '~/hooks/use-mounted'
import { type Post } from 'velite/generated'

interface TocProps {
  toc: Post['toc']
}

export function TableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo<string[]>(
    () =>
      toc
        ?.flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
        .flat()
        .filter(Boolean)
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        .map((id) => id?.split('#')[1]!) ?? [],

    [toc],
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc.length || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">目录</p>
      <Tree items={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  items: TocProps['toc']
  level?: number
  activeItem?: string
}

function Tree({ items, level = 1, activeItem }: TreeProps) {
  return items?.length && level < 3 ? (
    <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {items.map((item, index) => {
        return (
          <li key={index} className="mt-0 pt-2">
            <a
              href={item.url}
              className={cn(
                'relative inline-block no-underline transition-colors hover:text-foreground',
                item.url === `#${activeItem}`
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {item.title}

              {item.url === `#${activeItem}` && (
                <motion.div
                  layoutId="toc-highlight"
                  className="absolute bottom-0 left-[-0.5rem] top-0 h-full w-0.5 bg-primary"
                />
              )}
            </a>
            {item.items?.length ? (
              <Tree
                items={item.items}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
