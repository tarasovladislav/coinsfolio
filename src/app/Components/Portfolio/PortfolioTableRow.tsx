import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCoinAsync } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch } from "@/src/state/store";
import PopConfirm from "../PopConfirm";
type Props = {
  coin: any;
};

const PortfolioTableRow = ({ coin }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <TableRow
        key={coin.coinName}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => {
          router.push(`/portfolio/${coin.portfolioId}/${coin.coinName}`);
          console.log("clicked");
        }}
      >
        <TableCell component="th" scope="row">
          <span className="font-semibold">{coin.coinName}</span>
          <span className="text-gray-500"> {coin.coinSymbol.toUpperCase()}</span>
        </TableCell>
        <TableCell align="right">
          $
          {coin.currentDetails.usd > 1
            ? coin.currentDetails.usd.toFixed(2)
            : coin.currentDetails.usd}
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
            {coin.currentDetails.holdingCoins.toFixed(2)} {coin.coinSymbol.toUpperCase()}
          </span>
        </TableCell>

        <TableCell align="right">${coin.currentDetails.avgBuyPrice}</TableCell>
        <TableCell align="right">${coin.currentDetails.profitLoss}</TableCell>
        <TableCell
          align="right"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="flex flex-0 justify-end">
            <PopConfirm
              onConfirm={async () => {
                await dispatch(deleteCoinAsync(coin.id));
              }}
              title="Delete the coin"
              description="Are you sure you want to delete this coin?"
              rest={{ okText: "Delete", placement: "topRight", okType: "danger" }}
            >
              <div className=" cursor-pointer">
                <BsTrash3 />
              </div>
            </PopConfirm>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PortfolioTableRow;
