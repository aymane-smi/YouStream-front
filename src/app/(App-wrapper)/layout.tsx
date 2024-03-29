"use client"
import { Inter } from 'next/font/google'
import { QueryClientProvider, QueryClient } from "react-query";
import './globals.css'
import { Navbar } from '@/components/shared/NavBar/Navbar';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient();

import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from '@/components/shared/SideBar/Sidebar';
export default function RootLayout({ children }: any) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="./icon.png"/>
          <title>YouStream</title>
        </head>
        <body className='hide-scroll'>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className='flex w-full'>
                <Sidebar />
                {children}
              </div>
            </ThemeProvider>
          </QueryClientProvider> 
        </body>
      </html>
  )
}