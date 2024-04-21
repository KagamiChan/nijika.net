import { type Post } from "contentlayer/generated";
import Link from "next/link";
import { LocalTime } from "~/components/local-time";

export const PostItem = (post: Post) => {
  return (
    <div role="group">
      <div className="prose prose-neutral mb-1 text-xl dark:prose-invert">
        <Link href={post.url}>{post.title}</Link>
      </div>
      <LocalTime date={post.date} />
    </div>
  );
};
