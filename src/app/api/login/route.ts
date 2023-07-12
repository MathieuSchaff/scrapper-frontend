import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { signJwtAccessToken } from "@/lib/jwt";
interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  // console.log("login page route user", user);
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = await signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    console.log("Invalid email or password route login here")
    return new Response(
      null, {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
    );
  }
}
