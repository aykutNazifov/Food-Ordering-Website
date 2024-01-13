import { prisma } from "@/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"


// FETCH ALL PRODUCTS
export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)
    const cat = searchParams.get("cat")
    try {
        const products = cat ? await prisma.product.findMany({
            where: {
                catSlug: cat
            }
        }) : await prisma.product.findMany({
            where: {
                isFeatured: true
            }
        })
        return new NextResponse(JSON.stringify({ data: products }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error }), { status: 500 })
    }
}