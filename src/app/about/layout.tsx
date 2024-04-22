import { type Metadata } from "next"
import { SITE_TITLE, SITE_URL } from "~/constants"

export const metadata = {
  title: `${SITE_TITLE}::关于`,
  openGraph: {
    url: `${SITE_URL}/about`,
  },
} satisfies Metadata

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <h1>关于</h1>
      {children}
    </article>
  )
}
