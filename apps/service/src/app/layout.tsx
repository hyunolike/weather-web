import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './_providers/providers'

export const metadata: Metadata = {
  title: '날씨의 속삭임',
  description: '날씨 변화에 따른 감정과 상황을 익명으로 나누는 커뮤니티',
}

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
