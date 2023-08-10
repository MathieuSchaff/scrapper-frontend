"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
export const SignInButton = () => {
  const { data: session } = useSession()
  console.log(session?.user.accessToken)
  return (
    <div className=''>
      {session && session.user ? (
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              console.log('sign out')
              signOut({
                callbackUrl: 'http://localhost:3000'
              })
            }}
          >
            Sign Out
          </button>
        </div>

      ) : (
        <Button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            console.log('sign in')
            signIn()
          }} >Sign In
        </Button>
      )}

    </div>
  )
}
