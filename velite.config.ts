import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExpressiveCode, {
  type ExpressiveCodeTheme,
} from 'rehype-expressive-code'
import rehypeSlug from 'rehype-slug'
import { defineConfig, s } from 'velite'
import { pluginFramesTexts } from '@expressive-code/plugin-frames'

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
          id: s.unique(),
          internal: s.optional(s.boolean()),
          code: s.mdx(),
          raw: s.raw(),
        })
        .transform((data) => ({
          ...data,
          slug: encodeURIComponent(data.title),
          url: `/posts/${encodeURIComponent(data.title)}`,
        })),
    },
    standalonePages: {
      name: 'StandalonePage',
      pattern: 'pages/**/*.mdx',
      schema: s.object({
        title: s.string(),
        id: s.unique(),
        code: s.mdx(),
        raw: s.raw(),
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
})
