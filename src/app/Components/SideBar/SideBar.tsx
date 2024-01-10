"use client";
import { Button } from "@mui/material";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openModal, getPortfoliosAsync } from "@/src/state/slices/PortfolioListSlice";
import { setPortfolio, getPortfolioDetailsAsync } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch, RootState } from "@/src/state/store";
import { useRouter } from "next/navigation";

import LoadingSpinner from "@/src/app/Components/LoadingSpinner";
import SidebarPortfolioItem from "./SidebarPortfolioItem";

type Props = {};
const SideBar = (props: Props) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, portfolios } = useSelector((state: RootState) => state.PortfolioList);

  const initialLoad = async () => {
    dispatch(getPortfoliosAsync()).then((ab) => {
      if (
        ab.meta.requestStatus === "rejected" ||
        !ab.payload?.portfolios ||
        ab.payload.portfolios.length === 0
      )
        return;
      dispatch(setPortfolio(ab.payload.portfolios[0]));
      router.push(`/portfolio/${ab.payload.portfolios[0].id}`);
    });
  };

  useEffect(() => {
    !portfolios.length && initialLoad();
  }, []);

  return (
    <div className=" w-96 flex flex-col bg-gray-500 text-white pt-3 ">
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <Button
          variant="contained"
          className="self-center bg-black"
          color="primary"
          onClick={() => dispatch(openModal())}
        >
          Add New Portolio
        </Button>
      )}
      <div className="flex flex-col gap-2 p-2">
        {portfolios.map((portfolio: any) => {
          return <SidebarPortfolioItem portfolio={portfolio} key={portfolio.id} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;
