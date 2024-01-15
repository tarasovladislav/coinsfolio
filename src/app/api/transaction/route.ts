import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const data = await req.json();

        const { portfolioId, coinId, coinName, coinSymbol, transactionType, quantity, price, dateTime, notes } = data
        const existingPortfolioCoin = await prisma.portfolioCoins.findFirst({ where: { coinId: coinId, portfolioId: portfolioId } });
        if (!existingPortfolioCoin) {
            const newCoin = await prisma.portfolioCoins.create({
                data:
                {
                    coinId,
                    coinName,
                    coinSymbol,
                    transactions: {
                        create: {
                            type: transactionType,
                            coinId,
                            coinName,
                            coinSymbol,
                            quantity: quantity,
                            price: price,
                            dateTime: dateTime,
                            notes: notes
                        }
                    },
                    portfolioId: portfolioId,
                }
            });
            return NextResponse.json(newCoin, { status: 201 });

        } else {
            const newCoin = await prisma.transaction.create({
                data:
                {
                    type: transactionType,
                    coinId,
                    coinName,
                    coinSymbol,
                    quantity: quantity,
                    price: price,
                    dateTime: dateTime,
                    notes: notes,
                    portfolioCoinsId: existingPortfolioCoin.id
                }
            });
            return NextResponse.json(newCoin, { status: 201 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error in adding transaction" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: NextRequest) {
    //not tested
    try {
        await connectToDatabase();
        const data = await req.json();
        const { id } = data
        const deletedTransaction = await prisma.transaction.delete({ where: { id: id } });
        return NextResponse.json(deletedTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error in deleting transaction" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
