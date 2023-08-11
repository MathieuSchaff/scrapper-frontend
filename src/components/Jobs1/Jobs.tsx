import Link from 'next/link';
import { Job as IJob } from '@prisma/client'
import { FC, useState } from 'react';
export const Job = ({ job }: { job: IJob }) => {
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  const handleRowClick = (job: IJob) => {
    setSelectedJob(job);
  };
  console.log("selectedJob :", selectedJob)
  return (
    <tbody>
      <tr
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => handleRowClick(job)}
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
            Link
          </Link>
        </td>
        <td className="px-4 py-3">
          Details
          {/* {selectedJob !== null ? <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} /> : null} */}
        </td>
      </tr>
    </tbody>
  );
};

export default Job;
