"use client";
import { Job } from "@prisma/client";
import { useRef, useState } from "react";
export const FormAi = ({ job }: { job: Job }) => {
  const [ai, setAi] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job }),
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      console.log(data)

    } catch (err) {
      console.log(err)
    }
  }
  return <div className="mt-5">
    <h3 className="font-bold">AI</h3>
    <form onSubmit={handleSubmit}>
      <textarea className="w-full h-32 text-gray-900" name="ai" id="ai" placeholder="AI" ref={ref} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
    </form>
  </div>
}
