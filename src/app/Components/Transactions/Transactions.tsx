"use client";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import TransactionTable from "./TransactionTable";
import { useRouter } from "next/navigation";
import ChartComponent from "../Chart";

type Props = {
  coinId: string;
};

const Transactions = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins } = useSelector((state: RootState) => state.Portfolio);
  console.log(selectedPortfolioCoins, "selectedPortfolioCoins");
  const tx = selectedPortfolioCoins.find((coin: any) => coin.id === props.coinId);
  console.log(tx, "tx");
  const router = useRouter();

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/history/single?portfolioCoinId=${tx.id}`);
      const dataFromNewAPI = await response.json();
      console.log(dataFromNewAPI, "dataFromNewAPI");
    } catch (error) {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/history/single?portfolioCoinId=${tx.id}`);
        setData(await response.json());
        console.log(data, "dataFromNewAPI");
      } catch (error) {}
    };

    fetchHistory();
  }, []);

  console.log(selectedPortfolioCoins, "selectedPortfolioCoins");
  return (
    <div className="flex flex-1 flex-col items-center">
      {tx && (
        <>
          <div className="flex justify-between self-stretch">
            <Button
              variant="contained"
              className="self-end bg-black m-2 rounded-xl"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              className="self-end bg-black m-2 rounded-xl"
              onClick={() => dispatch(openModal())}
            >
              Add Transcation
            </Button>
          </div>
          <h1 className="text-3xl">{tx.coinName}</h1>
          <p>${tx.currentDetails.holdings}</p>
          Chart
          {data && data.length > 0 && <ChartComponent data={data} />}
          {tx.transactions.length > 0 && <TransactionTable transactions={tx.transactions} />}
        </>
      )}
    </div>
  );
};

export default Transactions;
