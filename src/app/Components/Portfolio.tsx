"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import PortfolioTable from "./PortfolioTable";

type Props = {};

const Portfolio = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { portfolio } = useSelector((state: RootState) => state.Portfolio);
  const { portfolios } = useSelector((state: RootState) => state.PortfolioList);

  useEffect(() => {
    portfolios.length > 0 && dispatch(setPortfolio(portfolios[0]));
  }, [portfolios]);

  return (
    <div className="flex flex-1 flex-col items-center">
      {portfolio ? (
        <>
          <Button
            variant="contained"
            className="self-end bg-black m-2 rounded-xl"
            onClick={() => dispatch(openModal())}
          >
            Add Transcation
          </Button>
          <h1 className="text-3xl">{portfolio.name}</h1>
          <p>Your Balance is $0.</p>
          <PortfolioTable />
        </>
      ) : (
        <h1>Choose Portfolio</h1>
      )}
    </div>
  );
};

export default Portfolio;
