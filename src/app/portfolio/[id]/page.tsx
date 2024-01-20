"use client";
import React, { useEffect, useState } from "react";
import AddPortfolio from "../../Components/Portfolio/AddPortfolio";
import AddTranscation from "../../Components/AddTranscation/AddTranscation";
import SideBar from "../../Components/SideBar/SideBar";
import Portfolio from "../../Components/Portfolio/Portfolio";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import {
  setSelectedPortfolioCoins,
  getPortfolioDetailsAsync,
  setPortfolio,
} from "@/src/state/slices/PortfolioSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";

type Props = {
  params: {
    id: string;
  };
};

const PortfolioPage = ({ params }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, portfolio } = useSelector(
    (state: RootState) => state.Portfolio,
  );
  const { portfolios } = useSelector((state: RootState) => state.PortfolioList);
  const id = params.id;

  useEffect(() => {
    const portfolioFromParams = portfolios.find(
      (portfolio) => portfolio.id === id,
    );
    dispatch(setPortfolio(portfolioFromParams));
    dispatch(getPortfolioDetailsAsync(id));
  }, [id, portfolios]);

  return (
    <main className=" flex flex-col md:flex-row">
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <AddPortfolio />
      <SideBar />
      <AddTranscation />

      {portfolio && <Portfolio />}
    </main>
  );
};

export default PortfolioPage;
