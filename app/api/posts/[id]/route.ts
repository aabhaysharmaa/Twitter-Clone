import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = await params;
  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID")
  }
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: id
      },
      include: { user: true, comments: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(userPosts, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
