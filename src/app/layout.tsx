"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryClientProvider, QueryClient } from "react-query";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient();

import { ThemeProvider } from "@/components/theme-provider"
import Image from 'next/image'
import { LoginButton } from '@/components/auth/login-button'
import { PopOver } from '@/components/costum/popover'
import apis from '@/utils/API';
 
export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>YouStream</title>
        </head>
        <body>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <header className="w-screen h-[70px] bg-[#18181B] flex justify-between items-center px-2">
                <div className="flex justify-center items-center">
                  <Image 
                    src="/icon.png"
                    width={40}
                    height={40} 
                    alt={'youstream icon'}
                  />
                  <Image 
                    src="/youstream.png"
                    width={200}
                    height={180} 
                    alt={'youstream image'}
                  />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  {!apis.auth.isAuthenticated() && <LoginButton />}
                  <PopOver />
                </div>
              </header>
              {children}
            </ThemeProvider>
          </QueryClientProvider> 
        </body>
      </html>
    </>
  )
}