import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),

    ],
}

export const getAuthSession = () => getServerSession(authOptions)