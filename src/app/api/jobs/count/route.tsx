import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(request: Request) {
  const count = await prisma.job.count();
  return NextResponse.json(count);
}
