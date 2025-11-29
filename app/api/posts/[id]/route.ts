import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";

type IdParams = { id: string } | Promise<{ id: string }>;
export async function GET(req: Request, { params }: { params: IdParams }) {
  const { id } = await params;
  console.log("ID : ", id)
  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID")
  }
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: id
      },
      include: { user: true, comments: { include: { user: true }}},
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(userPosts, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 })
  }
}
