import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OverviewTableRow from "./OverviewTableRow";
import { Skeleton } from "antd";
type Props = { coinData: any };

const OverviewTable = ({ coinData }: Props) => {
  return (
    <div className="p2 flex flex-1 flex-col self-stretch">
      <p className="my-5 text-xl font-semibold">Assets</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h%</TableCell>
              <TableCell align="right">Coins</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinData.length > 0 &&
              coinData.map((coin: any, index: number) => (
                <OverviewTableRow coin={coin} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OverviewTable;
