"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
export default function PageJobs() {

  const { data: session } = useSession()
  const fetchJobs = async () => {
    const id = session?.user?.id
    const accessToken = session?.user?.accessToken
    // This will fetch the api/user/id endpoint from your Next.js server
    // and return the data from the response
    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      headers: {
        // Authorization: `Bearer ${accessToken}`
        Authorization: `toto`
      }
    })
    // const data = await res.json()
    // console.log(data)
  }
  return (
    <div>PageJobs this is a protected route
      <p>session: </p>
      <p>protected route</p>
      {JSON.stringify(session)}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          console.log('fetch jobs')
          fetchJobs()
        }
        }
      >
        fetch jobs
      </button>
    </div>
  )
}
