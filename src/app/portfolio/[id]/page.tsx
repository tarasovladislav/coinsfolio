"use client";
import React, { useEffect, useState } from "react";
import AddPortfolio from "../../Components/AddPortfolio";
import AddTranscation from "../../Components/AddTranscation/AddTranscation";
import SideBar from "../../Components/SideBar/SideBar";
import Portfolio from "../../Components/Portfolio/Portfolio";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import {
  setSelectedPortfolioCoins,
  getPortfolioDetailsAsync,
} from "@/src/state/slices/PortfolioSlice";
import LoadingSpinner from "../../Components/LoadingSpinner";

type Props = {
  params: {
    id: string;
  };
};

const PortfolioPage = ({ params }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins, isLoading } = useSelector((state: RootState) => state.Portfolio);
  const id = params.id;

  useEffect(() => {
    dispatch(getPortfolioDetailsAsync(id));
  }, []);

  return (
    <main className="flex flex-row">
          {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <AddPortfolio />
      <SideBar />
      <AddTranscation />
      <Portfolio />
    </main>
  );
};

export default PortfolioPage;
