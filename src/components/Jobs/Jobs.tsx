"use client";
import { useState, useCallback } from 'react';
import useSWR from 'swr'
import { getJobs } from '@/lib/jobs/utils'
import PaginationControls from './PaginationControls';

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
    <div>
      {
        data && data.map((job, index) => (
          <div key={index} className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg px-6 py-8">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-gray-500">{job.link}</p>
          </div>
        ))
      }
      <PaginationControls pgnum={pgnum} setPageNumber={setPageNumber} />
    </div>
  )
}
export default Jobs
