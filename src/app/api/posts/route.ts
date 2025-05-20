import { defineAbilityFor } from "@/lib/abilities";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { accessibleBy } from "@casl/prisma";

//GET
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest();
  if (!user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ability = defineAbilityFor(user);

  // Use CASL to build Prisma query for "read" on "Post"
  const posts = await prisma.post.findMany({
    where: accessibleBy(ability).Post,
  });

  return NextResponse.json(posts);
}

//POST
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest();

  if (!user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ability = defineAbilityFor(user);
  if (ability.cannot("create", "Post")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, content } = body;

  //simple validation
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  //create post linked to the current user
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}

