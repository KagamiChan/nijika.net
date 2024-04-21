import "~/styles/globals.css";

import "@fontsource-variable/noto-sans-sc";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata = {
  title: "Atelier Nijika",
  description: "A blog about web development and other things",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
