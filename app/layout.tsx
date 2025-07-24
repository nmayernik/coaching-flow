import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import AccessibilityProvider from '@/components/AccessibilityProvider'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coaching prototype',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
