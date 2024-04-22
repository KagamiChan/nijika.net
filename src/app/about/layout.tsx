import { SITE_NAME } from "~/constants"

export const metadata = {
  title: `${SITE_NAME}::关于`,
}

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
