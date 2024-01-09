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
type Props = { portfolioCoins: any };

const PortfolioTable = ({ portfolioCoins }: Props) => {
  console.log("rendering portfolioTable.tsx");

  return (
    portfolioCoins.length > 0 && (
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
              {portfolioCoins.map((coin:any) => (
                <PortfolioTableRow coin={coin} key={coin.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default PortfolioTable;
