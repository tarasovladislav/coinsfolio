import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth"
import dayjs from "dayjs";
export async function GET(req: NextRequest) {
    function calculateHistoricalPortfolioValue(transactions, tokenHistory) {
        const result = [];

        tokenHistory.forEach(([unixtime, price]) => {
            const holdingsAtTime = calculateHoldingsAtTime(transactions, unixtime);
            const valueAtTime = holdingsAtTime * price;

            result.push({
                timeDate: unixtime,
                usd: valueAtTime,
            });
        });

        return result;
    }

    function calculateHoldingsAtTime(transactions, targetTime) {
        let holdings = 0;

        transactions.forEach((transaction) => {
            const { type, dateTime, quantity } = transaction;

            if (dateTime <= targetTime) {
                if (type === 'Buy') {
                    holdings += quantity;
                } else if (type === 'Sell') {
                    holdings -= quantity;
                }
            }
        });
        return holdings;
    }
    try {
        await connectToDatabase();
        const session = await auth()
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const { searchParams } = new URL(req.url);

        const portfolioCoinId = searchParams.get("portfolioCoinId");
        const days = searchParams.get("days");
        const portolioWithCoins = await prisma.transaction.findMany({
            where: { portfolioCoinsId: portfolioCoinId },
        });

        const coin = portolioWithCoins[0].coinId

        const endDate = dayjs().unix();

        const lowestDate = portolioWithCoins.reduce((a, b) => {
            return a.dateTime < b.dateTime ? a : b;
        }).dateTime

        let startDate = dayjs(lowestDate).unix();
        switch (days) {
            case "1":
                if (dayjs(lowestDate).unix() < dayjs().subtract(1, 'day').unix()) {
                    startDate = dayjs().subtract(1, 'day').unix();
                }
                break;
            case "7":
                if (dayjs(lowestDate).unix() < dayjs().subtract(7, 'day').unix()) {
                    startDate = dayjs().subtract(7, 'day').unix();
                }
                break;
            case "30":
                if (dayjs(lowestDate).unix() < dayjs().subtract(30, 'day').unix()) {

                    startDate = dayjs().subtract(30, 'day').unix();
                }
                break;
            case "90":
                if (dayjs(lowestDate).unix() < dayjs().subtract(90, 'day').unix()) {
                    startDate = dayjs().subtract(90, 'day').unix();
                }
                break;
            case "All":
                startDate = dayjs(lowestDate).unix();
                break;
            default:
                break;
        }

        // const startDate = dayjs(lowestDate).unix();

        const coinsHistoryResponse = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
            method: 'GET',
        });
        const data = await coinsHistoryResponse.json();
        const prices = data.prices
        const portfolioValue = calculateHistoricalPortfolioValue(portolioWithCoins, prices);


        // console.log(prices)


        //get amounf of coins at the start date
        // check for transcation of start date 
        // do first with just a coin, then combine to make it for portfolio

        // get all transactions for the coin





        // make a route to get amount of coins in portfolio at the speciiic date? not as route but as function 
        // get all buys / sells for the coins 


        //for graph take the first coin buy date

        // multtiply usd * total quantity of coin 





        return NextResponse.json(portfolioValue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}