'use client'
import { getTotalRowCount } from '@/lib/jobs/utils'
import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
interface PaginationControlsProps {
  pgnum: number
  setPageNumber: (pageNumber: number) => void
}
const PaginationControls: FC<PaginationControlsProps> = (
  {
    pgnum,
    setPageNumber,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '10'
  const { data: totalCount, error: countError } = useSWR("/api/jobs/count", getTotalRowCount);


  const total = 32;
  // const totalPages = Math.ceil(total / per_page);
  return (
    <div className='flex gap-2'>
      {/* <button */}
      {/*   className='bg-blue-500 text-white p-1' */}
      {/*   disabled={!hasPrevPage} */}
      {/*   onClick={() => { */}
      {/*     router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`) */}
      {/*   }}> */}
      {/*   prev page */}
      {/* </button> */}
      <button onClick={() => setPgnum(pgnum - 1)} disabled={pgnum === 0}>
        Previous Page
      </button>
      <button onClick={() => setPgnum(pgnum + 1)}>Next Page</button>
      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>
      {}
      {/* <button */}
      {/*   className='bg-blue-500 text-white p-1' */}
      {/*   disabled={!hasNextPage} */}
      {/*   onClick={() => { */}
      {/*     router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`) */}
      {/*   }}> */}
      {/*   next page */}
      {/* </button> */}
    </div>
  )
}

export default PaginationControls
