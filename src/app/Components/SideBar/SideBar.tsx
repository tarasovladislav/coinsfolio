"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  getPortfoliosAsync,
} from "@/src/state/slices/PortfolioListSlice";
import { AppDispatch, RootState } from "@/src/state/store";

import LoadingSpinner from "@/src/app/Components/LoadingSpinner";
import SidebarPortfolioItem from "./SidebarPortfolioItem";
import { Empty, Button } from "antd";
import Link from "next/link";

type Props = {};
const SideBar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, portfolios } = useSelector(
    (state: RootState) => state.PortfolioList,
  );

  const initialLoad = async () => {
    dispatch(getPortfoliosAsync());
  };

  useEffect(() => {
    !portfolios.length && initialLoad();
  }, []);

  if (!portfolios.length && !isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 300 }}
          description={
            <span className="text-2xl">Add a Portfolio to get started</span>
          }
        >
          <Button onClick={() => dispatch(openModal())}>Add Portfolio</Button>
        </Empty>
      </div>
    );
  return (
    <>
      <div className="my-5 flex min-w-64 flex-shrink-0 flex-col overflow-auto bg-gray-200 text-white">
        {isLoading ? (
          <LoadingSpinner isLoading={isLoading} />
        ) : (
          <>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex flex-row items-center justify-between rounded bg-primary hover:bg-tertiary ">
                <Link
                  href={`/`}
                  className="flex flex-1 cursor-pointer flex-col p-2 "
                >
                  <div className="font-semibold">Overview</div>
                </Link>
              </div>
            </div>
            <Button
              className="self-center"
              onClick={() => dispatch(openModal())}
            >
              Create Portolio
            </Button>
          </>
        )}
        <div className="flex flex-col gap-2 p-2">
          {portfolios.map((portfolio: any) => {
            return (
              <SidebarPortfolioItem portfolio={portfolio} key={portfolio.id} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
