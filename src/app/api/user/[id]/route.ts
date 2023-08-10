import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const accessToken = request.headers.get("authorization");

  console.log("accessToken from user/:id route is :", accessToken)
  if (!accessToken || !verifyJwt(accessToken)) {
    console.log("error from user/:id route is :", accessToken)
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const veryfiedToken = verifyJwt(accessToken)
  console.log("i passed the token check from user/:id route is :", accessToken)

  console.log("verifyJwt accesstoken negative in get jobs route is :", !veryfiedToken)
  console.log("verifyJwt accesstoken is null in get jobs route is :", veryfiedToken === null)
  console.log("typeof verifyJwt accessToken in get jobs route is :", typeof veryfiedToken)

  // verifyJwt accesstoken negative in get jobs route is : false
  // verifyJwt accesstoken is null in get jobs route is : false
  // const userPosts = await prisma.job.findMany({
  //   where: {
  //     authorId: Number(params.id),
  //   },
  //   include: {
  //     author: {
  //       select: { name: true },
  //     },
  //   },
  // });
  // return new Response(JSON.stringify(userPosts), {
  //   headers: { "Content-Type": "application/json" },
  // });
}
