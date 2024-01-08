import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth"
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const session = await auth()
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const user = await prisma.user.findFirst({ where: { email: session?.user?.email || "" } });
        const portfolios = await prisma.portfolio.findMany({ where: { userId: user?.id } });
        return NextResponse.json({ portfolios }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const session = await auth()
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const user = await prisma.user.findFirst({ where: { email: session?.user?.email || "" } });
        const { name } = await req.json();
        const newPortfolio = await prisma.portfolio.create({ data: { name, userId: user?.id } });
        return NextResponse.json(newPortfolio, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error in adding portfolio" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: NextRequest) {

    // todo if removing portfolio, remove all transactions associated with it
    try {
        await connectToDatabase();
        const session = await auth()
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const user = await prisma.user.findFirst({ where: { email: session?.user?.email || "" } });
        const { id } = await req.json();

        const deletedPortfolio = await prisma.portfolio.delete({ where: { id, userId: user?.id } });
        return NextResponse.json(deletedPortfolio, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in deleting portfolio" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
