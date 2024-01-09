"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import TransactionTable from "./Transactions/TransactionTable";

type Props = {
  coinId: string;
};

const Transactions = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins } = useSelector((state: RootState) => state.Portfolio);
  console.log(selectedPortfolioCoins,'selectedPortfolioCoins')
  const data = selectedPortfolioCoins.find((coin: any) => coin.id === props.coinId);
  return (
    <div className="flex flex-1 flex-col items-center">
      {data && (
        <>
          <Button
            variant="contained"
            className="self-end bg-black m-2 rounded-xl"
            onClick={() => dispatch(openModal())}
          >
            Add Transcation
          </Button>
          <h1 className="text-3xl">{data.coinName}</h1>
          <p>${data.currentDetails.holdings}</p>
          {data.transactions.length > 0 && <TransactionTable transactions={data.transactions} />}
        </>
      )}
    </div>
  );
};

export default Transactions;
