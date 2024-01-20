import React from "react";
import { TableCell, TableRow } from "@mui/material";

type Props = { coin?: any; skeleton?: boolean };

const OverviewTableRow = ({ coin }: Props) => {
 
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" className="flex flex-col">
          <span className="font-semibold">{coin.coinName}</span>
        </TableCell>
        <TableCell align="right">${coin.currentDetails.usd}</TableCell>
        <TableCell align="right">
          {coin.currentDetails.usd_24h_change
            ? `${coin.currentDetails.usd_24h_change.toFixed(2)}%`
            : "-"}
        </TableCell>
        <TableCell align="right">{coin.currentDetails.holdingCoins}</TableCell>
        <TableCell align="right">
          ${coin.currentDetails.holdings.toFixed(2)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default OverviewTableRow;
