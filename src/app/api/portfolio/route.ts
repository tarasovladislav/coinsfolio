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
        const portfolios = await prisma.portfolio.findMany({
            where: { userId: user?.id },
            include: { portfoliocoins: { include: { transactions: true } } },
        });

        const allCoins = portfolios.map((portfolio) => {
            return portfolio.portfoliocoins.map((coin) => coin.coinId).join(",")
        }).join(",")
        const uniqueCoins = [...new Set(allCoins.split(","))].join(",")

        const coinsPriceResponse = await fetch(`https://pro-api.coingecko.com/api/v3/simple/price?ids=${uniqueCoins}&vs_currencies=usd&include_24hr_change=true&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
            method: 'GET',
        });
        const coinsPrices = await coinsPriceResponse.json()
        portfolios.map((portfolio) => {
            let totalHoldings = 0
            if (portfolio.portfoliocoins.length) {
                portfolio.portfoliocoins.map((coin) => {
                    coin.transactions.sort((a, b) => {
                        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                    })
                    const currentDetails = coinsPrices[coin.coinId]
                    const holdings = coin.transactions
                        .reduce((sum: number, tx: any) => {
                            if (tx.type === "Sell") return sum - tx.quantity * currentDetails.usd;
                            return sum + tx.quantity * currentDetails.usd;
                        }, 0)
                        .toFixed(2);
                    totalHoldings += parseFloat(holdings)
                })
            }
            portfolio.holdings = totalHoldings
            return portfolio
        })

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
