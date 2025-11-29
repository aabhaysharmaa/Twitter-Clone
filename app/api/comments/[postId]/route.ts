import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ message: "User is not authenticated" }, { status: 400 });
		}
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
			}
		});
		if (!currentUser) {
			return NextResponse.json({ message: "User is not authenticated" }, { status: 400 });
		}
		const { content } = await req.json();
		const { postId } = await params;

		if (!postId || typeof postId !== "string") {
			throw new Error("Invalid ID")
		}
		const comment = await prisma?.comment.create({
			data: {
				content,
				userId: currentUser?.id,
				postId
			}
		});
		return NextResponse.json(comment, { status: 201 });
	} catch (error) {
		console.log("Error in Comments Posts : ", (error as Error).message);
		return NextResponse.json({ message: (error as Error).message },{ status: 400 });
	}
}