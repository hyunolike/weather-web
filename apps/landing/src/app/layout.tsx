import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './_providers/providers'
import RootLayoutComponent from './_components/RootLayoutComponent'
import { MSWComponent } from '@/app/_components/MSWComponent'

export const metadata: Metadata = {
  title: '날씨의 속삭임',
  description: '-',
}

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <RootLayoutComponent>
          <Providers>
            <MSWComponent />
            {children}
          </Providers>
        </RootLayoutComponent>
      </body>
    </html>
  )
}
