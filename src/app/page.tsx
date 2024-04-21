import { allPosts, type Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { CommonLayout } from "~/components/common-layout";

import { LocalTime } from "~/components/local-time";

const PostItem = (post: Post) => {
  return (
    <div role="group">
      <div className="prose prose-zinc mb-1 text-xl dark:prose-invert">
        <Link href={post.url}>{post.title}</Link>
      </div>
      <LocalTime date={post.date} />
    </div>
  );
};

export default function AppHome() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  return (
    <CommonLayout>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostItem key={post._id} {...post} />
        ))}
      </div>
    </CommonLayout>
  );
}
