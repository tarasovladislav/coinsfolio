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

            const coinstring = portolioWithCoins.map((coin) => coin.coinId).join(",")
            const coinsPriceResponse = await fetch(`https://pro-api.coingecko.com/api/v3/simple/price?ids=${coinstring}&vs_currencies=usd&include_24hr_change=true&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
                method: 'GET',
            });
            const data = await coinsPriceResponse.json();



            for (let i = 0; i < portolioWithCoins.length; i++) {
                const transactions = await prisma.transaction.findMany({
                    where: { portfolioCoinsId: portolioWithCoins[i].id },
                });

                transactions.sort((a, b) => {
                    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                })
                const currentDetails = data[portolioWithCoins[i].coinId]

                const holdings = transactions
                    .reduce((sum: number, tx: any) => {
                        if (tx.type === "Sell") return sum - tx.quantity * currentDetails.usd;
                        return sum + tx.quantity * currentDetails.usd;
                    }, 0)
                    .toFixed(2);
                const holdingCoins = transactions.reduce((sum: number, tx: any) => {
                    if (tx.type === "Sell") return sum - tx.quantity;
                    return sum + tx.quantity;
                }, 0);

                const avgBuyPrice = (
                    transactions.reduce((sum: number, tx: any) => {
                        if (tx.type === "Sell") return sum;
                        return sum + tx.quantity * tx.price;
                    }, 0) /
                    transactions.reduce((totalQuantity: number, tx: any) => {
                        if (tx.type === "Sell") return totalQuantity;
                        return totalQuantity + tx.quantity;
                    }, 0)
                ).toFixed(2);

                const profitLoss = (
                    transactions.reduce((sum: number, tx: any) => {
                        if (tx.type === "Sell") return sum + tx.quantity * tx.price;
                        return sum - tx.quantity * tx.price;
                    }, 0) + Number(holdings)
                ).toFixed(2);

                const TotalBought = transactions.reduce((sum: number, tx: any) => {
                    if (tx.type !== "Sell") return sum;
                    return sum + tx.quantity * tx.price;
                }, 0)

                const profitLostPercentage = (
                    (Number(profitLoss) / (Number(holdings) + Number(TotalBought) - Number(profitLoss))) *
                    100
                ).toFixed(2)

                currentDetails.totalBought = TotalBought
                currentDetails.holdings = holdings
                currentDetails.holdingCoins = holdingCoins
                currentDetails.avgBuyPrice = avgBuyPrice
                currentDetails.profitLoss = profitLoss
                currentDetails.profitLossPercentage = profitLostPercentage
                result.push({ ...portolioWithCoins[i], transactions, currentDetails })
            }
        }
        return NextResponse.json({ portfolio, result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
