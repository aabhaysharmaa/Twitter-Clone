
import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";
export async function GET() {
	try {
		const users = await prisma?.user?.findMany({
			orderBy: {
				createdAt: "desc" // order by  newely created
			}
		})
		return NextResponse.json(users, { status: 200 })
	} catch (error) {
		console.log((error as Error).message)
	}
}