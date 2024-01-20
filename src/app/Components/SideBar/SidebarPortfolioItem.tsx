import React from "react";
import { deletePortfolioAsync } from "@/src/state/slices/PortfolioListSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/state/store";
import { setPortfolio } from "@/src/state/slices/PortfolioSlice";
import Link from "next/link";
import PopConfirm from "../PopConfirm";
type Props = {
  portfolio: any;
};

const SidebarPortfolioItem = ({ portfolio }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-row items-center justify-between rounded bg-primary hover:bg-tertiary ">
      <Link
        href={`/portfolio/${portfolio.id}`}
        className="flex flex-1 cursor-pointer flex-col p-2 "
        // onClick={() => {
        //   dispatch(setPortfolio(portfolio));
        // }}
      >
        <div className="font-semibold">{portfolio.name}</div>
        {portfolio.holdings && (
          <div className="text-gray-300">${portfolio.holdings.toFixed(2)}</div>
        )}
      </Link>
      <PopConfirm
        onConfirm={async () => {
          await dispatch(deletePortfolioAsync(portfolio.id));
        }}
        title="Delete the portfolio"
        description="Are you sure you want to delete this portfolio?"
        rest={{ okText: "Delete", placement: "bottom", okType: "danger" }}
      >
        <button className="m-2 rounded bg-red-500 p-2">Delete</button>
      </PopConfirm>
    </div>
  );
};

export default SidebarPortfolioItem;
