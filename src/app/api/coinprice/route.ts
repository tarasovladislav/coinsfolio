import { NextResponse, NextRequest } from "next/server";
import dayjs from "dayjs";

export async function POST(req: NextRequest) {
    const COINGECKO_API = process.env.COINGECKO_API;
    console.log(COINGECKO_API)
    try {
        const isToday = (date: dayjs.Dayjs) => {
            return dayjs(date).isSame(dayjs(), "day");
        };

        const { coin, date } = await req.json();
        let from, to;

        if (isToday(date)) {
            to = dayjs(date).unix();
            from = to - 3700
        } else {
            from = dayjs(date).unix();
            to = from + 3700
        }
        const response = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=2&x_cg_pro_api_key=${process.env.COINGECKO_API}`, {
            method: 'GET',

        });
        const data = await response.json();


        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error in fetching coin price" }, { status: 500 });
    }
}
