import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { SiteHeader } from '@/components/news/site-header'
import { SiteFooter } from '@/components/news/site-footer'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, isIndexingEnabled } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Berita Terkini Indonesia Hari Ini`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['berita indonesia', 'berita terkini', 'nasional', 'daerah', 'politik', 'ekonomi', 'olahraga'],
  robots: isIndexingEnabled
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Berita Terkini Indonesia Hari Ini`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: Kabar Terpercaya, Dekat dengan Kita`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Berita Terkini Indonesia Hari Ini`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f2347',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${sourceSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Langsung ke konten utama
        </a>
        <BreakingTicker />
        <SiteHeader />
        <main id="konten-utama">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
