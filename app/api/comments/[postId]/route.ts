import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type ParamsLike = { postId: string } | Promise<{ postId: string }>

export async function POST(req: NextRequest, context: { params: ParamsLike }) {
  try {
    // Resolve params (some Next.js typings provide params as a Promise)
    const resolvedParams = await context.params;
    const postId = resolvedParams?.postId;

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ message: "Invalid postId" }, { status: 400 });
    }

    // getServerSession typing can be strict; cast authOptions to any to satisfy types if needed
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
    }

    const email = session?.user?.email;
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: "User email missing" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email }
    });
    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const { content } = await req.json();
    // use `body` field if your Prisma model expects it (adjust if model uses different name)
    const comment = await prisma.comment.create({
      data: {
        body: content,
        userId: currentUser.id,
        postId
      }
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.log("Error in Comments Posts : ", (error as Error).message);
    return NextResponse.json({ message: (error as Error).message },{ status: 400 });
  }
}