import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";
export async function GET() {
	try {
		const allUsers = await prisma.user.findMany({
			orderBy: { createdAt: "desc" }
		});
		if (!allUsers) {
			return NextResponse.json({ message: "No User found" })
		}
		return NextResponse.json(allUsers, { status: 200 })
	} catch (error) {
		console.log("Error in GET Users : ", (error as Error).message)
		return NextResponse.json({ message: (error as Error).message })
	}
}