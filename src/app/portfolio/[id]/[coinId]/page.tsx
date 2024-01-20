"use client";
import AddPortfolio from "@/src/app/Components/Portfolio/AddPortfolio";
import AddTranscation from "@/src/app/Components/AddTranscation/AddTranscation";
import SideBar from "@/src/app/Components/SideBar/SideBar";
import Transactions from "@/src/app/Components/Transactions/Transactions";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "@/src/app/Components/LoadingSpinner";
import {
  setPortfolio,
  getPortfolioDetailsAsync,
} from "@/src/state/slices/PortfolioSlice";
type Props = {
  params: {
    id: string;
    coinId: string;
  };
};

const CoinTranscations = ({ params }: Props) => {
  const { isLoading } = useSelector((state: RootState) => state.Portfolio);
  const { portfolios } = useSelector((state: RootState) => state.PortfolioList);
  const dispatch = useDispatch<AppDispatch>();
  const id = params.id;

  useEffect(() => {
    const portfolioFromParams = portfolios.find(
      (portfolio) => portfolio.id === id,
    );
    dispatch(setPortfolio(portfolioFromParams));
    dispatch(getPortfolioDetailsAsync(id));
  }, [id]);

  return (
    <main className="flex flex-col md:flex-row">
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <AddPortfolio />
      <AddTranscation />
      <SideBar />
      <Transactions coinId={params.coinId} />
    </main>
  );
};

export default CoinTranscations;
