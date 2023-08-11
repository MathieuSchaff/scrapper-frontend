"use client"
import Link from 'next/link';
import { Job as IJob } from '@prisma/client'
import { FC, useState } from 'react';
export const Job = ({ job }: { job: IJob }) => {
  return (
    <tbody>
      <tr
        className="cursor-pointer hover:bg-gray-50"
      >
        <td className="px-4 py-3">{job.title}</td>
        <td className="px-4 py-3">{job.company}</td>
        <td className="px-4 py-3">{job.location}</td>
        <td className="px-4 py-3">{job.tags}</td>
        <td className="px-4 py-3">
          <Link
            href={job.link || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Website
          </Link>
        </td>
        <td className="px-4 py-3">
          <Link href={`/job/${job.id}`} className='text-blue-500 font-bold'>
            Details
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default Job;
