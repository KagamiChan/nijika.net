import fs from 'node:fs/promises'
import path from 'node:path'

import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExpressiveCode, {
  type ExpressiveCodeTheme,
} from 'rehype-expressive-code'
import rehypeSlug from 'rehype-slug'
import { defineConfig, s } from 'velite'
import { pluginFramesTexts } from '@expressive-code/plugin-frames'
import pMap from 'p-map'
import pRetry from 'p-retry'
import matter from 'gray-matter'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5)

pluginFramesTexts.addLocale('zh', {
  terminalWindowFallbackTitle: '终端窗口',
  copyButtonTooltip: '复制代码',
  copyButtonCopied: '复制成功🎉',
})

export default defineConfig({
  root: 'contents',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string(),
          date: s.isodate(),
          id: s.optional(s.unique()),
          internal: s.optional(s.boolean()),
          code: s.mdx(),
          raw: s.raw(),
          toc: s.toc(),
          path: s.path(),
        })
        .transform(async (data) => {
          return {
            ...data,
            slug: encodeURIComponent(data.title),
            url: `/posts/${encodeURIComponent(data.title)}`,
          }
        }),
    },
    standalonePages: {
      name: 'StandalonePage',
      pattern: 'pages/**/*.mdx',
      schema: s.object({
        title: s.string(),
        id: s.unique(),
        code: s.mdx(),
        raw: s.raw(),
        toc: s.toc(),
      }),
    },
  },
  mdx: {
    gfm: true,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: '到本部分内容的链接',
          },
        },
      ],
      [
        rehypeExpressiveCode,
        {
          customizeTheme: (theme: ExpressiveCodeTheme) => {
            theme.name = theme.type
            return theme
          },
          themeCssSelector: (theme: ExpressiveCodeTheme) => `.${theme.name}`,
          useDarkModeMediaQuery: false,
          defaultLocale: 'zh-CN',
          plugins: [pluginLineNumbers()],
          themes: ['dark-plus', 'light-plus'],
          defaultProps: {
            wrap: true,
          },
          // FIXME: this config file could not load tailwind default them so the list could not be computed on the fly
          styleOverrides: {
            codeFontFamily:
              'var(--font-jetbrains-mono), var(--font-noto-sans-sc), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            uiFontFamily:
              'var(--font-noto-sans-sc), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          },
        },
      ],
    ],
  },
  prepare: async (data) => {
    const knownIds = data.posts.map((post) => post.id).filter(Boolean)
    const pendingAssignments = data.posts.filter((post) => !post.id)

    await pMap(pendingAssignments, async (post) => {
      const id = await pRetry(() => {
        const id = nanoid()
        if (knownIds.includes(id)) {
          throw new Error('ID collision')
        }
        return id
      })
      const file = path.resolve(process.cwd(), 'contents', `${post.path}.mdx`)
      const content = await fs.readFile(file, 'utf-8')
      const result = matter(content)
      const newContent = matter.stringify(result.content, {
        ...result.data,
        id,
      })
      await fs.writeFile(file, newContent)
      console.log(`Assigned ID ${id} to ${post.title}`)
    })
  },
})
