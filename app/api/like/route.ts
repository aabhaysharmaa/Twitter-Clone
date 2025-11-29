import prisma from "@/libs/prismaDB";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return NextResponse.json({ message: "user is not authenticated" }, { status: 401 });
		}
		const currentUser = await prisma?.user?.findUnique({
			where: {
				email: session?.user?.email
			}
		})
		if (!currentUser) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}
		const { postId } = await req.json();
		if (!postId || typeof postId !== "string") {
			return NextResponse.json({ message: "Invalid Id" }, { status: 400 })
		}
		const post = await prisma?.post?.findUnique({
			where: {
				id: postId
			}
		})
			try {
			// const post = await prisma?.post?.findUnique({
			// 	where: {
			// 		id: postId
			// 	}
			// })

			if (post?.userId) {
				await prisma.notifications.create({
					data: {
						body: "Some one Liked Your Tweet",
						userId: post.userId
					}
				})
				await prisma.user.update({
					where: {
						id: post.userId
					}, data: {
						hasNotifications: true
					}
				})
			}
		} catch (error) {
			console.log((error as Error).message);
		}
		if (!post) {
			return NextResponse.json({ message: "post not found" }, { status: 404 })
		}

		const existingLikes = post.likeIds ?? []; // fallback to empty array

		const newLikes = existingLikes.includes(currentUser.id)
			? existingLikes
			: [...existingLikes, currentUser.id];

		const updateUser = await prisma?.post?.update({
			where: {
				id: postId
			},
			data: {
				likeIds: { set: newLikes }
			}
		})


		return NextResponse.json(updateUser, { status: 200 })


	} catch (error) {
		console.log("Error in POST Like route", (error as Error).message)
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const { postId } = await req.json();
		if (!postId || typeof postId !== "string") {
			return NextResponse.json({ message: "Invalid Id" }, { status: 400 })
		}

		if (!session?.user?.email) {
			return NextResponse.json({ message: "user is not authenticated" }, { status: 401 });
		}
		const currentUser = await prisma?.user?.findUnique({
			where: {
				email: session?.user?.email
			}
		})
		if (!currentUser) {
			return NextResponse.json({ message: "user is not authenticated" }, { status: 401 });
		}

		const post = await prisma?.post?.findUnique({
			where: {
				id: postId
			}
		});

		if (!post) {
			return NextResponse.json({ message: "Invalid Post Id" }, { status: 401 });
		}

		const updateLikes = post?.likeIds.filter((id) => id !== currentUser?.id);
		const updatePost = await prisma?.post?.update({
			where: { id: postId },
			data: { likeIds: { set: updateLikes } }
		})

		return NextResponse.json(updatePost, { status: 200 })
	} catch (error) {
		console.log("Error in DELETE Like route", (error as Error).message);
	}
}

