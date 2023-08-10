"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
export const SignUpButton = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      {session && session.user ? (
        <> {session.user.email}</>
      ) : (
        <Link
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          href='/sign-up'
        > Sign Up
        </Link>
      )}
    </>
  )
}
