import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Home from '../components/layout'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import { ThemeProvider } from "@/components/theme-provider"

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Outline',
  description: 'Create and read millions of books, papers, fiction, etc.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <ToasterProvider />
            <SupabaseProvider>
              <UserProvider>
                <ModalProvider />
                <Home>
                  {children}
                </Home>
              </UserProvider>
            </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
