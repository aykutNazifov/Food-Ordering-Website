"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface IAuthProviderProps {
    children: React.ReactNode
}

export const queryClient = new QueryClient()

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default AuthProvider