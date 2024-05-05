'use server'
import MiniSearch, { type SearchResult } from 'minisearch'
import * as Sentry from '@sentry/nextjs'

import { type Post, posts } from 'velite/generated'

interface SearchResponse {
  result: (SearchResult | Post)[] | null
}

const flattenPosts = posts.map((post) => ({
  id: post.id,
  title: post.title,
  body: post.raw,
  url: post.url,
}))

const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })

const miniSearch = new MiniSearch({
  fields: ['title', 'body'],
  storeFields: ['title', 'url'],
  tokenize: (text) =>
    [...segmenter.segment(text)]
      .map(({ segment, isWordLike }) => isWordLike && segment)
      .filter(Boolean) as string[],
})
miniSearch.addAll(flattenPosts)

export const handleSearch = async (
  _: SearchResponse,
  formData: FormData,
): Promise<SearchResponse> => {
  return await Sentry.withServerActionInstrumentation(
    'search',
    {
      formData,
      recordResponse: true,
    },
    async () => {
      const query = formData.get('q') as string

      if (!query) {
        return { result: [] }
      }

      const matched = miniSearch.search(formData.get('q') as string, {
        fuzzy: 0.2,
      })

      const result = matched.map((item) => {
        const post = posts.find((p) => p.id === item.id)
        return {
          ...item,
          ...post,
        }
      })

      return { result }
    },
  )
}
