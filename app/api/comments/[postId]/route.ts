import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, context: { params?: Promise<{ postId: string }> }) {
	try {
		const params = await context.params;
		const postId = params?.postId;
		if (!postId || typeof postId !== "string") {
			return NextResponse.json({ message: "User Id is not defined" }, { status: 400 });
		}
		const session = await auth();
		if (!session || !session?.user?.email) {
			return NextResponse.json({ message: "user is not logged In" }, { status: 400 });
		}
		const currentUser = await prisma.user?.findUnique({
			where: { email: session?.user?.email },
		})
		if (!currentUser) {
			return NextResponse.json({ message: "Invalid email" }, { status: 400 });
		}
		const { content } = await req.json();
		if (!content) {
			return NextResponse.json({ message: "content is not  defined" }, { status: 400 });
		}
		const comment = await prisma.comment.create({
			data: {
				content,
				userId: currentUser?.id, // the user who created teh post
				postId      // the  user where this comments belongs to
			}
		})

		return NextResponse.json(comment, { status: 200 })
	} catch (error) {
		console.log("Error in Fetcher User Posts", error)
		return NextResponse.json({ messages: (error as Error).message }, { status: 500 })
	}
}