import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { CommonLayout } from "~/components/common-layout";
import { LocalTime } from "~/components/local-time";
import { DashboardTableOfContents } from "~/components/table-of-contents";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SITE_NAME } from "~/constants";
import { getTableOfContents } from "~/lib/toc";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  );

  if (post) {
    return {
      title: `${SITE_NAME}::${post.title}`,
    };
  }
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  );
  if (!post) {
    notFound();
  }
  const toc = await getTableOfContents(post.body.raw);
  return (
    <CommonLayout>
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
    </CommonLayout>
  );
}
