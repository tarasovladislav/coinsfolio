"use client";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button, ButtonGroup } from "@mui/material";
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
  const [historyDays, setHistoryDays] = useState<string | number>("All");

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
        const response = await fetch(
          `/api/history/single?portfolioCoinId=${tx.id}&days=${historyDays}`
        );
        setData(await response.json());
        console.log(data, "dataFromNewAPI");
      } catch (error) {}
    };

    fetchHistory();
  }, [historyDays]);

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
          <div className="self-end">
            <ButtonGroup variant="outlined" className="flex align-center justify-center mb-4">
              <Button
                onClick={() => {
                  setHistoryDays(1);
                }}
                className="w-1/5"
                style={{
                  backgroundColor: historyDays === 1 ? "#343434" : "",
                  color: historyDays === 1 ? "#fff" : "",
                }}
              >
                24H
              </Button>
              <Button
                onClick={() => {
                  setHistoryDays(7);
                }}
                className="w-1/5"
                style={{
                  backgroundColor: historyDays === 7 ? "#343434" : "",
                  color: historyDays === 7 ? "#fff" : "",
                }}
              >
                7D
              </Button>
              <Button
                onClick={() => {
                  setHistoryDays(30);
                }}
                className="w-1/5"
                style={{
                  backgroundColor: historyDays === 30 ? "#343434" : "",
                  color: historyDays === 30 ? "#fff" : "",
                }}
              >
                30D
              </Button>
              <Button
                onClick={() => {
                  setHistoryDays(90);
                }}
                className="w-1/5"
                style={{
                  backgroundColor: historyDays === 90 ? "#343434" : "",
                  color: historyDays === 90 ? "#fff" : "",
                }}
              >
                90D
              </Button>
              <Button
                className="w-1/5"
                style={{
                  backgroundColor: historyDays === "All" ? "#343434" : "",
                  color: historyDays === "All" ? "#fff" : "",
                }}
                onClick={() => {
                  setHistoryDays("All");
                }}
              >
                All
              </Button>
            </ButtonGroup>
          </div>
          {data && data.length > 0 && <ChartComponent data={data} />}
          {tx.transactions.length > 0 && <TransactionTable transactions={tx.transactions} />}
        </>
      )}
    </div>
  );
};

export default Transactions;
