"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/state/store";
import { setSelectedPortfolioCoins } from "@/src/state/slices/PortfolioSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PortfolioTableRow from "./PortfolioTableRow";
type Props = {};

const PortfolioTable = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPortfolioCoins } = useSelector((state: RootState) => state.Portfolio);
  const { portfolio } = useSelector((state: RootState) => state.Portfolio);

  const fetchTransactions = async () => {
    console.log("fetching transactions");
    try {
      const response = await fetch(`/api/portfolio/details?id=${portfolio.id}`);
      const data = await response.json();
      dispatch(setSelectedPortfolioCoins(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    portfolio && fetchTransactions();
  }, [portfolio]);

  console.log("rendering portfolioTable.tsx");

  return (
    portfolio &&
    selectedPortfolioCoins.length > 0 && (
      <div className="p2 flex flex-col flex-1 self-stretch">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h%</TableCell>
                <TableCell align="right">Holdings</TableCell>
                <TableCell align="right">Avg.Buy Price</TableCell>
                <TableCell align="right">Profit/Loss</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedPortfolioCoins.map((coin) => (
                <PortfolioTableRow coin={coin} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default PortfolioTable;
