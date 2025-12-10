
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
	try {
		const params = await context.params;
		const { userId } = params;
		const body = await req.json();
		const { coverImage, username, name, profileImage, bio } = body
		if (!userId) {
			return NextResponse.json({ message: "User not Found" })
		}
		const user = await prisma.user.update({
			where: { id :userId },
			data: {
				name,
				username,
				coverImage,
				profileImage,
				bio
			}
		})
		if (!user) {
			return NextResponse.json({ message: "No User Found" }, { status: 400 })
		}
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.log("Error in Edit Route : ", (error as Error).message)
	}

}
