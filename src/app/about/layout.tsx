import { CommonLayout } from "~/components/common-layout";
import { SITE_NAME } from "~/constants";

export const metadata = {
  title: `${SITE_NAME}::关于`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayout>
      <article className="prose prose-zinc dark:prose-invert">
        <h1>关于</h1>
        {children}
      </article>
    </CommonLayout>
  );
}
