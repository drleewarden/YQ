import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/app/components/Providers'

export const metadata: Metadata = {
  title: 'Restaurant Menu - QR Code Ordering',
  description: 'Order from your table using QR codes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
