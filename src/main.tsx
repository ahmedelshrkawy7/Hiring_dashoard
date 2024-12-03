import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import '@/index.css'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './context/LoadingContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import './i18n/i18n' 

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <LoadingProvider>
            <RouterProvider router={router} />
          </LoadingProvider>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  </React.StrictMode>
)
