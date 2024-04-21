import { notFound } from "next/navigation";

import { allPosts } from "contentlayer/generated";
import { Header } from "~/components/header";
import { LocalTime } from "~/components/local-time";

export default function Page({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => encodeURI(p._raw.flattenedPath) === params.slug);
  if (!post) {
    notFound();
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <article className="prose prose-zinc dark:prose-invert">
          <LocalTime date={post.date} />
          <h1>{post.title}</h1>
          <div
            className="[&>*:last-child]:mb-0 [&>*]:mb-3"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          ></div>
        </article>
      </main>
    </div>
  );
}
