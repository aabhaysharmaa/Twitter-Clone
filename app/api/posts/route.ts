import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session?.user?.email) {
			return NextResponse.json({ message: "User is not Logged In" }, { status: 400 })
		}
		const { content } = await req.json();
		if (!content || typeof content !== "string") {
			return NextResponse.json({ message: 'Invalid Post Content' });
		}
		const user = await prisma.user.findUnique({
			where: { email: session?.user?.email }
		})
		if (!user) {
			return NextResponse.json({ message: "Invalid email or suer dosen't exists" }, { status: 400 })
		}
		const createPost = await prisma.post?.create({
			data: {
				content,
				userId: user?.id
			}
		})
		return NextResponse.json(createPost, { status: 200 })

	} catch (error) {
		console.log("Error in GET User By Id : ", (error as Error).message);
		return NextResponse.json(error, { status: 500 })
	}

}
export async function GET() {
	try {
		const allPosts = await prisma?.post?.findMany({
			include: {
				user: true,
				comments: true
			},
			orderBy: { createdAt: "desc" }
		})

		if (!allPosts || allPosts.length === 0) {
			return NextResponse.json([], { status: 200 });
		}

		return NextResponse.json(allPosts, { status: 200 })
	} catch (error) {
		console.log("Error in GET User By Id : ", (error as Error).message);
		return NextResponse.json(error, { status: 500 })
	}

}