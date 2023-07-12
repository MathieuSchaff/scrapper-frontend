import Link from 'next/link'
import React from 'react'
import { buttonVariants } from "@/components/ui/button"
import clsx from 'clsx'
import { SignInButton } from '@/components/SignInButton'
const Navbar = async () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2">
        <Link href='/' className="text-white">
          Home Page
        </Link>
        <SignInButton />
      </div>
    </nav >
  )
}

export default Navbar
