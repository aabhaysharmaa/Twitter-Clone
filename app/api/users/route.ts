import prisma from "@/libs/prismaDB"
import { NextResponse } from "next/server";


export async function GET() {
	try {
		const allUsers = await prisma.user.findMany();
		if (!allUsers) {
			return NextResponse.json({ message: "No User found" })
		}
		return NextResponse.json(allUsers)
	} catch (error) {
		console.log("Error in GET Users : ", (error as Error).message)
		return NextResponse.json({ message: (error as Error).message })
	}
}