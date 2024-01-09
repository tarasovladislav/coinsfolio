import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";


export async function DELETE(req: NextRequest) {
    try {
        await connectToDatabase();
        const data = await req.json();
        const { id } = data
        const deletedTransaction = await prisma.portfolioCoins.delete({ where: { id: id } });
        return NextResponse.json(deletedTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error in deleting transaction" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}