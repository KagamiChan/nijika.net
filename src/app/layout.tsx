import '~/styles/globals.css'

import { Noto_Sans_SC, JetBrains_Mono } from 'next/font/google'
import { type Metadata } from 'next'
import HolyLoader from 'holy-loader'
import { Suspense } from 'react'

import { ThemeProvider } from '~/components/theme-provider'
import { SITE_TITLE, SITE_URL } from '~/constants'
import { CommonLayout } from '~/components/common-layout'
import { cn } from '~/lib/utils'
import { CodeCopyHack } from '~/components/code-copy-hack'

export const metadata = {
  title: SITE_TITLE,
  description: '一个关于互联网开发的技术博客，偶尔也会讨论一些宅话题',
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'かがみ' }],
  openGraph: {
    url: SITE_URL,
  },
} satisfies Metadata

const notoSansSC = Noto_Sans_SC({
  display: 'swap',
  preload: false,
  variable: '--font-noto-sans-sc',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html
      lang="zh"
      suppressHydrationWarning
      className={cn(
        'scroll-pt-16 font-sans antialiased',
        notoSansSC.variable,
        jetbrainsMono.variable,
      )}
    >
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
          <HolyLoader color="hsl(var(--primary))" />
          <Suspense fallback={null}>
            <CodeCopyHack />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
