import { defineAbilityFor } from "@/lib/abilities";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

//update
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getUserFromRequest();
  if (!user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const ability = defineAbilityFor(user);
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Add the subject type before checking abilities
  const postWithSubjectType = {
    ...post,
    __caslSubjectType__: "Post" as const,
  };

  if (ability.cannot("update", postWithSubjectType)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, content } = body;

  //update post
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });
  return NextResponse.json(updatedPost);
}

//DELETE
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getUserFromRequest();
  if (!user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const ability = defineAbilityFor(user);
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Add the subject type before checking abilities
  const postWithSubjectType = {
    ...post,
    __caslSubjectType__: "Post" as const,
  };

  if (ability.cannot("delete", postWithSubjectType)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  //delete post
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Post deleted" });
}

//retrive single post
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getUserFromRequest();
  const { id } = await params;
  if (!user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ability = defineAbilityFor(user);
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const postWithSubjectType = {
    ...post,
    __caslSubjectType__: "Post" as const,
  };

  if (ability.cannot("read", postWithSubjectType)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(post);
}
