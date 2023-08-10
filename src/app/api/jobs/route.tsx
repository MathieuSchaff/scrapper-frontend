import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
export async function GET(request: Request) {
  console.log('GET /api/jobs: ', request.url);
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}
