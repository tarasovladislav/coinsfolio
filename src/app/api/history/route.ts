
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
        let coinsAtTime = 0;
        transactions.forEach((transaction) => {
            const { type, dateTime, quantity } = transaction;

            if (dateTime <= targetTime) {
                if (type === 'Buy') {
                    coinsAtTime += quantity;
                    holdings += quantity;
                } else if (type === 'Sell') {
                    coinsAtTime -= quantity;
                    holdings -= quantity;
                }
            }
        });
        return holdings;
    }

    try {
        await connectToDatabase();
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const days = searchParams.get("days");
        const portfolioId = searchParams.get("portfolioId");

        const endDate = dayjs().unix();

        const portfolioCoins = await prisma.portfolioCoins.findMany({
            where: { portfolioId: portfolioId },
        });

        const allTransactions = await prisma.transaction.findMany({
            where: { portfolioCoinsId: { in: portfolioCoins.map((portfolioCoin) => portfolioCoin.id) } },
        });

        const lowestDate = allTransactions.reduce((a, b) => {
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

        const fetchCoinData = async (coinId, startDate, endDate) => {
            const coinsHistoryResponse = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
                method: 'GET',
            });
            const data = await coinsHistoryResponse.json();
            const prices = data.prices;
            return { coinId, prices };
        };


        const fetchCoinDataPromises = portfolioCoins.map(portfolioCoin => {
            const coinId = portfolioCoin.coinId;
            return fetchCoinData(coinId, startDate, endDate);
        });

        const coinDataArray = await Promise.all(fetchCoinDataPromises);
        const portfolioValues = [];
        for (const { coinId, prices } of coinDataArray) {
            const coinTransactions = allTransactions.filter(transaction => transaction.coinId === coinId);
            const portfolioValue = calculateHistoricalPortfolioValue(coinTransactions, prices);
            portfolioValues.push(portfolioValue);
        }

        const totalPortfolioValue = portfolioValues.reduce((acc, current) => {
            current.forEach(({ timeDate, usd }, index) => {
                if (!acc[index]) {
                    acc[index] = { timeDate, usd };
                } else {
                    acc[index].usd = (acc[index].usd || 0) + usd;
                }
            });
            return acc;
        }, []);


        return NextResponse.json(totalPortfolioValue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
