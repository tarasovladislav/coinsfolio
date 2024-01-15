import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteTransactionAsync } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch } from "@/src/state/store";
type Props = {
  tx: any;
};
import dayjs from "dayjs";
import PopConfirm from "../PopConfirm";
const TransactionTableRow = ({ tx }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const formattedDateTime = dayjs(tx.dateTime).format("MMM DD, YYYY, HH:MM");

  return (
    <>
      <TableRow
        key={tx.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" className="flex flex-col">
          <span className="font-semibold">{tx.type}</span>
          <span className="text-gray-500"> {formattedDateTime}</span>
        </TableCell>
        <TableCell align="right">${tx.price}</TableCell>
        <TableCell align="right">{parseFloat(tx.quantity)}</TableCell>
        <TableCell
          align="right"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="flex flex-0 justify-end">
            <PopConfirm
              onConfirm={async () => {
                dispatch(deleteTransactionAsync(tx.id));
              }}
              title="Delete the transaction"
              description="Are you sure you want to delete this transaction?"
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

export default TransactionTableRow;
