import "~/styles/globals.css"

import { ThemeProvider } from "~/components/theme-provider"
import { SITE_NAME, SITE_URL } from "~/constants"
import { Noto_Sans_SC } from "next/font/google"
import { type Metadata } from "next"
import { CommonLayout } from "~/components/common-layout"

export const metadata = {
  title: SITE_NAME,
  description:
    "A blog dedicated to web development and various otaku interests",
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "かがみ" }],
} satisfies Metadata

const notoSansSC = Noto_Sans_SC({
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
})

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning className={notoSansSC.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CommonLayout>
            {children}
            {modal}
          </CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
