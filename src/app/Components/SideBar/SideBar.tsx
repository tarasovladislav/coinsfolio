"use client";
import { Button, } from "@mui/material";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openModal, getPortfoliosAsync,  } from "@/src/state/slices/PortfolioListSlice";
import { AppDispatch, RootState } from "@/src/state/store";

import LoadingSpinner from "@/src/app/Components/LoadingSpinner";
import SidebarPortfolioItem from "./SidebarPortfolioItem";

type Props = {};
const SideBar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, portfolios,  } = useSelector((state: RootState) => state.PortfolioList);


  useEffect(() => {
    dispatch(getPortfoliosAsync());
  }, [dispatch]);

  return (
    <div className="h-screen w-1/3 flex flex-col bg-gray-500 text-white pt-3">
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
