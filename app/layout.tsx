import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Home from '../components/layout'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from '@/components/ui/toaster'
import { Navigation } from '@/components/Navigation'
import Wallpaper from '@/components/Wallpaper'

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
                  <Navigation/>
                  {children}
                  <Toaster />
                </Home>
              </UserProvider>
            </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
