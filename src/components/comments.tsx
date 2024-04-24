'use client'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export const Comments = () => {
  const { resolvedTheme } = useTheme()
  const theme =
    resolvedTheme === 'dark'
      ? 'https://nijika.net/api/giscus/theme-light.css'
      : 'https://nijika.net/api/giscus/theme-dark.css'
  return (
    <div className="max-w-[65ch] border-t pt-8">
      <Giscus
        id="comments"
        repo="kagamichan/nijika.net"
        repoId="R_kgDOLqF-4A"
        category="General"
        categoryId="DIC_kwDOLqF-4M4CemjE"
        mapping="pathname"
        term="欢迎参与讨论！"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme={theme}
        lang="zh-CN"
        loading="lazy"
        strict="1"
      />
    </div>
  )
}
