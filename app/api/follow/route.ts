import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session || !session.user?.email) {
			return NextResponse.json({ message: "User is not Logged In" }, { status: 400 })
		}
		const { userId } = await req.json();
		if (!userId || typeof userId !== "string") {
			return NextResponse.json({ message: "User id in valid" }, { status: 400 });
		}

		const [currentUser, targetUser] = await Promise.all([
			prisma.user.findUnique({ where: { email: session?.user?.email } }),
			prisma.user.findUnique({ where: { id: userId } })
		]);

		if (!currentUser) return NextResponse.json({ message: "Current User Not found" }, { status: 400 })
		if (!targetUser) return NextResponse.json({ message: "Target User Not found" }, { status: 400 })

		const isFollowing = currentUser.followingIds.includes(targetUser.id);

		const updatedFollowingIds = isFollowing ?
			currentUser?.followingIds.filter((id) => id !== userId) :
			[...currentUser?.followingIds, userId]

		const UpdatedFollowersIds = isFollowing ? targetUser.followerIds.filter(id => id !== currentUser?.id) :
			[...targetUser?.followerIds, currentUser?.id]

		const [updatedCurrentUser, updatedTargetUser] = await prisma.$transaction([
			prisma.user.update({
				where: { id: currentUser?.id },
				data: { followingIds: updatedFollowingIds }
			}),
			prisma.user.update({
				where: { id: targetUser?.id },
				data: { followerIds: UpdatedFollowersIds }
			})
		])

		return NextResponse.json({  updatedCurrentUser,  updatedTargetUser }, { status: 200 })
	} catch (error) {
		console.log("Error in follow route", (error as Error).message);
		return NextResponse.json({ message: (error as Error).message }, { status: 500 });

	}
}
