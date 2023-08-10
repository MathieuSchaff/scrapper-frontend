import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id // 'a', 'b', or 'c'
  const job = await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(job);
}
