import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import { Button } from "@mui/material";
import PortfolioTable from "./PortfolioTable";

type Props = {};

const Portfolio = ({}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins, portfolio } = useSelector((state: RootState) => state.Portfolio);

  const balance =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins
      .reduce((acc: number, coin: any) => {
        return acc + Number(coin.currentDetails.holdings);
      }, 0)
      .toFixed(2);

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
          {selectedPortfolioCoins.length > 0 && <>Graph</>}
          {selectedPortfolioCoins.length > 0 && <PortfolioTable />}
        </>
      )}
    </div>
  );
};

export default Portfolio;
