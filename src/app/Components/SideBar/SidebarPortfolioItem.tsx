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
      <PopConfirm
        onConfirm={async () => {
          await dispatch(deletePortfolioAsync(portfolio.id));
        }}
        title="Delete the portfolio"
        description="Are you sure you want to delete this portfolio?"
        rest={{ okText: "Delete", placement: "bottom", okType: "danger" }}
      >
        <button className="bg-red-500 p-2 rounded m-2">Delete</button>
      </PopConfirm>
    </div>
  );
};

export default SidebarPortfolioItem;
