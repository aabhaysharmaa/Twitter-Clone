import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./libs/prismaDB";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) {
          throw new Error("All fields are required")
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: email as string }
        })
        if (!existingUser || !existingUser.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isValidPassword = await bcrypt.compare(password as string, existingUser?.hashedPassword);
        if (!isValidPassword) {
          throw new Error("Invalid credentials")
        }
        return existingUser;
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV !== "production",
})




