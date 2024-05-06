import { compareDesc } from 'date-fns'

import { PostItem } from '../components/post-item'

import { posts } from 'velite/generated'

export default function AppHome() {
  const sorted = posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <div className="flex flex-col gap-4">
      {sorted.map(
        (post) =>
          (!post.internal || process.env.NODE_ENV === 'development') && (
            <PostItem key={post.slug} {...post} />
          ),
      )}
    </div>
  )
}
