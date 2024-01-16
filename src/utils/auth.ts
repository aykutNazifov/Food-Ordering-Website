import { NextAuthOptions, User, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: boolean | undefined
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean | undefined
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
        async jwt({ token }) {
            const currentUser = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            })
            token.isAdmin = currentUser?.isAdmin
            return token
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)