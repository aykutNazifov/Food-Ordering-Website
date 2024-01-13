import { prisma } from "@/utils/prismaClient"
import { NextResponse } from "next/server"


// FETCH ALL CATEGORIES
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany()
        return new NextResponse(JSON.stringify({ data: categories }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error }), { status: 500 })
    }
}