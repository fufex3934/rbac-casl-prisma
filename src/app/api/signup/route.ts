
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
 
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return NextResponse.json({ message: "User created", userId: user.id });
}
