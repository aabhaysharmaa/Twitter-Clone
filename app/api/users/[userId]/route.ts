import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";
export async function GET(req: Request, context: { params?: Promise<{ userId?: string }> }) {
  try {
    //@ts-expect-error
    const params = await context.params; // unwrap the Promise
    const userId =
      params?.userId ??
      (() => {
        // Fallback: parse last path segment
        try {
          const pathnameParts = new URL(req.url).pathname.split('/').filter(Boolean);
          return pathnameParts[pathnameParts.length - 1];
        } catch {
          return undefined;
        }
      })();

    if (!userId) {
      console.error("GET /api/users/[userId] missing userId. context.params=", params, "url=", req.url);
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        comments: { include: { user: true } }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/users/[userId] error:", (error as Error).message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
