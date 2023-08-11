"use client";
import { useState, useCallback } from 'react';
import useSWR from 'swr'
import { getJobs } from '@/lib/jobs/utils'
import { MemoPaginationControls } from './PaginationControls';
import { Job } from './Job';
const Jobs = () => {
  const [pgnum, setPgnum] = useState(0);
  const [pgsize, setPgsize] = useState(10);

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
      <div className="mx-auto p-6">
        <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          {
            data && data.map((job, index) => {
              return <Job key={index} job={job} />
            })
          }
        </table>
      </div>
    </>
  )
}
export default Jobs
