"use client";
import { useState, useCallback } from 'react';
import useSWR from 'swr'
import { getJobs } from '@/lib/jobs/utils'
import { MemoPaginationControls } from './PaginationControls';
import Link from 'next/link';

const Jobs = () => {
  const [pgnum, setPgnum] = useState(0);
  const [pgsize, setPgsize] = useState(10);

  // Construct the URL with dynamic pgnum and pgsize values
  const url = `/api/jobs/pagination?pgnum=${pgnum}&pgsize=${pgsize}`;

  const { data, error } = useSWR(url, getJobs, {
    revalidateOnFocus: false, // Optional: Prevent automatic re-fetching on tab change
  });
  const setPageNumber = useCallback((pageNumber: number) => {
    setPgnum(pageNumber)
  }, [])

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <MemoPaginationControls pgnum={pgnum} setPageNumber={setPageNumber} per_page={pgsize} />
      <div className="flex flex-wrap justify-center">
        {
          data && data.map((job, index) => {
            if (job.tags) {
              try {
                job.tags = JSON.parse(job.tags);
              } catch (error) {
                console.error("Error parsing JSON:", error);
                job.tags = null;
              }
            }
            return (
              <div key={index} className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg px-6 py-8">
                <h5 className="text-lg font-bold">{job.title}</h5>
                <p className="text-gray-500">{job.location}</p>
                <ul className="text-gray-500">
                  {job.tags !== null && Array.isArray(job.tags) && job.tags.map((tag, index) => {
                    return (
                      <li key={index} className='bg-blue-600 text-white my-2'>{tag}</li>
                    )
                  })}
                </ul>
                <p className="text-gray-500">{job.company}</p>

                <Link href={job?.link || ""} className="bg-blue-600 text-white rounded-md py-2 px-2">Web Link</Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
export default Jobs
