import { compareDesc, format, parseISO } from 'date-fns';
import { Menu, Search } from "lucide-react";
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from "next/link";

import { allPosts, type Post } from "contentlayer/generated";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import { SiteTitle } from "~/components/site-title";

function PostCard(post: Post) {
  const MdxContent = useMDXComponent(post.body.code)
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" ><MdxContent /></div>
    </div>
  )
}

export default function Dashboard() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <SiteTitle className="flex items-center gap-2 text-4xl font-semibold" />
          <Link
            href="#"
            className="whitespace-nowrap text-foreground transition-colors hover:text-foreground"
          >
            首页
          </Link>
          <Link
            href="#"
            className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            文章
          </Link>
          <Link
            href="#"
            className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            关于
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <SiteTitle className="flex items-center gap-2 text-2xl font-semibold" />
              <Link href="#" className="hover:text-foreground">
                首页
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                文章
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                关于
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search this site"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="xl:col-span-2">
          <CardContent>
          {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
