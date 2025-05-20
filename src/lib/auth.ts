import { prisma } from "./prisma";
import type { User } from "../generated/prisma";
import { NextRequest } from "next/server";

// For demo: fetch the first user (replace with your real auth logic)
export async function getUserFromRequest(req: NextRequest): Promise<User | null> {
  // TODO: Replace with real session / token user lookup
  return await prisma.user.findFirst();
}
