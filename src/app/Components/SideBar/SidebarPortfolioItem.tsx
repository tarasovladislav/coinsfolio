import React from "react";
import { deletePortfolioAsync } from "@/src/state/slices/PortfolioListSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/state/store";
import { setPortfolio } from "@/src/state/slices/PortfolioSlice";
import Link from "next/link";
type Props = {
  portfolio: any;
};

const SidebarPortfolioItem = ({ portfolio }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-row justify-between border-black border items-center rounded hover:bg-gray-600 ">
      <Link
        href={`/portfolio/${portfolio.id}`}
        className="flex flex-col flex-1 cursor-pointer p-2 "
        onClick={() => {
          dispatch(setPortfolio(portfolio));
        }}
      >
        <div className="font-semibold">{portfolio.name}</div>
      </Link>
      <button
        onClick={() => {
          dispatch(deletePortfolioAsync(portfolio.id));
        }}
        className="bg-red-500 p-2 rounded m-2"
      >
        Delete
      </button>
    </div>
  );
};

export default SidebarPortfolioItem;
