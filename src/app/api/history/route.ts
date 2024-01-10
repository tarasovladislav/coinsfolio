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
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const days = searchParams.get("days");
        const portolioWithCoins = await prisma.portfolioCoins.findMany({
            where: { portfolioId: id },
        });

        



// do first with just a coin, then combine to make it for portfolio

// get all transactions for the coin





// make a route to get amount of coins in portfolio at the speciiic date? not as route but as function 
// get all buys / sells for the coins 


//for graph take the first coin buy date

// multtiply usd * total quantity of coin 





        // return NextResponse.json({portfolio, result}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}