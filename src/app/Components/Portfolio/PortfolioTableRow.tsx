import React from "react";
import { TableCell, TableRow } from "@mui/material";
type Props = {
  coin: any;
};

const PortfolioTableRow = ({ coin }: Props) => {
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
        ${coin.currentDetails.holdings}
        <br />
        <span className="text-gray-500 text-xs">
          {coin.currentDetails.holdingCoins} {coin.coinSymbol.toUpperCase()}
        </span>
      </TableCell>

      <TableCell align="right">${coin.currentDetails.avgBuyPrice}</TableCell>
      <TableCell align="right">${coin.currentDetails.profitLoss}</TableCell>
    </TableRow>
  );
};

export default PortfolioTableRow;
