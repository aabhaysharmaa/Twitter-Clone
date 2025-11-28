import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		console.log("session : ", session);

		if (!session?.user?.email) {
			return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: "User not found in DB" }, { status: 404 });
		}

		const { content } = await req.json();

		if (!content || typeof content !== "string") {
			return NextResponse.json({ message: "Invalid post content" }, { status: 400 });
		}

		const post = await prisma.post.create({
			data: {
				content,
				userId: user.id,
			},
		});

		return NextResponse.json(post, { status: 201 }); // 201 for creation
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
			},
			orderBy: { createdAt: "desc" },
		});

		if (!posts || posts.length === 0) {
			return NextResponse.json({ message: "No posts found" }, { status: 404 });
		}

		return NextResponse.json(posts, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
