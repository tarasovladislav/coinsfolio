import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
import PortfolioTable from "./PortfolioTable";
import PortfolioChart from "./PortfolioChart";
import { Card, Button, Empty } from "antd";
import Donut from "../Donut";

type Props = {};

const Portfolio = ({}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins, portfolio, isLoading } = useSelector(
    (state: RootState) => state.Portfolio,
  );

  const balance =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins
      .reduce((acc: number, coin: any) => {
        return acc + Number(coin.currentDetails.holdings);
      }, 0)
      .toFixed(2);

  const allTimeProfit =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins.reduce((acc: number, coin: any) => {
      return acc + Number(coin.currentDetails.profitLoss);
    }, 0);

  const allTimeSpent =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins.reduce((acc: number, coin: any) => {
      return (
        acc +
        (Number(coin.currentDetails.holdings) +
          Number(coin.currentDetails.totalBought))
      );
    }, 0);

  const profitLostPercentage = (
    (Number(allTimeProfit) / (Number(allTimeSpent) - Number(allTimeProfit))) *
    100
  ).toFixed(2);

  const bestPerformer =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins.reduce((acc: any, coin: any) => {
      if (
        Number(coin.currentDetails.profitLoss) >
        Number(acc.currentDetails.profitLoss)
      ) {
        return coin;
      } else {
        return acc;
      }
    });

  const worstPerformer =
    selectedPortfolioCoins.length &&
    selectedPortfolioCoins.reduce((acc: any, coin: any) => {
      if (
        Number(coin.currentDetails.profitLoss) <
        Number(acc.currentDetails.profitLoss)
      ) {
        return coin;
      } else {
        return acc;
      }
    });

  return (
    portfolio && (
      <div className="m-5 flex flex-1  flex-col">
        <>
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg text-gray-400">{portfolio.name}</h1>
              <p className="text-3xl font-bold ">${balance}</p>
            </div>
            <Button onClick={() => dispatch(openModal())} className="self-end">
              Add Transcation
            </Button>
          </div>

          {bestPerformer !== 0 && worstPerformer ? (
            <div className="my-5 flex gap-5 self-start">
              <Card className="px-3" size="small">
                <p className="font-medium  text-gray-400">All-Time Profit</p>
                {Number(allTimeProfit) >= 0 ? (
                  <>
                    <p className="text-lg font-semibold text-green-500">
                      + ${Math.abs(Number(allTimeProfit)).toFixed(2)}
                    </p>
                    <p className="text-green-500">
                      {" "}
                      ▲ {Math.abs(Number(profitLostPercentage))}%
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-red-500">
                      - ${Math.abs(Number(allTimeProfit)).toFixed(2)}
                    </p>
                    <p className="text-red-500">
                      {" "}
                      ▼ {Math.abs(Number(profitLostPercentage))}%
                    </p>
                  </>
                )}
              </Card>
              <Card className="px-3" size="small">
                <p className="font-medium text-gray-400">Best Performer</p>
                <p className="text-lg font-semibold">
                  {bestPerformer && bestPerformer.coinName}
                </p>
                {Number(bestPerformer.currentDetails.profitLoss) >= 0 ? (
                  <>
                    <span className="mr-2 text-green-500">
                      + $
                      {Math.abs(
                        Number(bestPerformer.currentDetails.profitLoss),
                      ).toFixed(2)}
                    </span>
                    <span className="text-green-500">
                      ▲{" "}
                      {Math.abs(
                        Number(
                          bestPerformer.currentDetails.profitLossPercentage,
                        ),
                      )}
                      %
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mr-2 text-red-500">
                      - $
                      {Math.abs(
                        Number(bestPerformer.currentDetails.profitLoss),
                      ).toFixed(2)}
                    </span>
                    <span className="text-red-500">
                      ▼{" "}
                      {Math.abs(
                        Number(
                          bestPerformer.currentDetails.profitLossPercentage,
                        ),
                      )}
                      %
                    </span>
                  </>
                )}
              </Card>
              <Card className="px-3" size="small">
                <p className="font-medium  text-gray-400">Worst Performer</p>
                <p className="text-lg font-semibold">
                  {worstPerformer && worstPerformer.coinName}
                </p>
                {Number(worstPerformer.currentDetails.profitLoss) >= 0 ? (
                  <>
                    <span className="mr-2 text-green-500">
                      + $
                      {Math.abs(
                        Number(worstPerformer.currentDetails.profitLoss),
                      ).toFixed(2)}
                    </span>
                    <span className="text-green-500">
                      ▲{" "}
                      {Math.abs(
                        Number(
                          worstPerformer.currentDetails.profitLossPercentage,
                        ),
                      )}
                      %
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mr-2 text-red-500">
                      - $
                      {Math.abs(
                        Number(worstPerformer.currentDetails.profitLoss),
                      ).toFixed(2)}
                    </span>
                    <span className="text-red-500">
                      ▼{" "}
                      {Math.abs(
                        Number(
                          worstPerformer.currentDetails.profitLossPercentage,
                        ),
                      )}
                      %
                    </span>
                  </>
                )}
              </Card>
            </div>
          ) : (
            !isLoading && (
              <div className="flex items-center justify-center">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 300 }}
                  description={
                    <span className="text-2xl">Add a coin to get started</span>
                  }
                >
                  <Button onClick={() => dispatch(openModal())}>
                    Add Transcation
                  </Button>{" "}
                </Empty>
              </div>
            )
          )}

          {selectedPortfolioCoins.length > 0 && (
            <>
              <div className="my-5 flex flex-col gap-5 lg:flex-row">
                <PortfolioChart portfolio={portfolio} />
                <Donut coinData={selectedPortfolioCoins} />
              </div>
                <PortfolioTable />
            </>
          )}
        </>
      </div>
    )
  );
};

export default Portfolio;
