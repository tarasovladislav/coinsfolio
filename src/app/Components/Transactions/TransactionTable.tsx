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
import TransactionTableRow from "./TransactionTableRow";
type Props = {
  transactions: any[];
};

const TransactionTable = ({ transactions }: Props) => {
  return (
    transactions.length > 0 && (
      <div className="p2 flex flex-col flex-1 self-stretch">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx: any) => (
                <TransactionTableRow tx={tx} key={tx.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default TransactionTable;
