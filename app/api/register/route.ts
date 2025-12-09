import prisma from "@/libs/prismaDB";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { username, name, email, password } = await req.json();
		if (!username || !email || !password || !name) {
			return NextResponse.json({ message: "all fields are required" })
		}
		const existingUser = await prisma.user.findUnique({
			where: { email }
		})


		if (existingUser) {
			return NextResponse.json({ message: "user already exists!" })
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				hashedPassword,
				name
			}
		})
		return NextResponse.json({ message: "user created successfully", newUser })
	} catch (error) {
		console.log("Error in register route : ", error)
		return NextResponse.json({ error })
	}
}

