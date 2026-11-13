import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zerna — спешелти-кофейня',
  description: 'Спешелти-кофейня Zerna. С собой, бабл-ти, с собаками.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a0a05',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={cn("bg-[#1a0a05] font-sans scroll-smooth scroll-pt-28 sm:scroll-pt-20 motion-reduce:scroll-auto", geist.variable)}>
      <body className={`${inter.className} bg-[#1a0a05] text-white antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
