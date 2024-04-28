import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { pluginFramesTexts } from '@expressive-code/plugin-frames'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import rehypeExpressiveCode, {
  type ExpressiveCodeTheme,
} from 'rehype-expressive-code'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

pluginFramesTexts.addLocale('zh', {
  terminalWindowFallbackTitle: '终端窗口',
  copyButtonTooltip: '复制代码',
  copyButtonCopied: '复制成功🎉',
})

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    internal: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => encodeURIComponent(doc.title),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${encodeURIComponent(doc.title)}`,
    },
  },
}))

export const StandalonePage = defineDocumentType(() => ({
  name: 'StandalonePage',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    internal: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => encodeURIComponent(doc.title),
    },
  },
}))

export default makeSource({
  contentDirPath: 'contents',
  documentTypes: [Post, StandalonePage],
  mdx: {
    remarkPlugins: [remarkGfm],
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
