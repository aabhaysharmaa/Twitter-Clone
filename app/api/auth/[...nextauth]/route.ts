import prisma from "@/libs/prismaDB";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt", // ✔ now valid
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
} satisfies AuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
