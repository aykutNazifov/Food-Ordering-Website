"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UserLinks = () => {
    const { status } = useSession()

    return (
        <div>
            {status !== "authenticated" ? (
                <Link href="/login">Login</Link>
            ) : (
                <div className='flex gap-2'>
                    <Link href="/orders">Orders</Link>
                    <span className='whitespace-nowrap cursor-pointer' onClick={() => signOut()}>Log out</span>
                </div>
            )}
        </div>
    )
}

export default UserLinks