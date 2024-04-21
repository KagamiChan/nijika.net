import { notFound } from "next/navigation";

import { allPosts } from "contentlayer/generated";
import { Header } from "~/components/header";
import { LocalTime } from "~/components/local-time";
import { getTableOfContents } from "~/lib/toc";
import { ScrollArea } from "~/components/ui/scroll-area";
import { DashboardTableOfContents } from "~/components/table-of-contents";
import { SITE_NAME } from "~/constants";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((p) => encodeURI(p._raw.flattenedPath) === params.slug);

  if (post) {
    return {
      title: `${SITE_NAME}::${post.title}`,
    };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => encodeURI(p._raw.flattenedPath) === params.slug);
  if (!post) {
    notFound();
  }
  const toc = await getTableOfContents(post.body.raw)
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 gap-8 p-4 md:gap-16 md:p-8">
        <article className="prose prose-zinc dark:prose-invert">
          <LocalTime date={post.date} />
          <h1>{post.title}</h1>
          <div
            className="[&>*:last-child]:mb-0 [&>*]:mb-3"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          ></div>
        </article>
        <div className="hidden text-sm xl:block">
          <div className="fixed top-[10rem] -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-[10rem] -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
