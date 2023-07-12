import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  console.log("in user route", request);
  try {
    const body: RequestBody = await request.json();
    // Validate email and password
    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 500 })
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: body?.email },
    }
    );
    if (existingUser) {
      return NextResponse.json({ error: 'Email already taken!' }, { status: 409 })
    }
    const user = await prisma.user.create({
      data: {
        email: body?.email,
        password: await bcrypt.hash(body?.password, 10),
      },
    });
    const { password, ...result } = user;
    return NextResponse.json(result);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
