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

        const portfolio = id && await prisma.portfolio.findFirst({ where: { id, userId: user?.id } });

        const portolioWithCoins = portfolio && await prisma.portfolioCoins.findMany({
            where: { portfolioId: portfolio?.id },
        });
        const result = []
        if (portolioWithCoins) {
            console.log('getting prices')
            const coinstring = portolioWithCoins.map((coin) => coin.coinId).join(",")
            const coinsPriceResponse = await fetch(`https://pro-api.coingecko.com/api/v3/simple/price?ids=${coinstring}&vs_currencies=usd&include_24hr_change=true&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
                method: 'GET',
            });
            const data = await coinsPriceResponse.json();
            console.log(data)
            for (let i = 0; i < portolioWithCoins.length; i++) {
                const transactions = await prisma.transaction.findMany({
                    where: { portfolioCoinsId: portolioWithCoins[i].id },
                });
                const currentDetails = data[portolioWithCoins[i].coinId]
                result.push({ ...portolioWithCoins[i], transactions, currentDetails })
            }
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
