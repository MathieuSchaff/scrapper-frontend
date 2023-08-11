import { FormAi } from "@/components/FormAi/FormAi"
import prisma from "@/lib/prisma"
async function getJob(id: string) {
  const res = await fetch(`http://localhost:3000/api/job/${id}`)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}
export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  return (
    <div className="pt-5 px-5 bg-gray-800 min-h-screen text-white">
      <h2>Job Page</h2>
      <div className="">
        <h3 className="font-bold">{job?.title}</h3>
        <p className="">{job?.details}</p>
      </div>
      <FormAi job={job} />
    </div >
  )
}
