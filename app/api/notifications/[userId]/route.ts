// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
// import { authOptions } from "../auth/[...nextauth]/route";



export async function GET(req: NextRequest, context: { params: { userId: string } | Promise<{ userId: string }> }) {
  try {
    const resolved = await context.params;
    const userId = resolved?.userId;
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid userID" }, { status: 400 })
    }

    const notifications = await prisma?.notifications?.findMany({
      where: {
        userId
      }, orderBy: {
        createAt: "desc"
      }
    })


    await prisma?.user?.update({
      where: {
        id: userId
      },
      data: {
        hasNotifications: false
      }
    });


    return NextResponse.json(notifications, { status: 200 })
  } catch (error: unknown) {
    console.log((error as Error).message)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
