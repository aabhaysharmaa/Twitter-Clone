import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "User is Not Logged In" }, { status: 400 });
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ message: "Post Id is Missing or invalid" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      return NextResponse.json({ message: "Invalid Session token" }, { status: 400 });
    }

    const targetPost = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!targetPost) {
      return NextResponse.json({ message: "Invalid Post Id" }, { status: 400 });
    }

    const isLiked = targetPost.likeIds.includes(currentUser.id);

    const updatedLikeIds = isLiked
      ? targetPost.likeIds.filter(id => id !== currentUser.id)
      : [...targetPost.likeIds, currentUser.id];

    const updatedPost = await prisma.post.update({
      where: { id: targetPost.id },
      data: { likeIds: updatedLikeIds }
    });

    // Send notification only if user is liking (not unliking)
    // AND user is not the owner of the post
    // if (!isLiked && targetPost.userId !== currentUser.id) {
    if (!isLiked) {
      try {
        // 1. Create notification
        await prisma.notifications.create({
          data: {
            body: `${currentUser?.username} Liked Your Post! `,
            userId: targetPost.userId
          }
        });


        // 2. Update user notification flag
        await prisma.user.update({
          where: { id: targetPost.userId },
          data: { hasNotifications: true }
        });

      } catch (err) {
        console.log("Notification error:", (err as Error).message);
      }
    }

    // }

    return NextResponse.json(updatedPost, { status: 200 });

  } catch (error) {
    console.log("Error in Like route:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
