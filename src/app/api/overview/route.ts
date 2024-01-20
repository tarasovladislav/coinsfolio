import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth"
import dayjs from "dayjs";


export async function GET(req: NextRequest) {
    const BASE_URL = process.env.BASE_URL

    try {
        await connectToDatabase();
        const session = await auth()
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const user = await prisma.user.findFirst({ where: { email: session?.user?.email || "" } });

        const { searchParams } = new URL(req.url);
        const days = searchParams.get("days");
        const endDate = dayjs().unix();

        const portfolios = await prisma.portfolio.findMany({ where: { userId: user?.id } });
        const portfolioIdArray = portfolios.map((portfolio) => portfolio.id);




        const allPortfolioCoins = await prisma.portfolioCoins.findMany({
            where: {
                portfolioId: { in: portfolioIdArray }
            }
        });
        const allPorfolioCoinsIdArray = allPortfolioCoins.map((portfolioCoin) => portfolioCoin.id);

        const allTransactions = await prisma.transaction.findMany({
            where: {
                portfolioCoinsId: { in: allPorfolioCoinsIdArray }
            }
        });

        const theFirstTranscation = allTransactions.reduce((a, b) => {
            return a.dateTime < b.dateTime ? a : b;
        })
        const startDate = theFirstTranscation.dateTime

        const fetchPortfolioData = async (portfolioId: string) => {
            try {
                const response = await fetch(`${BASE_URL}/api/history?portfolioId=${portfolioId}&days=${days}&endDate=${endDate}&startDate=${startDate}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }

        const eachPortfolioDataPromises = portfolios.map((portfolio) => {
            return fetchPortfolioData(portfolio.id)
        });

        const eachPortfolioData = await Promise.all(eachPortfolioDataPromises);
        const portolios = eachPortfolioData.filter((portfolio) => portfolio.length > 0);

        const combinedValueArray = portolios.reduce((acc, curr) => {
            curr.forEach((item: any, index: number) => {
                if (acc[index]) {
                    acc[index].usd += item.usd
                }
                else {
                    acc[index] = item
                }

            })
            return acc
        })

        return NextResponse.json(combinedValueArray, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching portfolios" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}