"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import PortfolioTable from "./PortfolioTable";

type Props = {
  portfolio: any;
  portfolioCoins: any;
};

const Portfolio = ({ portfolio, portfolioCoins }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const balance =
    portfolioCoins.length &&
    portfolioCoins.reduce((acc: number, coin: any) => {
      return acc + Number(coin.currentDetails.holdings);
    }, 0);

  return (
    <div className="flex flex-1 flex-col items-center">
      {portfolio && (
        <>
          <Button
            variant="contained"
            className="self-end bg-black m-2 rounded-xl"
            onClick={() => dispatch(openModal())}
          >
            Add Transcation
          </Button>
          <h1 className="text-3xl">{portfolio.name}</h1>
          <p>Your Balance is ${balance}.</p>
          {portfolioCoins.length > 0 && <PortfolioTable portfolioCoins={portfolioCoins} />}
        </>
      )}
    </div>
  );
};

export default Portfolio;
