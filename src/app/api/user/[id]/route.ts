import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const accessToken = request.headers.get("authorization");
  console.log("accessToken from user/:id route is :", accessToken)
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const userPosts = await prisma.jobs.findMany({
    where: {
      authorId: Number(params.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return new Response(JSON.stringify(userPosts), {
    headers: { "Content-Type": "application/json" },
  });
}
