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

        const AllPortfolios = await prisma.portfolio.findMany({
            where: { userId: user?.id }, include: {
                portfoliocoins: {
                    include: {
                        transactions: true
                    }
                }
            }
        });

        const uniquePortfolioCoins = AllPortfolios.flatMap(portfolio => portfolio.portfoliocoins).reduce((unique, portfolioCoin) => {
            const existingCoin = unique.find(coin => coin.coinId === portfolioCoin.coinId);

            if (existingCoin) {
                existingCoin.transactions = [...existingCoin.transactions, ...portfolioCoin.transactions];
            } else {
                unique.push(portfolioCoin);
            }

            return unique;
        }, []);

        const idString = uniquePortfolioCoins.map(portfolioCoin => portfolioCoin.coinId).join(",");

        const coinsPriceResponse = await fetch(`https://pro-api.coingecko.com/api/v3/simple/price?ids=${idString}&vs_currencies=usd&include_24hr_change=true&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
            method: 'GET',
        });
        const coinsPrices = await coinsPriceResponse.json()

        const result = uniquePortfolioCoins.map((portfolioCoin) => {
            let holdings = 0
            let holdingCoins = 0
            let usd_24h_change = coinsPrices[portfolioCoin.coinId].usd_24h_change
            let usd = coinsPrices[portfolioCoin.coinId].usd

            if (portfolioCoin.transactions.length) {
                portfolioCoin.transactions.map((transaction) => {
                    const { type, quantity } = transaction;
                    if (type === 'Buy') {
                        holdingCoins += quantity;
                    } else if (type === 'Sell') {
                        holdingCoins -= quantity;
                    }
                })
            }
            holdings = holdingCoins * usd.toFixed(2)
            return { ...portfolioCoin, currentDetails: { holdings, usd_24h_change, usd, holdingCoins } }

        })


        return NextResponse.json(result, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }


}