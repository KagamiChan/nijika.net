import { allPosts, type Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

import { Header } from "~/components/header";
import { LocalTime } from "~/components/local-time";

const PostItem = (post: Post) => {
  return (
    <div className="mb-8">
      <div className="prose prose-zinc dark:prose-invert mb-1 text-xl">
        <Link
          href={post.url}
        >
          {post.title}
        </Link>
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
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          {posts.map((post) => (
            <PostItem key={post._id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}
