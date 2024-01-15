import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/state/store";
import { setPortfolio, openModal } from "@/src/state/slices/PortfolioSlice";
type Props = {};

const PortfolioTable = ({}: Props) => {
  console.log("rendering portfolioTable.tsx");
  const { selectedPortfolioCoins } = useSelector((state: RootState) => state.Portfolio);

  return (
    selectedPortfolioCoins.length > 0 && (
      <div className="p2 flex flex-col flex-1 self-stretch">
        <p className="text-xl my-5 font-semibold">Assets</p>
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
              {selectedPortfolioCoins.map(
                (coin: any) =>
                  coin.transactions.length > 0 && <PortfolioTableRow coin={coin} key={coin.id} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default PortfolioTable;
