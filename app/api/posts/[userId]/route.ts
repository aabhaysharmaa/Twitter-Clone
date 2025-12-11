import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest,context: { params?: Promise<{ userId?: string }> }) {
	try {
		const params = await context.params;
		const userId = params?.userId;
		if (!userId) {
			return NextResponse.json({ message: "User Id is not defined" });
		}
		const userPosts = await prisma.post.findMany({
			where: { userId },
			include: { user: true, comments: { include: { user: true } } },
			orderBy: { createdAt: "desc" }
		})
		if (!userId) {
			return NextResponse.json([], { status: 200 });
		}

		if (!userPosts || userPosts.length === 0) {
			return NextResponse.json([], { status: 200 });
		}
		return NextResponse.json(userPosts, { status: 200 })

	} catch (error) {
		console.log("Error in Fetcher User Posts", error)
		return NextResponse.json({ messages: (error as Error).message }, { status: 500 })
	}
}