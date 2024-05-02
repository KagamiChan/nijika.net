import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { allPosts, allStandalonePages } from 'contentlayer/generated'
import { MdxContent } from '~/components/mdx-content'
import { SITE_TITLE, SITE_URL } from '~/constants'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> => {
  let slug = ''
  try {
    slug = decodeURI(params.slug)
  } catch {
    return redirect('/')
  }
  const page = allStandalonePages.find((p) => p.id === slug)!

  if (page) {
    return {
      title: `${SITE_TITLE}::${page.title}`,
      openGraph: {
        url: `${SITE_URL}/${page.id}`,
      },
    }
  }
  return null
}

const Page = async ({ params }: { params: { slug: string } }) => {
  let slug = ''
  try {
    slug = decodeURI(params.slug)
  } catch {
    return redirect('/')
  }

  const post = allPosts.find((p) => p.id === slug)

  if (post) {
    redirect(`/posts/${post.slug}`)
  }

  const page = allStandalonePages.find((p) => p.id === slug)

  if (!page) {
    redirect('/')
  }

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

export default Page
