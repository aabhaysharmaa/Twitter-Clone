import prisma from "@/libs/prismaDB";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

    const { userId } = await req.json();
    if (!userId || typeof userId !== "string") return NextResponse.json({ message: "Invalid UserId" }, { status: 400 });

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({ where: { email: session.user.email } }),
      prisma.user.findUnique({ where: { id: userId } })
    ]);

    if (!currentUser) return NextResponse.json({ message: "Current user not found" }, { status: 404 });
    if (!targetUser) return NextResponse.json({ message: "Target user not found" }, { status: 404 });

    const isFollowing = currentUser.followingIds.includes(userId);

    const updatedFollowingIds = isFollowing
      ? currentUser.followingIds.filter(id => id !== userId)
      : [...currentUser.followingIds, userId];

    const updatedFollowerIds = isFollowing
      ? targetUser.followerIds.filter(id => id !== currentUser.id)
      : [...targetUser.followerIds, currentUser.id];

    const [updatedCurrentUser, updatedTargetUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUser.id },
        data: { followingIds: updatedFollowingIds },
      }),
      prisma.user.update({
        where: { id: targetUser.id },
        data: { followerIds: updatedFollowerIds },
      }),
    ]);

    return NextResponse.json({ updatedCurrentUser, updatedTargetUser }, { status: 200 });
  } catch (error) {
    console.log("FOLLOW_ERROR:", (error as Error).message);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { userId } = await req.json();
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid UserId" }, { status: 400 });
    }

    // target user exists?
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "Target user not found" },
        { status: 404 }
      );
    }

    // current logged-in user
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "Current user not found" },
        { status: 404 }
      );
    }

    let updatedFollowingIds = [...currentUser.followingIds];

    // Remove id if exists (unfollow)
    updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.log("UNFOLLOW_DELETE_ERROR:", (error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}