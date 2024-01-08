"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import PortfolioTable from "./PortfolioTable";

type Props = {};

const Portfolio = React.memo((props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolio } = useSelector((state: RootState) => state.Portfolio);

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
          {portfolio && <PortfolioTable />}
        </>
      ) : (
        <h1>Choose Portfolio</h1>
      )}
    </div>
  );
});

export default Portfolio;
