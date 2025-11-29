import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

type IdParams = { id: string } | Promise<{ id: string }>;

export async function PATCH(request: NextRequest, context: { params: IdParams }) {
  try {
    const resolved = await context.params;
    const id = resolved?.id;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    const body = await request.json();
    const { name, username, coverImage, profileImage, bio } = body;

    const updatedPost = await prisma.user.update({
      where: {
        id
      },
      data: {
        name, username, coverImage, profileImage, bio
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



