import { allPosts } from 'contentlayer/generated'
import { DashboardTableOfContents } from '~/components/table-of-contents'
import { ScrollArea } from '~/components/ui/scroll-area'
import { getTableOfContents } from '~/lib/toc'

const ToC = async ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (p) => encodeURI(p._raw.flattenedPath) === params.slug,
  )
  if (!post) {
    return null
  }
  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="hidden text-sm xl:block">
      <div className="fixed top-[10rem] -mt-10 pt-4">
        <ScrollArea className="pb-10">
          <div className="sticky top-[10rem] -mt-10 h-[calc(100vh-3.5rem)] py-12">
            <DashboardTableOfContents toc={toc} />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ToC
