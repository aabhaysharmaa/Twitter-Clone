import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
	try {
		const session = await auth();
		const body = await req.json();
		const  { coverImage, username, name, profileImage, bio } = body
		if (!session || !session?.user?.email) {
			return NextResponse.json({ message: "Please Logged In To Update Profile" })
		}
		const user = await prisma.user.update({
			where: { email: session?.user?.email },
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
