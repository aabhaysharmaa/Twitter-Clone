import { auth } from "@/auth";
import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server"
export async function GET() {
	const session = await auth();
	if (!session || !session?.user?.email) {
		return NextResponse.json({ message: "User Must Be LoggedIn" }, { status: 404 })
	}
	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email },
		include : { notifications : true}
	})
	if (!user) {
		return NextResponse.json({ message: "user don't exists" }, { status: 404 })
	}
	return NextResponse.json(user, { status: 200 });
}
