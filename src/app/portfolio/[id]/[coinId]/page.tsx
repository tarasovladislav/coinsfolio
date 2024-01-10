"use client";
import AddPortfolio from "@/src/app/Components/Portfolio/AddPortfolio";
import AddTranscation from "@/src/app/Components/AddTranscation/AddTranscation";
import SideBar from "@/src/app/Components/SideBar/SideBar";
import Transactions from "@/src/app/Components/Transactions/Transactions";
import React from "react";
import { AppDispatch, RootState } from "@/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "@/src/app/Components/LoadingSpinner";
type Props = {
  params: {
    id: string;
    coinId: string;
  };
};

const CoinTranscations = ({ params }: Props) => {
  const { selectedPortfolioCoins, isLoading } = useSelector((state: RootState) => state.Portfolio);

  return (
    <main className="flex flex-row">
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <AddPortfolio />
      <AddTranscation />
      <SideBar />
      <Transactions coinId={params.coinId} />
    </main>
  );
};

export default CoinTranscations;
