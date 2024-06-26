'use client'

import { type SearchResult } from 'minisearch'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { Suspense } from 'react'

import { handleSearch } from './actions'

import { type Post } from 'velite/generated'
import { PostItem } from '~/components/post-item'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

const SearchButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      搜索
    </Button>
  )
}

const SearchInput = () => {
  const searchParams = useSearchParams()
  return (
    <Input
      name="q"
      placeholder="关键词"
      defaultValue={searchParams.get('q') ?? ''}
    />
  )
}

export const Search = () => {
  const [formState, action] = useFormState(handleSearch, { result: null })

  return (
    <div className="flex flex-col gap-8">
      <form action={action}>
        <div className="flex gap-4">
          <Suspense>
            <SearchInput />
          </Suspense>
          <SearchButton />
        </div>
      </form>
      {(formState.result?.length ?? 0) > 0 && (
        <Card>
          <CardHeader>搜索结果</CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {formState.result!.map((item: SearchResult | Post) => (
                <div key={item.id as string}>
                  <div className="text-sm">
                    有 {Object.keys((item as SearchResult).match).length}{' '}
                    个模糊匹配结果
                  </div>
                  <PostItem {...(item as Post)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {formState.result !== null && !(formState.result?.length ?? 0) && (
        <p>未找到任何结果</p>
      )}
    </div>
  )
}
