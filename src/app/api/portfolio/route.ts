import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const portfolios = await prisma.portfolio.findMany({});
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
    const { name } = await req.json();
    const newPortfolio = await prisma.portfolio.create({ data: { name } });
    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error in adding portfolio" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    const deletedPortfolio = await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json(deletedPortfolio, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error in deleting portfolio" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
