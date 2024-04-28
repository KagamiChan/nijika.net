import { type Metadata } from 'next'

import { allStandalonePages } from 'contentlayer/generated'
import { SITE_TITLE, SITE_URL } from '~/constants'
import { MdxContent } from '~/components/mdx-content'

export const generateMetadata = (): Metadata => {
  const page = allStandalonePages.find((p) => p.id === 'about')!
  return {
    title: `${SITE_TITLE}::${page.title}`,
    openGraph: {
      url: `${SITE_URL}/${page.id}`,
    },
  }
}

export default function AboutLayout() {
  const page = allStandalonePages.find((p) => p.id === 'about')!
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <h1 className="text-pretty">{page.title}</h1>
      <MdxContent
        code={page.body.code}
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
      />
    </article>
  )
}
