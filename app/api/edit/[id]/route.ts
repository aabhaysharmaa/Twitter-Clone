import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params
    const body = await request.json();
    const { name, username, coverImage, profileImage, bio } = body;

    const updatedPost = await prisma.user.update({
      where: {
        id: id,
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



