"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import TransactionTable from "./TransactionTable";
import { useRouter } from "next/navigation";
import Chart from "./TransactionsChart";
import { Card, Button } from "antd";

type Props = {
  coinId: string;
};

const Transactions = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins } = useSelector(
    (state: RootState) => state.Portfolio,
  );

  const tx = selectedPortfolioCoins.find(
    (coin: any) => coin.coinName === props.coinId,
  );
  const router = useRouter();
  console.log(selectedPortfolioCoins, "selectedPortfolioCoins");
  return (
    <div className="m-5 flex flex-1  flex-col">
      {tx && (
        <>
          <Button onClick={() => router.back()} className="mb-5 self-start">
            Back
          </Button>

          <div className="flex justify-between">
            <div>
              <h1 className="text-lg text-gray-400">{tx.coinName}</h1>
              <p className="text-3xl font-bold">
                ${tx.currentDetails.holdings}
              </p>
            </div>
            <Button onClick={() => dispatch(openModal())} className="self-end">
              Add Transcation
            </Button>
          </div>

          <div className="my-5 flex gap-5 self-start">
            <Card className="px-3" size="small">
              <p className="font-300  text-gray-400">Quantity</p>
              <p className="text-2xl font-bold">
                {tx.currentDetails.holdingCoins} {tx.coinSymbol.toUpperCase()}
              </p>
            </Card>
            <Card className="px-3" size="small">
              <p className="font-medium text-gray-400">Avg. buy price</p>
              <p className="text-2xl font-bold">
                ${tx.currentDetails.avgBuyPrice}
              </p>
            </Card>
            <Card className="px-3" size="small">
              <p className="font-medium  text-gray-400">Total profit / loss</p>
              {Number(tx.currentDetails.profitLoss) >= 0 ? (
                <>
                  <p className="mr-2 text-2xl font-bold text-green-500">
                    + $
                    {Math.abs(Number(tx.currentDetails.profitLoss)).toFixed(2)}
                  </p>
                  <p className="text-green-500">
                    ▲ {Math.abs(Number(tx.currentDetails.profitLossPercentage))}
                    %
                  </p>
                </>
              ) : (
                <>
                  <p className="mr-2 text-2xl font-bold text-red-500">
                    - $
                    {Math.abs(Number(tx.currentDetails.profitLoss)).toFixed(2)}
                  </p>
                  <p className="text-red-500">
                    ▼ {Math.abs(Number(tx.currentDetails.profitLossPercentage))}
                    %
                  </p>
                </>
              )}
            </Card>
          </div>

          <Chart tx={tx} />

          {tx.transactions.length > 0 && (
            <TransactionTable transactions={tx.transactions} />
          )}
        </>
      )}
    </div>
  );
};

export default Transactions;
