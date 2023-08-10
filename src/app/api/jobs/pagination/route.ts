import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pgnum = Number(searchParams.get('pgnum')) ?? 0;
  const pgsize = Number(searchParams.get('pgsize')) ?? 10;
  const jobs = await prisma.job.findMany({
    skip: pgnum * pgsize,
    take: pgsize,
  })
  return NextResponse.json(jobs)
}
