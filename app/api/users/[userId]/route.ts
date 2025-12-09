import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params?: Promise<{ userId?: string }> }) {
	try {
		const params = await context.params;
		const userId = params?.userId;
		if (!userId) {
			return NextResponse.json({ message: "User Id not Found" });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { comment: { include: { user: true } } }
		})
		if (!user) {
			return NextResponse.json({ message: "User Not Found" }, { status: 400 })
		}
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.log("Error in GET User By Id : ", (error as Error).message);
		return NextResponse.json(error, { status: 500 })
	}

}