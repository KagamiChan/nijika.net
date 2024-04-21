import { Header } from "~/components/header";
import { SITE_NAME } from "~/constants";

export const metadata = {
  title: `${SITE_NAME}::关于`,
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
    <Header />
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <article className="prose prose-zinc dark:prose-invert">
        <h1>关于</h1>
      {children}
      </article>
    </main>
  </div>
  );
}
