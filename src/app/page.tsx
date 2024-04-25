import { compareDesc } from 'date-fns'

import { PostItem } from '../components/post-item'

import { allPosts } from 'contentlayer/generated'

export default function AppHome() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <div className="flex flex-col gap-4">
      {posts.map(
        (post) => !post.internal && <PostItem key={post._id} {...post} />,
      )}
    </div>
  )
}
