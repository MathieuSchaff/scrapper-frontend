import Link from 'next/link'
import React from 'react'
import { SignInButton } from '@/components/Auth/SignInButton'
import { SignUpButton } from '@/components/Auth/SignUpButton'
const Navbar = async () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2">
        <Link href='/' className="text-white">
          Home Page
        </Link>
        <Link href='/UserJobs' className="text-white">
          User Jobs
        </Link>
        <div className="flex items-center gap-2">
          <SignUpButton />
          <SignInButton />
        </div>
      </div>
    </nav >
  )
}

export default Navbar
