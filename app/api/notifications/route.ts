import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await auth();
		if (!session || !session?.user?.email) {
			return NextResponse.json({ message: "User is Not Logged In" }, { status: 400 })
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		})
		if (!user) {
			return NextResponse.json({ message: "User din't found" }, { status: 400 })
		}
		const notifications = await prisma?.notifications?.findMany({
			where: { userId: user?.id },
			orderBy: { createdAt: "desc" }
		});

		await prisma.user.update({
			where: { id: user?.id },
			data: { hasNotifications: false }
		})

		return NextResponse.json(notifications, { status: 200 })

	} catch (error) {
		console.log("Error in GET Notifications Route : ", error);
		return NextResponse.json({ message: (error as Error).message }, { status: 500 })
	}
}