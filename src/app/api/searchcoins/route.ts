import coins from '@/helpers/coins'
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        if (!query) return NextResponse.json({ message: "No query provided" }, { status: 400 })
        
        const filteredResults = coins
            .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.name.length - b.name.length);
        const slicedResults = filteredResults.slice(0, 7);
        return NextResponse.json(slicedResults, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching coins" }, { status: 500 });
    }
}