import React, { useState } from "react";
import { List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, selectCoin } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch, RootState } from "@/src/state/store";
type Props = {
  results: {
    id: string;
    symbol: string;
    name: string;
  }[];
};

const CoinSearchResults = ({ results }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <List>
      {results.map((result) => (
        <ListItem
          key={result.id}
          className="hover:bg-gray-600 cursor-pointer"
          onClick={() => {
            dispatch(selectCoin(result));
          }}
        >
          {result.name}
        </ListItem>
      ))}
    </List>
  );
};

export default CoinSearchResults;
