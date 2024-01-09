"use client";
import React, { useEffect, useState } from "react";
import AddPortfolio from "../../Components/AddPortfolio";
import AddTranscation from "../../Components/AddTranscation/AddTranscation";
import SideBar from "../../Components/SideBar/SideBar";
import Portfolio from "../../Components/Portfolio/Portfolio";

type Props = {
  params: {
    id: string;
  };
};

const PortfolioPage = ({ params }: Props) => {
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioCoins, setPortfolioCoins] = useState(null);
  const id = params.id;

  const fetchTransactions = async () => {
    console.log("fetching transactions for id: ", id);
    try {
      const response = await fetch(`/api/portfolio/details?id=${id}`);
      const data = await response.json();
      setPortfolio(data.portfolio);
      setPortfolioCoins(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="flex flex-row">
      <AddPortfolio />
      <SideBar />
      <AddTranscation />
      {portfolioCoins && portfolio && (
        <Portfolio portfolio={portfolio} portfolioCoins={portfolioCoins} />
      )}
    </main>
  );
};

export default PortfolioPage;
