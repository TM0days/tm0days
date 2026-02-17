import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { Navbar } from '@/components/navbar'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
})
/*const _spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})
const _geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
}) */

export const metadata: Metadata = {
  title: 'TM0days | Security Researcher',
  description: 'Cybersecurity researcher, exploit developer, and security analyst. Exploring the boundaries of digital security.',
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
  themeColor: '#0a1a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
