import React from "react";
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
type Props = {
  coin: any;
};

const PortfolioTableRow = ({ coin }: Props) => {
  const holdings = coin.transactions
    .reduce((sum: number, tx: any) => {
      return sum + tx.quantity * coin.currentDetails.usd;
    }, 0)
    .toFixed(2);
  const holdingCoins = coin.transactions.reduce((sum: number, tx: any) => {
    return sum + tx.quantity;
  }, 0);

  const avgBuyPrice = (
    coin.transactions.reduce((sum: number, tx: any) => {
      return sum + tx.quantity * tx.price;
    }, 0) /
    coin.transactions.reduce((totalQuantity: number, tx: any) => {
      return totalQuantity + tx.quantity;
    }, 0)
  ).toFixed(2);

  //   const profitLoss = (holdings - avgBuyPrice).toFixed(2);

  return (
    <TableRow key={coin.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <span className="font-semibold">{coin.coinName}</span>
        <span className="text-gray-500"> {coin.coinSymbol.toUpperCase()}</span>
      </TableCell>
      <TableCell align="right">
        $
        {coin.currentDetails.usd > 1 ? coin.currentDetails.usd.toFixed(2) : coin.currentDetails.usd}
      </TableCell>
      <TableCell align="right">
        {coin.currentDetails?.usd_24h_change
          ? `${coin.currentDetails?.usd_24h_change.toFixed(2)}%`
          : "-"}
      </TableCell>
      <TableCell align="right">
        ${holdings}
        <br />
        <span className="text-gray-500 text-xs">
          {holdingCoins} {coin.coinSymbol.toUpperCase()}
        </span>
      </TableCell>

      <TableCell align="right">${avgBuyPrice}</TableCell>
      <TableCell align="right">$</TableCell>
    </TableRow>
  );
};

export default PortfolioTableRow;
