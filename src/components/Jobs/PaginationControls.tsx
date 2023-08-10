'use client'
import { memo } from 'react'
import { getTotalRowCount } from '@/lib/jobs/utils'
import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
interface PaginationControlsProps {
  pgnum: number
  setPageNumber: (pageNumber: number) => void
  per_page: number
}
const PaginationControls: FC<PaginationControlsProps> = (
  {
    pgnum,
    setPageNumber,
    per_page
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: totalCount, error: countError } = useSWR("/api/jobs/count", getTotalRowCount);


  const totalPages = totalCount !== undefined ? Math.ceil(totalCount / per_page) : 0;
  return (
    <div className='flex gap-2 self-center pt-5'>
      {/* <div>{totalCount}</div> */}

      <button onClick={() => setPageNumber(pgnum - 1)} disabled={pgnum === 0}
        className='bg-blue-500 text-white p-1'
      >
        Previous Page
      </button>
      <div>{pgnum + 1} / {totalPages}</div>
      <button onClick={() => setPageNumber(pgnum + 1)}
        className='bg-blue-500 text-white p-1'
        disabled={pgnum >= totalPages - 1}
      >Next Page</button>
    </div>
  )
}
export const MemoPaginationControls = memo(PaginationControls)
