"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import OverviewChart from "./OverviewChart";
import { openModal } from "@/src/state/slices/PortfolioListSlice";
import { Button } from "antd";
import OverviewTable from "./OverviewTable";
import Donut from "../Donut";

type Props = {};

const Overview = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { portfolios } = useSelector((state: RootState) => state.PortfolioList);
  const [coinData, setCoinData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/overview/coins`);
        const data = await response.json();
        console.log(data);
        setCoinData(data);
        const totalValue = data.reduce((acc, coin) => {
          return acc + coin.currentDetails.holdings;
        }, 0);
        setTotalBalance(totalValue.toFixed(2));
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    portfolios.length > 0 && (
      <div className="m-5 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h1 className="text-lg text-gray-400">Overview</h1>
            <p className="text-3xl font-bold ">${totalBalance}</p>
          </div>
          <Button onClick={() => dispatch(openModal())} className="self-end">
            Create Portfolio
          </Button>
        </div>
        <div className="my-5 flex flex-col gap-5 lg:flex-row ">
          <OverviewChart />
          <Donut coinData={coinData} />
        </div>
        <OverviewTable coinData={coinData} />
      </div>
    )
  );
};

export default Overview;
